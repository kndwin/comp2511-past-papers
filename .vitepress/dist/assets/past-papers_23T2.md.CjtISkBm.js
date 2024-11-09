import{_ as u,p as m,v as c,q as g,o as k,c as p,a2 as y,a3 as E,j as s,a as i,t as b,a4 as h,G as e}from"./chunks/framework.BDhdJS2m.js";const f={class:"vp-editor"},q={__name:"Editor",props:{storageKey:{type:String,default:"vitepress-editor-content"}},setup(r){const l=r,a=m("");return c(()=>{const t=localStorage.getItem(l.storageKey);t&&(a.value=t)}),g(a,t=>{localStorage.setItem(l.storageKey,t)},{deep:!0}),(t,o)=>(k(),p("div",f,[y(s("textarea",{"onUpdate:modelValue":o[0]||(o[0]=d=>a.value=d),class:"editor-textarea",placeholder:"Start typing... Your content will be automatically saved",rows:"10"},null,512),[[E,a.value]])]))}},n=u(q,[["__scopeId","data-v-20233bfc"]]),F={id:"frontmatter-title",tabindex:"-1"},v={class:"details custom-block"},A={class:"details custom-block"},w={class:"details custom-block"},C={class:"details custom-block"},x={class:"details custom-block"},P=JSON.parse('{"title":"23T3","description":"","frontmatter":{"title":"23T3","outline":"[1,2,3,4]"},"headers":[],"relativePath":"past-papers/23T2.md","filePath":"past-papers/23T2.md"}'),D={name:"past-papers/23T2.md"},Q=Object.assign(D,{setup(r){return(l,a)=>(k(),p("div",null,[s("h1",F,[i(b(l.$frontmatter.title)+" ",1),a[0]||(a[0]=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1))]),a[6]||(a[6]=h(`<nav class="table-of-contents"><ul><li><a href="#question-1-4-marks">Question 1 (4 marks)</a></li><li><a href="#question-2-3-marks">Question 2 (3 marks)</a></li><li><a href="#question-3-4-marks">Question 3 (4 Marks)</a></li><li><a href="#question-4-2-marks">Question 4 (2 marks)</a></li><li><a href="#question-5-3-marks">Question 5 (3 marks)</a></li><li><a href="#question-6-3-marks">Question 6 (3 marks)</a></li></ul></nav><h2 id="question-1-4-marks" tabindex="-1">Question 1 (4 marks) <a class="header-anchor" href="#question-1-4-marks" aria-label="Permalink to &quot;Question 1 (4 marks)&quot;">​</a></h2><details class="details custom-block"><summary>Question</summary><p>In each of the following code snippets</p><ul><li>Identify the error logic present (1 mark)</li><li>Write a failing assertion that would catch the logic error as part of a unit test (e.g “assetEquals(4, f(2))” (1 mark)</li></ul><p>Write your answer in <code>q1.txt</code>.</p><h3 id="part-a-2-marks" tabindex="-1">Part A (2 marks) <a class="header-anchor" href="#part-a-2-marks" aria-label="Permalink to &quot;Part A (2 marks)&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> boolean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isEqual</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Object obj) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  If</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ==</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> obj) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  If</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  If</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ob </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">instanceof</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Article)) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Article other </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (Article) obj;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.title.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">equals</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(other.title) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.view.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">equals</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(other.view);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="part-b-2-marks" tabindex="-1">Part B (2 Marks) <a class="header-anchor" href="#part-b-2-marks" aria-label="Permalink to &quot;Part B (2 Marks)&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> List</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Integer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> withoutOddNumbers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(List</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Integer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> numbers) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (Integer number </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> numbers) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (number </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> !=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      numbers.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">remove</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(number);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></details>`,3)),s("details",v,[a[1]||(a[1]=s("summary",null,"Attempt",-1)),e(n,{storageKey:"23T2-q1"})]),a[7]||(a[7]=h('<h2 id="question-2-3-marks" tabindex="-1">Question 2 (3 marks) <a class="header-anchor" href="#question-2-3-marks" aria-label="Permalink to &quot;Question 2 (3 marks)&quot;">​</a></h2><details class="details custom-block"><summary>Question</summary><h3 id="part-a-1-mark" tabindex="-1">Part A (1 mark) <a class="header-anchor" href="#part-a-1-mark" aria-label="Permalink to &quot;Part A (1 mark)&quot;">​</a></h3><p>Select one or more of the following correct answers:</p><p>The dependency inversion principle encourages programming to _______</p><ol><li>An implementation, not an interface</li><li>An interface, nor an implementation</li><li>Abstraction, not concretions</li><li>Concretions, not abstractions</li><li>A black box</li><li>A white box</li></ol><p>Write your answers in &quot;q2.txt&quot;</p><h3 id="part-b-2-marks-1" tabindex="-1">Part B (2 marks) <a class="header-anchor" href="#part-b-2-marks-1" aria-label="Permalink to &quot;Part B (2 marks)&quot;">​</a></h3><p>Consider the &quot;Angle&quot; class versus the &quot;MathsHelper&quot; class from the &quot;Blackout&quot; assignment, provided in &quot;Angle.java&quot; and &quot;MathsHelper.java&quot;</p><p>Which class do you think has better cohesion? Justify your answer.</p><p>Write your answer in &quot;q2.txt&quot;</p></details>',2)),s("details",A,[a[2]||(a[2]=s("summary",null,"Attempt",-1)),e(n,{storageKey:"23T2-q2"})]),a[8]||(a[8]=s("h2",{id:"question-3-4-marks",tabindex:"-1"},[i("Question 3 (4 Marks) "),s("a",{class:"header-anchor",href:"#question-3-4-marks","aria-label":'Permalink to "Question 3 (4 Marks)"'},"​")],-1)),a[9]||(a[9]=s("details",{class:"details custom-block"},[s("summary",null,"Question"),s("p",null,"In 22T2 COMP2511 is contemplating moving to Jira for students to manage their projects. There are three different types of Jira boards that can be used: Scrum, Kanban and Bug Tracking. All boards have the same flow of work, and allow for features including support for issue tracking and customisation of project-specific features. However, some elements may vary for each type of board — Scrum board takes two week sprits whereas Kanban has a series of epics that are progressed through, and bug tracking projects only have a single backlog. once a project is created as Scrum, Kanban or Bug Tracking it cannot change it type."),s("p",null,"What design pattern could be used to model this? Justify your choice by describing how the above scenario relates to the key characteristics of your chosen Design Pattern."),s("p",null,[i("Write your answer insider "),s("code",null,"q3.txt")])],-1)),s("details",w,[a[3]||(a[3]=s("summary",null,"Attempt",-1)),e(n,{storageKey:"23T2-q3"})]),a[10]||(a[10]=s("h2",{id:"question-4-2-marks",tabindex:"-1"},[i("Question 4 (2 marks) "),s("a",{class:"header-anchor",href:"#question-4-2-marks","aria-label":'Permalink to "Question 4 (2 marks)"'},"​")],-1)),a[11]||(a[11]=s("details",{class:"details custom-block"},[s("summary",null,"Question"),s("p",null,"Webster is waiting for tickets to be released to the next Sydney Swans. He has setup notification on his phone that will alert him when the tickets open, and he is also checking is phone regularly since there are a limited number of tickets and he needs to be the one of the first ones to book to save a place."),s("p",null,"Which implementation of the Observer pattern is present in the above scenario, push or pull? Justify your answer"),s("p",null,"Write your answer inside “q4.txt”")],-1)),s("details",C,[a[4]||(a[4]=s("summary",null,"Attempt",-1)),e(n,{storageKey:"23T2-q4"})]),a[12]||(a[12]=s("h2",{id:"question-5-3-marks",tabindex:"-1"},[i("Question 5 (3 marks) "),s("a",{class:"header-anchor",href:"#question-5-3-marks","aria-label":'Permalink to "Question 5 (3 marks)"'},"​")],-1)),a[13]||(a[13]=s("details",{class:"details custom-block"},[s("summary",null,"Question"),s("p",null,"Identify the code smells present in the following pieces of code, and explain whether you think this is indicative of an underlying design problem, if so what the problem is, or alternative if you think you don’t have enough information to tell."),s("p",null,"Write your answers insider “q5.txt”")],-1)),s("details",x,[a[5]||(a[5]=s("summary",null,"Attempt",-1)),e(n,{storageKey:"23T2-q5"})]),a[14]||(a[14]=s("h2",{id:"question-6-3-marks",tabindex:"-1"},[i("Question 6 (3 marks) "),s("a",{class:"header-anchor",href:"#question-6-3-marks","aria-label":'Permalink to "Question 6 (3 marks)"'},"​")],-1)),a[15]||(a[15]=s("details",{class:"details custom-block"},[s("summary",null,"Question"),s("p",null,"During the project, a student on the forum asked the following question"),s("blockquote",null,[s("p",null,"Are we allowed to modify the “Position” class given to us!”")]),s("p",null,"Tina answered the following"),s("blockquote",null,[s("p",null,"Yes, as long as you don’t ban the precondition and postcondition of that class - we will rely")])],-1))]))}});export{P as __pageData,Q as default};