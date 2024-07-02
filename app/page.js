'use client'
import { useEffect, useState, useCallback } from "react";
import StackGrid from "react-stack-grid";

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState(null);
  const [width, setWidth] = useState(10000);
  const [count, setCount] = useState(0);

  const updateWidth = (_event) => {
    setWidth(window.innerWidth);
  };

  // 最後の画像を追う処理を追加
  const lastRef = useCallback((element) => {
      if (element === null) return;
      const options = { threshold: 0.01 };
      const observer = new IntersectionObserver((entries, observer) => {
        const ratio = entries[0].intersectionRatio;
        if (ratio > 0 && ratio <= 1) {
          observer.disconnect();
          fetchNextImages();
        }
      }, options);
      observer.observe(element);
    },
    [images, count]
  );

  // 次の画面のロードを実行
  const fetchNextImages = useCallback(() => {
    if (images === null) return;
    if (images.length > count) {
      setCount(images.length);
    }
    setCount(count + 10);
  }, [images, count]);

  // リサイズハンドラ設定
  useEffect(() => {
    setWidth(window.innerWidth);
    const options = { capture: false, passive: true };
    window.addEventListener(`resize`, updateWidth, options);
    return () => window.removeEventListener(`resize`, updateWidth);
  }, []);

  //APIを介して画像を取得してデータセット
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const response = await fetch(`/api/photos?directory=gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/photos`,{method: 'GET',}).then((res) => res.json());
      setCount(response.urls.length < 10 ? response.urls.length : 10);
      const imageDimensionsPromises = response.urls.map(url => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            //画像の実際のサイズを取得
            resolve({ url, width: img.width, height: img.height });
          };
          img.src=url;
        });
      });
      const imageDimensions = await Promise.all(imageDimensionsPromises);
      setImages(imageDimensions)
      setLoading(false);
    };
    fetchImages();
  }, []);

  //画像幅調整
  const getSize = (w) => {
    if(w < 674) return 150
    if(675 <= w < 960) return 220
    return 240;
  };

  return (
    <main className="container text-center">
      <div className="card m-2">
        <div className="card-body">
          以下は<a href="https://picsum.photos/" target="_blank">picsum.photos</a>を使って取得した画像を、firebaseのstorageにアップロードしてそれを表示しています。
        </div>
      </div>
      {loading && <><div className="spinner-border text-secondary" role="status"><span className="visually-hidden">Loading...</span></div></>}
      {!loading && images && (
        <>
          {(() => {
            const w = getSize(width);
            return (
              <StackGrid columnWidth={w} gutterWidth={12} gutterHeight={12} duration={0}>
              {images.slice(0, count).map((image, index) => {
                const zoom = w / image.width;
                const height = image.height * zoom;
                const isLast = images.indexOf(image) === count - 1;
                return (
                  <div key={index} ref={isLast ? lastRef : undefined} width={w} height={height}>
                    <img
                    src={image.url}
                    alt={`image-${count}`}
                    width={w}
                    height={height}
                    />
                  </div>
                );
              })}
              </StackGrid>
            );
          })()}
        </>
      )}
    </main>
  );
}
export default Gallery;