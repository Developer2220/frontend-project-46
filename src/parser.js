

const getParsedFileData = (data, ext) => {
    if (ext === '.json') {
        return JSON.parse(data)
    }
};

export {getParsedFileData};