function getCellPattern(value){
     switch(value){
        case 2: return {backgroundColor:'rgb(238,228,218)', letterColor:'rgb(127,117,115)', offsetX: 30, offsetY: 52, fontSize:'40px'}
        case 4: return {backgroundColor:'rgb(236,224,202)', letterColor:'rgb(113,105,94)', offsetX: 30, offsetY: 52, fontSize:'40px'}
        case 8: return {backgroundColor:'rgb(241,182,150)', letterColor:'rgb(255,255,255)', offsetX: 30, offsetY: 52, fontSize:'40px'}
        case 16: return {backgroundColor:'rgb(245,149,98)', letterColor:'rgb(255,255,255)', offsetX: 20, offsetY: 52, fontSize:'40px'}
        case 32: return {backgroundColor:'rgb(245,124,95)', letterColor:'rgb(255,255,255)', offsetX: 20, offsetY: 52, fontSize:'40px'}
        case 64: return {backgroundColor:'rgb(246,93,59)', letterColor:'rgb(255,255,255)', offsetX: 20, offsetY: 52, fontSize:'40px'}
        case 128: return {backgroundColor:'rgb(237,206,113)', letterColor:'rgb(255,255,255)', offsetX: 10, offsetY: 52, fontSize:'40px'}
        case 256: return {backgroundColor:'rgb(240,203,99)', letterColor:'rgb(255,255,255)', offsetX: 10, offsetY: 52, fontSize:'40px'}
        case 512: return {backgroundColor:'rgb(249,202,88)', letterColor:'rgb(255,255,255)', offsetX: 10, offsetY: 52, fontSize:'40px'}
        case 1024: return {backgroundColor:'rgb(245,200,65)', letterColor:'rgb(255,255,255)', offsetX: 10, offsetY: 50, fontSize:'30px'}
        case 2048: return {backgroundColor:'rgb(246,197,43)', letterColor:'rgb(255,255,255)', offsetX: 10, offsetY: 50, fontSize:'30px'}
    }
    /**
         *  base = 138, 124, 115
         */
}
export default getCellPattern