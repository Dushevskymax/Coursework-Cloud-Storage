
export default class Styler {

    static #lightTheme(){
        const currentStyles = document.getElementsByTagName('body')[0].style;
        currentStyles.background = 'white';
        currentStyles.color = 'white';
    }

    static #DarkTheme(){
        const currentStyles = document.getElementsByTagName('body')[0].style;
        currentStyles.background = 'rgb(33,33,33)';
        currentStyles.color = '#4844ff';
    }

    static changeCurrentTheme(currTheme){
        
        currTheme ? this.#DarkTheme() : this.#lightTheme()
        
    }
}
