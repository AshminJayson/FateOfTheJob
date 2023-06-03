import { NextRequest, NextResponse } from "next/server";
import PDFJS from "pdfjs-dist";

export async function POST(request: NextRequest) {
    const file = request.body;
    console.log(file);

    let buffer: any;
    const loadingTast = PDFJS.getDocument(buffer);
    const pdf = await loadingTast.promise;

    const numPages = pdf.numPages;
    let extractedText = "";

    for (let i = 0; i < numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
            .map((item: any) => item.str)
            .join(" ");
        extractedText += pageText + "\n";
    }

    return NextResponse.json({ parseddata: extractedText });
}
