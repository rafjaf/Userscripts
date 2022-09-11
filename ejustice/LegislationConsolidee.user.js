// ==UserScript==
// @name         Législation consolidée
// @namespace    https://tampermonkey.net/
// @version      0.1-2022-09-11
// @description  Improve Justel
// @author       RJ
// @match        https://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl*
// @match        https://www.ejustice.just.fgov.be/eli/*
// @match        https://www.ejustice.just.fgov.be/loi/loi.htm*
// @run-at       document-start
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js
// @require      https://unpkg.com/jquery-resizable-dom@0.35.0/dist/jquery-resizable.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js
// @require      https://raw.githubusercontent.com/mozilla/localForage/master/dist/localforage.min.js
// @require      https://raw.githubusercontent.com/rafjaf/anchoring.js/master/dist/standalone-anchoring.js
// @require      https://unpkg.com/downloadjs@1.4.7/download.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/dropbox.js/10.32.0/Dropbox-sdk.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fgov.be
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// ==/UserScript==

(async function() {
    'use strict';

    const SAVE_IMG = "data:image/png; base64,"
    + "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ"
    + "bWFnZVJlYWR5ccllPAAAAURJREFUeNqsks1qg0AQx2erIAGhfQPBQIIXb+Kp1wbaS0++VvMWXu0h"
    + "fYAcFPElUvABWu0qfndmm12ag9BI/7Af7Mz+ZnZ2GADco44wo2ma1EojjuNnXF+lXXcc54gDbNsW"
    + "B1EUQZIkczxwXTdijCmITlNRFJBlmXAYxxGapgFGUc+XfN8Xa5qmsNlsoO97BdFlesMwKEBVV8Am"
    + "RDBCMLAsS9jquhZ+2+0WNE2LyKjLS0hVb604xw0BfjKQNv7Foet6YHguAypA13XCn/ac18LpXD7Y"
    + "71+Aaskxs77vLmoiAPRmGYW02z3MFnFtr1VmClCWJeR5DqvVShyapjkLOL2fRPrSVwDatoUwDOGv"
    + "CoLgMgN6v+d5sEQ3ErBU/wP4/QNXA7CjVFMsEf3owTCMx2svYu+8Ydc+EeAWx92C4B8I+PwWYACX"
    + "BK4D+SrWXwAAAABJRU5ErkJggg==";

    const MyCSS = `
    body > table {display: none;}

    div#loading {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }

    @keyframes ldio-zrg2ss6p6ee {
      0% { opacity: 1 }
      100% { opacity: 0 }
    }
    .ldio-zrg2ss6p6ee div {
      left: 94px;
      top: 48px;
      position: absolute;
      animation: ldio-zrg2ss6p6ee linear 1s infinite;
      background: #1d3f72;
      width: 12px;
      height: 24px;
      border-radius: 6px / 12px;
      transform-origin: 6px 52px;
    }.ldio-zrg2ss6p6ee div:nth-child(1) {
      transform: rotate(0deg);
      animation-delay: -0.9166666666666666s;
      background: #1d3f72;
    }.ldio-zrg2ss6p6ee div:nth-child(2) {
      transform: rotate(30deg);
      animation-delay: -0.8333333333333334s;
      background: #1d3f72;
    }.ldio-zrg2ss6p6ee div:nth-child(3) {
      transform: rotate(60deg);
      animation-delay: -0.75s;
      background: #1d3f72;
    }.ldio-zrg2ss6p6ee div:nth-child(4) {
      transform: rotate(90deg);
      animation-delay: -0.6666666666666666s;
      background: #1d3f72;
    }.ldio-zrg2ss6p6ee div:nth-child(5) {
      transform: rotate(120deg);
      animation-delay: -0.5833333333333334s;
      background: #1d3f72;
    }.ldio-zrg2ss6p6ee div:nth-child(6) {
      transform: rotate(150deg);
      animation-delay: -0.5s;
      background: #1d3f72;
    }.ldio-zrg2ss6p6ee div:nth-child(7) {
      transform: rotate(180deg);
      animation-delay: -0.4166666666666667s;
      background: #1d3f72;
    }.ldio-zrg2ss6p6ee div:nth-child(8) {
      transform: rotate(210deg);
      animation-delay: -0.3333333333333333s;
      background: #1d3f72;
    }.ldio-zrg2ss6p6ee div:nth-child(9) {
      transform: rotate(240deg);
      animation-delay: -0.25s;
      background: #1d3f72;
    }.ldio-zrg2ss6p6ee div:nth-child(10) {
      transform: rotate(270deg);
      animation-delay: -0.16666666666666666s;
      background: #1d3f72;
    }.ldio-zrg2ss6p6ee div:nth-child(11) {
      transform: rotate(300deg);
      animation-delay: -0.08333333333333333s;
      background: #1d3f72;
    }.ldio-zrg2ss6p6ee div:nth-child(12) {
      transform: rotate(330deg);
      animation-delay: 0s;
      background: #1d3f72;
    }
    .loadingio-spinner-spinner-is7uuvdj549 {
      width: 200px;
      height: 200px;
      display: inline-block;
      overflow: hidden;
      background: none;
    }
    .ldio-zrg2ss6p6ee {
      width: 100%;
      height: 100%;
      position: relative;
      transform: translateZ(0) scale(1);
      backface-visibility: hidden;
      transform-origin: 0 0; /* see note above */
    }
    .ldio-zrg2ss6p6ee div { box-sizing: content-box; }

    div#main {
        display: flex;
        flex-direction: column;
        width: 99%;
        height: 99%;
    }

    div#info, div#toc, div#content {
        overflow: scroll;
    }

    div#info {
        position: relative;
        flex: 0 0 auto;
        padding-left: 10px;
        width: 100%;
        height: 150px;
    }

    div#info div#addinfodiv {
        margin-top: 10px;
    }

    div#info span {
        margin-left: 20px;
    }

    div#info a {
        cursor: pointer;
    }

    div#info a#btnSavePDF {
        position: relative;
        margin-left: 10px;
        top: 4px;
    }

    div#hsplit {
        flex: 0 0 auto;
        border-bottom: groove;
        cursor: row-resize;
        height: 10px;
    }

    div#maincontent {
        flex: 1 1 auto;
        display: flex;
        flex-direction: row;
        overflow: hidden;
    }

    div#toc {
        position: relative;
        flex: 0 0 auto;
        padding-top: 20px;
        width: 30%;
        height: 100%;
    }
    div#toc div#btndiv {
        margin-bottom: 10px;
    }
    div#toc button {
        margin-left: 20px;
    }

    div#vsplit {
        position: relative;
        flex: 0 0 auto;
        width: 1px;
        height: auto;
        border-right: groove;
        cursor: col-resize;
        width: 10px;
    }

    div#content {
        position: relative;
        flex: 1 1 auto;
        padding-top: 20px;
        padding-left: 2%;
        width: 67%;
        height: 100%;
    }

    div#content div.level1 {
        font-size: 24px;
        color: blue;
        font-weight: bold;
    }

    div#content div.level2 {
        font-size: 22px;
        color: red;
        font-weight: bold;
        margin-left: 20px;
    }

    div#content div.level3 {
        font-size: 20px;
        color: green;
        font-weight: bold;
        margin-left: 40px;
    }

    div#content div.level4 {
        font-size: 18px;
        color: cornflowerblue;
        font-weight: bold;
        margin-left: 60px;
    }

    div#content div.level5 {
        font-size: 16px;
        color: orange;
        font-weight: bold;
        margin-left: 80px;
    }

    div#content div.level6 {
        font-size: 16px;
        color: darkcyan;
        font-weight: bold;
        margin-left: 100px;
    }

    div#content div.level7 {
        font-size: 16px;
        color: deeppink;
        font-weight: bold;
        margin-left: 120px;
    }

    div#content div.article div {
        margin-top: 9px;
    }

    div#content div.nostyle {
        font-size: initial;
        color: black;
        font-weight: normal;
        margin-left: 0px;
    }

    div#toolbar {
        border: 1px solid grey;
        width: 195px;
        height: 26px;
        padding: 5px;
        position: absolute;
        background: white;
    }

    div.circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid grey;
        margin-left: 7px;
        float: left;
        cursor: pointer;
    }

    annotation {
        border: 1px solid grey;
        width: 195px;
        height: 100px;
        padding: 5px;
        font-size: small;
        position: absolute;
    }

    .yellow {
        background: #ffee58;
    }

    .green {
        background: lightgreen;
    }

    .blue {
        background: lightskyblue;
    }

    .red {
        background: tomato;
    }

    .violet {
        background: mediumpurple;
    }

    .annotated {
        font-style: italic;
    }

    highlight {
        cursor: pointer;
    }
    `;

    const JSTreeCSS = "https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css";

    const DROPBOX_CLIENT_ID = "bxh6gtfvn361dbe";
    const DROPBOX_REDIRECT_URL = "https://www.ejustice.just.fgov.be/eli/";

    const HEADINGS_TYPE = ["partie", "livre", "titre", "sous-titre", "chapitre", "section", "sous-section", "paragraphe", "§"];
    let act = {content: []}, updateInfo, highlights, currentArticle, currentRange, highlightsBackup;
    let headingsWhoseTypeNeedsToBeDefined = [];

    function analyseContent() {
        // Declarations
        let currentParents = [], lastNode, counter = 1;
        // Internal function
        function analyseHeading(n) {
            // if (n?.name == "LNK0599") {debugger;}
            let heading = {};
            heading.id = "node" + counter.toString().padStart(5, "0");
            heading.type = n.textContent.split(" ")[0].toLowerCase().trim();
            if ( !HEADINGS_TYPE.some(el => el == heading.type) ) {
                if (heading.type.startsWith("disposition") || !n?.nextElementSibling?.nextElementSibling) {
                    // If type is unknown, use last known type
                    // If this is the first heading, then remember to set it later
                    if (currentParents.length) {
                        heading.type = currentParents.slice(-1)[0].type;
                    }
                    else {
                        headingsWhoseTypeNeedsToBeDefined.push(heading);
                    }
                }
                else {
                    // Let's assume it is not a heading but the title of next article
                    // Let's remove useless <br>
                    // console.log(n, n.nextElementSibling);
                    n.nextElementSibling.remove();
                    n.nextElementSibling.remove();
                    let t = n.nextElementSibling.nextElementSibling.textContent + ". " + n.textContent;
                    t = t.slice(-1) == "." ? t.slice(0, -1) : t;
                    let oldT = n.nextElementSibling.nextElementSibling.textContent;
                    n.nextElementSibling.nextElementSibling.textContent = t;
                    n.nextElementSibling.nextElementSibling.nextSibling.textContent = n.nextElementSibling.nextElementSibling.nextSibling.textContent.replace(/^\.\s?/, "");
                    $(n).next().next().attr("addBr", "true");
                    return;
                }
            }
            else if (headingsWhoseTypeNeedsToBeDefined.length) {
                for (let h of headingsWhoseTypeNeedsToBeDefined) {
                    h.type = heading.type;
                }
                headingsWhoseTypeNeedsToBeDefined = [];
            }
            heading.text = n.textContent.trimStart();
            heading.content = n.textContent;
            heading.titleOngoing = false;
            heading.children = [];
            if (!currentParents.length) {
                // Node must be directly attached to root
                act.content.push(heading);
                currentParents.push(heading);
            }
            else {
                // Other parents have already been analysed
                let currentHeadingLevel = HEADINGS_TYPE.indexOf(heading.type);
                let parentHeadingLevel = HEADINGS_TYPE.indexOf(currentParents.slice(-1)[0].type);
                if ( currentHeadingLevel > parentHeadingLevel ) {
                    // Current node is at a lower level than last parent
                    currentParents.slice(-1)[0].children.push(heading);
                    currentParents.push(heading);
                }
                else if (currentHeadingLevel == parentHeadingLevel) {
                    // Current node is at the same level as last parent
                    currentParents.pop();
                    if (!currentParents.length) {
                        // We are at the highest level, hence attach to the root
                        act.content.push(heading);
                    }
                    else {
                        // We are at a lower level, hence attach to previous level
                        currentParents.slice(-1)[0].children.push(heading);
                    }
                    currentParents.push(heading);
                }
                else {
                    // Current node is at a higher level as the last parent
                    // Therefore, parent nodes must be erased until reaching the same level as current node
                    // console.log(n, lastNode, currentParents);
                    do {
                        currentParents.pop();
                        if (!currentParents.length) {
                            console.log("Wrong heading structure at", n);
                            break;
                        }
                    }
                    while (currentHeadingLevel < HEADINGS_TYPE.indexOf(currentParents.slice(-1)[0].type));
                    currentParents.pop();
                    if (!currentParents.length) {
                        // We are at the highest level, hence attach to the root
                        act.content.push(heading);
                    }
                    else {
                        // We are at a lower level, hence attach to previous level
                        currentParents.slice(-1)[0].children.push(heading);
                    }
                    currentParents.push(heading);
                }
            }
            heading.level = "level" + currentParents.length;
            lastNode = heading;
            counter += 1;
        }
        function beautify(n) {
            // Sanitize text of the node
            n.text = n.text.replace(/[\[\]]|[\(\)]|--+/g, "").replace(/\s\s/g, " ")
                .replace(/(\d+(er)?\.)([A-Z])/g, "$1 $3");
            const ARTICLE_REGEX = /Art(\.|icle)\s?[LR]?([IVX]+|\d+(\w+)?)((\.|\/|:|-)\d+)?((\.|\/|:|-)\d+)?\.(.+[a-zéè]$)?/
            let m = n.text.match(ARTICLE_REGEX);
            if (m) { n.text = m[0]; }
            // Rules depending on node type
            if (n.type == "article") {
                const INDENT_TYPE = [/^(?:<b>.+<\/b>)?(?:\[<sup>.+<\/sup>\s?)?§\s\d+(er)?(\/\d+)?\./, /^(?:\[<sup>.+<\/sup>\s?|\()?\d+°(bis|ter|quater|quinquies|sexies|septies|octies|nonies|decies)?/,
                                     /^(?:\[<sup>.+<\/sup>\s?)?\(?\w\)/, /^(?:\[<sup>.+<\/sup>\s?)?[ivx]+\.\s/, /^(?:\[<sup>.+<\/sup>\s?)?-\s/];
                let content = n.content.split("<br>").map(el => el.trim().replace(/\s\s/g, " "));
                let contentIndent = new Array(content.length);
                // For article's indent the logic is as follows:
                // 1. Loop forward and give to each title starting with 1°, a), etc. its proper indent;
                //    any title without unindentified ident is marked with type -1
                // 2. Loop backward and assume that any paragraph of unidentified type -1 is of the same type as the last one;
                //    that way, a paragraph can continue for several sub-paragraphs. However, this does not apply for the paragraph
                //    preceding the first of a series (thus preceding 1°, a), etc.) which is marked -2
                // 3. Loop again forwards and assume that paragraphs -2 are of the same type as the preceding paragraph
                for (let i = 0; i < content.length; i++) {
                    // Delete empty paragraphs
                    /*
                    if (content[i] == "") {
                        content.splice(i, 1);
                        contentIndent.splice(i, 1);
                        continue;
                    }
                    */
                    // Put "Art." and its title in bold
                    let m = content[i].match(ARTICLE_REGEX);
                    if (m) {
                        content[i] = content[i].replace(ARTICLE_REGEX, "<b>$&</b>");
                    }
                    // Search for indent
                    let t = INDENT_TYPE.findIndex(el => content[i].match(el));
                    contentIndent[i] = {};
                    contentIndent[i].type = t;
                    if ( t > -1 ) {
                        contentIndent[i].numbering = content[i].match(INDENT_TYPE[t])[0];
                        content[i] = content[i].replace(INDENT_TYPE[t], "<b>$&</b>");
                    }
                }
                let indent = 0;
                for (let i = content.length - 1; i > 0; i--) {
                    if (contentIndent[i].type == -1) {
                        contentIndent[i].type = indent
                    }
                    else {
                        let number = contentIndent[i].numbering.match(/\d°|\w\)|-/)?.[0];
                        if (number && ( number.startsWith("1") || number.startsWith("a") || number.startsWith("-") ) ) {
                            indent = -2;
                        }
                        else {
                            indent = contentIndent[i].type
                        }
                    }
                }
                indent = 0;
                for (let i = 0; i < content.length; i++) {
                    if (contentIndent[i].type == -2) {
                        contentIndent[i].type = indent
                    }
                    else {
                        indent = contentIndent[i].type
                    }
                }
                n.content = content.map((el, i) => `<div style='padding-left: ${contentIndent[i].type * 20}px;'>${el}</div>`).join("") + "<br>";
            }
            else if (n.titleOngoing) {
                // This is a heading whose title is ongoing, needs to be closed
                n.content += "</div>";
                n.content = n.content.replace("<br><br>", "");
            }
        }
        function buildLastNode(n) {
            let article = {};
            article.id = "node" + counter.toString().padStart(5, "0");
            article.type = "article";
            article.text = n.textContent;
            article.titleOngoing = true;
            article.content = n.textContent;
            article.level = "article";
            if (!currentParents.length) {
                // If there is no heading to attach the article, create a fake heading
                let heading = {}
                heading.id = "node" + (counter -1).toString().padStart(5, "0");
                heading.type = "dispositif";
                heading.text = "Dispositif";
                heading.content = "Dispositif<br><br>";
                heading.level = "level1";
                heading.children = [];
                headingsWhoseTypeNeedsToBeDefined.push(heading);
                currentParents.push(heading);
                act.content.push(heading);
            }
            return (article);
        }
        // Main analyseContent
        // let contentNodes = Array.from(document.querySelectorAll("body > table")[3].querySelector("tbody > tr:nth-child(2) > th").childNodes);
        let contentNodes = Array.from(Array.from(document.querySelectorAll("body > table > tbody > tr:nth-child(1) > th:nth-child(1)"))
            .filter(el => el.textContent.indexOf("Texte") > -1)[0].parentElement.nextElementSibling.children[0].childNodes);
        // Correct erroneous encoding of the text
        const WRONG_LAST_NODENAME = ["ERRATUM,M.B.", "I", "BR&GT;<BR"];
        while ( WRONG_LAST_NODENAME.some(el => el == contentNodes.slice(-1)[0].nodeName) ) {
            contentNodes = contentNodes.concat( Array.from( contentNodes.slice(-1)[0].childNodes ) );
        }
        for (let n of contentNodes) {
            if ( (n.nodeName == "A") && (n.name) && (n.name.startsWith("LNK") && !(n.textContent.toLowerCase().startsWith("annexe")) ) ) {
                // This is a heading
                if (lastNode) { beautify(lastNode); }
                analyseHeading(n);
            }
            else if ( (n.nodeName == "A") && (n.name) && (n.name.startsWith("Art") || n.textContent.toLowerCase().startsWith("annexe") ) ) {
                // This is an article, to be attached to last heading
                if (lastNode) { beautify(lastNode); }
                /*
                let article = {};
                article.id = "node" + counter.toString().padStart(5, "0");
                article.type = "article";
                article.text = n.textContent;
                article.titleOngoing = true;
                article.content = n.textContent;
                article.level = "article";
                if (!currentParents.length) {
                    // If there is no heading to attach the article, create a fake heading
                    let heading = {}
                    heading.id = "node" + (counter -1).toString().padStart(5, "0");
                    heading.type = "dispositif";
                    heading.text = "Dispositif";
                    heading.content = "Dispositif<br><br>";
                    heading.level = "level1";
                    heading.children = [];
                    headingsWhoseTypeNeedsToBeDefined.push(heading);
                    currentParents.push(heading);
                    act.content.push(heading);
                }
                currentParents.slice(-1)[0].children.push(article);
                lastNode = article;
                counter += 1;
                */
                lastNode = buildLastNode(n);
                currentParents.slice(-1)[0].children.push(lastNode);
                counter += 1;
            }
            else if ( (n.nodeName == "A") && n.href && lastNode) {
                if (n.target == "_blank") {
                    // This is the reference of a modifying law
                    lastNode.content += n.outerHTML;
                }
                else {
                    // This is the second part of the article title
                    lastNode.text += n.textContent;
                    lastNode.content += n.textContent.replace(/</g, "&lt;");
                    if (n.getAttribute("addBr")) {
                        lastNode.content += "<br>";
                    }
                }
            }
            else if ( ["SUP", "FONT", "I", "TABLE", "P"].some(el => el == n.nodeName) ) {
                if (!lastNode) {
                    lastNode = buildLastNode(n);
                    lastNode.content += n.outerHTML
                    currentParents.slice(-1)[0].children.push(lastNode);
                    counter += 1;
                }
            }
            else if ( (n.nodeName == "#text") && lastNode && n.textContent.trim() ) {
                // This is floating text
                let text = n.textContent; //.trim();
                if (lastNode.type == "article") {
                    if (lastNode.titleOngoing) {
                        // Text is part of the title of the article
                        // lastNode.text += (text[0] == "." ? "" : " ") + text;
                        lastNode.text += (text[0] == "." ? text : "");
                        lastNode.content += n.textContent.replace(/</g, "&lt;");
                    }
                    else {
                        // Test if a heading was erroneously inserted as the end of an article (wrong subdivision)
                        if ( (text.trim()[0] != "§")
                            && ( n.nextSibling?.nextSibling?.nodeName == "BR" )
                            && ( HEADINGS_TYPE.some(el => text.toLowerCase().trim().startsWith(el)) ) ) {
                            // This is a heading hidden in the article content
                            lastNode.content += "<br><br>";
                            beautify(lastNode);
                            n.textContent = n.textContent.trim();
                            analyseHeading(n);
                        }
                        else {
                            // This is ordinary text to be added to the content of the article
                            lastNode.content += n.textContent.replace(/</g, "&lt;");
                        };
                    }
                }
                else {
                    // Last node was a heading
                    // Test if a heading was erroneously inserted as the content of an heading title (wrong subdivision)
                    let m = text.match(/[\w\-]+\s\d(\w+)?\.\s.+/);
                    if (m && HEADINGS_TYPE.some(el => m[0].toLowerCase().startsWith(el))) {
                        // There are two titles hidden in this heading
                        let node = {};
                        lastNode.text += " " + text.slice(0, m.index - 1);
                        lastNode.content += text.slice(0, m.index - 1) + "<br><br>";
                        node.textContent = m[0];
                        analyseHeading(node);
                    }
                    else {
                        // This is ordinary text to be added to the text of the heading
                        lastNode.text += (text[0] == "." ? "" : " ") + text;
                        lastNode.content += n.textContent;
                    }
                }
            }
            else if ( (n.nodeName == "#text") && n.textContent.trim() ) {
                lastNode = buildLastNode(n);
                currentParents.slice(-1)[0].children.push(lastNode);
                counter += 1;
            }
            else if ( (n.nodeName == "BR") && lastNode ) {
                if ( (lastNode.type == "article") ) {
                    // Add <br> to content
                    lastNode.content += "<br>";
                    if (lastNode.titleOngoing) {
                        // The <br> marks the end of the title of the article
                        lastNode.titleOngoing = false;
                    }
                }
                else {
                    // Add <br> to content
                    lastNode.content += "<br>";
                    if ( !lastNode.titleOngoing) {
                        // The <br> marks the beginning of the ongoing part of the heading title
                        lastNode.titleOngoing = true;
                        lastNode.content += "<div class='nostyle'>";
                    }
                }
            }
        }
        if (lastNode) {beautify(lastNode);}
    }

    function buildContent(nodesArray) {
        let content = "";
        for (let n of nodesArray) {
            content += `<div id="anchor_${n.id}" class="${n.level}">${n.content}</div>`;
            if (n.children?.length) {
                content += buildContent(n.children);
            }
        }
        return content;
    }

    function analyseFirstInfo() {
        // Capture act info (first table is missing at this stage)
        let titleTable = document.querySelectorAll("body > table")[1];
        if (!titleTable?.querySelector("tbody > tr:nth-child(3) > th > b")) {
            // Function is run too early, before page was loaded
            window.setTimeout(analyseFirstInfo, 500);
            return
        }
        act.eli = document.querySelectorAll("body > table")[0].querySelector("tbody > tr:nth-child(9) > td")?.textContent?.replace("http:", "https:");
        // Act type, date and title
        act.type = act.eli.split("/")[4];
        act.date = act.eli.split("/").slice(5,8).join("-");
        act.title = titleTable.querySelector("tbody > tr:nth-child(3) > th > b")
            .firstChild.textContent.replace(/\(.+/, "")
            .split("-").slice(1).join("-").trim().split(" ").slice(1).join(" ").toLowerCase();
        act.lastUpdate = titleTable.querySelector("tbody > tr:nth-child(3) > th")
                         .innerHTML.split("mise à jour au")?.[1]?.match(/\d{2}-\d{2}-\d{4}/)?.[0]
                         || act.date;
    }

    function analyseFurtherInfo() {
        // Consolidated PDF ?
        let consolidatedPDF = Array.from(document.querySelectorAll("body > table")[1].querySelectorAll("tbody > tr:nth-child(3) > th > a"))
            .filter(a => a.href.indexOf("/img_l/pdf") > -1);
        if (consolidatedPDF.length) {
            act.consolidatedPDF = consolidatedPDF[0].href;
            $(consolidatedPDF[0]).after(`<a id='btnSavePDF'><img src='${SAVE_IMG}'></a`);
        }
        // Preamble and Report to the King ?
        let preamble = Array.from(document.querySelectorAll("body > table > tbody > tr:nth-child(1) > th:nth-child(1)"))
            .filter(el => el.textContent.indexOf("Préambule") > -1);
        let report = Array.from(document.querySelectorAll("body > table > tbody > tr:nth-child(1) > th:nth-child(1)"))
            .filter(el => el.textContent.indexOf("Rapport au Roi") > -1);
        let heading = {}, article = {};
        heading.id = "visas";
        heading.type = "visas";
        heading.level = "level1";
        heading.text = "Visas";
        heading.content = "Visas";
        heading.children = [];
        if (preamble.length && (act.type =! "loi")) {
            let preambleContent = "<br><div class='level2'>Préambule</div>"
                + $(preamble[0]).parent().next().children().html();
            heading.children.push({id: "preamble_text", type: "article", level: "article", text: "Préambule", content: preambleContent});
        }
        if (report.length) {
            let reportContent = "<br><div class='level2'>Rapport au Roi</div>"
                + $(report[0]).parent().next().children().html();
            heading.children.push({id: "report_text", type: "article", level: "article", text: "Rapport au Roi", content: reportContent});
        }
        if (heading.children.length) {
            headingsWhoseTypeNeedsToBeDefined.push(heading);
            act.content.push(heading);
        }
        // General information on the act
        act.info = document.querySelectorAll("body > table")[1].querySelector("tbody > tr:nth-child(3) > th").innerHTML;
        let additionalInfo = [];
        const INFO_URL_PARTS = ["arrexec", "arch_a", "wet", "reflex"];
        const anchors = Array.from(document.querySelectorAll("body > table")[0].querySelectorAll("a"));
        for (let u of INFO_URL_PARTS) {
            let a = anchors.filter(el => el.href.indexOf(u) > -1);
            if (a.length) {
                a[0].target = "_blank";
                if (u == "wet") {a[0].href += "&noJS=true";}
                additionalInfo.push(a[0].outerHTML);
            }
        }
        additionalInfo.push(`<a href='${act.eli}' target="_blank">ELI</a>`);
        additionalInfo.push(`<a id='clearDB' href='#'>Clear DB</a>`);
        additionalInfo.push(`<a href="${window.location.origin + window.location.pathname}`
                            +`${window.location.search ? window.location.search + "&" : "?"}noJS=true" target="_blank">Disable JS</a></b>`);
        act.info += "<br><div id='addinfodiv'>" + additionalInfo.map(el => `<span style='font-weight: bold;'>${el}</span>`).join("") + "</div>";
    }

    async function displayContent() {
        async function loadHighlights() {
            // console.log("Start loading highlights", new Date());
            highlights = {
                quotes: await localforage.getItem("highlights-" + act.eli) || {},
                selected: [],
                wrappers: {},
            };
            let changesMade = false;
            for (let key in highlights.quotes) {
                let article = $(`div#toc a:contains("${key}")`)?.[0]?.id;
                if (!article) {
                    console.info(`Loaded page does not contain anymore "${key}" article, deleting highlight from database`);
                    delete highlights.quotes[key];
                    changesMade = true;
                }
                else {
                    for (let q of highlights.quotes[key]) {
                        let range = anchoring.TextQuoteAnchor.toRange(document.querySelector(`div#content div#anchor_${article.slice(0,9)}`), q);
                        if (!range) {
                            console.info(`Quote ${JSON.stringify(q)} cannot be found anymore in article "${key}", deleting highlight from database`);
                            let i = highlights.quotes[key].findIndex(el => el.id == q.id);
                            highlights.quotes[key].splice(i, 1);
                            if (!highlights.quotes[key].length) { delete highlights.quotes[key]; }
                            changesMade = true;
                        }
                        else {
                            let h = document.createElement("highlight");
                            h.id = q.id;
                            h.classList.add(q.color);
                            if (q.annotation) { h.classList.add("annotated"); }
                            let wrapper = anchoring.WrapRangeText(h, range);
                            highlights.wrappers[h.id] = wrapper;
                        }
                    }
                }
            }
            if (changesMade) { await localforage.setItem("highlights-" + act.eli, highlights.quotes); }
            // console.log("Stop loading highlights", new Date());
        }
        // console.log(act.content);
        // Add JSTRee style
        let ss = document.createElement("link");
        ss.type = "text/css";
        ss.rel = "stylesheet";
        ss.href = JSTreeCSS;
        document.getElementsByTagName("head")[0].appendChild(ss);
        // Erase document and start afresh
        $("body").children().remove();
        $("body").append("<div id='main'><div id='info'></div><div id='hsplit'></div><div id ='maincontent'>"
                         + "<div id='toc'></div><div id='vsplit'></div><div id='content'></div></div></div>");
        // Set up resizable divs
         $("div#info").resizable({
             handleSelector: "div#hsplit",
             resizeWidth: false
         });
         $("div#toc").resizable({
             handleSelector: "div#vsplit",
             resizeHeight: false
         });
        // Build document info
        $("div#info").append(act.info);
        $("div#info").append("<br>");
        $("div#info a#btnSavePDF").on("click", function (event, date) {
            let a = document.createElement("a");
            a.style = "display: none";
            document.body.appendChild(a);
            a.href = act.consolidatedPDF;
            a.download = `${act.type.slice(0,1).toUpperCase()}. ${act.date} ${act.title}.pdf`;
            a.click();
            a.remove();
        });
        // Add JSTree
        $("div#toc").append("<div id='btndiv'><button id='btnCollapse'>Collapse</button><button id='btnExpand'>Expand</button></div>");
        $("button#btnCollapse").on("click", function (event, data) {
            $("div#jstree").jstree("close_all")
        });
        $("button#btnExpand").on("click", function (event, data) {
            $("div#jstree").jstree("open_all")
        });
        let el = document.createElement("div");
        el.id = "jstree";
        el.style.display = "none";
        $("div#toc").append(el);
        $("div#jstree").jstree({"core":
                                {
                                    "data": act.content,
                                },
                                "plugins": [ "types" ],
                                "types": {
                                    "article": {
                                        "icon": "jstree-file",
                                    },
                                },
                               })
            .on("ready.jstree", async function (event, data) {
                $(this).jstree("open_all");
                await loadHighlights();
            })
            .on("select_node.jstree", function(event, data) {
                $("div#anchor_" + data.node.id)[0].scrollIntoView( true );
            });
        el.style.display = "";
        $("div#toc").append("<br><br>");
        // Populate content of the page
        let content = buildContent(act.content);
        $("div#content").append(content);
        $("div#content").append("<br><br>");
        // Button to clear DB
        $("a#clearDB").on("click", async function() {
            await localforage.setItem(act.eli, {});
            updateInfo[act.eli].act = false;
            await localforage.setItem("updateInfo", updateInfo);
            $("a#clearDB").parent().hide("slow");
        });
        // Set up highlighter
        $("div#content").on( "mouseup", manageHighlights );
        $("div#content").append("<div id='toolbar'><div class='circle yellow'></div><div class='circle green'></div><div class='circle blue'></div>"
                                +"<div class='circle red'></div><div class='circle violet'></div><div class='circle'></div></div>");
        // Register menu commands
        GM_registerMenuCommand("Export highlights for this act", exportHighlightsThisAct);
        GM_registerMenuCommand("Export highlights for all acts", exportAllHighlights);
        if (highlightsBackup.accessToken) {
            GM_registerMenuCommand("Disable Dropbox backup of highlights", disableDropboxBackup);
        }
        else {
            highlightsBackup.menuID = GM_registerMenuCommand("Enable Dropbox backup of highlights", enableDropboxBackup);
        }
        // Run dropbox backup
        await runDropboxBackup();
    }

    async function manageHighlights(event) {
        function getQuoteFromHighlight(h) {
            let currentArticle = $(h).parents(".article")[0].id;
            let articleText = $(`div#toc a#${currentArticle.slice(7)}_anchor`).text();
            let i = highlights.quotes[articleText].findIndex(el => el.id == h.id);
            return [currentArticle, articleText, i];
        }
        let s = document.getSelection();
        let beginParentArticle = $(s.anchorNode).parents(".article");
        let endParentArticle = $(s.focusNode).parents(".article");
        // Only process selection if it exist and within the same article
        if (!s.isCollapsed && beginParentArticle.length && endParentArticle && beginParentArticle[0] == endParentArticle[0]) {
            // Show toolbar
            let relX = event.pageX + document.querySelector("div#content").scrollLeft - $(this).offset().left;
            let relY = event.pageY + document.querySelector("div#content").scrollTop - $(this).offset().top;
            $("div#toolbar").css({left: `${Math.min(relX - 5, $("div#content").width() - 200)}px`, top: `${relY + 10}px`}).show();
            currentRange = s.getRangeAt(0);
            currentArticle = beginParentArticle[0].id;
        }
        else {
            // Click without selection
            // Let's test whether user clicked on the circle of the toolbar
            if ( event.target.classList && Array.from(event.target.classList).includes("circle") ) {
                $("div#toolbar").hide();
                if (highlights.selected.length) {
                    // A highlight is currently selected, change its color or remove highlight
                    // highlights.selected.forEach( async function(h) {
                    for (const h of highlights.selected) {
                        let [currentArticle, articleText, i] = getQuoteFromHighlight(h);
                        if (event.target.classList[1]) {
                            // If a color has been selected, change color of selected highlights
                            h.classList.remove(h.classList[0]);
                            h.classList = event.target.classList[1] + " " + h.classList;
                            highlights.quotes[articleText][i].color = event.target.classList[1];
                            $(`annotation#${h.id}`).attr("class", event.target.classList[1]).hide();
                            // Update localforage
                            await localforage.setItem("highlights-" + act.eli, highlights.quotes);
                        }
                        else {
                            // Remove highlight
                            highlights.wrappers[h.id].unwrap();
                            highlights.wrappers[h.id] = null;
                            highlights.quotes[articleText].splice(i, 1);
                            if (!highlights.quotes[articleText].length) { delete highlights.quotes[articleText]; }
                            // Remove annotation (if any)
                            $(`annotation#${h.id}`).remove();
                            // Save changes
                            await localforage.setItem("highlights-" + act.eli, highlights.quotes);
                        }
                    };
                    highlights.selected.forEach( el => $(el).css({border: ""}) );
                    highlights.selected = [];
                }
                else {
                    // Do something if another color than white has been selected
                    if (event.target.classList[1] != "white") {
                        // Highlight it
                        let quoteSelector = anchoring.TextQuoteAnchor.fromRange(document.querySelector("div#content"), currentRange);
                        let h = document.createElement("highlight");
                        h.classList.add(event.target.classList[1]);
                        h.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
                        let wrapper = anchoring.WrapRangeText(h, currentRange);
                        // Save highlight
                        let articleText = $(`div#toc a#${currentArticle.slice(7)}_anchor`).text();
                        quoteSelector.color = event.target.classList[1];
                        quoteSelector.id = h.id;
                        highlights.quotes[articleText] = highlights.quotes[articleText] || [];
                        highlights.quotes[articleText].push(quoteSelector);
                        highlights.wrappers[h.id] = wrapper;
                        // Missing : save to localforage
                        await localforage.setItem("highlights-" + act.eli, highlights.quotes);
                    }
                }
            }
            // Test if clicked on an existing highlight
            else if (event.target.nodeName == "HIGHLIGHT") {
                // Mark this highlight as selected
                $(event.target).css({border: "1px solid grey"});
                highlights.selected.push(event.target);
                // Show toolbar
                let relX = event.pageX + document.querySelector("div#content").scrollLeft - $(this).offset().left;
                let relY = event.pageY + document.querySelector("div#content").scrollTop - $(this).offset().top;
                $("div#toolbar").css({left: `${Math.min(relX - 5, $("div#content").width() - 200)}px`, top: `${relY + 10}px`}).show();
                // Show annotation
                if ( !$(`annotation#${event.target.id}`).length ) {
                    // If annotation box does not exist for this highlight, create it
                    let [currentArticle, articleText, i] = getQuoteFromHighlight(event.target);
                    $("div#content").append(`<annotation id="${event.target.id}" class="${event.target.classList[0]}" `
                                           +`contenteditable="true">${highlights.quotes[articleText][i].annotation || ""}</annotation>`);
                }
                $(`annotation#${event.target.id}`).css({left: `${Math.min(relX - 5, $("div#content").width() - 200)}px`, top: `${relY - 130}px`}).show();
            }
            else if (event.target.nodeName != "ANNOTATION") {
                // else erase highlight selection, hide annotation and toolbar
                currentRange = null;
                currentArticle = null;
                highlights.selected.forEach( async function(h) {
                    // Hide border around selected highlight
                    $(h).css({border: ""});
                    // Hide annotation box
                    $(`annotation#${h.id}`).hide();
                    // Analyze and save content of annotation box
                    let [currentArticle, articleText, i] = getQuoteFromHighlight(h);
                    let previousAnnotation = highlights.quotes[articleText][i].annotation || "";
                    let currentAnnotation = $(`annotation#${h.id}`).text() || "";
                    if ( currentAnnotation != previousAnnotation ) {
                        if (currentAnnotation) {
                            highlights.quotes[articleText][i].annotation = $(`annotation#${h.id}`).text();
                            h.classList.add("annotated");
                        }
                        else {
                            h.classList.remove("annotated");
                            delete highlights.quotes[articleText][i].annotation;
                        }
                        await localforage.setItem("highlights-" + act.eli, highlights.quotes);
                    }
                });
                highlights.selected = [];
                $("div#toolbar").hide();
            }
        }
    }

    // Hide table in order to accelerate dramatically loading of the DOM
    function processResultsPage() {
        if (document.querySelectorAll("frame")[1].contentDocument.querySelector("frame")) {
            var forms = document.querySelectorAll("frame")[1].contentDocument.querySelector("frame").contentDocument.querySelectorAll("table form");
            for (var i = 0; i < forms.length; i++) {
                // RJ : en changeant la cible, on fait en sorte que chaque lien s'ouvre dans une nouvelle fenêtre
                // en changeant la méthode de post en get, on fait en sorte que les paramètres apparaissent dans l'adresse
                // enfin, en changeant l'action vers "loi_a1" au lieu de "loi_a", on fait en sorte que ça s'ouvre sans le footer de recherches
                forms[i].target = "_blank";
                forms[i].method = "get";
                forms[i].action = "/cgi_loi/loi_a1.pl";
            }
        }
    }

    async function analyseAct() {
        // console.log("Analysing act");
        try {
            $("div#loading span#msg").text("Analysing content of the act");
            analyseFurtherInfo();
            analyseContent();
            $("div#loading span#msg").text("Storing the act in offline database");
            await localforage.setItem(act.eli, act);
            updateInfo[act.eli] =
                {
                act: act.lastUpdate,
                script: GM_info.script.lastModified,
            };
            await localforage.setItem("updateInfo", updateInfo);
        }
        catch(e) {
            document.querySelector("div#loading").innerHTML = `Error while loading, click <a href=${window.location.origin + window.location.pathname}`
                +`${window.location.search ? window.location.search + "&" : "?"}noJS=true>here</a> to disable javascript`;
            console.error(e);
            return;
        }
        displayContent();
    }

    function exportHighlightsThisAct() {
        if (highlights.quotes == {}) {
            alert("No highlights to export");
            return;
        }
        let data = {}
        data["highlights-" + act.eli] = highlights.quotes;
        download(JSON.stringify(data), "Exported highlights.json", "application/json");
    }

    async function exportAllHighlights(returnData) {
        let data = {};
        await localforage.iterate(function(value, key, iterationNumber) {
            if (key.startsWith("highlights-")) {
                data[key] = value;
            }
        });
        if (returnData) {
            return JSON.stringify(data);
        }
        else {
            download(JSON.stringify(data), "Exported highlights.json", "application/json");
        }
    }

    async function disableDropboxBackup() {
        GM_unregisterMenuCommand(highlightsBackup.menuID);
        GM_registerMenuCommand("Enable Dropbox backup of highlights", enableDropboxBackup);
        highlightsBackup = {};
        await localforage.setItem("highlightsBackup", highlightsBackup);
    }

    async function enableDropboxBackup() {
        let dbxAuth = new Dropbox.DropboxAuth({
            clientId: DROPBOX_CLIENT_ID,
        });
        highlightsBackup.filename = prompt("Please enter the file name of backups", "Highlights Backup");
        alert("You will now be redirected to authorize this app to access your Dropbox. Access is only requested to a folder dedicated to this app. No access will be granted to the rest of your Dropbox. Backups of your highlights will be made daily.");
        let authUrl = await dbxAuth.getAuthenticationUrl(DROPBOX_REDIRECT_URL, undefined, 'code', 'offline', undefined, undefined, true);
        highlightsBackup.codeVerifier = dbxAuth.codeVerifier;
        highlightsBackup.redirect = act.eli;
        await localforage.setItem("highlightsBackup", highlightsBackup);
        window.location.href = authUrl;
    }

    async function runDropboxBackup() {
        if (!highlightsBackup.accessToken) {return;}
        let date = new Date().toJSON().slice(0,10);
        if (date != highlightsBackup.lastBackup) {
            let data = await exportAllHighlights(true);
            let dbxAuth = new Dropbox.DropboxAuth({
                clientId: DROPBOX_CLIENT_ID,
            });
            dbxAuth.setAccessToken(highlightsBackup.accessToken);
            let dbx = new Dropbox.Dropbox({
                auth: dbxAuth
            });
            let r = await dbx.filesUpload({
                path: '/' + highlightsBackup.filename /* + " " + date */ + ".json",
                contents: data
            });
            console.log("Backup to Dropbox done", r);
            highlightsBackup.lastBackup = date;
            // await localforage.setItem("highlightsBackup", highlightsBackup);
        }
    }

    async function main() {
        function addLoading(msg) {
            $("body").prepend(`<div id='loading'><div class="loadingio-spinner-spinner-is7uuvdj549"><div class="ldio-zrg2ss6p6ee">`
                             +`<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>`
                             +`<div></div><div></div><div></div></div></div><span id='msg'>${msg}</span></div>`);
        }
        GM_addStyle(MyCSS);
        analyseFirstInfo();
        updateInfo = await localforage.getItem("updateInfo") || {};
        if ( (updateInfo[act.eli]?.script == GM_info.script.lastModified)
             && (updateInfo[act.eli]?.act == act.lastUpdate) ) {
            // Page can be restored since it did not change (nor the script)
            window.stop();
            addLoading("Restoring page from offline database");
            let savedAct = await localforage.getItem(act.eli);
            act = savedAct;
            displayContent();
        }
        else {
            // Page must be loaded and analysed since it cannot be restored
            addLoading("Downloading page from eJustice server");
            if (document.readyState == "complete") {
                // console.log("Page already loaded");
                analyseAct();
            }
            else {
                // console.log("Waiting for loading of the page");
                document.addEventListener("DOMContentLoaded", analyseAct);
            }
        }
    }

    // Start of the script
    highlightsBackup = await localforage.getItem("highlightsBackup") || {};
    if ( window.location.href == "https://www.ejustice.just.fgov.be/loi/loi.htm" ) {
        document.querySelectorAll("frame")[1].addEventListener("load", processResultsPage, false);
    }
    else if ( (window.location.origin + window.location.pathname) == "https://www.ejustice.just.fgov.be/eli/" ) {
        // Test if redirect from Dropbox
        if ( window.location.search.match(/code/) ) {
            let dbxAuth = new Dropbox.DropboxAuth({
                clientId: DROPBOX_CLIENT_ID,
            });
            dbxAuth.setCodeVerifier(highlightsBackup.codeVerifier);
            let u = new URLSearchParams(window.location.search);
            let response = await dbxAuth.getAccessTokenFromCode(DROPBOX_REDIRECT_URL, u.get("code"));
            highlightsBackup.accessToken = response.result.access_token;
            await localforage.setItem("highlightsBackup", highlightsBackup);
            window.location.href = highlightsBackup.redirect;
        }
        else if ( window.location.search.match(/error/) ) {
            alert("User refused to grant access to Dropbox");
            if (highlightsBackup?.redirect) { window.location.href = highlightsBackup.redirect; }
        }
    }
    else {
        let u = new URLSearchParams(window.location.search);
        if (!u.get("noJS")) {
            main();
        }
    }
})();
