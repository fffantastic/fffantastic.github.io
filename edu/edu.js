const parts = document.querySelector(".js-names"),
    imgs = document.querySelector(".js-img-all"),
    adjusts = document.querySelector(".js-adjusts"),
    subTitle = document.querySelector(".js-subtitle"),
    btn = document.querySelector(".js-button"),
    modalBack = document.querySelector(".js-modal"),
    modal = document.querySelector(".js-data"),
    more = document.querySelector(".js-more"),
    expBox = document.querySelector(".js-exp-box"),
    imgCache = document.querySelector(".js-img-cache");




// 셀렉트에 목록 출력
const filterPart = edu.map(d=> d.part);
const filterSet = new Set(filterPart);
filterSet.forEach(v => {
    const option = `<option>${v}</option>`;
    parts.insertAdjacentHTML("beforeend", option);
});

// 셀렉트 박스에서 항목을 선택할 때마다
parts.addEventListener("change", (e) => {
    let selectedValue = e.target.value;
    
    const partName = new Set(edu.map(d=> d.part));
    const partList = Array.from(partName);

    switch (selectedValue) {
        case partList[0]:
            subTitle.classList.remove("view");
            expBox.classList.add("bottom");
            break;
        default :
            subTitle.classList.add("view");
            expBox.classList.remove("bottom");
            break;
    }
    // 스탠다드 구성 수업작
    let result = edu.filter(d => d.part == selectedValue && d.role == 0);
    // 보충이 필요한 수업작
    let result2 = edu.filter(d =>d.part == selectedValue && d.role == 1);
    // 스탠다드 구성 설명 데이터
    let result3 = edu.filter(d =>d.part == selectedValue && d.role == 2);
    
    deleteTags(".edu-pics");
    deleteTags(".edu-btn");

    createBtn(result3, btn);
    // 이미지배열, 위치, 캐시위치, 그룹클래스, 개별클래스
    imgListUp(result, imgs, imgCache, "edu-pics", "edu-pic");
    imgListUp(result2, adjusts, imgCache, "edu-pics","edu-pic");
});

// 이미지를 클릭하면 컴포지션 구조 표시
imgs.addEventListener("click", (e) => {
    if (e.target!= imgs){
        replacecImg(edu, e.target);
    }
}); 
// 이미지를 클릭하면 컴포지션 구조 표시
adjusts.addEventListener("click", (e) => {
    if (e.target!= adjusts){
        replacecImg(edu, e.target);
    }
}); 

// 모달창
btn.addEventListener("click", (e) =>{
    if(e.target != btn) {
        deleteTags(".edu-explain");
        deleteTags(".exp-pic");
        const selected = e.target;

        const body = document.querySelector("body");
        body.classList.add("not-scroll");
        
        // const colors = edu.filter(d => d.part == selectedValue && d.role == 0);
        const result = edu.filter(d => d.id == selected.dataset.id);
        const data = edu.filter(d => d.part == selected.dataset.part);
        const colorList = data.map(d => d.color);
        
        const content =
        `<div class="edu-explain">
        <span class="modal-close">×</span>
        <div class="text-head">${result[0].name}</div>
        <div class="text-head text-explain">${result[0].explain}</div>
        </div>`;        

        modalBack.classList.toggle("view");
        colorList.forEach(v => modalBack.classList.remove(v) );
        modalBack.classList.add(result[0].color);
        modal.insertAdjacentHTML("afterbegin", content);

        result[0].decodeImg.forEach(d => {
            const imgDiv =
            `<img class="exp-pic" src="${d}"/>`;
             more.insertAdjacentHTML("beforeend", imgDiv);
        });
    } 
});

// 모달창 닫기
modalBack.addEventListener("click",() => {
    modalBack.classList.toggle("view");
    const body = document.querySelector("body");
    body.classList.remove("not-scroll");
});


// 이미지 바꾸기
function replacecImg(arr, target) {
    const selectOne = target;
    const result = arr.filter(d => d.id == selectOne.dataset.id);
    const imgStyle = selectOne.style.backgroundImage;

    const original = `url("${result[0].img}")`;
    const replace = `url("${result[0].decodeImg}")`;

    switch (imgStyle) {
        case original :
            selectOne.style.backgroundImage = replace;
            break;
        case replace :
            selectOne.style.backgroundImage = original;
            break;
    }
}
// 이미지 생성
function imgListUp(arr, pos, pos2, groupClass, itemClass) {
    arr.forEach(v => {
        const imgDiv =
        `<div class="${groupClass}">
        <div class="${itemClass}" data-id="${v.id}"
        style="background-image:url('${v.img}');"></div></div>`
        pos.insertAdjacentHTML("beforeend", imgDiv);

        const preLoad =
        `<img src="${v.decodeImg}"/>`
        pos2.insertAdjacentHTML("beforeend", preLoad);
    });
}
// 버튼 생성
function createBtn(arr,pos) {
    arr.forEach(v => {
        const btnDiv =
        `<button class="fonF edu-btn ${v.color}"
        data-id="${v.id}" data-part="${v.part}">
        ${v.name}</button>`;
        pos.insertAdjacentHTML("beforeend", btnDiv);
    });
}
// 데이터 비우기
function deleteTags(tags) {
    let check = document.querySelectorAll(tags)
    if (check) {
        check.forEach(v => v.remove());
    }
}

