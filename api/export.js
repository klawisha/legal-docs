import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default async function handler(req,res){

  const token = req.query.token;
  if(!token) return res.status(400).send("no token");

  const text = decodeURIComponent(escape(Buffer.from(token,'base64').toString()));

  const docDefinition = {
    content:[
      {text:"ОФИЦИАЛЬНЫЙ ДОКУМЕНТ",style:"header"},
      text
    ],
    styles:{
      header:{fontSize:16,bold:true,margin:[0,0,0,20]}
    }
  };

  const pdf = pdfMake.createPdf(docDefinition);

  pdf.getBuffer((buffer)=>{
    res.setHeader("Content-Type","application/pdf");
    res.setHeader("Content-Disposition","attachment; filename=document.pdf");
    res.send(buffer);
  });
}
