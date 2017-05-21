
function createStoryText(storyName){
    //console.log(stories);
    cout(stories[storyName].text); // Hikayeyi yazdırdı.
    cout("<br>"); // Hikaye sonrası boş satır atlat.
    stories[storyName].isShown = true;
    storyCount++;
    finished_action++;
    action_type = 0;
}
function initStory(){
    if(storyCount < storySequence.length){
        createStoryText(storySequence[storyCount]); // if(storyCount == 1){createStoryText("starting_story");}
    }
}
