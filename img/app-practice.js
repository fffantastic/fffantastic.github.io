const selectStudentClass= document.querySelector("#select--class"),
    navBar= document.querySelector("#nav--bar"),
    modal= document.querySelector(".mo--dal"),
    wrap= document.querySelector("#wrap");

main();



function main(){
    const selectUnivList= document.querySelector("#select--univ");
    // 각각의 셀렉트에  옵션 추가

    new HandleCompo(univSkill, "name").addOption(selectUnivList);
    // nav 핸들링

    // 셀렉스 메뉴 핸들링
    selectUnivList.addEventListener("change", e => {
        const univImgs= document.querySelector("#univ--img"),
            univContents= univImgs.querySelector(".con--tents"),
            univFilter= univImgs.querySelector("#univ--filter");

        deleteTags(univImgs, ".contents--tag",".contents--img", ".btn-round");

        if (e.target.value !== selectUnivList.options[0].value){

            const mainImg = univImg.filter(d => d.name == e.target.value),
                univFeat = univSkill.filter(d => d.name == e.target.value),
                allImg = univImgList.filter(d => d.name == e.target.value).reverse();

            createTag(univFeat[0].feat, univContents);

            const imgGroupDiv= document.createElement("div");
            imgGroupDiv.classList.add("box", "flex_20", "contents--img");
            univContents.appendChild(imgGroupDiv)
            createUnivImg(allImg, imgGroupDiv);

            createBtns(allImg, univFilter, ["year", "time", "depart"]);
        }
    });

}

wrap.addEventListener("click", e => {
    // 이미지 모달
    if(e.target.classList.contains("img")){
        createImgModal(e.target);
    }
    // 버튼 필터링
    else if(e.target.tagName === "BUTTON" && e.target.classList.contains("btn-filter")){
        const sectionId= e.target.parentNode.parentNode.id,
            onDisplaySection= document.getElementById(sectionId);
        filterImg(e.target, onDisplaySection);
    }
});

// 모달창 닫기
modal.addEventListener("click", e => {
    deleteTags(modal, ".modal--content");
    modal.classList.toggle("dp-none");
    document.body.classList.remove("overFlowHidden");
});


// 버튼의 타입을 나누고, 타입과 버튼의 텍스트가 일치하는 이미지를 찾는다.
function filterImg(target, section){
    const imgs = new HandleContent(section,"img--card"),
        btns = new HandleBtn(target, "btn-select-blue");
    btns.select();

    const btnSet= Array.from(new Set(btns.getValue())),
        btnText = btns.getText();
    imgs.hide();

    const filtered1 = imgs.content.filter(d => btnText.includes(d.dataset[btnSet[0]]));
    const filtered2 = filtered1.filter(d => btnText.includes(d.dataset[btnSet[1]]));
    const filtered3 = filtered2.filter(d => btnText.includes(d.dataset[btnSet[2]]));

    // 필터링된 배열을 그룹으로 묶고, btnSet의 개수가 그룹의 인덱스 역할을 함
    const arrData = [imgs.content, filtered1, filtered2, filtered3];
    arrData[btnSet.length].forEach(d => d.classList.remove("dp-none"));
}

// 데이터 비우기
function deleteTags(parent, ...tags) {
    const items = parent.querySelectorAll(tags)
    if (items) {items.forEach(v => v.remove());}
}



function createUnivImg(arr, pos) {
    arr.forEach( v => {
        let addClass;
        if(v.oneart){
            addClass = "img-oneart";
        }
        const imgDiv =
        `<div class="img--card flex_15" data-year="${v.year}" data-depart="${v.depart}" data-time="${v.time}" data-name="${v.name}">
        <div class="img ${addClass}" style="background-image:url('${v.img}');"></div>
        <div class="box btwn font_12 margin_3 grey_50">
          <span>${v.depart}</span>
          <span>${v.time}</span>
          <span>${v.index}</span>
          <span>${v.year}</span>
        </div>`;
        pos.insertAdjacentHTML("beforeend", imgDiv);
    });
}


function createTag(arr, pos) {
    const groupDiv = document.createElement("div");
    groupDiv.classList.add("box", "alignTop", "flex_20", "contents--tag");
    arr.forEach(v => {
        const tagDiv =
        `<span class="univ--tag btn-rectangle btn-select-black">${v}</span>`;
        groupDiv.insertAdjacentHTML("beforeend", tagDiv);
    });
    pos.appendChild(groupDiv);
}

function createBtns(arr, pos, keyword){
    keyword.forEach(d =>{
        const items = new CtrJson(arr, d).setArr();
        if(items.length != 1){
            items.forEach(v => pos.appendChild(new HandleBtn(v,0).setValue(d).addClass("btn-filter").button));
        }
    });
}

function createImgModal(target){
    const data = target.attributes.style.textContent; 
    const content = 
    `<div class="modal--content box alignTop btwn">
        <div class="modalClose"></div>
        <div class="modalImg flex_80" style="${data}"></div>
    </div>`
    modal.insertAdjacentHTML("afterbegin", content);
    modal.classList.toggle("dp-none");
    document.body.classList.add("overFlowHidden");
}
