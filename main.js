const total = {
  sha: 15, shan: 7, jiu: 2, yao: 3,
  fhly: 2, wjqf: 1, jd: 2, jdsr: 1,
  fdcx: 3, tnqw: 2, wgfd: 1, wzsy: 1, wxkj: 2, hdwl: 1, spl: 1, blcd: 1,
  hf: 1, xhf: 1, lld: 1, lyq: 1, blc: 1, jgm: 1, fym: 1, yry: 1, qkd: 1
};
const using = {
  sha: 0, shan: 0, jiu: 0, yao: 0,
  fhly: 0, wjqf: 0, wgfd: 0, fdcx: 0, tnqw: 0, wzsy: 0, jdsr: 0, jd: 0, wxkj: 0, hdwl: 0, spl: 0, blcd: 0,
  hf: 0, xhf: 0, lld: 0, lyq: 0, blc: 0, jgm: 0, fym: 0, yry: 0, qkd: 0
};
const used = {
  sha: 0, shan: 0, jiu: 0, yao: 0,
  fhly: 0, wjqf: 0, wgfd: 0, fdcx: 0, tnqw: 0, wzsy: 0, jdsr: 0, jd: 0, wxkj: 0, hdwl: 0, spl: 0, blcd: 0,
  hf: 0, xhf: 0, lld: 0, lyq: 0, blc: 0, jgm: 0, fym: 0, yry: 0, qkd: 0
};
const used_cards = [];
const using_cards = [];
const PREFIX = 'https://fe-1255520126.file.myqcloud.com/tool/yxs/img/';
function html_init() {
  const main = document.getElementById('main');
  const used = document.getElementById('used');
  main.ondragover = function(e) {e.preventDefault();};
  main.ondrop = function(e) {
    e.preventDefault();
    const guid = e.dataTransfer.getData("Text");
    if (guid.length < 6) return;
    const card = document.getElementById(guid).getAttribute('name');
    if (card.substr(0,5) === 'using') {
      update(card.substr(6), 'using', -1, guid);
    } else if (card.substr(0,4) === 'used') {
      update(card.substr(5), 'used', -1, guid);
    }
  };
  used.ondragover = function(e) {e.preventDefault();};
  used.ondrop = function(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("Text");
    if (data.length < 6) {
      update(data, 'used', 1);
    } else {
      const card = document.getElementById(data).getAttribute('name');
      if (card.substr(0,5) === 'using') {
        if (! update(card.substr(6), 'using', -1, data)) update(card.substr(6), 'used', 1);
      }
    }
  };
  for (key in total) {
    const key2 = key;
    const dcard = document.createElement('div');
    dcard.className = 'dcard';
    const dimg = document.createElement('div');
    dimg.className = 'dimg';
    const img = document.createElement('img');
    img.alt = key;
    img.style.height = '100%';
    img.src = PREFIX + key + '.jpg';
    img.onclick = function(){update(key2, 'using', 1);};
    img.oncontextmenu = function (e) {
      e.preventDefault();
      update(key2, 'used', 1);
    };
    img.ondragstart = function(e) {e.dataTransfer.setData("Text", key2);};
    dimg.appendChild(img);
    dimg.style.textAlign = 'center';
    const dleft = document.createElement('div');
    dleft.className = 'dleft';
    let text = document.createElement('span');
    text.innerHTML = '牌堆剩&nbsp;';
    dleft.appendChild(text);
    const sleft = document.createElement('span');
    const sleft2 = document.createElement('span');
    sleft2.id = key + '_left';
    sleft.style.display = 'flex';
    sleft.style.border = '1px solid';
    sleft.style.flexGrow = '1';
    sleft2.style.width = '0';
    sleft2.style.background = '#98da98';
    sleft.appendChild(sleft2);
    dleft.appendChild(sleft);
    const dusing = document.createElement('div');
    dusing.className = 'dusing';
    text = document.createElement('span');
    text.innerHTML = '场上：';
    dusing.appendChild(text);
    const susing = document.createElement('span');
    susing.id = key + '_using';
    dusing.appendChild(susing);
    const susing2 = document.createElement('span');
    susing2.className = 'sbtn';
    const btn1 = document.createElement('button');
    btn1.className = 'b1';
    btn1.onclick = function(){update(key2, 'using', 1);};
    btn1.innerHTML = '+1';
    susing2.appendChild(btn1);
    const btn2 = document.createElement('button');
    btn2.className = 'b-1';
    btn2.onclick = function(){update(key2, 'using', -1);};
    btn2.innerHTML = '-1';
    susing2.appendChild(btn2);
    dusing.appendChild(susing2);
    const dused = document.createElement('div');
    dused.className = 'dused';
    text = document.createElement('span');
    text.innerHTML = '弃牌：';
    dused.appendChild(text);
    const sused = document.createElement('span');
    sused.id = key + '_used';
    dused.appendChild(sused);
    const sused2 = document.createElement('span');
    sused2.className = 'sbtn';
    const btn3 = document.createElement('button');
    btn3.className = 'b1';
    btn3.onclick = function(){update(key2, 'used', 1);};
    btn3.innerHTML = '+1';
    sused2.appendChild(btn3);
    const btn4 = document.createElement('button');
    btn4.className = 'b-1';
    btn4.onclick = function(){update(key2, 'used', -1);};
    btn4.innerHTML = '-1';
    sused2.appendChild(btn4);
    dused.appendChild(sused2);
    dcard.appendChild(dimg);
    dcard.appendChild(dleft);
    dcard.appendChild(dusing);
    dcard.appendChild(dused);
    dcard.id = 'main_' + key;
    main.appendChild(dcard);
  }
}
function update_all() {
  for (let key in total) {
    update_one(key);
  }
  update_total_left();
}
function btn_init() {
  for (key in using) {
    using[key] = 0;
    used[key] = 0;
  }
  using_cards.splice(0);
  used_cards.splice(0);
  document.getElementById('using').innerHTML = '<div style="margin-left: 5px">场<br/>上<br/>的<br/>牌</div>';
  document.getElementById('used').innerHTML = '';
  update_all();
}
function btn_refresh() {
  for (key in using) {
    used[key] = 0;
  }
  used_cards.splice(0);
  document.getElementById('used').innerHTML = '';
  update_all();
}
function update_total_left() {
  document.getElementById('total_left').innerHTML = 54 - used_cards.length - using_cards.length;
}
function update_one(card) {
  const left = total[card] - using[card] - used[card];
  document.getElementById(card + '_left').innerHTML = left;
  document.getElementById(card + '_left').style.width = ((total[card] - using[card] - used[card]) / total[card] * 100) + '%';
  const eusing = document.getElementById(card + '_using');
  eusing.innerHTML = using[card];
  if (using[card] > 0) {
    eusing.style.color = 'red';
    eusing.previousSibling.style.background = '#e0be5e';
  } else {
    eusing.style.color = 'initial';
    eusing.previousSibling.style.background = null;
  }
  document.getElementById(card + '_used').innerHTML = used[card];
  if (left === 0) {
    document.getElementById('main_' + card).style.opacity = '0.5';
  } else {
    document.getElementById('main_' + card).style.opacity = '1';
  }
}
function add_one_using(card) {
  using_cards.push(card);
  const eusing = document.getElementById('using');
  const div = document.createElement('div');
  const img = document.createElement('img');
  const guid = new Date().valueOf().toString();
  img.src = PREFIX + card + '.jpg';
  img.style.height = '100%';
  img.alt = card;
  img.draggable = false;
  img.onclick = function() {
    if (! update(card, 'using', -1, guid)) update(card, 'used', 1);
  };
  img.oncontextmenu = function(e) {
    e.preventDefault();
    update(card, 'using', -1, guid);
  };
  div.className = 'using-dimg';
  div.draggable = true;
  div.setAttribute('name', 'using_' + card);
  div.id = guid;
  div.appendChild(img);
  div.ondragstart = function(e) {e.dataTransfer.setData("Text", e.target.id);};
  div.ondragover = function(e) {e.preventDefault();};
  div.ondrop = function(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("Text");
    if (data.length < 6) return;
    const src = document.getElementById(data);
    if (src.getAttribute('name').substr(0, 4) === 'used') return;
    const dst = e.target.parentNode;
    if (src.offsetLeft < dst.offsetLeft) {
      dst.parentNode.insertBefore(src, dst);
    } else if (src.offsetLeft > dst.offsetLeft) {
      dst.parentNode.insertBefore(src, dst.nextElementSibling);
    }
  };
  eusing.insertBefore(div, eusing.firstChild.nextSibling.nextSibling);
}
function del_one_using(index, guid=null) {
  if (guid === null) {
    document.getElementsByName('using_' + using_cards[index])[0].remove();
  } else {
    document.getElementById(guid).remove();
  }
  using_cards.splice(index, 1);
}
function add_one_used(card) {
  used_cards.push(card);
  const eusing = document.getElementById('used');
  const div = document.createElement('div');
  const a = document.createElement('a');
  const img = document.createElement('img');
  const guid = new Date().valueOf().toString();
  img.src = PREFIX + card + '.jpg';
  img.style.height = '100%';
  img.alt = card;
  img.ondragstart = function(e) {e.dataTransfer.setData("Text", e.target.parentNode.parentNode.id);};
  a.onclick = function(){
    if (! update(card, 'used', -1, guid)) update(card, 'using', 1);
  };
  a.appendChild(img);
  div.className = 'used-dimg';
  div.setAttribute('name', 'used_' + card);
  div.id = guid;
  div.appendChild(a);
  eusing.appendChild(div);
}
function del_one_used(index, guid=null) {
  if (guid === null) {
    document.getElementsByName('used_' + used_cards[index])[0].remove();
  } else {
    document.getElementById(guid).remove();
  }
  used_cards.splice(index, 1);
}
function update(card, kind, delta, guid=null) {
  if (kind === 'using' && using[card] + delta >= 0 && using[card] + delta <= total[card] && total[card] - using[card] - used[card] - delta >= 0) {
    using[card] += delta;
    if (delta > 0) {
      add_one_using(card);
    } else {
      del_one_using(using_cards.indexOf(card), guid);
    }
  } else if (kind === 'used' && used[card] + delta >= 0 && used[card] + delta <= total[card] && total[card] - using[card] - used[card] - delta >= 0) {
    used[card] += delta;
    if (delta > 0) {
      add_one_used(card);
    } else {
      del_one_used(used_cards.indexOf(card), guid);
    }
  } else {
    return true;
  }
  update_one(card);
  update_total_left();
  return false;
}
html_init();
update_all();