
function createStoryText(storyName){
    storyCount++;
    cout("",stories[storyName ].text,"",0); // Hikayeyi yazdırdı.
    cout("", "<br>", "", 0); // Hikaye sonrası boş satır atlat.
    stories[storyName].isShown = true;
    finished_action++;
    action_type = 0;
}
function initStory(){
    if(storyCount < storySequence.length){
        createStoryText(storySequence[storyCount]); // if(storyCount == 1){createStoryText("starting_story");}
    }
}
