import { NextResponse } from "next/server";
import { storage } from '@/firebaseConfig';
import { listAll, ref, getDownloadURL } from "firebase/storage";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const directory = searchParams.get('directory');
  
    const listRef = ref(storage, directory);
    
    try {
        const resList = await listAll(listRef);
        const urls = await Promise.all(
            resList.items.map(itemRef => getDownloadURL(itemRef))
        );
        console.log("photos get moved")
        //storageから取得した画像URLを返却
        return NextResponse.json({ urls });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
