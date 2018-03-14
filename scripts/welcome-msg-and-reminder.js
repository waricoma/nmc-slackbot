'use strict';

function numericZentohan(data) {
  data += '';
  var table = {
    "０":0,
    "１":1,
    "２":2,
    "３":3,
    "４":4,
    "５":5,
    "６":6,
    "７":7,
    "８":8,
    "９":9
  };

  while(data.match(/[０-９]/)){
    for(n in table){
      data = data.replace(n, table[n]);
    }
  }

  return data;
}

let LOOP = null;

module.exports = (robot) => {

  robot.hear(/NMCBOT_LOOP_SETTING>/i, (msg) => {
    const USERNAME     = msg.message.user.name;
    const MESSAGE_TEXT = msg.message.text;
    if ( USERNAME == "panda" ) {
      const INFORMATION_TEXT = MESSAGE_TEXT.replace( "NMCBOT_LOOP_SETTING>" , "" );
      if ( INFORMATION_TEXT.indexOf( ":" ) == -1 ){
        msg.send("時間と内容を「:」で分けて！\nそれか半角にしてね！");
      } else {
        const INFORMATION_TEXT_ARRAY = INFORMATION_TEXT.split(":");
        if (isFinite( numericZentohan(INFORMATION_TEXT_ARRAY[0].trim()) )){
          const LOOP_TIME                        = parseInt(INFORMATION_TEXT_ARRAY[0]);
          let   INFORMATION_TEXT_ARRAY_FOR_SHIFT = INFORMATION_TEXT_ARRAY;
          INFORMATION_TEXT_ARRAY_FOR_SHIFT.shift();
          const LOOP_MESSAGE                     = INFORMATION_TEXT_ARRAY_FOR_SHIFT.join(":");

          if( LOOP != null ) clearInterval( LOOP );

          LOOP = setInterval(function() {
            msg.send( LOOP_MESSAGE );
          }, LOOP_TIME*3600000);

          msg.send("設定完了しました！");
        } else {
          msg.send("時間指定をちゃんとしてね！")
        }
      }
    } else {
      msg.send("設定したい時は会長に頼んで！");
    }
  });

  robot.enter((msg) => {
    msg.send(`${msg.message.user.profile.display_name}さん！\n N Movie Creatorにようこそ！\n入会はこちらです↓\nhttps://goo.gl/forms/4IxUk6SS07BcksL32\nメンバーの確認はこちらです↓\nhttps://goo.gl/G6HdNH\n\n@panda が会長ですので\n何かあれば連絡お願いします！`);
  });

}
