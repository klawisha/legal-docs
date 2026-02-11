import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export async function GET(req){

  const {searchParams} = new URL(req.url);
  const token = searchParams.get("token");

  if(!token) return new Response("no token",{status:400});

  const text = decodeURIComponent(escape(Buffer.from(token,'base64').toString()));

  const docDefinition={
    content:[
      {text:"ОФИЦИАЛЬНЫЙ ДОКУМЕНТ",style:"header"},
      text
    ],
    styles:{header:{fontSize:16,bold:true}}
  };

  const pdf=pdfMake.createPdf(docDefinition);

  return new Promise(resolve=>{
    pdf.getBuffer(buffer=>{
      resolve(new Response(buffer,{
        headers:{
          "Content-Type":"application/pdf",
          "Content-Disposition":"attachment; filename=document.pdf"
        }
      }));
    });
  });
}
