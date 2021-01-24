var fs = require('fs')
var path = require('path')

const originalDir = path.join(__dirname, 'original')
const newDir = path.join(__dirname, 'new')

fs.readdir(originalDir, (err, files)=>{
    if (err) {
        return console.warn(err)
    }

    files.forEach(function (file){
        // File Path of Original
        let originalFilePath = path.join(originalDir, file)
        filter(originalFilePath, file)
    })
})

function filter(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data)=>{
        if (err) {
            console.log(err)
            return
        }

        data = data.replace(/^[0-9]$/gm, "Verse $&");
        data = data.replace("Refrain", "Chorus")

        let file = path.join(newDir, data.split('\n')[0].slice(0, -1))
        
        data = "Intro \n" + data

        fs.writeFile(file + '.txt', data, (err)=>{
            if (err) {
                console.log(err)
            }
            console.log(file)
        })
    })
}
