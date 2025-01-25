//Handles HTTP requests
const reportService = require('../Services/reportService');

exports.generateReport = async (req, res) => {
    try {
        const { brideName, groomName, marriageDate, location } = req.body;

        if (!brideName || !groomName || !marriageDate || !location) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const pdfPath = await reportService.createMarriageReport({
            brideName,
            groomName,
            marriageDate,
            location,
        });

        res.download(pdfPath, 'Marriage_Certificate.pdf', (err) => {
            if (err) {
                res.status(500).json({ message: "Error in downloading PDF." });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error generating report.", error });
    }
};
