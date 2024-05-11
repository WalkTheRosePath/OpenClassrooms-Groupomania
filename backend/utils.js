// Functions that can be used in multiple files

exports.createMediaUrl = (req) => {
    return req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename
}