module.exports = (string) => {
    if(string){
        return string.split(',').map(datas => datas.trim())
    }
    return [];
}