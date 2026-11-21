(function(V){
const W=560,H=440;
function painter(canvas,scene,variant,time=0){
const c=canvas.getContext('2d');c.clearRect(0,0,W,H);
function poly(points,fill,stroke){c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1;c.stroke();}}
function rect(x,y,w,h,col){c.fillStyle=col;c.fillRect(x,y,w,h);}
function line(x,y,a,b,col,width=1){c.beginPath();c.moveTo(x,y);c.lineTo(a,b);c.strokeStyle=col;c.lineWidth=width;c.stroke();}
function oval(x,y,rx,ry,col){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=col;c.fill();}
function glow(x,y,r,col){let g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'transparent');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
function gull(x,y,s=1){c.beginPath();c.moveTo(x-9*s,y+2*s);c.quadraticCurveTo(x-5*s,y-5*s,x,y);c.quadraticCurveTo(x+5*s,y-5*s,x+10*s,y+1*s);c.strokeStyle='#f7ebd0';c.lineWidth=2*s;c.stroke();}
function star(x,y,col,size=11){let p=[];for(let i=0;i<10;i++){let a=i*Math.PI/5-Math.PI/2,r=i%2?size*.4:size;p.push([x+Math.cos(a)*r,y+Math.sin(a)*r]);}poly(p,col,'#a67664');oval(x-1,y-2,2,2,'#f5d4aa');}
function barrel(x,y){oval(x,y+19,18,6,'#183b3c55');rect(x-15,y-18,30,34,'#976b48');oval(x,y-18,15,5,'#be9364');poly([[x+7,y-17],[x+15,y-18],[x+15,y+16],[x+7,y+17]],'#6b503c');for(let a of [-9,9]){line(x-15,y+a,x+15,y+a,'#4a5754',3);}line(x-5,y-15,x-5,y+15,'#d5ad75');}
function lamp(x,y,lit){line(x,y-20,x,y-10,'#344d4c',3);if(lit)glow(x,y,36,'#ffdf9477');poly([[x-9,y-9],[x+9,y-9],[x+7,y+10],[x-7,y+10]],lit?'#f9cf79':'#697e78','#344b4b');rect(x-11,y-12,22,4,'#354e4a');line(x,y-8,x,y+9,'#b9a678');}
function crab(x,y){oval(x,y,7,4,'#b16f5d');for(let k of [-1,1]){line(x+k*5,y,x+k*11,y+5,'#a65c50',2);line(x+k*5,y-2,x+k*11,y-7,'#a65c50',2);oval(x+k*11,y-8,3,3,'#d18a6e');}}
function window(x,y,lit=false){rect(x-15,y-19,30,38,'#f0cf98');rect(x-12,y-16,24,32,lit?'#f3bc62':'#416571');rect(x+2,y-16,10,32,lit?'#e2a157':'#2d4b58');line(x,y-16,x,y+16,'#d1b78d',3);line(x-12,y,x+12,y,'#d1b78d',3);rect(x-18,y+18,36,4,'#8f7e65');if(lit)glow(x,y,28,'#f9ca5e33');}
function house(o,i){let {x,y,w,h}=o;oval(x+w*.5,y+h+3,w*.6,9,'#183f4350');rect(x,y,w,h,scene.wall);let wash=c.createLinearGradient(x,y,x+w,y);wash.addColorStop(0,'#fff0cf1c');wash.addColorStop(.58,'#fff0cf08');wash.addColorStop(1,'#173e4828');rect(x,y,w,h,wash);rect(x+w*.73,y,w*.27,h,'#a58d76');line(x+4,y+7,x+w*.7,y+7,'#fff0c733',2);poly([[x-10,y+2],[x+w*.47,y-48],[x+w+12,y+2]],scene.roof,'#604f49');poly([[x+w*.47,y-48],[x+w+12,y+2],[x+w*.73,y+2]],'#604e51');for(let j=0;j<5;j++){line(x+7+j*9,y-4-j*8,x+w-8-j*5,y-4-j*8,'#dfb28e44',2);}rect(x+15,y-39,12,31,'#98735d');rect(x+12,y-42,18,5,'#b49a7b');for(let k=0;k<8;k++){line(x+5,y+12+k*13,x+w*.7,y+12+k*13,'#f7dfa327');}if(scene.kind!==2){window(x+w*.31,y+43);if(i!==3||scene.kind!==0)window(x+w*.7,y+43);rect(x+w*.4,y+h-53,24,53,'#4b6665');rect(x+w*.44,y+h-49,3,46,'#809088');oval(x+w*.6,y+h-26,2,2,'#cfb575');}}
let sky=c.createLinearGradient(0,0,0,260);scene.sky.forEach((v,i)=>sky.addColorStop(i/2,v));rect(0,0,W,270,sky);glow(419,91,106,'#ffe0ab55');oval(419,91,25,25,'#f8deacb0');
// Wisps are built from translucent strokes rather than hard cloud silhouettes.
for(let j=0;j<16;j++){let x=(j*97)%620-30,y=30+(j*31)%136;line(x,y,x+80+(j%3)*20,y-3,'#f9e3c025',7);line(x+12,y+6,x+91,y+4,'#f9e3c018',4);}
poly([[0,235],[35,208],[75,215],[116,188],[152,216],[187,206],[232,233],[283,214],[326,235],[371,203],[432,211],[482,187],[560,214],[560,280],[0,280]],'#647f8155');
let sea=c.createLinearGradient(0,250,0,H);sea.addColorStop(0,scene.water[0]);sea.addColorStop(1,scene.water[1]);rect(0,252,W,188,sea);
for(let j=0;j<110;j++){let x=(j*79.7)%560,y=267+(j*31.3)%173,l=7+(j%8)*5;line(x+Math.sin(time*.5+j)*2,y,x+l,y,'#b5d6c1'+(j%3===0?'55':'24'),1+(j%2));}
for(let j=0;j<26;j++)line(390-j*2+Math.sin(j*7)*18,270+j*5,438+j*2+Math.cos(j)*15,270+j*5,'#eec69a26',2);
if(scene.kind===0){poly([[0,309],[101,297],[220,318],[326,301],[560,320],[560,354],[0,345]],'#b7a184');rect(0,333,560,13,'#877b66');for(let j=0;j<20;j++)line(j*32,335,j*32+3,348,'#4a6059');}
if(scene.kind===1){poly([[0,310],[560,310],[560,440],[0,440]],'#a68c7c');for(let j=0;j<16;j++){line(0,330+j*10,560,330+j*10,'#e1bf971c',2);for(let k=0;k<12;k++)line(k*51+(j%2)*22,330+j*10,k*51+6+(j%2)*22,340+j*10,'#5e66613a');}}
if(scene.kind===2){poly([[0,336],[75,314],[138,308],[181,322],[383,315],[448,334],[560,325],[560,371],[0,386]],'#929d7b');for(let j=0;j<30;j++){let x=(j*47)%560,y=329+(j*17)%40;line(x,y,x+5,y-12,'#6a8268',2);}for(let j=0;j<13;j++){let x=(j*113)%560,y=372+(j*23)%68;oval(x,y,24+j%4*3,10,'#344f5777');oval(x-3,y-3,19,8,'#8d9b8e');line(x-14,y-5,x+7,y-7,'#c7c5a0',2);}}
if(scene.kind===2){
// A little moored skiff breaks the open waterline; its reflection ties it to the tide.
oval(462,307,24,4,'#183f4355');poly([[438,294],[482,294],[474,303],[446,303]],'#496c6d','#3c5554');line(442,293,478,293,'#d2bb8e',2);line(459,264,459,293,'#725f4e',2);poly([[457,267],[442,289],[457,289]],'#e7d6b2');poly([[462,273],[477,289],[462,289]],'#c6c5a5');line(459,302,459,309,'#e2c99755',2);
for(let j=0;j<12;j++){let x=22+j*46,y=346+(j%3)*12;oval(x,y,5+(j%3),2,'#687d70');line(x-3,y-2,x+2,y-3,'#d0c19b',1);}
for(let j=0;j<18;j++){let x=(j*61+18)%550,y=354+(j*19)%31;line(x,y,x+2,y-7-(j%4),'#637c66aa',1);}
gull(168,70,.7);gull(425,87,.8);
}
scene.objects.forEach(house);
// Repeated details give the town a lived-in, hand-painted rhythm.
if(scene.kind===0){
window(463,234,variant);lamp(76,251,!variant);
rect(201,125,3,62,'#675e50');poly([[204,131],[224,136],[204,155]],'#e1c283');if(!variant)for(let j=0;j<3;j++)line(205,136+j*5,218-j*4,139+j*5,'#a95b50',2);
rect(330,252,7,86,'#5c6a5f');line(333,257,369,268,'#5c6a5f',4);lamp(367,278,true);
for(let i=0;i<(variant?2:3);i++){let x=128+i*22,y=339+(i%2)*8;rect(x,y,21,21,'#a97d50');rect(x+15,y,6,21,'#805d40');line(x+2,y+2,x+18,y+18,'#d4ae75',2);line(x+18,y+2,x+2,y+18,'#d4ae75',2);}
// Mooring posts, ropes and a small fishing skiff.
for(let x of [24,223,522]){rect(x,324,8,42,'#6f6651');oval(x+4,325,6,3,'#c0a47b');}line(24,340,223,352,'#d0b88a',2);line(223,352,522,342,'#d0b88a',2);
poly([[238,349],[333,349],[316,371],[260,371]],variant?'#3c8883':'#a95345','#3d5553');line(246,350,327,350,'#e1c7a0',4);poly([[260,354],[314,354],[307,362],[267,362]],'#344c4b');rect(281,292,3,58,'#755f49');poly([[279,298],[249,342],[279,342]],'#ead7ac');poly([[286,308],[308,342],[286,342]],'#c4bd9a');
if(!variant){oval(384,291,6,6,'#d1af87');rect(378,299,12,21,'#526a72');line(380,319,377,333,'#3d5356',4);line(388,319,391,333,'#3d5356',4);line(386,303,407,310,'#526a72',4);line(405,308,430,278,'#665d4c');oval(384,287,10,3,'#c8b282');}
oval(455,380,11,4,'#173f4e77');oval(455,375,8,10,variant?'#699b74':'#b45d51');rect(453,361,4,7,'#dfd1a7');
let rx=variant?103:72;for(let j=0;j<5;j++){c.beginPath();c.ellipse(rx,378,8+j*2,3+j,0,0,7);c.strokeStyle='#c9ac79';c.lineWidth=2;c.stroke();}if(!variant)star(507,413,'#d09263');
if(!variant)gull(344,91,1.2);
}
if(scene.kind===1){
for(let [x,y,w] of [[26,245,140],[194,269,133],[365,238,161]]){poly([[x-8,y],[x+w+8,y],[x+w,y-24],[x,y-24]],'#e3bc89');for(let j=0;j<7;j++)poly([[x+j*w/7,y-24],[x+(j+.65)*w/7,y-24],[x+(j+.65)*w/7+5,y],[x+j*w/7-5,y]],x===365&&variant?'#6b8d8c':'#a96564');rect(x-6,y,w+12,6,'#655958');line(x,y,x,y+68,'#5d6359',3);line(x+w,y,x+w,y+68,'#5d6359',3);}
rect(99,199,38,35,'#355f64');c.fillStyle='#e9c997';c.font='25px Georgia';c.textAlign='center';if(variant){
  for(let i=-2;i<=2;i++) line(118,224,118+i*4,211+Math.abs(i)*2,'#e9c997',2);
  oval(118,224,7,2,'#e9c997');
} else {
  oval(116,216,8,5,'#e9c997');
  poly([[123,216],[130,211],[130,221]],'#e9c997');
  oval(112,215,1,1,'#355f64');
}
lamp(61,241,true);if(variant){glow(61,241,29,'#ef94b688');rect(55,234,12,15,'#d88d9f');}
line(20,91,540,132,'#4e5d60',2);for(let j=0;j<(variant?4:5);j++){let x=119+j*33,y=99+(x-20)*.079;poly([[x,y],[x+18,y+1],[x+8,y+20]],j%2?'#ceb87d':'#b87873');}
c.beginPath();c.moveTo(9,129);c.quadraticCurveTo(285,199,549,123);c.strokeStyle='#405254';c.lineWidth=2;c.stroke();for(let j=0;j<13;j++){let x=25+j*41,y=129+135*(x/560)*(1-x/560)-6*x/560;glow(x,y+6,17,'#ffcd7a44');oval(x,y+6,3.5,5,j===9&&variant?'#a5c7bf':'#f8c97f');}
for(let x of [57,240,399]){rect(x,301,82,31,'#8e6952');rect(x,299,82,5,'#c9a37a');for(let k=0;k<6;k++)line(x+8+k*13,306,x+8+k*13,330,'#b68b64');}
for(let j=0;j<4;j++){if(j===0&&variant)continue;let x=215+j*14;oval(x,304,6,3,'#4d615d');rect(x-5,292,10,12,'#8aa69c');rect(x-4,288,8,4,'#d6be8a');line(x-3,293,x-3,301,'#d7d4b0',2);}
oval(279,317,22,7,'#d5b189');for(let j=0;j<7;j++)oval(265+(j%4)*9,309-Math.floor(j/4)*7,5,5,variant?'#d39b54':'#af6552');
barrel(441,347);if(variant)barrel(477,344);
if(!variant){oval(345,348,11,6,'#56616a');oval(349,338,6,7,'#59636a');poly([[344,334],[345,326],[350,332],[354,327],[355,337]],'#59636a');c.beginPath();c.moveTo(336,347);c.quadraticCurveTo(320,328,325,326);c.strokeStyle='#59636a';c.lineWidth=4;c.stroke();}
if(!variant)crab(98,398);
}
if(scene.kind===2){
rect(308,142,15,43,'#8f7e73');rect(305,140,21,5,'#c9b79d');if(!variant)for(let j=0;j<5;j++)oval(313+Math.sin(j)*7,130-j*12,9+j*2,9,'#dfd1c14a');
window(207,251);rect(197,235,7,30,variant?'#a993b5':'#a87875');rect(211,235,7,30,variant?'#a993b5':'#a87875');window(333,217);
rect(262,249,41,80,'#587a79');rect(266,253,33,72,'#638785');for(let j=0;j<4;j++)line(267+j*9,254,267+j*9,326,'#9aac912e');oval(294,290,2.5,2.5,'#dfbc7a');if(!variant){c.beginPath();c.arc(282,275,11,0,7);c.strokeStyle='#65835f';c.lineWidth=5;c.stroke();for(let j=0;j<6;j++)oval(282+Math.sin(j)*11,275+Math.cos(j)*11,2,2,'#d1ae80');}lamp(333,263,!variant);
line(393,183,523,199,'#657468',2);for(let j=0;j<4;j++){if(j===1&&variant)continue;let x=402+j*30,y=190+j*3;poly([[x,y],[x+5,y-3],[x+10,y],[x+17,y+3],[x+13,y+12],[x+10,y+9],[x+10,y+26],[x,y+26],[x,y+9],[x-3,y+12],[x-7,y+4]],['#b3b7a4','#b19b8f','#d4caad','#8f9f9a'][j]);}
for(let j=0;j<(variant?1:2);j++){line(377+j*12,324,392+j*12,281,'#b19b78',4);poly([[375+j*12,322],[379+j*12,319],[376+j*12,342],[370+j*12,340]],'#9d8263');}
for(let j=0;j<13;j++){let x=140+(j*13)%39,y=329+(j*17)%19;line(x,y,x,y+10,'#57785d');oval(x,y,3,3,variant?'#b7a2be':'#d4af7a');}
star(93,388,variant?'#a48eaf':'#c78d62',9);crab(variant?470:443,393);
function lighthouse(x,y,s){rect(x-5*s,y-36*s,10*s,36*s,'#d9ceb2');poly([[x-7*s,y-36*s],[x,y-44*s],[x+7*s,y-36*s]],'#776c70');rect(x-4*s,y-34*s,8*s,5*s,'#d3b977');line(x-6*s,y,x+6*s,y,'#81918c',3);}
lighthouse(53,229,1);if(variant)lighthouse(489,186,.65);
}
// Identical ambient birds never create accidental differences.
gull(79+Math.sin(time*.14)*7,74,.8);gull(107+Math.sin(time*.14)*7,83,.6);gull(491,55,.65);
// Deterministic canvas tooth, patina, and vignette.
let seed=431;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
for(let j=0;j<10500;j++){let x=rand()*W,y=rand()*H;c.fillStyle=j%2?'#fff2cb0b':'#142f340a';c.fillRect(x,y,1+rand()*2,1);}
let v=c.createRadialGradient(280,210,110,280,210,360);v.addColorStop(0,'transparent');v.addColorStop(1,'#18323355');rect(0,0,W,H,v);
}
V.paint=painter;
})(Velmaris);
