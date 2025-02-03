import { Request, Response } from 'express'

import parse from 'await-busboy'
import AWS from "aws-sdk"
import fs from 'fs'
import path from 'path'
import moment from 'moment'
import Busboy from 'busboy'
import os from 'os'

var rows = {};

function printRows() {
    Object.keys(rows) // => array of y-positions (type: float)
        .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
        .forEach((y) => console.log((rows[y] || []).join("")));
}


class FileUploadController {

    /**
     * upload PDF
     * @param req req.params.directory
     */

    /* 
    public async readPdf(req: Request, res: Response): Promise<Response> {
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
            var dir = path.join('/tmp/', path.basename(filename))
            file.pipe(fs.createWriteStream(dir))
            file.on('end', () => {
                fs.readFile(dir, (err, pdfBuffer)=>{
                    new pdfreader.PdfReader().parseBuffer(pdfBuffer, function(err,item) {
                        if(!item || item.page){
                            printRows();
                            rows = {}; 
                        }else if (item.text){
                            (rows[item.y] = rows[item.y] || []).push(item.text);
                        }
                    })
                    
                })
            })
           res.status(200).send("Concluído!");
        });
       busboy.on('finish', function() {
       });
        return req.pipe(busboy);
    } */

    /* 
    public async fileUpload(req: Request, res: Response): Promise<Response> {
        
        try {
            var s3 = new AWS.S3({
                accessKeyId: awsKeys.s3.accessKeyId,
                secretAccessKey: awsKeys.s3.secretAccessKey,
            })
			var bucket = awsKeys.s3.bucket
            var directory = req.params.directory
			var parts = parse(req)
			var uploadedToMachine = false
			var typeFile = ''
			var newFilename = ''
			var filename = ''
			var part

            while (part = await parts) {
				var extension = part.mime.split('/')[1]
                if (extension == 'png' || extension == 'jpg' || extension == 'jpeg' || extension == 'gif' || extension == 'pdf') {
                    filename = part.filename
					typeFile = extension
					var stream = fs.createWriteStream('/tmp/' + filename)
					part.pipe(stream)
					var prepareFilename = new Buffer.from(filename + moment().format('YYYY-MM-DD HH:mm:ss'))
					newFilename = directory + "/" + prepareFilename.toString('base64') + '.' + extension
					uploadedToMachine = true
				} else {
					throw new Error('Formato não suportado')
				}
			}
            
            req.body = `https://s3-sa-east-1.amazonaws.com/${bucket}/${newFilename}` 

        } catch (error) {
            console.log(error)
            return req.body
        }

    } */

    public async uploadFile(req: Request, res: Response): Promise<Response> {
        const fs = require('fs');
        const dir = `${require('os').homedir()}/files/upload`;

        try {
            if (!fs.existsSync(dir)) { fs.mkdirSync(dir, {recursive: true}); }
    
            var parts = parse(req)
            var part
            var filename = ''
            var newFilename = ''
            var uploadedToMachine = false
    
            while (part = await parts) {
                var extension = part.mime.split('/')[1]
                var prepareFilename = Buffer.from(part.filename + moment().format('YYYY-MM-DD HH:mm:ss'))
                newFilename = prepareFilename.toString('base64') + '.' + extension
                var stream = fs.createWriteStream(dir + '/' + newFilename)
                part.pipe(stream)
                uploadedToMachine = true
            }
    
            return res.send({filename: newFilename})
        } catch(err) {
            return res.status(400).send(err)
        }

    }

    public async getFile(req: Request, res: Response): Promise<Response> {
        try {
            const dir = `${require('os').homedir()}/files/upload/${req.params.filename}`;
            const splited = dir.split(".");
            res.setHeader("Content-Type", `image/${splited[splited.length -1]}`);
            fs.createReadStream(dir).pipe(res);
        } catch(err) {
            return res.status(400).send(err)
        }
    }

    // public async readPdf(req: Request, res: Response): Promise<Response> {
    //     var busboy = new Busboy({ headers: req.headers });
    //     busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    //         var dir = path.join('/tmp/', path.basename(filename))
    //         file.pipe(fs.createWriteStream(dir))
    //         file.on('end', () => {
    //             fs.readFile(dir, (err, pdfBuffer)=>{
    //                 new pdfreader.PdfReader().parseBuffer(pdfBuffer, function(err,item) {
    //                     if(!item || item.page){
    //                         printRows();
    //                         rows = {}; 
    //                     }else if (item.text){
    //                         (rows[item.y] = rows[item.y] || []).push(item.text);
    //                     }
    //                 })
                    
    //             })
    //         })
    //         console.log(rows)
    //         // res.status(200).send("Concluído!");
    //     });
    //     // busboy.on('finish', function() {
    //     // });
    //     return req.pipe(busboy);
    // }

}

export default new FileUploadController()
