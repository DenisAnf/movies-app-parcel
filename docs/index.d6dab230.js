const e=document.querySelector("#filmName"),u=document.querySelector("#filmAddButton"),t=document.querySelector("#filmError"),n=createView("#movies");let o=[];function r(e){this.name=e,this.check="unchecked"}const c=()=>{let u=e.value,t=new r(u);return t},l=e=>o.push(e),a=()=>{},s=()=>e.value="",i=()=>{let u=e.value,n=u.length,o=u.replace(REG_SPACES_PUNСTUATION_MARKS,""),r=o.length;return u&&0!=r?n>LIMIT_LENGTH_FILM_NAME?(t.textContent=`\u{41D}\u{435} \u{431}\u{44B}\u{432}\u{430}\u{435}\u{442} \u{444}\u{438}\u{43B}\u{44C}\u{43C}\u{43E}\u{432} \u{434}\u{43B}\u{438}\u{43D}\u{435}\u{435} 130 \u{441}\u{438}\u{43C}\u{432}\u{43E}\u{43B}\u{43E}\u{432} (${n}/${LIMIT_LENGTH_FILM_NAME})`,e.focus(),!0):(t.textContent="",!1):(t.textContent="Введите название фильма",s(),e.focus(),!0)},d=()=>{if(i())return;let e=c();l(e),saveFilmsToLocalStorage(),a(),s()};getFilmsFromLocalStorage(),n.render(o),e.focus(),u.addEventListener("click",d),e.addEventListener("keydown",u=>{13===u.keyCode&&(u.preventDefault(),d(),e.focus())});