//Handles PDF Creation
// //pdfkit package
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.createMarriageReport = async (data) => {
    return new Promise((resolve, reject) => {
        const reportsDir = path.join(__dirname, '../../reports');
        
        // Check if the 'reports' directory exists; if not, create it.
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }

        const filePath = path.join(reportsDir, 'marriage_report.pdf');

        const doc = new PDFDocument();
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        doc
            .fontSize(20)
            .text('Marriage Registration Certificate', { align: 'center' })
            .moveDown();

        doc
            .fontSize(14)
            .text(`Bride: ${data.brideName}`)
            .moveDown()
            .text(`Groom: ${data.groomName}`)
            .moveDown()
            .text(`Marriage Date: ${data.marriageDate}`)
            .moveDown()
            .text(`Location: ${data.location}`)
            .moveDown();

        doc.end();

        stream.on('finish', () => resolve(filePath));
        stream.on('error', (err) => reject(err));
    });
};
