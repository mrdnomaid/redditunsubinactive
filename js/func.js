let subsToUnsub = []; // Array of subreddits to "unsub" from
let days = 3; // Default amount of days threshhold

// Change the status message in step 2
function s(statusMsg) {
  document.getElementById('currently').innerHTML = statusMsg;
  //console.info(statusMsg);
}

// Show a step (or anything really)
function show(id) {
  document.getElementById(id).style.display = 'block';
}

// Fade out and collapse a step
function fade(id) {
  document.getElementById(id).style['opacity'] = '0.5';
  document.getElementById(id).style['height'] = '32px';
  document.getElementById(id).style['overflow'] = 'hidden';
}

// Generate code for user to paste in console on Reddit
function calcCode() {
  // let codeString = '';
  // let i = 0;
  // for(stu of subsToUnsub) {
  //   i++;
  //   codeString += `window.setTimeout(function(){document.querySelector('[data-sr_name="${stu.subreddit}"]').children[0].click();console.info('Tried to unsubscribe from ${stu.subreddit} (${i+1}/${subsToUnsub.length})')},${i*1000});`;
  // }

  //
  // Improved code courtesy of Leo [thelmgn.com](/u/LMGN)
  //

  let unsubString;
  let comma = false;
  for(stu of subsToUnsub) {
    if(comma) unsubString += ',';
    unsubString += `'${stu.subreddit}'`;

    comma = true;
  }

  let codeString = `
    let toUnsub = [${unsubString.replace(/undefined/g, '')}];
    const len = toUnsub.length;
    setInterval(function() {
      let a = toUnsub.pop();
      console.info(\`Attempting to unsubscribe from \$\{a\}\`);
      let e = document.querySelector(\`[data-sr_name='\$\{a\}']\`).querySelector('.remove');
      e.click();
      if (toUnsub.length == 0) {
          alert(\`Unsubscribed from all \$\{len\} subreddits\`);
          window.location.reload();
      }
    }, 500);
  `;

  document.getElementById('unsubCode').value = codeString.replace(/\n/g,'');
}

// Show the Firefox warning if the user is using Firefox
if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    show('firefox');
}
