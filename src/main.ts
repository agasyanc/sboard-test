import PdfGegerator from "./pdf-generator/pdf-generator";

const container = document.getElementById('app')

container && new PdfGegerator(container)