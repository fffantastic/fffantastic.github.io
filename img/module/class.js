class UnivInfo{
    constructor(data, elem){
        this.data = data;
        this.elem = elem;
    }
    univName(){
        return `<div class="flex_20 text--left">
        <div class="fontH font_30">${this.data.name.replace(/[0-9]/g,"")}</div>
        <div>${this.data.loc}</div></div>`;
    }
    univCommon(){
        const group = document.createElement("div");
        group.classList.add("flex-column", "text--left");
        
        // 반영비
        group.appendChild(this.commonDetail(this.data.ratio, ["flex-row", "font_14", "exam-ratio"], "btn-round"));
        // 과목별 반영비
        group.appendChild(this.commonDetail(this.data.rate, ["flex-row", "font_16", "divisionDot"], ""));
        // 실기 내용, 시간
        group.appendChild(this.commonDetail(this.data.subject, ["flex-row", "font_12", "divisionLine"], ""));

         // 추가 설명
        group.appendChild(this.commonDetail(this.data.ect, ["flex-column", "font_12"], "font_14 grey_50"));
        return group;
    }
    commonDetail(arr, groupClass, itemClass){
        const group = document.createElement("div");
        group.classList.add(...groupClass);

        arr.forEach(d => {
            if(d.length !== 0){
                group.insertAdjacentHTML("beforeend", `<span class="${itemClass}">${d}</span>`)
            }
        });
        return group;
    }
    majorDetail(){
        const container = document.createElement("div");
        container.classList.add("flex-Column","flex_30", "text--left", "font_16");

        this.data.forEach(v => {
            const group = document.createElement("div");
            group.classList.add("flex-align-center", "margin-block_03", "div");

            group.insertAdjacentHTML("beforeend",
            `<span>${v.major}</span>
            <span class="orange">${v.numberOf}</span>
            <span class="lilac">${v.competition}</span>
            <span class="btn-round font_14 green">${v.avrg}</span>
            <span class="btn-round font_14">${v.date}</span>`);
            container.appendChild(group);
        });
        return container;
    }
}

class HandleBtn{
    constructor(content, type){
        this.content = content;
        this.type = type;
        this.btnType = ["btn-round", "btn-rectangle", "btn-circle", "btn-square","tab"];
        this.button = this.create();
    }
    create(){
        const btn = document.createElement("button");
        btn.classList.add(this.btnType[this.type]);
        btn.innerText = this.content;
        return btn;
    }
    addClass(key){
        this.button.classList.add(key);
        return this;
    }
    select(){
        this.content.classList.toggle(this.type);
        return this;
    }
    setValue(v){
        this.button.value = v;
        return this;
    }
    getSelected(){
        return Array.from(this.content.parentNode.querySelectorAll(`.${this.type}`));
    }
    getText(){
        return this.getSelected().map(d => d.innerText);
    }
    getValue(){
        return this.getSelected().map(d => d.value);
    }
    selectOne(){
        const items = this.getSelected()
        items.forEach(d => d.classList.remove(this.type));
        this.content.classList.toggle(this.type);
    }
}

class HandleContent{
    constructor(tag, elem){
        this.tag = tag;
        this.elem = elem;
        this.content = this.getContents();
        this.filtered = [];
    }
    getContents(){
        return Array.from(this.tag.querySelectorAll(`.${this.elem}`));
    }
    filterContents(f){
        this.filtered.push(this.content.filter(d => f(d)));
        return this;
    }
    findContents(f, key){
        key.forEach(d => {
            this.filtered.push(this.content.filter(v => f(v,d)));
        })
        return this;
    }
    hideRest(){
        this.content.forEach(d => d.classList.add("dp-none"));
        this.filtered.flat().forEach(d => d.classList.remove("dp-none"));
    }
    show(){
        this.content.forEach(d => d.classList.remove("dp-none"));
        return this;
    }
    hide(){
        this.content.forEach(d => d.classList.add("dp-none"));
        return this;
    }
}
class CreateContents{
    constructor(data, elem){
        this.data = data;
        this.elem = elem;
        this.content = this.create();
    }
    create(){

    }
    contentGroup(){
        const group = document.createElement("div");
        group.classList.add(...this.elem);
        return group;
    }
    img(){
        return `<div class="img" style="background-image:url('${this.data.img}');"></div>`;
    }
    desc(){
        
    }
}

// 셀렉트, 이미지, 태그 등
class HandleCompo{
    constructor(arr, key, elem){
        this.arr = arr;
        this.elem = elem;
        this.key = key;
        this.set = this.uniqueValue();
    }
    uniqueValue(){
        return new Set(this.arr.map(d => d[this.key]));
    }
    addOption(pos){
        this.set.forEach(d => pos.insertAdjacentHTML("beforeend",`<option value="${d}">${d}</option>`));
    }
    addMultiColor(pos){
        const colors =["btn-black", "btn-select-blue", "btn-select-orange","btn-select-green", "btn-select-green"]
        console.log(this.arr);
        this.arr.forEach((d,i) => pos.insertAdjacentHTML("beforeend",
        `<${this.elem} class="btn-round ${colors[i]}"> ${d}</${this.elem}>`));
    }
}

class handleNav{
    constructor(elem){
        this.elem = elem;
        // 특정 섹션에서 사용되는 셀렉트 요소
        this.selectElem = this.getSelect();
        // 모바일 화면에서 사용되는 배경
        this.navBack = this.getNavBack();
    }
    switch(){
        // 선택한 버튼에 해당하는 섹션빼고 나머지 섹션 숨기기
        document.querySelectorAll("section").forEach(d => d.classList.add("dp-none"));
        document.getElementById(this.elem.title).classList.remove("dp-none");
        // 특정 섹션에서 사용되는 셀렉트 요소 노출
        this.selectElem.forEach(d => {
            if(d.name === this.elem.title){d.classList.remove("dp-none");}
            else{d.classList.add("dp-none");}
        });
        return this;
    }
    getSelect(){
        return Array.from(document.getElementsByTagName("select"));
    }
    getNavBack(){
        return document.querySelector(".nav-back");
    }
    navToggle(){
        this.navBack.classList.toggle("display");
        this.navBack.classList.toggle("opacity_1");
        return this;
    }
}


class CtrJson{
    constructor(arr, key, add){
        this.arr = arr;
        this.key = key;
        this.add = add;
        this.set = this.newSet();
    }
    newSet(){
        return Array.from(new Set(this.arr)).sort();
    }
    setArr(){
        return Array.from(new Set(this.arr.map(d => d[this.key]))).sort();
    }
    mapArr(){
        return this.arr.map(d => d[this.Key]);
    }
    filteredGroup(){
        let data = []
        this.add.forEach(d => {
            data.push(this.arr.filter(v => v[this.key] == d));
        });
        return data;
    }
    mergeData(){
    }
}


class CtrHtml{
    constructor(content, key, elem){
        this.content = content;
        this.key = key;
        this.elem = elem;
    }
    insert(){
        this.elem.insertAdjacentHTML("beforeend", this.content);
    }
    create(){
        const element = document.createElement(this.key);
        element.classList.add(...this.content);
        return this.elem.appendChild(element);
    }
    delete(){
        this.content.forEach(d => {
            d.remove();
        });
    }
    pressOneBtn(){
        const items = this.content.parentNode.querySelectorAll(this.elem);
        items.forEach(d => d.classList.remove(this.key));
        this.content.classList.toggle(this.key);

    }
    subtractHide(){ // 나머지 숨기기
        const items = this.content[0].parentNode.querySelectorAll(this.elem);
        items.forEach(d => d.classList.add(this.key));
        this.content.forEach(d => d.classList.remove(this.key));
    }
    getInputValues(){
        let data =[];
        this.content.forEach(d => {
            data.push(this.elem.querySelector(`input[name = "${d[this.key]}"]`).value);
        });
        return data;
    }
}


class CreateHtml{
    constructor(item, key, elem){
        this.item = item;
        this.key = key;
        this.elem = elem;
        this.Set = this.uniqueValue();
    }
    pic(){
        data = `<div class="${this.elem}" 
        style="background-image:url('${this.item}');"></div>`
        return  data;
    }
    desc(){
        const data = document.createElement("div");
        data.classList.add(...this.elem);
        this.item.forEach(d => {
            const content=`<span class="${key}">${d}</span>`;
            data.insertAdjacentHTML("beforeend", content);    
        });
        return data;
    }
    createElem(){
        const data = document.createElement(this.key);
        data.classList.add(this.item);
        this.elem.forEach(d => {
            data.dataset[d] = d;
        });
        return data;
    }  
    createOptions(){
        this.item.forEach(v => {
            const option = `<option value="${v}">${v}</option>`;
            this.elem.insertAdjacentHTML("beforeend", option);
        });
    }
}

class CtrData{
    constructor(content, Key, elem){
        this.content = content;
        this.Key = Key;
        this.elem = elem;
    }
    setArr(){
        return Array.from(new Set(this.content.map(d => d[this.Key]))).sort();
    }
    mapArr(){
        return this.content.map(d => d[this.Key]);
    }
    filteredGroup(){
        let data = [];
        this.elem.forEach(d => {
            data.push(this.content.filter(v => v[this.Key] == d));
        });
        return data;
    }
    getPercent(){
        let data = [];
        this.content.forEach(d => {
            data.push( Math.round(Number(d) / Number(this.Key) * 100));
        })
        return data;
    }
    sumNum(){
            return this.content.reduce((a, b) => Number(a) + Number(b), 0);
    }
    mltplNum(){
        let data = [];
            this.content.forEach((d, i) => {
                data.push(Number(d) * Number(this.Key[i]));
            });
            return data;
    }
    reduceExpense(){
    }
    addExpense(){
        let data = {
            expense : this.content.expense + this.key,
            income : this.content.income - this.key,
            profit : this.content.profit - this.key,
        }
        return data;
    }
}

class TempMark{
    constructor(mark){
        this.mark = mark;
        this.sub = ["국어", "윤리와사상", "생활과윤리","한국지리","세계지리","동아시아사","세계사","정치와법","사회문화","수학","한국사"];
        this.allMark = Object.entries(this.allSub("mark"));
        this.allPercent = Object.entries(this.allSub("percent"));

    }
    markAvrg(key,item){
        const data = this.mark.filter(d => d.subject === key).map(v => v[item]);
        let markNum =[];

        for (let i = 0; i < data[0].length; i++) {
         markNum.push(data.map(d => d[i])
            .reduce((a,b) => a + b)/data.length
            );
        }
        const result = markNum.map(d => d.toFixed(2));
        return result;
    }
    allSub(item){
        let data= {};
        this.sub.forEach(d => {
            data[d] = this.markAvrg(d,item );
        });
        return data;
    }
    getIntervalNum(item){
        const arr = item[0][1];
        let data = [];

        arr.forEach((d,i,a) => {
            const num = d - a[i+1];
            if (i === 0){
                const firstNum = 100 - d;
                data.push(firstNum.toFixed(0));
            }
            if (!isNaN(num)){
                data.push(num.toFixed(0));   
            }else{
                data.push(d);
            }
        });

        console.group("원점수, 점수간 차이");
        console.log(arr);
        console.log(data);
        console.groupEnd("원점수, 점수간 차이");

        return data;
    }
    getGapNum(num, per){
        const refNum = num;
        const spreadNum = per;
        
        refNum.forEach((d, i) => {
            
        });

        console.log(num);
        console.log(per);
    }
}   
