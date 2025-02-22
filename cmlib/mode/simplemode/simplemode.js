CodeMirror.defineSimpleMode("simplemode", {

    start: 
    [
        //start tags
        {
            regex: /\s*<SETUP ACTION>\s*$/i,
            token: "tag",
            push: "setup",
            sol: true,
            indent: true,
        },
        
        {
            regex: /\s*<WHOLE ACTION>\s*$/i,
            token: "tag",
            push: "whole",
            sol: true,
            indent: true,
        },
        
        {
            regex: /\s*<TARGET ACTION>\s*$/i,
            token: "tag",
            push: "target",
            sol: true,
            indent: true,
        },
        
        {
            regex: /\s*<FOLLOW ACTION>\s*$/i,
            token: "tag",
            push: "follow",
            sol: true,
            indent: true,
        },
        
        {
            regex: /\s*<FINISH ACTION>\s*$/i,
            token: "tag",
            push: "finish",
            sol: true,
            indent: true,
        },
        
        {
            regex: /\s*<ACTION SEQUENCE PROXY: \d+>\s*$/i,
            token: "tag",
            push: "proxy",
            sol: true,
            indent: true,
        },

        {
            regex: /.*/,
            token: "comment",
        },
    ],
    
    proxy:
    [
        {
            regex: /\s*<\/ACTION SEQUENCE PROXY>\s*$/i,
            token: "tag",
            pop: true,
            sol: true,
            dedent: true,
        },
        
        {
            push: "inTag",
        },
    ],
    
    setup:
    [
        {
            regex: /\s*<\/SETUP ACTION>\s*$/i,
            token: "tag",
            pop: true,
            sol: true,
            dedent: true,
        },
        
        {
            push: "inTag",
        },
    ],
    
    whole:
    [
        {
            regex: /\s*<\/WHOLE ACTION>\s*$/i,
            token: "tag",
            pop: true,
            sol: true,
            dedent: true,
        },
        
        {
            push: "inTag",
        },
    ],
    
    target:
    [
        {
            regex: /\s*<\/TARGET ACTION>\s*$/i,
            token: "tag",
            pop: true,
            sol: true,
            dedent: true,
        },
        
        {
            push: "inTag",
        },
    ],
    
    follow:
    [
        {
            regex: /\s*<\/FOLLOW ACTION>\s*$/i,
            token: "tag",
            pop: true,
            sol: true,
            dedent: true,
        },
        
        {
            push: "inTag",
        },
    ],
    
    finish:
    [
        {
            regex: /\s*<\/FINISH ACTION>\s*$/i,
            token: "tag",
            pop: true,
            sol: true,
            dedent: true,
        },
        
        {
            push: "inTag",
        },
    ],

    inTag: 
    [
        
        //start blocks
        {
            regex: /(\s*)(IF|WHILE)([ ])(.+)$/i,
            token: [null, "keyword", null, "variable-2"],
            sol: true,
            indent: true,
            pop: true,
        },
        //else if
        {
            regex: /(\s*)(ELSE IF)([ ])(.+)$/i,
            token: [null, "keyword", null, "variable-2"],
            sol: true,
            pop: true,
        },
        //Control statements
        {
            regex: /\s*ELSE\s*$/i,
            token: "keyword",
            sol: true,
            pop: true,
        },
        //End Blocks
        {
            regex: /\s*(?:END|END WHILE)\s*$/i,
            token: "keyword",
            sol: true,
            dedent: true,
            pop: true,
        },

        //Simple Commands
        {
            regex: /\s*(?:TIMED ATTACK|ACTION ANIMATION|ACTION COMMON EVENT|CAST ANIMATION|CLEAR BATTLE LOG|DEATH BREAK|DISPLAY ACTION|PERFORM ACTION|PERFORM FINISH|PERFORM START|WAIT FOR ANIMATION|WAIT FOR EFFECT|WAIT FOR MOVEMENT|WAIT FOR NEW LINE|REFRESH STATUS|WAIT FOR FLOAT|WAIT FOR JUMP|WAIT FOR OPACITY|CAMERA CLAMP ON|CAMERA CLAMP OFF|WAIT FOR CAMERA|WAIT FOR ZOOM|FADE OUT|FADE IN|RESET CAMERA|RESET ZOOM|ACTION EFFECT|BGM: STOP|BGM: MEMORIZE|BGM: MEMORY|BGS: STOP|BGS: MEMORIZE|BGS: MEMORY|ME: STOP|SE: PLAY OK|SE: PLAY CURSOR|SE: PLAY CANCEL|SE: PLAY BUZZER|SE: PLAY EQUIP|SE: PLAY SAVE|SE: PLAY LOAD|SE: PLAY BATTLE START|SE: PLAY ESCAPE|SE: PLAY ENEMY ATTACK|SE: PLAY ENEMY DAMAGE|SE: PLAY ENEMY COLLAPSE|SE: PLAY BOSS COLLAPSE 1|SE: PLAY BOSS COLLAPSE 2|SE: PLAY ACTOR DAMAGE|SE: PLAY ACTOR COLLAPSE|SE: PLAY RECOVERY|SE: PLAY MISS|SE: PLAY EVASION|SE: PLAY MAGIC EVASION|SE: PLAY REFLECTION|SE: PLAY SHOP|SE: PLAY USE ITEM|SE: PLAY USE SKILL|SHOW BATTLE HUD|HIDE BATTLE HUD|BYPASS DAMAGE CAP|RESET DAMAGE CAP|RESET DAMAGE MODIFIERS|RESET ARMOR PENETRATION|RESET ARMOR REDUCTION|FORCE CRITICAL|FORCE NO CRITICAL|NORMAL CRITICAL|CLEAR ELEMENT|NULL ELEMENT|)\s*$/i,
            token: "string",
            sol: true,
            pop: true,
        },

        //command: target
        {
            regex: /(\s*)(ATB INTERRUPT|ACTION ANIMATION|ACTION EFFECT|ATTACK ANIMATION)(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(\s*)$/i,
            token: [null, "string", "opperator", "atom", null],
            sol: true,
            pop: true,
        },

        //command: frames
        {
            regex: /(\s*)(WAIT|FADE OUT|FADE IN|RESET CAMERA|RESET ZOOM|ANIMATION WAIT|ANI WAIT)(:[ ])(\d+)(\s*)$/i,
            token: [null, "string", "opperator", "number", null],
            sol: true,
            pop: true,
        },

        //command: target, bool
        {
            regex: /(\s*)(IMMORTAL)(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(,[ ])(true|false)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "keyword",  null],
            sol: true,
            pop: true,
        },
        // add buff
        {
            regex:  /(\s*)(ADD)([ ])(hp|mp|atk|def|mat|mdf|agi|luk)([ ])(BUFF|DEBUFF)(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(?:(,[ ])(\d+)|)(?:(,[ ])(show)|)(\s*)$/i,
            token: [null, "string", null, "variable", null, "string", "opperator", "atom", "opperator", "number", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //remove buff
        {
            regex:  /(\s*)(REMOVE)([ ])(hp|mp|atk|def|mat|mdf|agi|luk)([ ])(BUFF|DEBUFF)(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(?:(,[ ])(show)|)(\s*)$/i,
            token: [null, "string", null, "variable", null, "string", "opperator", "atom", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //add/remove state
        {
            regex: /(\s*)(ADD STATE|REMOVE STATE)([ ]\d+(?:(?:,[ ]\d+)*|))(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(?:(,[ ])(show)|)(\s*)$/i,
            token: [null, "string", "number", "opperator" , "atom", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //animation X: user, (mirror)
        {
            regex: /(\s*)(ANIMATION)([ ]\d+)(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(?:(,[ ])(mirror)|)(\s*)$/i,
            token: [null, "string", "number", "opperator", "atom", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //sound
        {
            regex: /(\s*)(BGM|BGS|ME|SE)(:[ ])(\w+)(?:(?:(,[ ])(\d+)(,[ ])(\d+)(,[ ])(\d+))|)(\s*)$/i,
            token: [null, "string", "opperator", "variable-2", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //change switch
        {
            regex: /(\s*)(CHANGE SWITCH)([ ])(\d+|\d+\.\.\d+|\d+ TO \d+)(:[ ])(on|off|toggle|switch \d+)(\s*)$/i,
            token: [null, "string", null, "number", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //change variable
        {
            regex: /(\s*)(CHANGE VARIABLE)([ ]\d+)([ ])(=|\+=|-=|\*=|\/=|%=)([ ]\d+)(\s*)$/i,
            token: [null, "string", "number", null, "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //collapse
        {
            regex: /(\s*)(COLLAPSE)(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(?:(,[ ])(force)|)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //common event
        {
            regex: /(\s*)(COMMON EVENT|DAMAGE CAP|HEALING CAP|TIMED ATTACK)(:[ ])(\d+)(\s*)$/i,
            token: [null, "string", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //eval
        {
            regex: /(\s*)(EVAL)(:[ ])(.+)(\s*)$/i,
            token: [null, "string", "opperator", "variable-2", null],
            sol: true,
            pop: true,
        },
        //+- equipment
        {
            regex: /(\s*)(GAIN|LOSE)([ ])(ITEM|WEAPON|ARMOR)([ ]\d+)(?:(:[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", null, "string", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //gold +-
        {
            regex: /(\s*)(GOLD)([ ])(\+|\-)(\d+)(\s*)$/i,
            token: [null, "string", null, "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //hpmptp +-
        {
            regex: /(\s*)(HP|MP|TP)([ ])(\+|\-)(VARIABLE[ ]|)(\d+)(\%|)(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(?:(,[ ])(show)|)(\s*)$/i,
            token: [null, "string", null, "opperator", "string", "number", null, "opperator", "atom", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //enemy effect
        {
            regex: /(\s*)(ENEMY EFFECT)(:[ ])(user|target|targets|enemies|existing enemies|all enemies|dead enemies|enemies not user|friends|all friends|dead friends|friends not user|opponents|all opponents|dead opponents|(?:(?:character|enemy|friend|opponent)[ ]\d+))(,[ ])(whiten|blink)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "keyword"],
            sol: true,
            pop: true,
        },
        //flash screen color
        {
            regex: /(\s*)(FLASH SCREEN)(:[ ])(WHITE|RED|ORANGE|YELLOW|GREEN|BLUE|PURPLE|MAGENTA|BLACK)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "variable", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //tint screen color
        {
            regex: /(\s*)(TINT SCREEN)(:[ ])(NORMAL|DARK|SEPIA|SUNSET|NIGHT)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "variable", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //flash screen rgb
        {
            regex: /(\s*)(FLASH SCREEN)(:[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //tint screen rgb
        {
            regex: /(\s*)(TINT SCREEN)(:[ ]\-|:[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,[ ]\-|,[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,[ ]\-|,[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,[ ])(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //action target: #/#% (frames)
        {
            regex: /(\s*)(FLOAT|JUMP|OPACITY)([ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(:[ ])(\d+)(\%|)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "number", "opperator", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        //sv motion
        {
            regex: /(\s*)(MOTION)([ ])(WAIT|WALK|STANDBY|CHANT|GUARD|DAMAGE|EVADE|ATTACK|THRUST|SWING|MISSILE|SKILL|SPELL|ITEM|ESCAPE|VICTORY|DYING|ABNORMAL|SLEEP|DEAD)(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(?:(,[ ])(no weapon)|)(\s*)$/i,
            token: [null, "string", null, "variable", "opperator", "atom", "opperator", "keyword", null],
            sol: true,
            pop: true,
        },
        //shake screen
        {
            regex: /(\s*)(SHAKE SCREEN)(?:(: )(\d+)(?:(, )(\d+)|)(?:(, )(\d+)|)|)(\s*)$/i,
            token: [null, "string", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(FACE)([ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(:[ ])(FORWARD|NORMAL|BACKWARD|MIRROR|HOME|ORIGIN|AWAY FROM HOME|AWAY FROM ORIGIN|(?:subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+)))(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "atom", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(FACE)([ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(:[ ])(AWAY FROM)([ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "variable", null, "atom", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(FACE)([ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(:[ ])(POINT|POSITION|COORDINATE|SCREEN|SCREEN POS|COORDINATES|AWAY FROM POINT|AWAY FROM POSITION|AWAY FROM COORDINATE|AWAY FROM SCREEN|AWAY FROM SCREEN POS|AWAY FROM COORDINATES)(,[ ])(\d+)(,[ ])(\d+)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "variable", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(MOVE)([ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(:[ ])(HOME|ORIGIN|RETURN)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "variable", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(MOVE)([ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(:[ ])(FORWARD|FORWARDS|BACKWARDS|BACKWARD)(?:(,[ ])(\d+)|)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "variable", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(MOVE)([ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(,[ ])(FRONT BASE|FRONT FOOT|FRONT FEET|FRONT|BASE|FOOT|FEET|BACK BASE|BACK FOOT|BACK FEET|BACK|FRONT CENTER|FRONT MIDDLE||CENTER|MIDDLE|BACK CENTER|BACK MIDDLE|FRONT HEAD|FRONT TOP|HEAD|TOP|BACK HEAD|BACK TOP)(?:(,[ ])(\d+)|)(,[ ])(offset\s[xy]\s[+-]\d+)(,[ ])(offset\s[xy]\s[+-]\d+)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "atom", "opperator", "variable", "opperator", "number", "opperator", "atom", "opperator", "atom", null],
            sol: true,
            pop: true,
        },
        
        {
            regex:  /(\s*)(MOVE)([ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(:[ ])(POINT|POSITION|COORDINATE|SCREEN|SCREEN POS|COORDINATES)(,[ ]|,[ ]\-)(\d+)(,[ ]|,[ ]\-)(\d+)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", null, "atom", "opperator", "variable", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(CAMERA FOCUS|CAMERA SCREEN)(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(?:(,[ ])(FRONT BASE|FRONT FOOT|FRONT FEET|FRONT|BASE|FOOT|FEET|BACK BASE|BACK FOOT|BACK FEET|BACK|FRONT CENTER|FRONT MIDDLE||CENTER|MIDDLE|BACK CENTER|BACK MIDDLE|FRONT HEAD|FRONT TOP|HEAD|TOP|BACK HEAD|BACK TOP)|)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "variable", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(CAMERA OFFSET)(:[ ])(LEFT|RIGHT|UP|DOWN)(,[ ])(.+)(\s*)$/i,
            token: [null, "string", "opperator", "variable", "opperator", "variable-2", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(CAMERA PAN)(:[ ])(LEFT|RIGHT|UP|DOWN)(,[ ])(\d+)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "variable", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(CAMERA SCREEN)(:[ ])(TOP LEFT|FAR LEFT|BOTTOM LEFT|TOP CENTER|CENTER|BOTTOM CENTER|TOP RIGHT|FAR RIGHT|BOTTOM RIGHT)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(CAMERA SCREEN)(:[ ])(POINT)(,[ ])(\d+)(,[ ])(\d+)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "variable", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(ZOOM)(:[ ])(?:(\d+)(\%)|(\d+)(\.)(\d+))(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "opperator", "number", "opperator", "number", "opperator", "number", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(proxy)([ ])(\d+)([ ])(from)([ ])(\d+)(\s*)$/i,
            token: [null, "string", null, "number", null, "string", null, "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(ATB CHARGE|ATB GAUGE|ATB SPEED|CTB SPEED)(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(,[ ])(\+|)(\d+)(\%|)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "opperator", "number", "opperator", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(CTB ORDER)(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(,[ ])(\+|\-)(\d+)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(DAMAGE RATE|GLOBAL RATE|HEAL RATE|CRITICAL MULTIPLIER)(:[ ])(?:(?:(\d+)(\%))|(?:(\d+)(\.)(\d+))|(?:(VARIABLE)([ ]\d+)))(\s*)$/i,
            token: [null, "string", "opperator", "number", "opperator", "number", "opperator", "number", "string", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(FLAT DAMAGE|FLAT GLOBAL|FLAT HEAL|FLAT CRITICAL)(:[ ])(?:(\+)|(\-)|(VARIABLE[ ]))(\d+)(\s*)$/i,
            token: [null, "string", "opperator", "opperator", "opperator", "string", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(ARMOR PENETRATION|ARMOR REDUCTION)(:[ ])(\d+)(\%|)(\s*)$/i,
            token: [null, "string", "opperator", "opperator", "number", "opperator", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(ADD ELEMENT|FORCE ELEMENT)(:[ ])(?:(\d+(?:,[ ]\d+|)*)|(\w+(?:,[ ]\w+|)*))(\s*)$/i,
            token: [null, "string", "opperator", "number", "variable-2", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(BATTLEBACK[ ])(\d+[ ])(REMOVE|FADE OUT|FADE IN|RESET SCROLL SPEED)(\s*)$/i,
            token: [null, "string", "number", "variable", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(BATTLEBACK[ ])(\d+[ ])(ADD|CHANGE TO)(:[ ])(\w+)(,[ ])(\w+)(?:(,[ ])(\d+)|)(\s*)$/i,
            token: [null, "string", "number", "variable", "opperator", "variable-2", "opperator", "variable-2", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(BATTLEBACK[ ])(\d+[ ])(FADE OUT|FADE IN)(:[ ])(\d+)(\s*)$/i,
            token: [null, "string", "number", "variable", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(BATTLEBACK[ ])(\d+[ ])(OPACITY)(:[ ])(\d+)(\%|)(\s*)$/i,
            token: [null, "string", "number", "variable", "opperator", "number", "opperator", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(BATTLEBACK[ ])(\d+[ ])(SCROLL SPEED[ ])(X|Y)(:[ ])(\+|\-)(\d+)(\s*)$/i,
            token: [null, "string", "number", "string", "string", "opperator", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(GLOBAL COOLDOWN)(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(,[ ])(\+|\-|)(\d+)(\s*)$/i,
            token: [null, "string", "opperator", "atom", "opperator", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /(\s*)(SKILL|SKILL TYPE)([ ]\d+[ ])(COOLDOWN)(:[ ])(subject|first|user|target|targets|actors|existing actors|alive actors|actors all|party|all actors|dead actor|dead actors|actors not user|actors not subject|enemies|existing enemies|alive enemies|troop|troops|enemies all|all enemies|dead enemies|dead enemy|enemies not user|enemies not subject|troop not user|troop not subject|friend|allies|friends|all friends|all allies|dead friend|dead allies|dead friends|allies not user|friends not user|opponent|rivals|foes|opponents|all opponents|all rivals|all foes|dead opponent|dead rivals|dead foes|dead opponents|all alive|all members|all dead|all not user|focus|participants|not focus|nonparticipants|(?:(?:actor|char|chara|character|enemy|friend|ally|opponent|foe|rival)[ ]\d+))(,[ ])(\+|\-|)(\d+)(\s*)$/i,
            token: [null, "string", "number", "string", "opperator", "atom", "opperator", "opperator", "number", null],
            sol: true,
            pop: true,
        },
        
        {
            regex: /.*/i,
            token: "error",
            pop: true,
        },
    ],

    meta: 
    {

    }
});