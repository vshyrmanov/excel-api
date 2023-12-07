const express = require('express');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs-extra');

const app = express();
const port = 3000;

const upload = multer({dest: "uploads/"});

app.post('/read', upload.single('file'), (req, res) => {
  try {
    if (req.file?.filename == null || req.file?.filename == "undefined") {
      res.status(400).json('No file')
    } else {
      const filePath = 'uploads/' + req.file.filename

      const excelData = excelToJson({
        sourceFile: filePath,
        
        sheets: [{
          name: "testik",
          header: {
            rows: 1
          },
          columnToKey: {
            "A": "lastName",
            "B": "Name",
            "C": "fatherName",
            "D": "speciality",
            "E": "adress",
          }
        },
        {
          name: "TO",
          header: {
            rows: 1
          },
          columnToKey: {
            "A": "lastName",
            "B": "Name",
            "C": "fatherName",
            "D": "speciality",
            "E": "adress"
          }
        }
      ]
        
      })

      fs.remove(filePath)

      res.status(200).json(excelData)
    }
  } catch {
    res.status(500)
  }
})

app.listen(port, () => console.log(`Server run on port ${port}`))