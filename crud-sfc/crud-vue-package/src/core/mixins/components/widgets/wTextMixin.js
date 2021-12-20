import crud from "../../../crud";

crud.conf['w-text'] = {
    maxLineLength: 0, // numero di caratteri massimi per linea quando voglio il testo formato da linee di lunghezza massima
    maxLength: 0,  // numero di caratteri da tagliare per non sbordare
}

const wTextMixin = {

}
export default wTextMixin
