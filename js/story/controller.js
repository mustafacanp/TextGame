
function createStoryText(storyName){

    cout(stories[storyName].text); // Hikayeyi yazdırdı.
    cout(" "); // Hikaye sonrası boş satır atlat.

    stories[storyName].isShown = true;
    storyCount++;
    finished_action++;
    action_type = "story";
}
function initStory(){
    if(storyCount < storySequence.length){
        createStoryText(storySequence[storyCount]); // if(storyCount == 1){createStoryText("starting_story");}
    }
}
