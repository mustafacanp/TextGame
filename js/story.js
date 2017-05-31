
function createStoryText(storyName){
    is_story_writing = true;
    //console.log(stories);
    $("#container .text").removeClass('story');
    cout(stories[storyName].text,'story'); // Hikayeyi yazdırdı.
    cout("<br>"); // Hikaye sonrası boş satır atlat.
    $('#container .text.story').t({
        speed:25,
        //speed_vary:true,
        caret:false
    });

    setTimeout(function(){
        is_story_writing = false;
    },stories[storyName].text.length*25);

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
