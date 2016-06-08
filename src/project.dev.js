require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ActionCallback":[function(require,module,exports){
"use strict";
cc._RFpush(module, '2881e6K1edLBbgvc+6/YN7o', 'ActionCallback');
// cases\05_scripting\03_events\ActionCallback.js

cc.Class({
    'extends': cc.Component,

    // use this for initialization
    onLoad: function onLoad() {
        var touchEvent = this.getComponent('TouchEvent');
        var mouseEvent = this.getComponent('MouseEvent');
        var event = touchEvent || mouseEvent;
        event._callback = function () {
            this.node.runAction(cc.sequence(cc.scaleTo(0.5, 2, 1), cc.scaleTo(0.25, 1, 1)));
        };
    }
});

cc._RFpop();
},{}],"AdaptiveSprite":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4edf1JTF/BHIKZVY3FaAqsT', 'AdaptiveSprite');
// scripts\Global\AdaptiveSprite.js

cc.Class({
    "extends": cc.Component,

    properties: {

        padding: 20,

        label: {
            "default": null,
            type: cc.Node
        },

        backgroup: {
            "default": null,
            type: cc.Node
        }

    },

    update: function update() {
        if (this.backgroup.width !== this.label.width) {
            this.backgroup.width = this.label.width + this.padding;
        }
        if (this.backgroup.height !== this.label.height) {
            this.backgroup.height = this.label.height + this.padding;
        }
    }

});

cc._RFpop();
},{}],"AlignOnceWidgetCtrl":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4d1b9uLXd9DQ7ZXTjnmoonx', 'AlignOnceWidgetCtrl');
// cases\02_ui\01_widget\AlignOnceWidgetCtrl.js

cc.Class({
    "extends": cc.Component,

    properties: {
        target: {
            "default": null,
            type: cc.Widget
        },
        tips: {
            "default": null,
            type: cc.Label
        },
        alignOnceBtn: {
            "default": [],
            type: cc.Button
        }
    },

    onLoad: function onLoad() {
        this.alignOnceTips = "";
        this._anim = this.target.getComponent(cc.Animation);
    },

    onClickAlignOnce_True: function onClickAlignOnce_True(event) {
        this.alignOnceBtn[0].interactable = false;
        this.alignOnceBtn[1].interactable = true;
        this.updateInfo(true);
    },

    onClickAlignOnce_False: function onClickAlignOnce_False(event) {
        this.alignOnceBtn[0].interactable = true;
        this.alignOnceBtn[1].interactable = false;
        this.updateInfo(false);
    },

    updateInfo: function updateInfo(hasAlignOnce) {
        this.target.enabled = false;
        this.target.isAlignOnce = hasAlignOnce;
        this.target.enabled = true;
        this._anim.stop("alignOnce_move");
        this._anim.play("alignOnce_move");
        this.alignOnceTips = "isAlignOnce: " + hasAlignOnce;
    },

    update: function update() {
        if (this.alignOnceTips !== "") {
            this.tips.string = this.alignOnceTips + ", Widget enabled: " + this.target.enabled;
        }
    }
});

cc._RFpop();
},{}],"AnimateCustomPropertyCtrl":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fb14cmn7KJJCo4qVcOy/GmS', 'AnimateCustomPropertyCtrl');
// cases\03_gameplay\03_animation\AnimateCustomPropertyCtrl.js

cc.Class({
    "extends": cc.Component,

    properties: {
        hp: 0,
        emissionRote: 0,
        num: 0,
        hpBar: {
            "default": null,
            type: cc.ProgressBar
        },
        particle: {
            "default": null,
            type: cc.ParticleSystem
        },
        score: {
            "default": null,
            type: cc.Label
        }
    },

    update: function update(dt) {
        this.hpBar.progress = this.hp;
        this.particle.emissionRate = this.emissionRote;
        this.score.string = Math.ceil(this.num);
    }
});

cc._RFpop();
},{}],"AnimationEvent":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1dc09SR4TdLU74RjGBArlm0', 'AnimationEvent');
// cases\03_gameplay\03_animation\AnimationEvent.js

var i18n = require('i18n');

cc.Class({
    'extends': cc.Component,

    properties: {},

    onLoad: function onLoad() {
        var node = cc.find('Canvas/Label');
        this._label = node.getComponent(cc.Label);
        this._animCtrl = this.node.getComponent(cc.Animation);
    },

    onNextAnimation: function onNextAnimation(step) {
        this._animCtrl.play("step_" + step);
        this._label.string = i18n.t("cases/03_gameplay/03_animation/AnimationEvent.js.1") + step + "个动画";
    }
});

cc._RFpop();
},{"i18n":"i18n"}],"AssetLoading":[function(require,module,exports){
"use strict";
cc._RFpush(module, '65aa6czKHtKGZog+yjK1bc6', 'AssetLoading');
// cases\05_scripting\07_asset_loading\AssetLoading.js

var i18n = require('i18n');

cc.Class({
    "extends": cc.Component,

    properties: {
        showWindow: {
            "default": null,
            type: cc.Node
        },

        loadAnimTestPrefab: {
            "default": null,
            type: cc.Prefab
        },

        loadTips: {
            "default": null,
            type: cc.Label
        },

        loadList: {
            "default": [],
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // cur load Target
        this._curType = "";
        this._lastType = "";
        this._curRes = null;
        this._btnLabel = null;
        this._audioSource = null;
        this._isLoading = false;
        // add load res url
        this._urls = {
            // Raw Asset
            Audio: "test assets/audio",
            Txt: "test assets/text",
            Texture: "test assets/PurpleMonster",
            // Raw Asset, use raw url
            Font: cc.url.raw("resources/test assets/font.fnt"),
            Plist: cc.url.raw("resources/test assets/atom.plist"),
            // Asset
            SpriteFrame: "test assets/image",
            Prefab: "test assets/prefab",
            Animation: "test assets/sprite-anim",
            Scene: "test assets/scene",
            Spine: "spineboy/spineboy"
        };
        // registered event
        this._onRegisteredEvent();
    },

    _onRegisteredEvent: function _onRegisteredEvent() {
        for (var i = 0; i < this.loadList.length; ++i) {
            this.loadList[i].on(cc.Node.EventType.TOUCH_END, this._onClick.bind(this));
        }
    },

    _onClick: function _onClick(event) {
        if (this._isLoading) {
            return;
        }

        this._onClear();

        this._curType = event.target.name.split('_')[1];
        if (this._lastType !== "" && this._curType === this._lastType) {
            this._onShowResClick(event);
            return;
        }

        if (this._btnLabel) {
            this._btnLabel.string = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.1") + this._lastType;
        }

        this._lastType = this._curType;

        this._btnLabel = event.target.getChildByName("Label").getComponent("cc.Label");

        this.loadTips.string = this._curType + " Loading....";
        this._isLoading = true;

        this._load();
    },

    _load: function _load() {
        var url = this._urls[this._curType];
        var loadCallBack = this._loadCallBack.bind(this);
        switch (this._curType) {
            case 'SpriteFrame':
                // specify the type to load sub asset from texture's url
                cc.loader.loadRes(url, cc.SpriteFrame, loadCallBack);
                break;
            case 'Spine':
                // specify the type to avoid the duplicated name from spine atlas
                cc.loader.loadRes(url, sp.SkeletonData, loadCallBack);
                break;
            case 'Animation':
            case 'Prefab':
            case 'Scene':
            case 'Texture':
            case 'Txt':
            case 'Audio':
                cc.loader.loadRes(url, loadCallBack);
                break;
            default:
                cc.loader.load(url, loadCallBack);
                break;
        }
    },

    _loadCallBack: function _loadCallBack(err, res) {
        this._isLoading = false;
        if (err) {
            cc.log('Error url [' + err + ']');
            return;
        }
        this._curRes = res;
        if (this._curType === "Audio") {
            this._btnLabel.string = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.2");
        } else {
            this._btnLabel.string = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.3");
        }
        this._btnLabel.string += this._curType;
        this.loadTips.string = this._curType + " Loaded Successfully!";
    },

    _onClear: function _onClear() {
        this.showWindow.removeAllChildren(true);
        if (this._audioSource && this._audioSource instanceof cc.AudioSource) {
            this._audioSource.stop();
        }
    },

    _onShowResClick: function _onShowResClick(event) {
        if (this._curType === "Scene") {
            cc.director.runScene(this._curRes.scene);
            cc.loader.releaseAsset(this._curRes);
            this._curRes = null;

            return;
        }
        this._createNode(this._curType, this._curRes);
    },

    _createNode: function _createNode(type, res) {
        this.loadTips.string = "";
        var node = new cc.Node("New " + type);
        node.setPosition(0, 0);
        var component = null;
        switch (this._curType) {
            case "SpriteFrame":
                component = node.addComponent(cc.Sprite);
                component.spriteFrame = res;
                break;
            case "Texture":
                component = node.addComponent(cc.Sprite);
                component.spriteFrame = new cc.SpriteFrame(res);
                break;
            case "Audio":
                component = node.addComponent(cc.AudioSource);
                component.clip = res;
                component.play();
                this._audioSource = component;
                this.loadTips.string = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.4");
                break;
            case "Txt":
                component = node.addComponent(cc.Label);
                component.lineHeight = 40;
                component.string = res;
                break;
            case "Font":
                component = node.addComponent(cc.Label);
                component.file = this._urls.Font;
                component.lineHeight = 40;
                component.string = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.5");
                break;
            case "Plist":
                component = node.addComponent(cc.ParticleSystem);
                component.file = this._urls.Plist;
                component.resetSystem();
                break;
            case "Prefab":
                var prefab = cc.instantiate(res);
                prefab.parent = node;
                prefab.setPosition(0, 0);
                break;
            case "Animation":
                var loadAnim = cc.instantiate(this.loadAnimTestPrefab);
                loadAnim.parent = node;
                loadAnim.setPosition(0, 0);
                var AanimCtrl = loadAnim.getComponent(cc.Animation);
                AanimCtrl.addClip(res);
                AanimCtrl.play(res.name);
                break;
            case "Spine":
                component = node.addComponent(sp.Skeleton);
                component.skeletonData = res;
                component.animation = "walk";
                node.y = -248;
                break;
        }
        this.showWindow.addChild(node);
    }
});

cc._RFpop();
},{"i18n":"i18n"}],"AudioControl":[function(require,module,exports){
"use strict";
cc._RFpush(module, '8c95bT2M3hBPIdRDVftiUQG', 'AudioControl');
// cases\04_audio\AudioControl.js

cc.Class({
    "extends": cc.Component,

    properties: {
        musicPlayer: {
            "default": null,
            type: cc.AudioSource
        },
        dingClip: {
            "default": null,
            url: cc.AudioClip
        },
        cheeringClip: {
            "default": null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        // play audioSource
        self.musicPlayer.play();

        // play ding in 1 sec, play cheering in 2 sec
        setTimeout(function () {
            cc.audioEngine.playEffect(self.dingClip, false);
            setTimeout(function () {
                cc.audioEngine.playEffect(self.cheeringClip, false);
            }, 2000);
        }, 1000);
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{}],"Bar":[function(require,module,exports){
"use strict";
cc._RFpush(module, '990e2c/1VlE9pmwd+Ftseau', 'Bar');
// cases\05_scripting\05_cross_reference\Bar.js

cc.Class({
    'extends': cc.Component,

    properties: function properties() {
        return {
            refToFoo: require('Foo')
        };
    },

    // use this for initialization
    onLoad: function onLoad() {
        var tip = this.node.children[0].getComponent(cc.Label);
        tip.string = this.name + ' has reference to ' + this.refToFoo.name;
    }
});

cc._RFpop();
},{"Foo":"Foo"}],"Bullet":[function(require,module,exports){
"use strict";
cc._RFpush(module, '20d7dzfVhZNh4gNZzwaQgEl', 'Bullet');
// cases\collider\Shooter\Bullet.js

cc.Class({
    "extends": cc.Component,

    properties: {
        speed: 100
    },

    // use this for initialization
    onLoad: function onLoad() {},

    onCollisionEnter: function onCollisionEnter(other, self) {
        this.node.destroy();
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.node.y += this.speed * dt;
    }
});

cc._RFpop();
},{}],"ButtonControl1":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e6dc7dWcxxJuofXB7ergGnC', 'ButtonControl1');
// cases\02_ui\03_button\ButtonControl1.js

var i18n = require('i18n');

cc.Class({
    'extends': cc.Component,

    properties: {
        buttonLeft: {
            'default': null,
            type: cc.Button
        },
        buttonRight: {
            'default': null,
            type: cc.Button
        },
        display: {
            'default': null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // You can also register event listener using the method below
        // this.buttonLeft.getComponent(cc.Button).on(cc.EButton.EVENT_TOUCH_UP, this.onBtnLeftClicked, this);
        // this.buttonRight.getComponent(cc.Button).on(cc.EButton.EVENT_TOUCH_UP, this.onBtnRightClicked, this);
    },

    onBtnLeftClicked: function onBtnLeftClicked() {
        console.log('Left button clicked!');
        this.display.string = i18n.t("cases/02_ui/03_button/ButtonControl1.js.1");
    },

    onBtnRightClicked: function onBtnRightClicked() {
        console.log('Right button clicked!');
        this.display.string = i18n.t("cases/02_ui/03_button/ButtonControl1.js.2");
    },

    onBtnInScrollClicked: function onBtnInScrollClicked(event) {
        var msg = event.target.name + ' clicked!';
        console.log(msg);
        this.display.string = msg;
    }
});

cc._RFpop();
},{"i18n":"i18n"}],"ButtonInteractable":[function(require,module,exports){
"use strict";
cc._RFpush(module, '18e60T2NZpEwZAunS+2rFMK', 'ButtonInteractable');
// cases\02_ui\03_button\ButtonInteractable.js

var i18n = require('i18n');

cc.Class({
    'extends': cc.Component,

    properties: {
        buttonLeft: {
            'default': null,
            type: cc.Button
        },
        buttonRight: {
            'default': null,
            type: cc.Button
        },
        labelLeft: {
            'default': null,
            type: cc.Label
        },
        labelRight: {
            'default': null,
            type: cc.Label
        }
    },

    onBtnLeftClicked: function onBtnLeftClicked() {
        console.log('Left button clicked!');
        this.buttonLeft.interactable = false;
        this.buttonRight.interactable = true;

        this.updateInfo();
    },

    onBtnRightClicked: function onBtnRightClicked() {
        console.log('Right button clicked!');
        this.buttonRight.interactable = false;
        this.buttonLeft.interactable = true;

        this.updateInfo();
    },

    updateInfo: function updateInfo() {
        this.labelLeft.string = i18n.t("cases/02_ui/03_button/ButtonInteractable.js.1") + this.buttonLeft.interactable;
        this.labelRight.string = i18n.t("cases/02_ui/03_button/ButtonInteractable.js.2") + this.buttonRight.interactable;
    }
});

cc._RFpop();
},{"i18n":"i18n"}],"ColliderListener":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9d60fXxtXFNeI79PM6EXYuZ', 'ColliderListener');
// cases\collider\Category\ColliderListener.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;

        cc.director.setDisplayStats(true);
        this.touchingNumber = 0;
    },

    onCollisionEnter: function onCollisionEnter(other) {
        this.node.color = cc.Color.RED;
        this.touchingNumber++;
    },

    onCollisionStay: function onCollisionStay(other) {
        // console.log('on collision stay');
    },

    onCollisionExit: function onCollisionExit() {
        this.touchingNumber--;
        if (this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"ComeBackToAssetLoad":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'cb585k+cxFKjohloTN1+FuU', 'ComeBackToAssetLoad');
// cases\05_scripting\07_asset_loading\ComeBackToAssetLoad.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {},

    onComeBlack: function onComeBlack() {
        cc.director.loadScene("AssetLoading.fire");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"CustomEvent":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5cc23aoYcxIKazRFwKWGEI7', 'CustomEvent');
// cases\05_scripting\03_events\CustomEvent.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {
        var touchEvent = this.getComponent('TouchEvent');

        // Emit CUSTOM_EVENT to its listeners while touch end
        touchEvent._callback = (function () {
            this.node.emit('CUSTOM_EVENT');
        }).bind(this);

        var addButton = cc.find('Canvas/add');
        var cancelButton = cc.find('Canvas/cancel');

        function onCustomEvent(event) {
            this.runAction(cc.sequence(cc.scaleTo(0.5, 2, 1), cc.scaleTo(0.25, 1, 1)));
        }

        this.node.on('CUSTOM_EVENT', onCustomEvent, addButton);
        this.node.on('CUSTOM_EVENT', onCustomEvent, cancelButton);
    }
});

cc._RFpop();
},{}],"DestroySelf":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c07302m/oFJeIq2igPCJbWE', 'DestroySelf');
// cases\05_scripting\06_life_cycle\DestroySelf.js

cc.Class({
    "extends": cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        console.log("Pos: " + this.node.getPosition().x + ", " + this.node.getPosition().y);
        this.node.runAction(cc.sequence(cc.moveBy(2, 200, 0), cc.callFunc(function () {
            console.log("Pos: " + this.node.x + ", " + this.node.y);
            this.node.destroy();
        }, this)));
    }
});

cc._RFpop();
},{}],"FilledSpriteControl":[function(require,module,exports){
"use strict";
cc._RFpush(module, '50a95ObLqFH2rz6eShvGuNK', 'FilledSpriteControl');
// cases\01_graphics\01_sprite\FilledSpriteControl.js

cc.Class({
    "extends": cc.Component,

    properties: {

        speed: 0.1,

        horizontal: {
            "default": null,
            type: cc.Sprite
        },

        vertical: {
            "default": null,
            type: cc.Sprite
        },

        radial_round: {
            "default": null,
            type: cc.Sprite
        },

        radial_semicircle: {
            "default": null,
            type: cc.Sprite
        }
    },

    update: function update(dt) {
        // update fill start
        this._updataFillStart(this.horizontal, dt);
        this._updataFillStart(this.vertical, dt);
        // update fill range
        this._updateFillRange(this.radial_round, 1, dt);
        this._updateFillRange(this.radial_semicircle, 0.5, dt);
    },

    _updataFillStart: function _updataFillStart(sprite, dt) {
        var fillStart = sprite.fillStart;
        fillStart = fillStart > 0 ? fillStart -= dt * this.speed : 1;
        sprite.fillStart = fillStart;
    },

    _updateFillRange: function _updateFillRange(sprite, range, dt) {
        var fillRange = sprite.fillRange;
        fillRange = fillRange < range ? fillRange += dt * this.speed : 0;
        sprite.fillRange = fillRange;
    }

});

cc._RFpop();
},{}],"Foo":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1ea36nYikVOup6BzaEIMYPH', 'Foo');
// cases\05_scripting\05_cross_reference\Foo.js

cc.Class({
    'extends': cc.Component,

    properties: function properties() {
        return {
            refToBar: require('Bar')
        };
    },

    // use this for initialization
    onLoad: function onLoad() {
        var tip = this.node.children[0].getComponent(cc.Label);
        tip.string = this.name + ' has reference to ' + this.refToBar.name;
    }
});

cc._RFpop();
},{"Bar":"Bar"}],"GoldBeatingAnime":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'bff49Gn9LVF0YZB0Q/MOguP', 'GoldBeatingAnime');
// cases\02_ui\02_label\GoldBeatingAnime.js

var i18n = require('i18n');

cc.Class({
    "extends": cc.Component,

    properties: {
        speed: 50,
        gold_label: {
            "default": null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.curGold = 0;
        this.curIndex = 0;
    },

    update: function update(dt) {
        this.curIndex += dt * this.speed;
        if (this.curIndex > 10) {
            this.curIndex = 0;
            this.curGold++;
            this.gold_label.string += this.curGold;
            if (this.gold_label.string.length > 10) {
                this.gold_label.string = i18n.t("cases/02_ui/02_label/GoldBeatingAnime.js.1");
                this.curGold = 0;
            }
        }
    }
});

cc._RFpop();
},{"i18n":"i18n"}],"Helpers":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c8640M3ozRErrV/Go3uTknt', 'Helpers');
// scripts\Global\Helpers.js

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  getRandomInt: getRandomInt
};

cc._RFpop();
},{}],"HeroControl":[function(require,module,exports){
"use strict";
cc._RFpush(module, '339d2dg1QpEKKxBJBzHiDJ0', 'HeroControl');
// cases\collider\Platform\HeroControl.js


cc.Class({
    "extends": cc.Component,

    properties: {
        speed: cc.v2(0, 0),
        maxSpeed: cc.v2(2000, 2000),
        gravity: -1000,
        drag: 1000,
        direction: 0,
        jumpSpeed: 300
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        //add keyboard input listener to call turnLeft and turnRight
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.onKeyPressed.bind(this),
            onKeyReleased: this.onKeyReleased.bind(this)
        }, this.node);

        this.collisionX = 0;
        this.collisionY = 0;

        this.prePosition = cc.v2();
        this.preStep = cc.v2();

        this.touchingNumber = 0;
    },

    onDisabled: function onDisabled() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    onKeyPressed: function onKeyPressed(keyCode, event) {
        switch (keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.direction = -1;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.direction = 1;
                break;
            case cc.KEY.w:
            case cc.KEY.up:
                if (!this.jumping) {
                    this.jumping = true;
                    this.speed.y = this.jumpSpeed;
                }
                break;
        }
    },

    onKeyReleased: function onKeyReleased(keyCode, event) {
        switch (keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
            case cc.KEY.d:
            case cc.KEY.right:
                this.direction = 0;
                break;
        }
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        this.node.color = cc.Color.RED;

        this.touchingNumber++;

        var otherAabb = other.world.aabb;
        var selfAabb = self.world.aabb.clone();
        var preAabb = self.world.preAabb;

        selfAabb.x = preAabb.x;
        selfAabb.y = preAabb.y;

        selfAabb.x = self.world.aabb.x;
        if (cc.Intersection.rectRect(selfAabb, otherAabb)) {
            if (this.speed.x < 0 && selfAabb.xMax > otherAabb.xMax) {
                this.node.x = otherAabb.xMax;
                this.collisionX = -1;
            } else if (this.speed.x > 0 && selfAabb.xMin < otherAabb.xMin) {
                this.node.x = otherAabb.xMin - selfAabb.width;
                this.collisionX = 1;
            }

            this.speed.x = 0;
            other.touchingX = true;
            return;
        }

        selfAabb.y = self.world.aabb.y;
        if (cc.Intersection.rectRect(selfAabb, otherAabb)) {
            if (this.speed.y < 0 && selfAabb.yMax > otherAabb.yMax) {
                this.node.y = otherAabb.yMax;
                this.jumping = false;
                this.collisionY = -1;
            } else if (this.speed.y > 0 && selfAabb.yMin < otherAabb.yMin) {
                this.node.y = otherAabb.yMin - selfAabb.height;
                this.collisionY = 1;
            }

            this.speed.y = 0;
            other.touchingY = true;
        }
    },

    onCollisionStay: function onCollisionStay(other, self) {
        if (this.collisionY === -1) {
            var offset = cc.v2(other.world.aabb.x - other.world.preAabb.x, 0);

            var temp = cc.affineTransformClone(self.world.transform);
            temp.tx = temp.ty = 0;

            offset = cc.pointApplyAffineTransform(offset, temp);
            this.node.x += offset.x;
        }
    },

    onCollisionExit: function onCollisionExit(other) {
        this.touchingNumber--;
        if (this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        }

        if (other.touchingX) {
            this.collisionX = 0;
            other.touchingX = false;
        } else if (other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
            this.jumping = true;
        }
    },

    update: function update(dt) {
        if (this.collisionY === 0) {
            this.speed.y += this.gravity * dt;
            if (Math.abs(this.speed.y) > this.maxSpeed.y) {
                this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }
        }

        if (this.direction === 0) {
            if (this.speed.x > 0) {
                this.speed.x -= this.drag * dt;
                if (this.speed.x <= 0) this.speed.x = 0;
            } else if (this.speed.x < 0) {
                this.speed.x += this.drag * dt;
                if (this.speed.x >= 0) this.speed.x = 0;
            }
        } else {
            this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * dt;
            if (Math.abs(this.speed.x) > this.maxSpeed.x) {
                this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x;
            }
        }

        if (this.speed.x * this.collisionX > 0) {
            this.speed.x = 0;
        }

        this.prePosition.x = this.node.x;
        this.prePosition.y = this.node.y;

        this.preStep.x = this.speed.x * dt;
        this.preStep.y = this.speed.y * dt;

        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;
    }
});

cc._RFpop();
},{}],"InitData":[function(require,module,exports){
"use strict";
cc._RFpush(module, '3ae4cUsGcBIE4q7Ksp4ZX/H', 'InitData');
// cases\05_scripting\08_module\InitData.js


var _monsterInfo = {
    name: "Slime",
    hp: 100,
    lv: 1,
    atk: 10,
    defense: 5,
    imageUrl: "test assets/PurpleMonster"
};

module.exports = {
    monsterInfo: _monsterInfo
};

cc._RFpop();
},{}],"Instruction":[function(require,module,exports){
"use strict";
cc._RFpush(module, '6a871gy73FDLap3Eje/2h6i', 'Instruction');
// scripts\Global\Instruction.js

cc.Class({
    'extends': cc.Component,

    properties: {
        text: {
            'default': '',
            multiline: true
        }
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame
// update: function (dt) {

// },

cc._RFpop();
},{}],"Item":[function(require,module,exports){
"use strict";
cc._RFpush(module, '920c8a5MahAhbCTSvmQvaB+', 'Item');
// cases\02_ui\05_scrollView\Item.js

var i18n = require('i18n');

cc.Class({
    'extends': cc.Component,

    properties: {
        label: {
            'default': null,
            type: cc.Label
        },
        itemID: 0
    },

    updateItem: function updateItem(tmplId, itemId) {
        this.itemID = itemId;
        this.label.string = i18n.t("cases/02_ui/05_scrollView/Item.js.1") + tmplId + ' Item#' + this.itemID;
    }
});

cc._RFpop();
},{"i18n":"i18n"}],"LabelLocalized":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e4f88adp3hERoJ48DZ2PSAl', 'LabelLocalized');
// i18n\LabelLocalized.js

var i18n = require('i18n');
cc.Class({
    'extends': cc.Label,

    properties: {
        textKey: {
            'default': 'TEXT_KEY',
            multiline: true,
            tooltip: 'Enter i18n key here',
            notify: function notify() {
                if (this._sgNode) {
                    this._sgNode.setString(this.string);
                    this._updateNodeSize();
                }
            }
        },
        string: {
            override: true,
            tooltip: 'Here shows the localized string of Text Key',
            get: function get() {
                return i18n.t(this.textKey);
            },
            set: function set(value) {
                this.textKey = value;
                cc.warn('Please set label text key in Text Key property.');
            }
        }
    }
});

cc._RFpop();
},{"i18n":"i18n"}],"LayoutResizeContainerCtrl":[function(require,module,exports){
"use strict";
cc._RFpush(module, '2bbedtV3blCVJbmf2E9h/0V', 'LayoutResizeContainerCtrl');
// cases\02_ui\06_layout\LayoutResizeContainerCtrl.js

cc.Class({
    "extends": cc.Component,

    properties: {
        itemTemp: {
            "default": null,
            type: cc.Prefab
        },
        layoutHorizontalNum: 5,
        layoutHorizontal: {
            "default": null,
            type: cc.Node
        },
        layoutVerticalNum: 3,
        layoutVertical: {
            "default": null,
            type: cc.Node
        },
        gridLayoutAxisHorizontalNum: 10,
        gridLayoutAxisHorizontal: {
            "default": null,
            type: cc.Node
        },
        gridLayoutAxisVerticalNum: 12,
        gridLayoutAxisVertical: {
            "default": null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        this._curTime = 0;
        this._curIndex = 0;
    },

    _createItem: function _createItem(parentNode, idx) {
        var item = cc.instantiate(this.itemTemp);
        var label = item.getComponentInChildren(cc.Label);
        label.string = idx;
        item.parent = parentNode;
    },

    update: function update(dt) {
        this._curTime += dt;
        if (this._curTime >= 1) {
            this._curTime = 0;
            if (this._curIndex < this.layoutHorizontalNum) {
                this._createItem(this.layoutHorizontal, this._curIndex);
            }
            if (this._curIndex < this.layoutVerticalNum) {
                this._createItem(this.layoutVertical, this._curIndex);
            }
            if (this._curIndex < this.gridLayoutAxisHorizontalNum) {
                this._createItem(this.gridLayoutAxisHorizontal, this._curIndex);
            }
            if (this._curIndex < this.gridLayoutAxisVerticalNum) {
                this._createItem(this.gridLayoutAxisVertical, this._curIndex);
            }
            this._curIndex++;
        }
    }

});

cc._RFpop();
},{}],"ListItem":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'aa63bWNE8hBf4P4Sp0X2uT0', 'ListItem');
// scripts\Global\ListItem.js

cc.Class({
    'extends': cc.Component,

    properties: {
        label: {
            'default': null,
            type: cc.Label
        },
        url: ''
    },

    loadExample: function loadExample() {
        if (this.url) {
            cc.find('Menu').getComponent('Menu').loadScene(this.url);
        }
    }
});

cc._RFpop();
},{}],"ListView":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e6458+hf5VAnIXocmvhggqC', 'ListView');
// cases\02_ui\05_scrollView\ListView.js

cc.Class({
    'extends': cc.Component,

    properties: {
        itemTemplate: { // item template to instantiate other items
            'default': null,
            type: cc.Node
        },
        scrollView: {
            'default': null,
            type: cc.ScrollView
        },
        spawnCount: 0, // how many items we actually spawn
        totalCount: 0, // how many items we need for the whole list
        spacing: 0, // space between each item
        bufferZone: 0, // when item is away from bufferZone, we relocate it
        label: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.content = this.scrollView.content;
        this.items = []; // array to store spawned items
        this.initialize();
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
    },

    initialize: function initialize() {
        this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
        for (var i = 0; i < this.spawnCount; ++i) {
            // spawn items, we only need to do this once
            var item = cc.instantiate(this.itemTemplate);
            this.content.addChild(item);
            item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
            item.getComponent('Item').updateItem(i, i);
            this.items.push(item);
        }
    },

    getPositionInView: function getPositionInView(item) {
        // get item position in scrollview's node space
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update: function update(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
        this.updateTimer = 0;
        var items = this.items;
        var buffer = this.bufferZone;
        var isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        var offset = (this.itemTemplate.height + this.spacing) * items.length;
        for (var i = 0; i < items.length; ++i) {
            var viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].setPositionY(items[i].y + offset);
                    var item = items[i].getComponent('Item');
                    var itemId = item.itemID - items.length; // update item id
                    item.updateItem(i, itemId);
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].setPositionY(items[i].y - offset);
                    var item = items[i].getComponent('Item');
                    console.log('itemID: ' + item.itemID);
                    var itemId = item.itemID + items.length;
                    item.updateItem(i, itemId);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
    },

    scrollEvent: function scrollEvent(sender, event) {
        switch (event) {
            case 0:
                this.label.string = "Scroll to Top";
                break;
            case 1:
                this.label.string = "Scroll to Bottom";
                break;
            case 2:
                this.label.string = "Scroll to Left";
                break;
            case 3:
                this.label.string = "Scroll to Right";
                break;
            case 4:
                this.label.string = "Scrolling";
                break;
            case 5:
                this.label.string = "Bounce Top";
                break;
            case 6:
                this.label.string = "Bounce bottom";
                break;
            case 7:
                this.label.string = "Bounce left";
                break;
            case 8:
                this.label.string = "Bounce right";
                break;
            case 9:
                this.label.string = "Auto scroll ended";
                break;
        }
    }
});

cc._RFpop();
},{}],"LoadModuleCtrl":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9e702GubHpK+4vAb3yu2OW5', 'LoadModuleCtrl');
// cases\05_scripting\08_module\LoadModuleCtrl.js

cc.Class({
    "extends": cc.Component,

    properties: {
        monsterTemp: {
            "default": null,
            type: cc.Prefab
        },
        btn_createMonster: {
            "default": null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.btn_createMonster.on(cc.Node.EventType.TOUCH_END, this.createMoster.bind(this));
    },

    createMoster: function createMoster() {
        var monster = cc.instantiate(this.monsterTemp);
        var Monster = require("Monster");
        var monsterComp = monster.getComponent(Monster);
        var InitData = require("InitData");
        monsterComp.initInfo(InitData.monsterInfo);
        monster.parent = this.node;
        monster.setPosition(cc.p(0, 0));
        this.btn_createMonster.active = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{"InitData":"InitData","Monster":"Monster"}],"LoadRes_example":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd7c19DG8M5Dp7vHrQu5a8gK', 'LoadRes_example');
// cases\05_scripting\07_asset_loading\LoadRes_example.js

cc.Class({
    "extends": cc.Component,

    properties: {
        content: {
            "default": null,
            type: cc.Node
        }
    },

    loadSpriteFrame: function loadSpriteFrame() {
        this._clearResource();
        var self = this;
        cc.loader.loadRes("test assets/atlas", cc.SpriteAtlas, function (err, atlas) {
            var node = new cc.Node();
            self.content.addChild(node);
            node.position = cc.v2(0, 0);
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = atlas.getSpriteFrame('sheep_run_0');
        });
    },

    loadPrefab: function loadPrefab() {
        this._clearResource();
        var self = this;
        cc.loader.loadRes("test assets/prefab", function (err, prefab) {
            var node = cc.instantiate(prefab);
            self.content.addChild(node);
            node.position = cc.v2(0, 0);
        });
    },

    _clearResource: function _clearResource() {
        this.content.removeAllChildren(true);
        cc.loader.releaseAll();
    }
});

cc._RFpop();
},{}],"LoadingBarCtrl":[function(require,module,exports){
"use strict";
cc._RFpush(module, '102a9wU40RJd4SnQqQQzQT9', 'LoadingBarCtrl');
// cases\05_scripting\10_loadingBar\LoadingBarCtrl.js

var i18n = require('i18n');

//
// Tips：
// 找到的下载图片网址过长，可以忽略。
// 本教程主要还是体现如何使用Loader的进度条。
//

cc.Class({
    "extends": cc.Component,

    properties: {
        progressBar: {
            "default": null,
            type: cc.ProgressBar
        },

        progressTips: {
            "default": null,
            type: cc.Label
        },

        laodBg: {
            "default": null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this._urls = [
        // Raw Asset, need extension
        {
            id: "ding.wav",
            url: cc.url.raw("resources/audio/ding.wav")
        }, {
            id: "cheering.wav",
            url: cc.url.raw("resources/audio/cheering.wav")
        }, {
            id: "music_logo.mp3",
            url: cc.url.raw("resources/audio/music_logo.mp3")
        }, {
            id: "audio.mp3",
            url: cc.url.raw("resources/test assets/audio.mp3")
        }, {
            id: "font.png",
            url: cc.url.raw("resources/test assets/font.png")
        }, {
            id: "mikado_outline_shadow.png",
            url: cc.url.raw("resources/font/mikado_outline_shadow.png")
        }, {
            id: "enligsh-chinese.png",
            url: cc.url.raw("resources/font/enligsh-chinese.png")
        }];

        this.progressBar.progress = 0;
        cc.loader.releaseAll();
        cc.loader.load(this._urls, this._progressCallback.bind(this), this._completeCallback.bind(this));
    },

    _progressCallback: function _progressCallback(completedCount, totalCount, res) {
        this.progress = completedCount / totalCount;
        this.resource = res;
        this.completedCount = completedCount;
        this.totalCount = totalCount;
    },

    _completeCallback: function _completeCallback(error, res) {},

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (!this.resource) {
            return;
        }
        var progress = this.progressBar.progress;
        if (progress >= 1) {
            this.progressTips.string = i18n.t("cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.1");
            this.laodBg.active = false;
            this.progressBar.node.active = false;
            this.enabled = false;
            return;
        }
        if (progress < this.progress) {
            progress += dt;
        }
        this.progressBar.progress = progress;
        this.progressTips.string = i18n.t("cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.2") + this.resource.id + " (" + this.completedCount + "/" + this.totalCount + ")";
    }
});

cc._RFpop();
},{"i18n":"i18n"}],"Menu":[function(require,module,exports){
"use strict";
cc._RFpush(module, '04525pyYBlN26SWawaUF3dA', 'Menu');
// scripts\Global\Menu.js

var i18n = require('i18n');

var emptyFunc = function emptyFunc(event) {
    event.stopPropagation();
};

cc.Class({
    'extends': cc.Component,

    properties: {
        text: {
            'default': null,
            type: cc.Label
        },
        readme: {
            'default': null,
            type: cc.Node
        },
        mask: {
            'default': null,
            type: cc.Node
        },
        btnInfo: {
            'default': null,
            type: cc.Button
        },
        btnBack: {
            'default': null,
            type: cc.Button
        }
    },

    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
        this.currentSceneUrl = 'TestList.fire';
        this.contentPos = null;
        this.isMenu = true;
        this.loadInstruction(this.currentSceneUrl);
    },

    backToList: function backToList() {
        this.showReadme(null, false);
        this.currentSceneUrl = 'TestList.fire';
        this.isMenu = true;
        cc.director.loadScene('TestList', this.onLoadSceneFinish.bind(this));
    },

    loadScene: function loadScene(url) {
        this.contentPos = cc.find('Canvas/testList').getComponent(cc.ScrollView).getContentPosition();
        this.currentSceneUrl = url;
        this.isMenu = false;
        cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));
    },

    onLoadSceneFinish: function onLoadSceneFinish() {
        var url = this.currentSceneUrl;
        this.loadInstruction(url);
        if (this.isMenu && this.contentPos) {
            cc.find('Canvas/testList').getComponent(cc.ScrollView).setContentPosition(this.contentPos);
        }
    },

    loadInstruction: function loadInstruction(url) {
        var self = this;
        var urlArr = url.split('/');
        var fileName = urlArr[urlArr.length - 1].replace('.fire', '');
        cc.loader.loadRes('readme/' + fileName, function (err, txt) {
            if (err) {
                self.text.string = i18n.t("scripts/Global/Menu.js.1");
                return;
            }
            self.text.string = txt;
        });
    },

    showReadme: function showReadme(event, active) {
        if (active === undefined) {
            this.readme.active = !this.readme.active;
        } else {
            this.readme.active = active;
        }
        if (this.readme.active) {
            this.mask.on('touchstart', emptyFunc, this);
        } else {
            this.mask.off('touchstart', emptyFunc, this);
        }
        var labelTxt = this.readme.active ? '关闭说明' : '查看说明';
        cc.find('label', this.btnInfo.node).getComponent(cc.Label).string = labelTxt;
    }
});

cc._RFpop();
},{"i18n":"i18n"}],"MonsterPrefab":[function(require,module,exports){
"use strict";
cc._RFpush(module, '8cb4dm2QEpJ7pnaS/cjrvgF', 'MonsterPrefab');
// cases\05_scripting\02_prefab\MonsterPrefab.js

var Helpers = require('Helpers');

cc.Class({
    'extends': cc.Component,

    properties: {
        spriteList: {
            'default': [],
            type: [cc.SpriteFrame]
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var randomIdx = Helpers.getRandomInt(0, this.spriteList.length);
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteList[randomIdx];
    }

});

cc._RFpop();
},{"Helpers":"Helpers"}],"Monster":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e31b0+PoDRJXIDHFxy60vEs', 'Monster');
// cases\05_scripting\08_module\Monster.js

cc.Class({
    "extends": cc.Component,

    properties: {
        nickname: {
            "default": null,
            type: cc.Label
        },
        lv: {
            "default": null,
            type: cc.Label
        },
        hp: {
            "default": null,
            type: cc.Label
        },
        atk: {
            "default": null,
            type: cc.Label
        },
        defense: {
            "default": null,
            type: cc.Label
        },
        image: {
            "default": null,
            type: cc.Sprite
        }
    },

    initInfo: function initInfo(info) {
        this.nickname.string = info.name;
        this.lv.string = info.lv;
        this.hp.string = info.hp;
        this.atk.string = info.atk;
        this.defense.string = info.defense;

        var image = this.image;
        cc.loader.loadRes(info.imageUrl, cc.SpriteFrame, function (error, spriteFrame) {
            if (!error) {
                image.spriteFrame = spriteFrame;
            }
        });

        //cc.loader.load(, function (error, res) {
        //    console.log(res);
        //}.bind(this));
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"MouseEvent":[function(require,module,exports){
"use strict";
cc._RFpush(module, '6df0ft1jy5Jg4cQ039jt8jC', 'MouseEvent');
// cases\05_scripting\03_events\MouseEvent.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    move: function move(event) {
        this.node.x += event.getDeltaX();
        this.node.y += event.getDeltaY();
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.scroll = 0;
        this.node.opacity = 50;
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function () {
            this.node.opacity = 255;
            this.node.on(cc.Node.EventType.MOUSE_MOVE, this.move, this);
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_ENTER, function () {
            this.node.opacity = 160;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function () {
            this.node.opacity = 50;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, function () {
            this.node.opacity = 50;
            this.node.off(cc.Node.EventType.MOUSE_MOVE, this.move, this);
            if (this._callback) {
                this._callback();
            }
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, function (event) {
            this.scroll += event.getScrollY();
            var h = this.node.height;
            this.scroll = cc.clampf(this.scroll, -2 * h, 0.7 * h);
            this.node.scale = 1 - this.scroll / h;
        }, this);
    }
});

cc._RFpop();
},{}],"MoveAnimationCtrl":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1dc95dq3mVI658br0l2Zbi0', 'MoveAnimationCtrl');
// cases\03_gameplay\03_animation\MoveAnimationCtrl.js

cc.Class({
    "extends": cc.Component,

    properties: {
        target: {
            "default": null,
            type: cc.Animation
        },

        nodes: {
            "default": [],
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        this.onRegisteredEvent();
    },

    onRegisteredEvent: function onRegisteredEvent() {
        for (var i = 0; i < this.nodes.length; ++i) {
            this.nodes[i].on(cc.Node.EventType.TOUCH_END, this.onPlayAnimation.bind(this));
        }
    },

    onPlayAnimation: function onPlayAnimation(event) {
        this.target.stop();
        switch (event.target._name) {
            case "Linear":
                this.target.play("linear");
                break;
            case "CaseIn_Expo":
                this.target.play("caseIn-expo");
                break;
            case "CaseOut_Expo":
                this.target.play("caseOut-expo");
                break;
            case "CaseInOut_Expo":
                this.target.play("caseInOut-expo");
                break;
            case "Back_Forward":
                this.target.play("back-forward");
                break;
        }
    }

});

cc._RFpop();
},{}],"MyCustomComponent":[function(require,module,exports){
"use strict";
cc._RFpush(module, '6b8baEpLuxACIMNlIL2vw2W', 'MyCustomComponent');
// cases\05_scripting\01_properties\MyCustomComponent.js

cc.Class({
    "extends": cc.Component,

    properties: {
        power: 10
    },

    getPower: function getPower() {
        return this.power;
    }
});

cc._RFpop();
},{}],"NetworkCtrl":[function(require,module,exports){
"use strict";
cc._RFpush(module, '10908h1aHRPPowxQQzUCVMD', 'NetworkCtrl');
// cases\05_scripting\11_network\NetworkCtrl.js

var i18n = require('i18n');

if (!window.io) {
    window.io = require('socket-io');
}

cc.Class({
    'extends': cc.Component,

    properties: {
        xhr: cc.Label,
        xhrAB: cc.Label,
        websocket: cc.Label,
        socketIO: cc.Label,

        xhrResp: cc.Label,
        xhrABResp: cc.Label,
        websocketResp: cc.Label,
        socketIOResp: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {
        this._wsiSendBinary = null;

        this.xhrResp.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.1");
        this.xhrABResp.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.2");
        this.websocketResp.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.3");
        this.socketIOResp.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.4");

        this.sendXHR();
        this.sendXHRAB();
        this.prepareWebSocket();
        this.sendSocketIO();
    },

    sendXHR: function sendXHR() {
        var xhr = cc.loader.getXMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhr, this.xhrResp, 'GET');

        xhr.open("GET", "https://httpbin.org/get?show_env=1", true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000; // 5 seconds for timeout

        xhr.send();
    },

    sendXHRAB: function sendXHRAB() {
        var xhr = cc.loader.getXMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhrAB, this.xhrABResp, "POST");

        xhr.open("POST", "https://httpbin.org/post");
        //set Content-type "text/plain" to post ArrayBuffer or ArrayBufferView
        xhr.setRequestHeader("Content-Type", "text/plain");
        // Uint8Array is an ArrayBufferView
        xhr.send(new Uint8Array([1, 2, 3, 4, 5]));
    },

    prepareWebSocket: function prepareWebSocket() {
        var self = this;
        var websocketLabel = this.websocket;
        var respLabel = this.websocketResp;
        this._wsiSendBinary = new WebSocket("ws://echo.websocket.org");
        this._wsiSendBinary.binaryType = "arraybuffer";
        this._wsiSendBinary.onopen = function (evt) {
            websocketLabel.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.5");
        };

        this._wsiSendBinary.onmessage = function (evt) {
            var binary = new Uint16Array(evt.data);
            var binaryStr = 'response bin msg: ';

            var str = '';
            for (var i = 0; i < binary.length; i++) {
                if (binary[i] === 0) {
                    str += "\'\\0\'";
                } else {
                    var hexChar = '0x' + binary[i].toString('16').toUpperCase();
                    str += String.fromCharCode(hexChar);
                }
            }

            binaryStr += str;
            respLabel.string = binaryStr;
            websocketLabel.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.6");
        };

        this._wsiSendBinary.onerror = function (evt) {
            websocketLabel.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.7");
        };

        this._wsiSendBinary.onclose = function (evt) {
            websocketLabel.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.8");
            // After close, it's no longer possible to use it again,
            // if you want to send another request, you need to create a new websocket instance
            self._wsiSendBinary = null;
        };

        this.scheduleOnce(this.sendWebSocketBinary, 1);
    },

    sendWebSocketBinary: function sendWebSocketBinary(sender) {
        if (this._wsiSendBinary.readyState === WebSocket.OPEN) {
            this.websocket.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.9");
            var buf = "Hello WebSocket中文,\0 I'm\0 a\0 binary\0 message\0.";

            var arrData = new Uint16Array(buf.length);
            for (var i = 0; i < buf.length; i++) {
                arrData[i] = buf.charCodeAt(i);
            }

            this._wsiSendBinary.send(arrData.buffer);
        } else {
            var warningStr = "send binary websocket instance wasn't ready...";
            this.websocket.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.10") + warningStr;
            this.scheduleOnce(function () {
                this.sendWebSocketBinary();
            }, 1);
        }
    },

    // Socket IO callbacks for testing
    testevent: function testevent(data) {
        var msg = this.tag + " says 'testevent' with data: " + data;
        this.socketIO.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.11") + msg;
    },

    message: function message(data) {
        var msg = this.tag + " received message: " + data;
        this.socketIOResp.string = msg;
    },

    disconnection: function disconnection() {
        var msg = this.tag + " disconnected!";
        this.socketIO.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.12") + msg;
    },

    sendSocketIO: function sendSocketIO() {
        var self = this;
        //create a client by using this static method, url does not need to contain the protocol
        var sioclient = io.connect("ws://tools.itharbors.com:4000", { "force new connection": true });
        this._sioClient = sioclient;

        //if you need to track multiple sockets it is best to store them with tags in your own array for now
        this.tag = sioclient.tag = "Test Client";

        //register event callbacks
        //this is an example of a handler declared inline
        sioclient.on("connect", function () {
            var msg = sioclient.tag + " Connected!";
            self.socketIO.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.13") + msg;

            // Send message after connection
            self._sioClient.send("Hello Socket.IO!");
        });

        //example of a handler that is shared between multiple clients
        sioclient.on("message", this.message.bind(this));

        sioclient.on("echotest", function (data) {
            cc.log("echotest 'on' callback fired!");
            var msg = this.tag + " says 'echotest' with data: " + data;
            self.socketIO.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.14") + msg;
        });

        sioclient.on("testevent", this.testevent.bind(this));

        sioclient.on("disconnect", this.disconnection.bind(this));
    },

    streamXHREventsToLabel: function streamXHREventsToLabel(xhr, eventLabel, label, method, responseHandler) {
        var handler = responseHandler || function (response) {
            return method + " Response (30 chars): " + response.substring(0, 30) + "...";
        };

        var eventLabelOrigin = eventLabel.string;
        // Simple events
        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
            xhr["on" + eventname] = function () {
                eventLabel.string = eventLabelOrigin + "\nEvent : " + eventname;
            };
        });

        // Special event
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                label.string = handler(xhr.responseText);
            }
        };
    }
});

cc._RFpop();
},{"i18n":"i18n","socket-io":"socket-io"}],"NodeGenerator":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c2149G/5j1JIKd2GGzQfS72', 'NodeGenerator');
// cases\05_scripting\12_pool\NodeGenerator.js

cc.Class({
    'extends': cc.Component,

    properties: {
        prefab: cc.Prefab,
        regionOrigin: cc.Vec2,
        regionSize: cc.Size
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.schedule(this.generateNode, 2);
        this._pool = new cc.NodePool('PoolHandler');
    },

    generateNode: function generateNode() {
        var monster = this._pool.get();
        if (!monster) {
            monster = cc.instantiate(this.prefab);
        }
        monster.x = this.regionOrigin.x + Math.floor(Math.random() * this.regionSize.width);
        monster.y = this.regionOrigin.y + Math.floor(Math.random() * this.regionSize.height);

        var angle = Math.random() * Math.PI * 2;
        var dx = 500 * Math.cos(angle);
        var dy = 500 * Math.sin(angle);

        // Add pool handler component which will control the touch event
        monster.addComponent('PoolHandler');

        monster.runAction(cc.sequence(cc.moveBy(5, dx, dy), cc.callFunc(this.removeNode, this, monster)));

        this.node.addChild(monster);
    },

    removeNode: function removeNode(sender, monster) {
        this._pool.put(monster);
    }
});

cc._RFpop();
},{}],"NodeGroupControl":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'bd4a2+britAlof0UdMCVB8c', 'NodeGroupControl');
// cases\05_scripting\01_properties\NodeGroupControl.js

cc.Class({
    'extends': cc.Component,

    properties: {
        nodeList: {
            'default': [],
            type: [cc.Node]
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        this.inervalId = setInterval(function () {
            self.toggleNodesVisibility();
        }, 1000);
    },

    onDestroy: function onDestroy() {
        clearInterval(this.inervalId);
    },

    toggleNodesVisibility: function toggleNodesVisibility() {
        console.log('toggle visibility');
        for (var i = 0; i < this.nodeList.length; ++i) {
            this.nodeList[i].active = !this.nodeList[i].active;
        }
    }
});

cc._RFpop();
},{}],"NonSerializedProperties":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd4114PgybhJ3L/k0N9TkCZI', 'NonSerializedProperties');
// cases\05_scripting\01_properties\NonSerializedProperties.js

cc.Class({
    'extends': cc.Component,

    properties: {
        mySerializedText: '',
        myNonSerializedText: {
            'default': '',
            visible: false
        },
        label1: {
            'default': null,
            type: cc.Label
        },
        label2: {
            'default': null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.myNonSerializedText = 'Can only set value in script';
        this.label1.string = this.mySerializedText;
        this.label2.string = this.myNonSerializedText;
    }
});

cc._RFpop();
},{}],"OrderSwitcher":[function(require,module,exports){
"use strict";
cc._RFpush(module, '385fbE9eghB1IwH34WHGHmk', 'OrderSwitcher');
// cases\05_scripting\03_events\OrderSwitcher.js

cc.Class({
    "extends": cc.Component,

    properties: {
        container: cc.Node
    },

    // use this for initialization
    "switch": function _switch() {
        var children = this.container.children;
        var length = children.length;
        if (length > 1) {
            var src = Math.floor(Math.random() * length);
            var node = children[src];
            var dst = src === length - 1 ? 0 : src + 1;
            node.setSiblingIndex(dst);
        }
    }
});

cc._RFpop();
},{}],"ParticleControl1":[function(require,module,exports){
"use strict";
cc._RFpush(module, '79ae3hiP+JAhIKehaWyiKuh', 'ParticleControl1');
// cases\01_graphics\02_particle\ParticleControl1.js

cc.Class({
    "extends": cc.Component,

    properties: {
        particle: {
            "default": null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        // use space to toggle particle
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                if (keyCode === cc.KEY.space) {
                    self.toggleParticlePlay();
                }
            }
        }, self);
    },

    toggleParticlePlay: function toggleParticlePlay() {
        var myParticle = this.particle.getComponent(cc.ParticleSystem);
        if (myParticle.isFull()) {
            // check if particle has fully plaed
            myParticle.stopSystem(); // stop particle system
        } else {
                myParticle.resetSystem(); // restart particle system
            }
    }
});

cc._RFpop();
},{}],"PlatformMotion":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0f761EZmKhNLKJpUXTrb4fF', 'PlatformMotion');
// cases\collider\Utils\PlatformMotion.js

cc.Class({
    "extends": cc.Component,

    properties: {
        speed: 10,
        distance: 200
    },

    // use this for initialization
    onLoad: function onLoad() {
        this._movedDistance = this.distance / 2;
        this._direction = 1;
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        var d = this.speed * this._direction * dt;

        var movedDistance = this._movedDistance + Math.abs(d);
        this._movedDistance += Math.abs(d);

        if (movedDistance > this.distance) {
            d = this.distance - this._movedDistance;
            this._movedDistance = 0;
            this._direction *= -1;
        } else {
            this._movedDistance = movedDistance;
        }

        this.node.x += d;
    }
});

cc._RFpop();
},{}],"PoolHandler":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ea9ac+t92JFY6hOUuiIHUAT', 'PoolHandler');
// cases\05_scripting\12_pool\PoolHandler.js

function pauseresume() {
    if (this.paused) {
        cc.director.getActionManager().resumeTarget(this);
    } else {
        cc.director.getActionManager().pauseTarget(this);
    }
    this.paused = !this.paused;
}

cc.Class({
    "extends": cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.node.paused = false;
        this.node.on(cc.Node.EventType.TOUCH_END, pauseresume, this.node);
    },

    unuse: function unuse() {
        this.node.off(cc.Node.EventType.TOUCH_END, pauseresume, this.node);
    },

    reuse: function reuse() {
        this.node.on(cc.Node.EventType.TOUCH_END, pauseresume, this.node);
    }
});

cc._RFpop();
},{}],"PopulatePrefab":[function(require,module,exports){
"use strict";
cc._RFpush(module, '75518I0ImJHXqWNNGRIOmJg', 'PopulatePrefab');
// cases\05_scripting\02_prefab\PopulatePrefab.js

cc.Class({
    "extends": cc.Component,

    properties: {
        root: {
            "default": null,
            type: cc.Node
        },
        prefab: {
            "default": null,
            type: cc.Prefab
        },
        canvas: {
            "default": null,
            type: cc.Canvas
        },
        numberToSpawn: 0,
        spawnInterval: 0
    },

    addSpawn: function addSpawn() {
        if (this.spawnCount >= this.numberToSpawn) {
            this.clearRepeater();
            return;
        }
        var monster = cc.instantiate(this.prefab);
        monster.parent = this.root;
        //this.canvas.node.addChild(monster);
        monster.position = this.getRandomPosition();
        this.spawnCount++;
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.randomRange = cc.p(300, 200);
        self.spawnCount = 0;
        self.schedule(self.addSpawn, self.spawnInterval);
    },

    getRandomPosition: function getRandomPosition() {
        return cc.p(cc.randomMinus1To1() * this.randomRange.x, cc.randomMinus1To1() * this.randomRange.y);
    },

    clearRepeater: function clearRepeater() {
        this.unschedule(this.addSpawn);
    }
});

cc._RFpop();
},{}],"ProgressBar":[function(require,module,exports){
"use strict";
cc._RFpush(module, '84a43yb9OxBX6HMQxPzHQyz', 'ProgressBar');
// cases\02_ui\04_progressbar\ProgressBar.js

cc.Class({
    "extends": cc.Component,

    properties: {
        horizontalBar: {
            type: cc.ProgressBar,
            "default": null
        },
        horizontalBarReverse: {
            type: cc.ProgressBar,
            "default": null
        },
        verticalBar: {
            type: cc.ProgressBar,
            "default": null
        },
        verticalBarReverse: {
            type: cc.ProgressBar,
            "default": null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this._updateProgressBar(this.horizontalBar, dt);
        this._updateProgressBar(this.verticalBar, dt);
        this._updateProgressBar(this.horizontalBarReverse, dt);
        this._updateProgressBar(this.verticalBarReverse, dt);
    },

    _updateProgressBar: function _updateProgressBar(progressBar, dt) {
        var progress = progressBar.progress;
        if (progress < 1.0) {
            progress += dt;
        } else {
            progress = 0;
        }
        progressBar.progress = progress;
    }
});

cc._RFpop();
},{}],"Puzzle":[function(require,module,exports){
"use strict";
cc._RFpush(module, '6289cZl6zJEcLVQd60JnAzW', 'Puzzle');
// cases\tiledmap\Puzzle.js


var MoveDirection = cc.Enum({
    NONE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
});

var minTilesCount = 2;
var mapMoveStep = 1;
var minMoveValue = 50;

cc.Class({
    'extends': cc.Component,
    editor: {
        requireComponent: cc.TiledMap
    },

    properties: {
        _touchStartPos: {
            'default': null,
            serializable: false
        },
        _touching: {
            'default': false,
            serializable: false
        },

        _isMapLoaded: {
            'default': false,
            serializable: false
        },

        floorLayerName: {
            'default': 'floor'
        },

        barrierLayerName: {
            'default': 'barrier'
        },

        objectGroupName: {
            'default': 'players'
        },

        startObjectName: {
            'default': 'SpawnPoint'
        },

        successObjectName: {
            'default': 'SuccessPoint'
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this._player = this.node.getChildByName('player');
        if (!this._isMapLoaded) {
            this._player.active = false;
        }

        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                self._onKeyPressed(keyCode, event);
            }
        }, self.node);

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self._touching = true;
            self._touchStartPos = event.touch.getLocation();
        }, self);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (!self._touching) return;

            self._touching = false;
            var touchPos = event.touch.getLocation();
            var movedX = touchPos.x - self._touchStartPos.x;
            var movedY = touchPos.y - self._touchStartPos.y;
            var movedXValue = Math.abs(movedX);
            var movedYValue = Math.abs(movedY);
            if (movedXValue < minMoveValue && movedYValue < minMoveValue) {
                // touch moved not enough
                return;
            }

            var newTile = cc.p(this._curTile.x, this._curTile.y);
            var mapMoveDir = MoveDirection.NONE;
            if (movedXValue >= movedYValue) {
                // move to right or left
                if (movedX > 0) {
                    newTile.x += 1;
                    mapMoveDir = MoveDirection.LEFT;
                } else {
                    newTile.x -= 1;
                    mapMoveDir = MoveDirection.RIGHT;
                }
            } else {
                // move to up or down
                if (movedY > 0) {
                    newTile.y -= 1;
                    mapMoveDir = MoveDirection.UP;
                } else {
                    newTile.y += 1;
                    mapMoveDir = MoveDirection.DOWN;
                }
            }
            this._tryMoveToNewTile(newTile, mapMoveDir);
        }, self);
    },

    restartGame: function restartGame() {
        this._succeedLayer.active = false;
        this._initMapPos();
        this._curTile = this._startTile;
        this._updatePlayerPos();
    },

    start: function start(err) {
        if (err) return;

        // init the map position
        this._initMapPos();

        // init the succeed layer
        this._succeedLayer = this.node.getParent().getChildByName('succeedLayer');
        this._succeedLayer.active = false;

        // init the player position
        this._tiledMap = this.node.getComponent('cc.TiledMap');
        var objectGroup = this._tiledMap.getObjectGroup(this.objectGroupName);
        if (!objectGroup) return;

        var startObj = objectGroup.getObject(this.startObjectName);
        var endObj = objectGroup.getObject(this.successObjectName);
        if (!startObj || !endObj) return;

        var startPos = cc.p(startObj.x, startObj.y);
        var endPos = cc.p(endObj.x, endObj.y);

        this._layerFloor = this._tiledMap.getLayer(this.floorLayerName);
        this._layerBarrier = this._tiledMap.getLayer(this.barrierLayerName);
        if (!this._layerFloor || !this._layerBarrier) return;

        this._curTile = this._startTile = this._getTilePos(startPos);
        this._endTile = this._getTilePos(endPos);

        if (this._player) {
            this._updatePlayerPos();
            this._player.active = true;
        }

        this._isMapLoaded = true;
    },

    _initMapPos: function _initMapPos() {
        this.node.setPosition(cc.visibleRect.bottomLeft);
    },

    _updatePlayerPos: function _updatePlayerPos() {
        var pos = this._layerFloor.getPositionAt(this._curTile);
        this._player.setPosition(pos);
    },

    _getTilePos: function _getTilePos(posInPixel) {
        var mapSize = this.node.getContentSize();
        var tileSize = this._tiledMap.getTileSize();
        var x = Math.floor(posInPixel.x / tileSize.width);
        var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);

        return cc.p(x, y);
    },

    _onKeyPressed: function _onKeyPressed(keyCode, event) {
        if (!this._isMapLoaded || this._succeedLayer.active) return;

        var newTile = cc.p(this._curTile.x, this._curTile.y);
        var mapMoveDir = MoveDirection.NONE;
        switch (keyCode) {
            case cc.KEY.up:
                newTile.y -= 1;
                mapMoveDir = MoveDirection.DOWN;
                break;
            case cc.KEY.down:
                newTile.y += 1;
                mapMoveDir = MoveDirection.UP;
                break;
            case cc.KEY.left:
                newTile.x -= 1;
                mapMoveDir = MoveDirection.RIGHT;
                break;
            case cc.KEY.right:
                newTile.x += 1;
                mapMoveDir = MoveDirection.LEFT;
                break;
            default:
                return;
        }

        this._tryMoveToNewTile(newTile, mapMoveDir);
    },

    _tryMoveToNewTile: function _tryMoveToNewTile(newTile, mapMoveDir) {
        var mapSize = this._tiledMap.getMapSize();
        if (newTile.x < 0 || newTile.x >= mapSize.width) return;
        if (newTile.y < 0 || newTile.y >= mapSize.height) return;

        if (this._layerBarrier.getTileGIDAt(newTile)) {
            cc.log('This way is blocked!');
            return false;
        }

        // update the player position
        this._curTile = newTile;
        this._updatePlayerPos();

        // move the map if necessary
        this._tryMoveMap(mapMoveDir);

        // check the player is success or not
        if (cc.pointEqualToPoint(this._curTile, this._endTile)) {
            cc.log('succeed');
            this._succeedLayer.active = true;
        }
    },

    _tryMoveMap: function _tryMoveMap(moveDir) {
        // get necessary data
        var mapContentSize = this.node.getContentSize();
        var mapPos = this.node.getPosition();
        var playerPos = this._player.getPosition();
        var viewSize = cc.size(cc.visibleRect.width, cc.visibleRect.height);
        var tileSize = this._tiledMap.getTileSize();
        var minDisX = minTilesCount * tileSize.width;
        var minDisY = minTilesCount * tileSize.height;

        var disX = playerPos.x + mapPos.x;
        var disY = playerPos.y + mapPos.y;
        var newPos;
        switch (moveDir) {
            case MoveDirection.UP:
                if (disY < minDisY) {
                    newPos = cc.p(mapPos.x, mapPos.y + tileSize.height * mapMoveStep);
                }
                break;
            case MoveDirection.DOWN:
                if (viewSize.height - disY - tileSize.height < minDisY) {
                    newPos = cc.p(mapPos.x, mapPos.y - tileSize.height * mapMoveStep);
                }
                break;
            case MoveDirection.LEFT:
                if (viewSize.width - disX - tileSize.width < minDisX) {
                    newPos = cc.p(mapPos.x - tileSize.width * mapMoveStep, mapPos.y);
                }
                break;
            case MoveDirection.RIGHT:
                if (disX < minDisX) {
                    newPos = cc.p(mapPos.x + tileSize.width * mapMoveStep, mapPos.y);
                }
                break;
            default:
                return;
        }

        if (newPos) {
            // calculate the position range of map
            var minX = viewSize.width - mapContentSize.width - cc.visibleRect.left;
            var maxX = cc.visibleRect.left.x;
            var minY = viewSize.height - mapContentSize.height - cc.visibleRect.bottom;
            var maxY = cc.visibleRect.bottom.y;

            if (newPos.x < minX) newPos.x = minX;
            if (newPos.x > maxX) newPos.x = maxX;
            if (newPos.y < minY) newPos.y = minY;
            if (newPos.y > maxY) newPos.y = maxY;

            if (!cc.pointEqualToPoint(newPos, mapPos)) {
                cc.log('Move the map to new position: ', newPos);
                this.node.setPosition(newPos);
            }
        }
    }
});

cc._RFpop();
},{}],"ReferenceTypeProperties":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9341f3fDdBMjJLKh4D+kJJK', 'ReferenceTypeProperties');
// cases\05_scripting\01_properties\ReferenceTypeProperties.js

var MyCustomComponent = require('MyCustomComponent');

cc.Class({
    'extends': cc.Component,

    properties: {
        myNode: {
            'default': null,
            type: cc.Node
        },
        mySprite: {
            'default': null,
            type: cc.Sprite
        },
        myLabel: {
            'default': null,
            type: cc.Label
        },
        myComponent: {
            'default': null,
            type: MyCustomComponent
        },
        mySpriteFrame: {
            'default': null,
            type: cc.SpriteFrame
        },
        myAtlas: {
            'default': null,
            type: cc.SpriteAtlas
        },
        myPrefab: {
            'default': null,
            type: cc.Prefab
        },
        myAudioClip: {
            'default': null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.myLabel.string = this.myComponent.getPower().toString();
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{"MyCustomComponent":"MyCustomComponent"}],"SceneList":[function(require,module,exports){
"use strict";
cc._RFpush(module, '473b8wxs55OsJvoxVdYCzTF', 'SceneList');
// scripts\Global\SceneList.js

cc.Class({
    'extends': cc.Component,

    properties: {
        itemPrefab: {
            'default': null,
            type: cc.Prefab
        }
    },

    createItem: function createItem(x, y, name, url) {
        var item = cc.instantiate(this.itemPrefab);
        var itemComp = item.getComponent('ListItem');
        var label = itemComp.label;
        label.string = name;

        if (url) {
            itemComp.url = url;
        }

        // item.width = w;
        item.x = x;
        item.y = y;
        this.node.addChild(item);
        return item;
    },

    // use this for initialization
    onLoad: function onLoad() {
        var scenes = cc.game._sceneInfos;
        var list = {};
        if (scenes) {
            var i, j;
            for (i = 0; i < scenes.length; ++i) {
                var url = scenes[i].url;
                var dirname = cc.path.dirname(url).replace('db://assets/cases/', '');
                if (dirname === 'db://assets/resources/test assets') {
                    continue;
                }
                var scenename = cc.path.basename(url, '.fire');
                if (scenename === 'TestList') continue;

                if (!dirname) dirname = '_root';
                if (!list[dirname]) {
                    list[dirname] = {};
                }
                list[dirname][scenename] = url;
            }

            var dirs = Object.keys(list);
            dirs.sort();
            var y = -50;

            for (i = 0; i < dirs.length; ++i) {
                var dirname = dirs[i];
                var item = this.createItem(100, y, dirname);
                item.getComponent(cc.Widget).left = 60;
                item.getComponent(cc.Sprite).enabled = false;
                y -= 50;
                var scenenames = Object.keys(list[dirname]);
                scenenames.sort();
                for (j = 0; j < scenenames.length; ++j) {
                    var _name = scenenames[j];
                    var url = list[dirname][_name];
                    var _item = this.createItem(200, y, _name, url);
                    _item.getComponent(cc.Widget).left = 120;
                    _item.color = cc.Color.WHITE;
                    y -= 50;
                }
            }
            this.node.height = Math.abs(y) + 30;
        }
    }
});

cc._RFpop();
},{}],"SheepAnimation1":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ae6fcR8cuFGRYHW525VJD/k', 'SheepAnimation1');
// cases\03_gameplay\03_animation\SheepAnimation1.js

cc.Class({
    'extends': cc.Component,

    properties: {
        sheepAnim: {
            'default': null,
            type: cc.Animation
        }
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {
        var anim = this.sheepAnim;
        setTimeout(function () {
            anim.play('sheep_jump');
        }, 2000);
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{}],"Shooter":[function(require,module,exports){
"use strict";
cc._RFpush(module, '092a3wYF7pBULdP9SLwGUBQ', 'Shooter');
// cases\collider\Shooter\Shooter.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        bullet: {
            "default": null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var _this = this;

        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        var scene = cc.director.getScene();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function onTouchBegan(touch, event) {
                var touchLoc = touch.getLocation();

                var bullet = cc.instantiate(_this.bullet);
                bullet.position = touchLoc;
                bullet.active = true;

                scene.addChild(bullet);
                return true;
            }
        }, this.node);
    },

    onDisable: function onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"ShowCollider":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5a6dfRzhTBMp5U3il8DJmBZ', 'ShowCollider');
// cases\collider\Shape\ShowCollider.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {},

    onBtnClick: function onBtnClick(event) {
        var target = event.target;
        var shapeClassName = 'cc.' + target.name + 'Collider';
        var nodePath = 'Canvas/root/' + target.parent.name;
        var collider = cc.find(nodePath).getComponent(shapeClassName);
        collider.enabled = !collider.enabled;

        var label = target.getChildByName('Label').getComponent(cc.Label);
        if (collider.enabled) {
            label.string = label.string.replace('Show', 'Hide');
        } else {
            label.string = label.string.replace('Hide', 'Show');
        }
    }
});

cc._RFpop();
},{}],"SimpleAction":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'b6067a1+J5FW4G30nmVLU/d', 'SimpleAction');
// cases\03_gameplay\02_actions\SimpleAction.js

cc.Class({
    "extends": cc.Component,

    properties: {
        jumper: {
            "default": null,
            type: cc.Node
        },
        colorNode: {
            "default": null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.squashAction = cc.scaleTo(0.2, 1, 0.6);
        this.stretchAction = cc.scaleTo(0.2, 1, 1.2);
        this.scaleBackAction = cc.scaleTo(0.1, 1, 1);
        this.moveUpAction = cc.moveBy(1, cc.p(0, 200)).easing(cc.easeCubicActionOut());
        this.moveDownAction = cc.moveBy(1, cc.p(0, -200)).easing(cc.easeCubicActionIn());
        var seq = cc.sequence(this.squashAction, this.stretchAction, this.moveUpAction, this.scaleBackAction, this.moveDownAction, this.squashAction, this.scaleBackAction);
        // this is a temp api which will be combined to cc.Node
        this.jumper.runAction(seq);

        this.colorNode.runAction(cc.sequence(cc.tintTo(2, 255, 0, 0), cc.delayTime(0.5), cc.fadeOut(1), cc.delayTime(0.5), cc.fadeIn(1), cc.delayTime(0.5), cc.tintTo(2, 255, 255, 255)).repeat(2));
    }
});

cc._RFpop();
},{}],"SimpleKeyboardMovement":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c3f971iyCdIh6xdaO49XP0F', 'SimpleKeyboardMovement');
// cases\03_gameplay\01_player_control\SimpleKeyboardMovement.js

cc.Class({
    'extends': cc.Component,

    properties: {
        sheep: {
            'default': null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;

        // set initial move direction
        self.turnRight();

        //add keyboard input listener to call turnLeft and turnRight
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        console.log('turn left');
                        self.turnLeft();
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        console.log('turn right');
                        self.turnRight();
                        break;
                }
            }
        }, self.node);
    },

    // called every frame
    update: function update(dt) {
        this.sheep.x += this.speed * dt;
    },

    turnLeft: function turnLeft() {
        this.speed = -100;
        this.sheep.scaleX = 1;
    },

    turnRight: function turnRight() {
        this.speed = 100;
        this.sheep.scaleX = -1;
    }
});

cc._RFpop();
},{}],"SimpleMotion":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fde33rWt81MvZWO7QQ3jv3j', 'SimpleMotion');
// cases\collider\Utils\SimpleMotion.js

cc.Class({
    "extends": cc.Component,

    properties: {
        moveSpeed: 100,
        rotationSpeed: 90
    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.node.x += dt * this.moveSpeed;
        this.node.rotation += dt * this.rotationSpeed;
    }
});

cc._RFpop();
},{}],"SingletonCtrl":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fcfefvjPgdGEKnfOwuoIVJD', 'SingletonCtrl');
// cases\05_scripting\09_singleton\SingletonCtrl.js

var Singleton = require("Singleton");

cc.Class({
    "extends": cc.Component,

    properties: {},

    start: function start() {
        var node = new cc.Node("Monster");
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = Singleton.instance.monsterIcon;
        node.parent = this.node;
    }
});

cc._RFpop();
},{"Singleton":"Singleton"}],"Singleton":[function(require,module,exports){
"use strict";
cc._RFpush(module, '379d2K4GUtCv7pB9+wuz4Lb', 'Singleton');
// cases\05_scripting\09_singleton\Singleton.js

var Singleton = cc.Class({
    "extends": cc.Component,

    properties: {
        monsterIcon: {
            "default": null,
            type: cc.SpriteFrame
        }
    },

    statics: {
        instance: null
    },

    onLoad: function onLoad() {
        Singleton.instance = this;
    }
});

cc._RFpop();
},{}],"SpineCtrl":[function(require,module,exports){
"use strict";
cc._RFpush(module, '91115OWZ9hJkIXaqCNRUsZC', 'SpineCtrl');
// cases\spine\SpineCtrl.js

cc.Class({
    'extends': cc.Component,
    editor: {
        requireComponent: sp.Skeleton
    },

    properties: {
        mixTime: 0.2
    },

    onLoad: function onLoad() {
        var spine = this.spine = this.getComponent('sp.Skeleton');
        this._setMix('walk', 'run');
        this._setMix('run', 'jump');
        this._setMix('walk', 'jump');

        spine.setStartListener(function (track) {
            var entry = spine.getState().getCurrent(track);
            if (entry) {
                var animationName = entry.animation ? entry.animation.name : "";
                cc.log("[track %s] start: %s", track, animationName);
            }
        });
        spine.setEndListener(function (track) {
            cc.log("[track %s] end", track);
        });
        spine.setCompleteListener(function (track, loopCount) {
            cc.log("[track %s] complete: %s", track, loopCount);
        });
        spine.setEventListener(function (track, event) {
            cc.log("[track %s] event: %s, %s, %s, %s", track, event.data.name, event.intValue, event.floatValue, event.stringValue);
        });

        // var self = this;
        // cc.eventManager.addListener({
        //     event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        //     onTouchesBegan () {
        //         self.toggleTimeScale();
        //     }
        // }, this.node);
    },

    // OPTIONS

    toggleDebugSlots: function toggleDebugSlots() {
        this.spine.debugSlots = !this.spine.debugSlots;
    },

    toggleDebugBones: function toggleDebugBones() {
        this.spine.debugBones = !this.spine.debugBones;
    },

    toggleTimeScale: function toggleTimeScale() {
        if (this.spine.timeScale === 1.0) {
            this.spine.timeScale = 0.3;
        } else {
            this.spine.timeScale = 1.0;
        }
    },

    // ANIMATIONS

    stop: function stop() {
        this.spine.clearTrack(0);
    },

    walk: function walk() {
        this.spine.setAnimation(0, 'walk', true);
    },

    run: function run() {
        this.spine.setAnimation(0, 'run', true);
    },

    jump: function jump() {
        var oldAnim = this.spine.animation;
        this.spine.setAnimation(0, 'jump', false);
        if (oldAnim) {
            this.spine.addAnimation(0, oldAnim === 'run' ? 'run' : 'walk', true, 0);
        }
    },

    shoot: function shoot() {
        this.spine.setAnimation(1, 'shoot', false);
    },

    //

    _setMix: function _setMix(anim1, anim2) {
        this.spine.setMix(anim1, anim2, this.mixTime);
        this.spine.setMix(anim2, anim1, this.mixTime);
    }
});

cc._RFpop();
},{}],"SpriteFollowTouch":[function(require,module,exports){
"use strict";
cc._RFpush(module, '90aed86Xu1DZoaevFdcthY3', 'SpriteFollowTouch');
// cases\03_gameplay\01_player_control\SpriteFollowTouch.js

var i18n = require('i18n');

cc.Class({
    'extends': cc.Component,

    properties: {
        touchLocationDisplay: {
            'default': null,
            type: cc.Label
        },
        follower: {
            'default': null,
            type: cc.Node
        },
        followSpeed: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.moveToPos = cc.p(0, 0);
        self.isMoving = false;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function onTouchBegan(touch, event) {
                var touchLoc = touch.getLocation();
                self.isMoving = true;
                self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
                return true; // don't capture event
            },
            onTouchMoved: function onTouchMoved(touch, event) {
                var touchLoc = touch.getLocation();
                self.touchLocationDisplay.string = i18n.t("cases/03_gameplay/01_player_control/SpriteFollowTouch.js.1") + Math.floor(touchLoc.x) + ', ' + Math.floor(touchLoc.y) + ')';
                self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
            },
            onTouchEnded: function onTouchEnded(touch, event) {
                self.isMoving = false; // when touch ended, stop moving
            }
        }, self.node);
    },

    // called every frame
    update: function update(dt) {
        if (!this.isMoving) return;
        var oldPos = this.follower.position;
        // get move direction
        var direction = cc.pNormalize(cc.pSub(this.moveToPos, oldPos));
        // multiply direction with distance to get new position
        var newPos = cc.pAdd(oldPos, cc.pMult(direction, this.followSpeed * dt));
        // set new position
        this.follower.setPosition(newPos);
    }
});

cc._RFpop();
},{"i18n":"i18n"}],"TagColliderListener":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'cc2a1tfAtlEWoLmkfLbgQS3', 'TagColliderListener');
// cases\collider\Tag\TagColliderListener.js

cc.Class({
    'extends': cc.Component,

    properties: {
        label: {
            'default': null,
            type: cc.Label
        }
    },

    // use this for initialization
    onEnable: function onEnable() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    onDisable: function onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        this.label.string = 'Collision on tag : ' + self.tag;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"TiledSpriteControl":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e6941HLrIVFLokuMTS8HSUo', 'TiledSpriteControl');
// cases\01_graphics\01_sprite\TiledSpriteControl.js

cc.Class({
    "extends": cc.Component,

    properties: {

        speed: 100,

        progressBar: {
            "default": null,
            type: cc.Node
        },

        ground: {
            "default": null,
            type: cc.Node
        }
    },

    update: function update(dt) {
        this._updateWdith(this.progressBar, 500, dt);
        this._updateWdith(this.ground, 1000, dt);
    },

    _updateWdith: function _updateWdith(node, range, dt) {
        var width = node.width;
        width = width < range ? width += dt * this.speed : 0;
        node.width = width;
    }

});

cc._RFpop();
},{}],"TouchDragger":[function(require,module,exports){
"use strict";
cc._RFpush(module, '95021X5KjxP369OONe316sH', 'TouchDragger');
// cases\05_scripting\03_events\TouchDragger.js

var TouchDragger = cc.Class({
    "extends": cc.Component,

    properties: {
        propagate: {
            "default": false
        }
    },

    // ...
    // use this for initialization
    onLoad: function onLoad() {
        this.node.opacity = 160;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            this.opacity = 255;
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.opacity = 255;
            var delta = event.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
            if (this.getComponent(TouchDragger).propagate) event.stopPropagation();
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.opacity = 160;
        }, this.node);
    }
});

cc._RFpop();
},{}],"TouchEvent":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a14bfaD+gRJKrTVjKwitc53', 'TouchEvent');
// cases\05_scripting\03_events\TouchEvent.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    _callback: null,

    // use this for initialization
    onLoad: function onLoad() {
        this.node.opacity = 100;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            this.node.opacity = 255;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.opacity = 100;
            if (this._callback) {
                this._callback();
            }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.node.opacity = 100;
        }, this);
    }
});

cc._RFpop();
},{}],"ValueTypeProperties":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd9bf6bFb+tF779stLEmjzTV', 'ValueTypeProperties');
// cases\05_scripting\01_properties\ValueTypeProperties.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // number
        myNumber: {
            'default': 0,
            type: cc.Integer
        },
        // string
        myString: {
            'default': 'default text'
        },
        myVec2: {
            'default': cc.Vec2.ZERO
        },
        myColor: {
            'default': cc.Color.WHITE
        },
        myOtherNumber: 0,
        myOtherString: 'no type definition',
        myOtherVec2: cc.Vec2.ONE,
        myOtherColor: cc.Color.BLACK
    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{}],"Wall":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1a279oXNoxFFI516fswAbVo', 'Wall');
// cases\collider\Utils\Wall.js

var WallType = cc.Enum({
    Left: 0,
    Right: 1,
    Top: 2,
    Bottom: 3
});

cc.Class({
    "extends": cc.Component,

    properties: {
        type: {
            "default": WallType.Left,
            type: WallType
        },

        width: 5
    },

    // use this for initialization
    start: function start() {
        var collider = this.getComponent(cc.BoxCollider);
        if (!collider) {
            return;
        }

        var node = this.node;
        var type = this.type;

        var width = cc.winSize.width;
        var height = cc.winSize.height;

        var wallWidth = this.width;

        if (type === WallType.Left) {
            node.height = height;
            node.width = wallWidth;
            node.x = 0;
            node.y = height / 2;
        } else if (type === WallType.Right) {
            node.height = height;
            node.width = wallWidth;
            node.x = width;
            node.y = height / 2;
        } else if (type === WallType.Top) {
            node.width = width;
            node.height = wallWidth;
            node.x = width / 2;
            node.y = height;
        } else if (type === WallType.Bottom) {
            node.width = width;
            node.height = wallWidth;
            node.x = width / 2;
            node.y = 0;
        }

        collider.size = node.getContentSize();
    }
});

cc._RFpop();
},{}],"editbox":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'dd654DFPoRNVKRWOuQdLiEE', 'editbox');
// cases\02_ui\08_editBox\editbox.js

var i18n = require('i18n');

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        singleLineText: {
            "default": null,
            type: cc.EditBox
        },

        singleLinePassword: {
            "default": null,
            type: cc.EditBox
        },

        multiLineText: {
            "default": null,
            type: cc.EditBox
        },

        showEditorBoxLabel: {
            "default": null,
            type: cc.Label
        }

    },

    // use this for initialization
    onLoad: function onLoad() {},

    singleLineEditBoxDidBeginEditing: function singleLineEditBoxDidBeginEditing(sender) {
        cc.log(sender.node.name + " single line editBoxDidBeginEditing");
    },

    singleLineEditBoxDidChanged: function singleLineEditBoxDidChanged(text, sender) {
        cc.log(sender.node.name + " single line editBoxDidChanged: " + text);
    },

    singleLineEditBoxDidEndEditing: function singleLineEditBoxDidEndEditing(sender) {
        cc.log(sender.node.name + " single line editBoxDidEndEditing: " + this.singleLineText.string);
    },

    singleLinePasswordEditBoxDidBeginEditing: function singleLinePasswordEditBoxDidBeginEditing(sender) {
        cc.log(sender.node.name + " single line password editBoxDidBeginEditing");
    },

    singleLinePasswordEditBoxDidChanged: function singleLinePasswordEditBoxDidChanged(text, sender) {
        cc.log(sender.node.name + " single line password editBoxDidChanged: " + text);
    },

    singleLinePasswordEditBoxDidEndEditing: function singleLinePasswordEditBoxDidEndEditing(sender) {
        cc.log(sender.node.name + " single line password editBoxDidEndEditing: " + this.singleLinePassword.string);
    },

    multiLinePasswordEditBoxDidBeginEditing: function multiLinePasswordEditBoxDidBeginEditing(sender) {
        cc.log(sender.node.name + " multi line editBoxDidBeginEditing");
    },

    multiLinePasswordEditBoxDidChanged: function multiLinePasswordEditBoxDidChanged(text, sender) {
        cc.log(sender.node.name + " multi line editBoxDidChanged: " + text);
    },

    multiLinePasswordEditBoxDidEndEditing: function multiLinePasswordEditBoxDidEndEditing(sender) {
        cc.log(sender.node.name + " multi line editBoxDidEndEditing: " + this.multiLineText.string);
    },
    buttonClicked: function buttonClicked() {
        cc.log("button Clicked!");
        if (this.singleLineText.string !== "") {
            this.showEditorBoxLabel.string = i18n.t("cases/02_ui/07_editBox/editbox.js.1") + this.singleLineText.string;
        } else {
            this.showEditorBoxLabel.string = "";
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{"i18n":"i18n"}],"en":[function(require,module,exports){
"use strict";
cc._RFpush(module, '920c5VLzJxKjYCAoIUwUHym', 'en');
// i18n\data\en.js

module.exports = {
  "TestList.fire.30": "Back list",
  "TestList.fire.37": "View intro",
  "cases/01_graphics/01_sprite/AtlasSprite.fire.7": "This is Spirte Single.",
  "cases/01_graphics/01_sprite/AtlasSprite.fire.11": "This is Spirte From Atlas.",
  "cases/01_graphics/01_sprite/FilledSprite.fire.9": "Fill Type: HORIZONTAL",
  "cases/01_graphics/01_sprite/FilledSprite.fire.15": "Fill Type: VERTICAL",
  "cases/01_graphics/01_sprite/FilledSprite.fire.23": "FILL Type: RADIAL",
  "cases/01_graphics/01_sprite/SimpleSprite.fire.7": "This is Simple Sprite.",
  "cases/01_graphics/01_sprite/SlicedSprite.fire.7": "This is Sliced Sprite.",
  "cases/01_graphics/01_sprite/TiledSprite.fire.6": "This is Tiled Sprite.",
  "cases/01_graphics/01_sprite/TrimmedSprite.fire.7": "TRIMMED ",
  "cases/01_graphics/01_sprite/TrimmedSprite.fire.12": "No TRIMMED",
  "cases/01_graphics/02_particle/AutoRemoveParticle.fire.9": "Particle 1\n\"Auto Remove On Finish\" disabled",
  "cases/01_graphics/02_particle/AutoRemoveParticle.fire.13": "Particle 2\n\"Auto Remove On Finish\" enabled",
  "cases/01_graphics/02_particle/ToggleParticle.fire.6": "Press \"Space\" to toggle particle play",
  "cases/02_ui/01_widget/AdvancedWidget.fire.7": "Top Left",
  "cases/02_ui/01_widget/AdvancedWidget.fire.9": "top: 10% left: 6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.14": "Top Left",
  "cases/02_ui/01_widget/AdvancedWidget.fire.16": "top: -34px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.21": "Top Right",
  "cases/02_ui/01_widget/AdvancedWidget.fire.23": "top: 10% right: 6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.28": "Left",
  "cases/02_ui/01_widget/AdvancedWidget.fire.30": "left: -50px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.35": "Right",
  "cases/02_ui/01_widget/AdvancedWidget.fire.37": "right: -50px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.42": "Bottom Left",
  "cases/02_ui/01_widget/AdvancedWidget.fire.44": "bottom: 10% left: 6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.49": "Bottom",
  "cases/02_ui/01_widget/AdvancedWidget.fire.51": "bottom: -34px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.56": "Bottom Right",
  "cases/02_ui/01_widget/AdvancedWidget.fire.58": "bottom:10% right:6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.63": "This is Advanced WIdget.",
  "cases/02_ui/01_widget/AlignOnceWidget.fire.13": "AlignOnce: true",
  "cases/02_ui/01_widget/AlignOnceWidget.fire.19": "AlignOnce: false",
  "cases/02_ui/01_widget/AnimatedWidget.fire.9": "This is Animation Widget.",
  "cases/02_ui/01_widget/AutoResize.fire.13": "This is Widget Auto Resize.",
  "cases/02_ui/01_widget/WidgetAlign.fire.18": "This is Widget Align.",
  "cases/02_ui/02_label/GoldBeatingAnime.js.1": "0",
  "cases/02_ui/02_label/AlignFontLabel.fire.6": "Align Label",
  "cases/02_ui/02_label/AlignFontLabel.fire.9": "Horizontal Align",
  "cases/02_ui/02_label/AlignFontLabel.fire.14": "Hello! \nWelcome Come To \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.16": "Align: LEFT",
  "cases/02_ui/02_label/AlignFontLabel.fire.21": "Hello! \nWelcome Come To \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.23": "Align: CENTER",
  "cases/02_ui/02_label/AlignFontLabel.fire.28": "Hello! \nWelcome Come To \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.30": "Align: RIGHT",
  "cases/02_ui/02_label/AlignFontLabel.fire.33": "Vertical Align",
  "cases/02_ui/02_label/AlignFontLabel.fire.38": "Welcome Come To \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.40": "Align: TOP",
  "cases/02_ui/02_label/AlignFontLabel.fire.45": "Welcome Come To \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.47": "Align: CENTER",
  "cases/02_ui/02_label/AlignFontLabel.fire.52": "Welcome Come To \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.54": "Align: BOTTOM",
  "cases/02_ui/02_label/SystemFontLabel.fire.6": "System Font",
  "cases/02_ui/02_label/SystemFontLabel.fire.9": "Wrap",
  "cases/02_ui/02_label/SystemFontLabel.fire.14": "This is System Font",
  "cases/02_ui/02_label/SystemFontLabel.fire.16": "Overflow: CLAMP",
  "cases/02_ui/02_label/SystemFontLabel.fire.21": "This is System Font",
  "cases/02_ui/02_label/SystemFontLabel.fire.23": "Overflow: SHRINK",
  "cases/02_ui/02_label/SystemFontLabel.fire.26": "No Wrap",
  "cases/02_ui/02_label/SystemFontLabel.fire.31": "This is System Font",
  "cases/02_ui/02_label/SystemFontLabel.fire.33": "Overflow: CLAMP",
  "cases/02_ui/02_label/SystemFontLabel.fire.38": "This is System Font",
  "cases/02_ui/02_label/SystemFontLabel.fire.40": "Overflow: SHRINK",
  "cases/02_ui/02_label/SystemFontLabel.fire.45": "Hello! Welcome Come To Cocos Creator",
  "cases/02_ui/02_label/SystemFontLabel.fire.47": "Overflow: RESZIE_HEIGHT",
  "cases/02_ui/03_button/ButtonControl1.js.1": "Left button clicked!",
  "cases/02_ui/03_button/ButtonControl1.js.2": "Right button clicked!",
  "cases/02_ui/03_button/ButtonInteractable.fire.7": "PLAY",
  "cases/02_ui/03_button/ButtonInteractable.fire.16": "STOP",
  "cases/02_ui/03_button/ButtonInteractable.fire.21": "interactable: true",
  "cases/02_ui/03_button/ButtonInteractable.fire.23": "interactable: false",
  "cases/02_ui/03_button/ButtonInScroll.fire.21": "Which button is clicked?",
  "cases/02_ui/03_button/ButtonInScroll.fire.27": "drag to reveal more buttons\n\n",
  "cases/02_ui/03_button/ButtonInteractable.js.1": "interactable: ",
  "cases/02_ui/03_button/ButtonInteractable.js.2": "interactable: ",
  "cases/02_ui/03_button/SimpleButton.fire.6": "Which button is clicked?",
  "cases/02_ui/04_progressbar/progressbar.fire.7": "Horizontal bar with progress 0.3",
  "cases/02_ui/04_progressbar/progressbar.fire.11": "Horizontal bar reverse with progress 1.0",
  "cases/02_ui/04_progressbar/progressbar.fire.15": "Vertical bar \nfrom bottom",
  "cases/02_ui/04_progressbar/progressbar.fire.19": "Vertical bar \nfrom top",
  "cases/02_ui/04_progressbar/progressbar.fire.23": "Progress bar with sprite",
  "cases/02_ui/04_progressbar/progressbar.fire.28": "Progress bar with child sprite",
  "cases/02_ui/05_scrollView/Item.js.1": "Tmpl#",
  "cases/02_ui/05_scrollView/ListView.fire.23": "Item #00",
  "cases/02_ui/05_scrollView/ScrollView.fire.7": "Scrollview full functionality",
  "cases/02_ui/05_scrollView/ScrollView.fire.30": "Scrollview without inertia",
  "cases/02_ui/05_scrollView/ScrollView.fire.53": "Scrollview without elastic",
  "cases/02_ui/05_scrollView/ScrollView.fire.76": "Scrollview horizontal scroll only",
  "cases/02_ui/05_scrollView/ScrollView.fire.93": "Scrollview vertical only",
  "cases/02_ui/05_scrollView/ScrollView.fire.110": "Scrollview no scrollbar",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.6": "Basic",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.31": "Horizontal",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.36": "Vertical",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.41": "Grid Layout Axis horizontal",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.46": "Grid Layout Axis vertical",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.6": "Horizontal layout none",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.31": "Vertical layout none",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.48": "Grid start axis horizontal none",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.85": "Grid start axis vertical none",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.6": "ScrollView with vertical  layout",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.40": "ScrollView with horizontal layout",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.74": "ScrollView with Grid Layout\nstart axis: horizontal ",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.144": "ScrollView with Grid Layout\nstart axis: vertical ",
  "cases/02_ui/06_layout/LayoutNone.fire.6": "Basic layout, Type: none\nResize container",
  "cases/02_ui/06_layout/LayoutNone.fire.35": "Horizontal layout none\nNo resize",
  "cases/02_ui/06_layout/LayoutNone.fire.60": "Vertical layout, Type: none\nNo resize",
  "cases/02_ui/06_layout/LayoutNone.fire.77": "Grid start axis: horizontal \nNo resize",
  "cases/02_ui/06_layout/LayoutNone.fire.142": "Grid start axis: vertical \nNo resize",
  "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.8": "x:0, y:0",
  "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.12": "x:480, y:320",
  "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.16": "x:960, y:640",
  "cases/02_ui/07_editBox/editbox.js.1": "Enter Text: ",
  "cases/02_ui/07_editBox/EditBox.fire.25": "Single Line Password:",
  "cases/02_ui/07_editBox/EditBox.fire.27": "Single Line Text:",
  "cases/02_ui/07_editBox/EditBox.fire.29": "Mutiple Line Text:",
  "cases/02_ui/07_editBox/EditBox.fire.32": "Click",
  "cases/02_ui/07_editBox/EditBox.fire.38": "Button must be on top of EditBox, \nand it should enable click.",
  "cases/03_gameplay/01_player_control/KeyboardInput.fire.6": "Press 'A' or 'D' to control sheep",
  "cases/03_gameplay/01_player_control/TouchInput.fire.10": "Try touching anywhere.",
  "cases/03_gameplay/01_player_control/SpriteFollowTouch.js.1": "touch (",
  "cases/03_gameplay/02_actions/SimpleAction.fire.13": "This is Simple Action.",
  "cases/03_gameplay/03_animation/AnimateCustomProperty.fire.14": "Label",
  "cases/03_gameplay/03_animation/AnimateCustomProperty.fire.18": "This is Animate Custom Property.",
  "cases/03_gameplay/03_animation/AnimationEvent.fire.6": "Start the first animation",
  "cases/03_gameplay/03_animation/AnimationEvent.fire.14": "This is Animation Event.",
  "cases/03_gameplay/03_animation/AnimationEvent.js.1": "Start the",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.11": "Linear",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.17": "Case In Expo",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.23": "Case Out Expo",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.29": "Case Out In Expo",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.35": "Back Forward",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.41": "This is Move Animation.",
  "cases/03_gameplay/03_animation/SpriteAnimation.fire.9": "This is SprieFrame Animation.",
  "cases/04_audio/SimpleAudio.fire.6": "Enjoy the music!",
  "cases/05_scripting/01_properties/NodeArray.fire.14": "This is Node Array.",
  "cases/05_scripting/01_properties/NonSerialized.fire.6": "Label",
  "cases/05_scripting/01_properties/NonSerialized.fire.8": "Label",
  "cases/05_scripting/01_properties/NonSerialized.fire.10": "This is Non Serialized.",
  "cases/05_scripting/01_properties/ReferenceType.fire.8": "Label",
  "cases/05_scripting/01_properties/ReferenceType.fire.11": "This example does not include the runtime demonstration",
  "cases/05_scripting/01_properties/ValueType.fire.6": "This example does not include the runtime demonstration",
  "cases/05_scripting/02_prefab/InstantiatePrefab.fire.7": "This is Instantiate Prefab.",
  "cases/05_scripting/03_events/EventInMask.fire.23": "Change order of nodes",
  "cases/05_scripting/03_events/SimpleEvent.fire.19": "Touch event can support click",
  "cases/05_scripting/03_events/SimpleEvent.fire.21": "Mouse event can support click, hover, wheel",
  "cases/05_scripting/03_events/SimpleEvent.fire.23": "Custom event can be triggered manually\n(Click button above)",
  "cases/05_scripting/03_events/SimpleEvent.fire.25": "This is Simple Event.",
  "cases/05_scripting/03_events/TouchPropagation.fire.15": "This is Touch Propagation.",
  "cases/05_scripting/04_scheduler/scheduleCallbacks.js.1": "5.00 s",
  "cases/05_scripting/04_scheduler/scheduler.fire.9": "5.00 s",
  "cases/05_scripting/04_scheduler/scheduler.fire.12": "Repeat Schedule",
  "cases/05_scripting/04_scheduler/scheduler.fire.18": "Cancel Schedules",
  "cases/05_scripting/04_scheduler/scheduler.fire.24": "Schedule Once",
  "cases/05_scripting/04_scheduler/scheduler.fire.29": "Counter use update function to change string value each frame",
  "cases/05_scripting/04_scheduler/scheduler.fire.31": "This is Scheduler.",
  "cases/05_scripting/05_cross_reference/CrossReference.fire.7": "Label",
  "cases/05_scripting/05_cross_reference/CrossReference.fire.12": "Label",
  "cases/05_scripting/05_cross_reference/CrossReference.fire.14": "This is Cross Reference.",
  "cases/05_scripting/06_life_cycle/life_cycle.fire.6": "This is Life cycle.",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.5": "Asset Loading",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.9": "Load SpriteFrame",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.15": "Load Texture",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.21": "Load Audio",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.27": "Load Txt",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.33": "Load Font",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.39": "Load Plist",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.45": "Load Prefab",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.51": "Load Scene",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.57": "Load Animation",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.59": "Load Spine",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.65": "Not currently loaded Entity.",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.1": "Loaded ",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.2": "Play ",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.3": "Create ",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.4": "Playing Music.",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.5": "This is Font!",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.7": "By Type",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.10": "Load SpriteFrame",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.17": "By Url",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.20": "Load Prefab",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.6": "LoadResAll",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.24": "Load All",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.30": "Load SpriteFrame All",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.36": "Clear All",
  "cases/05_scripting/08_module/load_module.fire.6": "Load Module",
  "cases/05_scripting/08_module/load_module.fire.10": "Create Monster",
  "cases/05_scripting/09_singleton/Singleton.fire.6": "This example does not include the runtime demonstration",
  "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.1": "download complete!!",
  "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.2": "dowloading: ",
  "cases/05_scripting/10_loadingBar/loadingBar.fire.7": "Loading Completed",
  "cases/05_scripting/10_loadingBar/loadingBar.fire.18": "Dowloading",
  "cases/05_scripting/11_network/NetworkCtrl.js.1": "waiting...",
  "cases/05_scripting/11_network/NetworkCtrl.js.2": "waiting...",
  "cases/05_scripting/11_network/NetworkCtrl.js.3": "waiting...",
  "cases/05_scripting/11_network/NetworkCtrl.js.4": "waiting...",
  "cases/05_scripting/11_network/NetworkCtrl.js.5": "WebSocket\\nSend Binary WS was opened.",
  "cases/05_scripting/11_network/NetworkCtrl.js.6": "WebSocket\\nResponse get.",
  "cases/05_scripting/11_network/NetworkCtrl.js.7": "WebSocket\\nsendBinary Error was fired.",
  "cases/05_scripting/11_network/NetworkCtrl.js.8": "WebSocket\\nwebsocket instance closed.",
  "cases/05_scripting/11_network/NetworkCtrl.js.9": "WebSocket\\nSend Binary WS is waiting...",
  "cases/05_scripting/11_network/NetworkCtrl.js.10": "WebSocket\\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.11": "SocketIO\\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.12": "SocketIO\\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.13": "SocketIO\\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.14": "SocketIO\\n",
  "cases/05_scripting/11_network/network.fire.7": "Label",
  "cases/05_scripting/11_network/network.fire.6": "XMLHttpRequest",
  "cases/05_scripting/11_network/network.fire.11": "Label",
  "cases/05_scripting/11_network/network.fire.10": "XMLHttpRequest (ArrayBuffer)",
  "cases/05_scripting/11_network/network.fire.15": "Label",
  "cases/05_scripting/11_network/network.fire.14": "WebSocket",
  "cases/05_scripting/11_network/network.fire.19": "Label",
  "cases/05_scripting/11_network/network.fire.18": "SocketIO",
  "cases/collider/Category.fire.3": "Group: Collider",
  "cases/collider/Category.fire.5": "Group: Collider",
  "cases/collider/Category.fire.7": "Group: Collider",
  "cases/collider/Category.fire.9": "Group: Default",
  "cases/collider/Shape.fire.20": "Show Polygon",
  "cases/collider/Shape.fire.27": "Show Circle",
  "cases/collider/Shape.fire.34": "Show Box",
  "cases/collider/Shape.fire.43": "Show Polygon",
  "cases/collider/Shape.fire.50": "Show Circle",
  "cases/collider/Shape.fire.57": "Show Box",
  "cases/motionStreak/moveMotionStreak.fire.11": "Change MotionStreak",
  "cases/spine/SpineBoy.fire.11": "Debug Slots",
  "cases/spine/SpineBoy.fire.18": "Debug Bones",
  "cases/spine/SpineBoy.fire.25": "Time Scale",
  "cases/spine/SpineBoy.fire.36": "Stop",
  "cases/spine/SpineBoy.fire.43": "Walk",
  "cases/spine/SpineBoy.fire.50": "Run",
  "cases/spine/SpineBoy.fire.58": "Jump",
  "cases/spine/SpineBoy.fire.65": "Shoot",
  "cases/tiledmap/Puzzle.fire.18": "You Win",
  "cases/tiledmap/Puzzle.fire.21": "Restart",
  "res/prefabs/ListItem.prefab.2": "Label ssss",
  "res/prefabs/Monster.prefab.3": "Name:",
  "res/prefabs/Monster.prefab.11": "Level :",
  "res/prefabs/Monster.prefab.19": "Hp :",
  "res/prefabs/Monster.prefab.27": "Attack :",
  "res/prefabs/Monster.prefab.35": "Defense :",
  "res/prefabs/loadItem.prefab.1": "Label",
  "resources/test assets/prefab.prefab.2": "This is Prefab",
  "resources/test assets/scene.fire.3": "Return Asset Loading Scene",
  "resources/test assets/scene.fire.6": "Return",
  "scripts/Global/Menu.js.1": "Temporary lack of introduction"
};

cc._RFpop();
},{}],"i18n":[function(require,module,exports){
"use strict";
cc._RFpush(module, '93789C/shtIL6entYsZPjee', 'i18n');
// i18n\i18n.js

var Polyglot = require('polyglot');
var lang = cc.sys.language;
if (lang !== 'zh') {
    lang = 'en';
}
var data = require(lang); // update this to set your default displaying language in editor
// let polyglot = null;
var polyglot = new Polyglot({ phrases: data, allowMissing: true });

module.exports = {
    /**
     * This method allow you to switch language during runtime, language argument should be the same as your data file name
     * such as when language is 'zh', it will load your 'zh.js' data source.
     * @method init
     * @param language - the language specific data file name, such as 'zh' to load 'zh.js'
     */
    init: function init(language) {
        lang = language;
        data = require(lang);
        polyglot.replace(data);
    },
    /**
     * this method takes a text key as input, and return the localized string
     * Please read https://github.com/airbnb/polyglot.js for details
     * @method t
     * @return {String} localized string
     * @example
     *
     * var myText = i18n.t('MY_TEXT_KEY');
     *
     * // if your data source is defined as
     * // {"hello_name": "Hello, %{name}"}
     * // you can use the following to interpolate the text
     * var greetingText = i18n.t('hello_name', {name: 'nantas'}); // Hello, nantas
     */
    t: function t(key, opt) {
        return polyglot.t(key, opt);
    }
};

cc._RFpop();
},{"polyglot":"polyglot"}],"loadResAll_example":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fee3dcLoaZCvrJ9FZrBngbb', 'loadResAll_example');
// cases\05_scripting\07_asset_loading\loadResAll_example.js

cc.Class({
    "extends": cc.Component,

    properties: {
        btnClearAll: {
            "default": null,
            type: cc.Node
        },
        label: {
            "default": null,
            type: cc.Prefab
        },
        content: {
            "default": null,
            type: cc.Node
        },
        scrollView: {
            "default": null,
            type: cc.ScrollView
        }
    },

    onLoad: function onLoad() {
        this.count = 0;
        this.content.height = 0;
        this.btnClearAll.active = false;
    },

    _createLabel: function _createLabel(text) {
        var node = cc.instantiate(this.label);
        var label = node.getComponent(cc.Label);
        label.string = text;
        this.content.addChild(node);
    },

    _clear: function _clear() {
        this.content.removeAllChildren(true);
        cc.loader.releaseAll();
    },

    onClearAll: function onClearAll() {
        this.count = 0;
        this.content.height = 0;
        this.btnClearAll.active = false;
        this._clear();
    },

    onLoadAll: function onLoadAll() {
        var self = this;
        this._clear();
        self._createLabel("Load All Assets");
        cc.loader.loadResAll("test assets", function (err, assets) {
            cc.log(assets.length);
            self.count = assets.length;
            var text = "";
            for (var i = 0; i < assets.length; ++i) {
                if (typeof assets[i] === 'string') {
                    text = assets[i];
                } else {
                    text = assets[i].url || assets[i].name || assets[i] || textureFileName;
                }
                self._createLabel("asset: " + text);
            }
            self.btnClearAll.active = true;
            self.content.height = self.count * 60;
            self.scrollView.scrollToTop();
        });
    },

    onLoadSpriteFrameAll: function onLoadSpriteFrameAll() {
        var self = this;
        this._clear();
        self._createLabel("Load All Sprite Frame");
        cc.loader.loadResAll("test assets", cc.SpriteFrame, function (err, assets) {
            self.count = assets.length;
            var text = "";
            for (var i = 0; i < assets.length; ++i) {
                if (typeof assets[i] === 'string') {
                    text = assets[i];
                } else {
                    text = assets[i].url || assets[i]._name;
                }
                self._createLabel("sprite frame: " + text);
            }
            self.btnClearAll.active = true;
            self.content.height = self.count * 20;
        });
    }

});

cc._RFpop();
},{}],"motionStreakCtrl":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f7722zlKP5HoKMY5VvWPCON', 'motionStreakCtrl');
// cases\motionStreak\motionStreakCtrl.js

cc.Class({
    "extends": cc.Component,

    properties: {
        motionStreak: {
            "default": null,
            type: cc.MotionStreak
        },

        newTexture: {
            "default": null,
            url: cc.Texture2D
        }
    },

    onLoad: function onLoad() {
        this._changed = true;
        this.oldTexture = this.motionStreak.texture;
    },

    onClick: function onClick() {
        if (this._changed) {
            this.setMotionStreak(2, 3, 20, this.newTexture);
        } else {
            this.setMotionStreak(0.5, 1, 30, this.oldTexture);
        }
        this._changed = !this._changed;
    },

    setMotionStreak: function setMotionStreak(fadeTime, minSeg, stroke, texture) {
        this.motionStreak.fadeTime = fadeTime;
        this.motionStreak.minSeg = minSeg;
        this.motionStreak.stroke = stroke;
        this.motionStreak.texture = texture;
    }

});

cc._RFpop();
},{}],"polyglot":[function(require,module,exports){
(function (global){
"use strict";
cc._RFpush(module, '69decSgpRlE1rzEKp0RzG3V', 'polyglot');
// i18n\polyglot.js

//     (c) 2012-2016 Airbnb, Inc.
//
//     polyglot.js may be freely distributed under the terms of the BSD
//     license. For all licensing information, details, and documention:
//     http://airbnb.github.com/polyglot.js
//
//
// Polyglot.js is an I18n helper library written in JavaScript, made to
// work both in the browser and in Node. It provides a simple solution for
// interpolation and pluralization, based off of Airbnb's
// experience adding I18n functionality to its Backbone.js and Node apps.
//
// Polylglot is agnostic to your translation backend. It doesn't perform any
// translation; it simply gives you a way to manage translated phrases from
// your client- or server-side JavaScript application.

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.Polyglot = factory(root);
  }
})(typeof global !== 'undefined' ? global : this, function (root) {
  'use strict';

  var replace = String.prototype.replace;

  // ### Polyglot class constructor
  function Polyglot(options) {
    options = options || {};
    this.phrases = {};
    this.extend(options.phrases || {});
    this.currentLocale = options.locale || 'en';
    this.allowMissing = !!options.allowMissing;
    this.warn = options.warn || warn;
  }

  // ### Version
  Polyglot.VERSION = '1.0.0';

  // ### polyglot.locale([locale])
  //
  // Get or set locale. Internally, Polyglot only uses locale for pluralization.
  Polyglot.prototype.locale = function (newLocale) {
    if (newLocale) this.currentLocale = newLocale;
    return this.currentLocale;
  };

  // ### polyglot.extend(phrases)
  //
  // Use `extend` to tell Polyglot how to translate a given key.
  //
  //     polyglot.extend({
  //       "hello": "Hello",
  //       "hello_name": "Hello, %{name}"
  //     });
  //
  // The key can be any string.  Feel free to call `extend` multiple times;
  // it will override any phrases with the same key, but leave existing phrases
  // untouched.
  //
  // It is also possible to pass nested phrase objects, which get flattened
  // into an object with the nested keys concatenated using dot notation.
  //
  //     polyglot.extend({
  //       "nav": {
  //         "hello": "Hello",
  //         "hello_name": "Hello, %{name}",
  //         "sidebar": {
  //           "welcome": "Welcome"
  //         }
  //       }
  //     });
  //
  //     console.log(polyglot.phrases);
  //     // {
  //     //   'nav.hello': 'Hello',
  //     //   'nav.hello_name': 'Hello, %{name}',
  //     //   'nav.sidebar.welcome': 'Welcome'
  //     // }
  //
  // `extend` accepts an optional second argument, `prefix`, which can be used
  // to prefix every key in the phrases object with some string, using dot
  // notation.
  //
  //     polyglot.extend({
  //       "hello": "Hello",
  //       "hello_name": "Hello, %{name}"
  //     }, "nav");
  //
  //     console.log(polyglot.phrases);
  //     // {
  //     //   'nav.hello': 'Hello',
  //     //   'nav.hello_name': 'Hello, %{name}'
  //     // }
  //
  // This feature is used internally to support nested phrase objects.
  Polyglot.prototype.extend = function (morePhrases, prefix) {
    var phrase;

    for (var key in morePhrases) {
      if (morePhrases.hasOwnProperty(key)) {
        phrase = morePhrases[key];
        if (prefix) key = prefix + '.' + key;
        if (typeof phrase === 'object') {
          this.extend(phrase, key);
        } else {
          this.phrases[key] = phrase;
        }
      }
    }
  };

  // ### polyglot.unset(phrases)
  // Use `unset` to selectively remove keys from a polyglot instance.
  //
  //     polyglot.unset("some_key");
  //     polyglot.unset({
  //       "hello": "Hello",
  //       "hello_name": "Hello, %{name}"
  //     });
  //
  // The unset method can take either a string (for the key), or an object hash with
  // the keys that you would like to unset.
  Polyglot.prototype.unset = function (morePhrases, prefix) {
    var phrase;

    if (typeof morePhrases === 'string') {
      delete this.phrases[morePhrases];
    } else {
      for (var key in morePhrases) {
        if (morePhrases.hasOwnProperty(key)) {
          phrase = morePhrases[key];
          if (prefix) key = prefix + '.' + key;
          if (typeof phrase === 'object') {
            this.unset(phrase, key);
          } else {
            delete this.phrases[key];
          }
        }
      }
    }
  };

  // ### polyglot.clear()
  //
  // Clears all phrases. Useful for special cases, such as freeing
  // up memory if you have lots of phrases but no longer need to
  // perform any translation. Also used internally by `replace`.
  Polyglot.prototype.clear = function () {
    this.phrases = {};
  };

  // ### polyglot.replace(phrases)
  //
  // Completely replace the existing phrases with a new set of phrases.
  // Normally, just use `extend` to add more phrases, but under certain
  // circumstances, you may want to make sure no old phrases are lying around.
  Polyglot.prototype.replace = function (newPhrases) {
    this.clear();
    this.extend(newPhrases);
  };

  // ### polyglot.t(key, options)
  //
  // The most-used method. Provide a key, and `t` will return the
  // phrase.
  //
  //     polyglot.t("hello");
  //     => "Hello"
  //
  // The phrase value is provided first by a call to `polyglot.extend()` or
  // `polyglot.replace()`.
  //
  // Pass in an object as the second argument to perform interpolation.
  //
  //     polyglot.t("hello_name", {name: "Spike"});
  //     => "Hello, Spike"
  //
  // If you like, you can provide a default value in case the phrase is missing.
  // Use the special option key "_" to specify a default.
  //
  //     polyglot.t("i_like_to_write_in_language", {
  //       _: "I like to write in %{language}.",
  //       language: "JavaScript"
  //     });
  //     => "I like to write in JavaScript."
  //
  Polyglot.prototype.t = function (key, options) {
    var phrase, result;
    options = options == null ? {} : options;
    // allow number as a pluralization shortcut
    if (typeof options === 'number') {
      options = { smart_count: options };
    }
    if (typeof this.phrases[key] === 'string') {
      phrase = this.phrases[key];
    } else if (typeof options._ === 'string') {
      phrase = options._;
    } else if (this.allowMissing) {
      phrase = key;
    } else {
      this.warn('Missing translation for key: "' + key + '"');
      result = key;
    }
    if (typeof phrase === 'string') {
      options = clone(options);
      result = choosePluralForm(phrase, this.currentLocale, options.smart_count);
      result = interpolate(result, options);
    }
    return result;
  };

  // ### polyglot.has(key)
  //
  // Check if polyglot has a translation for given key
  Polyglot.prototype.has = function (key) {
    return key in this.phrases;
  };

  // #### Pluralization methods
  // The string that separates the different phrase possibilities.
  var delimeter = '||||';

  // Mapping from pluralization group plural logic.
  var pluralTypes = {
    chinese: function chinese(n) {
      return 0;
    },
    german: function german(n) {
      return n !== 1 ? 1 : 0;
    },
    french: function french(n) {
      return n > 1 ? 1 : 0;
    },
    russian: function russian(n) {
      return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    },
    czech: function czech(n) {
      return n === 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
    },
    polish: function polish(n) {
      return n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    },
    icelandic: function icelandic(n) {
      return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
    }
  };

  // Mapping from pluralization group to individual locales.
  var pluralTypeToLanguages = {
    chinese: ['fa', 'id', 'ja', 'ko', 'lo', 'ms', 'th', 'tr', 'zh'],
    german: ['da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hu', 'it', 'nl', 'no', 'pt', 'sv'],
    french: ['fr', 'tl', 'pt-br'],
    russian: ['hr', 'ru'],
    czech: ['cs', 'sk'],
    polish: ['pl'],
    icelandic: ['is']
  };

  function langToTypeMap(mapping) {
    var type,
        langs,
        l,
        ret = {};
    for (type in mapping) {
      if (mapping.hasOwnProperty(type)) {
        langs = mapping[type];
        for (l in langs) {
          ret[langs[l]] = type;
        }
      }
    }
    return ret;
  }

  // Trim a string.
  var trimRe = /^\s+|\s+$/g;
  function trim(str) {
    return replace.call(str, trimRe, '');
  }

  // Based on a phrase text that contains `n` plural forms separated
  // by `delimeter`, a `locale`, and a `count`, choose the correct
  // plural form, or none if `count` is `null`.
  function choosePluralForm(text, locale, count) {
    var ret, texts, chosenText;
    if (count != null && text) {
      texts = text.split(delimeter);
      chosenText = texts[pluralTypeIndex(locale, count)] || texts[0];
      ret = trim(chosenText);
    } else {
      ret = text;
    }
    return ret;
  }

  function pluralTypeName(locale) {
    var langToPluralType = langToTypeMap(pluralTypeToLanguages);
    return langToPluralType[locale] || langToPluralType.en;
  }

  function pluralTypeIndex(locale, count) {
    return pluralTypes[pluralTypeName(locale)](count);
  }

  // ### interpolate
  //
  // Does the dirty work. Creates a `RegExp` object for each
  // interpolation placeholder.
  var dollarRegex = /\$/g;
  var dollarBillsYall = '$$$$';
  function interpolate(phrase, options) {
    for (var arg in options) {
      if (arg !== '_' && options.hasOwnProperty(arg)) {
        // Ensure replacement value is escaped to prevent special $-prefixed
        // regex replace tokens. the "$$$$" is needed because each "$" needs to
        // be escaped with "$" itself, and we need two in the resulting output.
        var replacement = options[arg];
        if (typeof replacement === 'string') {
          replacement = replace.call(options[arg], dollarRegex, dollarBillsYall);
        }
        // We create a new `RegExp` each time instead of using a more-efficient
        // string replace so that the same argument can be replaced multiple times
        // in the same phrase.
        phrase = replace.call(phrase, new RegExp('%\\{' + arg + '\\}', 'g'), replacement);
      }
    }
    return phrase;
  }

  // ### warn
  //
  // Provides a warning in the console if a phrase key is missing.
  function warn(message) {
    root.console && root.console.warn && root.console.warn('WARNING: ' + message);
  }

  // ### clone
  //
  // Clone an object.
  function clone(source) {
    var ret = {};
    for (var prop in source) {
      ret[prop] = source[prop];
    }
    return ret;
  }

  return Polyglot;
});
//

cc._RFpop();
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"scheduleCallbacks":[function(require,module,exports){
"use strict";
cc._RFpush(module, '930deImxoZIkp6ugjMU5ULW', 'scheduleCallbacks');
// cases\05_scripting\04_scheduler\scheduleCallbacks.js

var i18n = require('i18n');

cc.Class({
    'extends': cc.Component,

    properties: {
        time: {
            'default': 5
        }
    },

    _callback: function _callback() {
        this.node.runAction(this.seq);
        if (this.repeat) {
            this.counting = true;
        } else {
            this.counting = false;
        }
        this.time = 5;
        this.counter.string = this.time.toFixed(2) + ' s';
    },

    // use this for initialization
    onLoad: function onLoad() {
        var squashAction = cc.scaleTo(0.2, 1, 0.6);
        var stretchAction = cc.scaleTo(0.2, 1, 1.2);
        var scaleBackAction = cc.scaleTo(0.1, 1, 1);
        var moveUpAction = cc.moveBy(1, cc.p(0, 100)).easing(cc.easeCubicActionOut());
        var moveDownAction = cc.moveBy(1, cc.p(0, -100)).easing(cc.easeCubicActionIn());
        this.seq = cc.sequence(squashAction, stretchAction, moveUpAction, scaleBackAction, moveDownAction, squashAction, scaleBackAction);

        this.counter = cc.find('Canvas/count_label').getComponent(cc.Label);
        this.counter.string = this.time.toFixed(2) + ' s';
        this.counting = false;
        this.repeat = false;
    },

    // called every frame
    update: function update(dt) {
        if (this.counting) {
            this.time -= dt;
            this.counter.string = this.time.toFixed(2) + ' s';
        }
    },

    stopCounting: function stopCounting() {
        this.unschedule(this._callback);
        this.counting = false;
        this.counter.string = i18n.t("cases/05_scripting/04_scheduler/scheduleCallbacks.js.1");
        this.time = 5;
    },

    repeatSchedule: function repeatSchedule() {
        this.stopCounting();
        this.schedule(this._callback, 5);
        this.repeat = true;
        this.counting = true;
    },

    oneSchedule: function oneSchedule() {
        this.stopCounting();
        this.scheduleOnce(this._callback, 5);
        this.repeat = false;
        this.counting = true;
    },

    cancelSchedules: function cancelSchedules() {
        this.repeat = false;
        this.stopCounting();
    }
});

cc._RFpop();
},{"i18n":"i18n"}],"socket-io":[function(require,module,exports){
(function (global){
"use strict";
cc._RFpush(module, 'ccfc9WDTsRJVaSqhQIdzqNG', 'socket-io');
// cases\05_scripting\11_network\socket-io.js

if(!CC_JSB && !cc.sys.isNative){!(function(e){if("object" == typeof exports && "undefined" != typeof module)module.exports = e();else if("function" == typeof define && define.amd)define([],e);else {var f;"undefined" != typeof window?f = window:"undefined" != typeof global?f = global:"undefined" != typeof self && (f = self),f.io = e();}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require == "function" && require;if(!u && a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '" + o + "'");}var f=n[o] = {exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e);},f,f.exports,e,t,n,r);}return n[o].exports;}var i=typeof require == "function" && require;for(var o=0;o < r.length;o++) s(r[o]);return s;})({1:[function(_dereq_,module,exports){module.exports = _dereq_('./lib/');},{"./lib/":2}],2:[function(_dereq_,module,exports){ /**
         * Module dependencies.
         */var url=_dereq_('./url');var parser=_dereq_('socket.io-parser');var Manager=_dereq_('./manager');var debug=_dereq_('debug')('socket.io-client'); /**
         * Module exports.
         */module.exports = exports = lookup; /**
         * Managers cache.
         */var cache=exports.managers = {}; /**
         * Looks up an existing `Manager` for multiplexing.
         * If the user summons:
         *
         *   `io('http://localhost/a');`
         *   `io('http://localhost/b');`
         *
         * We reuse the existing instance based on same scheme/port/host,
         * and we initialize sockets for each namespace.
         *
         * @api public
         */function lookup(uri,opts){if(typeof uri == 'object'){opts = uri;uri = undefined;}opts = opts || {};var parsed=url(uri);var source=parsed.source;var id=parsed.id;var io;if(opts.forceNew || opts['force new connection'] || false === opts.multiplex){debug('ignoring socket cache for %s',source);io = Manager(source,opts);}else {if(!cache[id]){debug('new io instance for %s',source);cache[id] = Manager(source,opts);}io = cache[id];}return io.socket(parsed.path);} /**
         * Protocol version.
         *
         * @api public
         */exports.protocol = parser.protocol; /**
         * `connect`.
         *
         * @param {String} uri
         * @api public
         */exports.connect = lookup; /**
         * Expose constructors for standalone build.
         *
         * @api public
         */exports.Manager = _dereq_('./manager');exports.Socket = _dereq_('./socket');},{"./manager":3,"./socket":5,"./url":6,"debug":10,"socket.io-parser":46}],3:[function(_dereq_,module,exports){ /**
         * Module dependencies.
         */var url=_dereq_('./url');var eio=_dereq_('engine.io-client');var Socket=_dereq_('./socket');var Emitter=_dereq_('component-emitter');var parser=_dereq_('socket.io-parser');var on=_dereq_('./on');var bind=_dereq_('component-bind');var object=_dereq_('object-component');var debug=_dereq_('debug')('socket.io-client:manager');var indexOf=_dereq_('indexof');var Backoff=_dereq_('backo2'); /**
         * Module exports
         */module.exports = Manager; /**
         * `Manager` constructor.
         *
         * @param {String} engine instance or engine uri/opts
         * @param {Object} options
         * @api public
         */function Manager(uri,opts){if(!(this instanceof Manager))return new Manager(uri,opts);if(uri && 'object' == typeof uri){opts = uri;uri = undefined;}opts = opts || {};opts.path = opts.path || '/socket.io';this.nsps = {};this.subs = [];this.opts = opts;this.reconnection(opts.reconnection !== false);this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);this.reconnectionDelay(opts.reconnectionDelay || 1000);this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);this.randomizationFactor(opts.randomizationFactor || 0.5);this.backoff = new Backoff({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()});this.timeout(null == opts.timeout?20000:opts.timeout);this.readyState = 'closed';this.uri = uri;this.connected = [];this.encoding = false;this.packetBuffer = [];this.encoder = new parser.Encoder();this.decoder = new parser.Decoder();this.autoConnect = opts.autoConnect !== false;if(this.autoConnect)this.open();} /**
         * Propagate given event to sockets and emit on `this`
         *
         * @api private
         */Manager.prototype.emitAll = function(){this.emit.apply(this,arguments);for(var nsp in this.nsps) {this.nsps[nsp].emit.apply(this.nsps[nsp],arguments);}}; /**
         * Update `socket.id` of all sockets
         *
         * @api private
         */Manager.prototype.updateSocketIds = function(){for(var nsp in this.nsps) {this.nsps[nsp].id = this.engine.id;}}; /**
         * Mix in `Emitter`.
         */Emitter(Manager.prototype); /**
         * Sets the `reconnection` config.
         *
         * @param {Boolean} true/false if it should automatically reconnect
         * @return {Manager} self or value
         * @api public
         */Manager.prototype.reconnection = function(v){if(!arguments.length)return this._reconnection;this._reconnection = !!v;return this;}; /**
         * Sets the reconnection attempts config.
         *
         * @param {Number} max reconnection attempts before giving up
         * @return {Manager} self or value
         * @api public
         */Manager.prototype.reconnectionAttempts = function(v){if(!arguments.length)return this._reconnectionAttempts;this._reconnectionAttempts = v;return this;}; /**
         * Sets the delay between reconnections.
         *
         * @param {Number} delay
         * @return {Manager} self or value
         * @api public
         */Manager.prototype.reconnectionDelay = function(v){if(!arguments.length)return this._reconnectionDelay;this._reconnectionDelay = v;this.backoff && this.backoff.setMin(v);return this;};Manager.prototype.randomizationFactor = function(v){if(!arguments.length)return this._randomizationFactor;this._randomizationFactor = v;this.backoff && this.backoff.setJitter(v);return this;}; /**
         * Sets the maximum delay between reconnections.
         *
         * @param {Number} delay
         * @return {Manager} self or value
         * @api public
         */Manager.prototype.reconnectionDelayMax = function(v){if(!arguments.length)return this._reconnectionDelayMax;this._reconnectionDelayMax = v;this.backoff && this.backoff.setMax(v);return this;}; /**
         * Sets the connection timeout. `false` to disable
         *
         * @return {Manager} self or value
         * @api public
         */Manager.prototype.timeout = function(v){if(!arguments.length)return this._timeout;this._timeout = v;return this;}; /**
         * Starts trying to reconnect if reconnection is enabled and we have not
         * started reconnecting yet
         *
         * @api private
         */Manager.prototype.maybeReconnectOnOpen = function(){ // Only try to reconnect if it's the first time we're connecting
if(!this.reconnecting && this._reconnection && this.backoff.attempts === 0){ // keeps reconnection from firing twice for the same reconnection loop
this.reconnect();}}; /**
         * Sets the current transport `socket`.
         *
         * @param {Function} optional, callback
         * @return {Manager} self
         * @api public
         */Manager.prototype.open = Manager.prototype.connect = function(fn){debug('readyState %s',this.readyState);if(~this.readyState.indexOf('open'))return this;debug('opening %s',this.uri);this.engine = eio(this.uri,this.opts);var socket=this.engine;var self=this;this.readyState = 'opening';this.skipReconnect = false; // emit `open`
var openSub=on(socket,'open',function(){self.onopen();fn && fn();}); // emit `connect_error`
var errorSub=on(socket,'error',function(data){debug('connect_error');self.cleanup();self.readyState = 'closed';self.emitAll('connect_error',data);if(fn){var err=new Error('Connection error');err.data = data;fn(err);}else { // Only do this if there is no fn to handle the error
self.maybeReconnectOnOpen();}}); // emit `connect_timeout`
if(false !== this._timeout){var timeout=this._timeout;debug('connect attempt will timeout after %d',timeout); // set timer
var timer=setTimeout(function(){debug('connect attempt timed out after %d',timeout);openSub.destroy();socket.close();socket.emit('error','timeout');self.emitAll('connect_timeout',timeout);},timeout);this.subs.push({destroy:function destroy(){clearTimeout(timer);}});}this.subs.push(openSub);this.subs.push(errorSub);return this;}; /**
         * Called upon transport open.
         *
         * @api private
         */Manager.prototype.onopen = function(){debug('open'); // clear old subs
this.cleanup(); // mark as open
this.readyState = 'open';this.emit('open'); // add new subs
var socket=this.engine;this.subs.push(on(socket,'data',bind(this,'ondata')));this.subs.push(on(this.decoder,'decoded',bind(this,'ondecoded')));this.subs.push(on(socket,'error',bind(this,'onerror')));this.subs.push(on(socket,'close',bind(this,'onclose')));}; /**
         * Called with data.
         *
         * @api private
         */Manager.prototype.ondata = function(data){this.decoder.add(data);}; /**
         * Called when parser fully decodes a packet.
         *
         * @api private
         */Manager.prototype.ondecoded = function(packet){this.emit('packet',packet);}; /**
         * Called upon socket error.
         *
         * @api private
         */Manager.prototype.onerror = function(err){debug('error',err);this.emitAll('error',err);}; /**
         * Creates a new socket for the given `nsp`.
         *
         * @return {Socket}
         * @api public
         */Manager.prototype.socket = function(nsp){var socket=this.nsps[nsp];if(!socket){socket = new Socket(this,nsp);this.nsps[nsp] = socket;var self=this;socket.on('connect',function(){socket.id = self.engine.id;if(! ~indexOf(self.connected,socket)){self.connected.push(socket);}});}return socket;}; /**
         * Called upon a socket close.
         *
         * @param {Socket} socket
         */Manager.prototype.destroy = function(socket){var index=indexOf(this.connected,socket);if(~index)this.connected.splice(index,1);if(this.connected.length)return;this.close();}; /**
         * Writes a packet.
         *
         * @param {Object} packet
         * @api private
         */Manager.prototype.packet = function(packet){debug('writing packet %j',packet);var self=this;if(!self.encoding){ // encode, then write to engine with result
self.encoding = true;this.encoder.encode(packet,function(encodedPackets){for(var i=0;i < encodedPackets.length;i++) {self.engine.write(encodedPackets[i]);}self.encoding = false;self.processPacketQueue();});}else { // add packet to the queue
self.packetBuffer.push(packet);}}; /**
         * If packet buffer is non-empty, begins encoding the
         * next packet in line.
         *
         * @api private
         */Manager.prototype.processPacketQueue = function(){if(this.packetBuffer.length > 0 && !this.encoding){var pack=this.packetBuffer.shift();this.packet(pack);}}; /**
         * Clean up transport subscriptions and packet buffer.
         *
         * @api private
         */Manager.prototype.cleanup = function(){var sub;while(sub = this.subs.shift()) sub.destroy();this.packetBuffer = [];this.encoding = false;this.decoder.destroy();}; /**
         * Close the current socket.
         *
         * @api private
         */Manager.prototype.close = Manager.prototype.disconnect = function(){this.skipReconnect = true;this.backoff.reset();this.readyState = 'closed';this.engine && this.engine.close();}; /**
         * Called upon engine close.
         *
         * @api private
         */Manager.prototype.onclose = function(reason){debug('close');this.cleanup();this.backoff.reset();this.readyState = 'closed';this.emit('close',reason);if(this._reconnection && !this.skipReconnect){this.reconnect();}}; /**
         * Attempt a reconnection.
         *
         * @api private
         */Manager.prototype.reconnect = function(){if(this.reconnecting || this.skipReconnect)return this;var self=this;if(this.backoff.attempts >= this._reconnectionAttempts){debug('reconnect failed');this.backoff.reset();this.emitAll('reconnect_failed');this.reconnecting = false;}else {var delay=this.backoff.duration();debug('will wait %dms before reconnect attempt',delay);this.reconnecting = true;var timer=setTimeout(function(){if(self.skipReconnect)return;debug('attempting reconnect');self.emitAll('reconnect_attempt',self.backoff.attempts);self.emitAll('reconnecting',self.backoff.attempts); // check again for the case socket closed in above events
if(self.skipReconnect)return;self.open(function(err){if(err){debug('reconnect attempt error');self.reconnecting = false;self.reconnect();self.emitAll('reconnect_error',err.data);}else {debug('reconnect success');self.onreconnect();}});},delay);this.subs.push({destroy:function destroy(){clearTimeout(timer);}});}}; /**
         * Called upon successful reconnect.
         *
         * @api private
         */Manager.prototype.onreconnect = function(){var attempt=this.backoff.attempts;this.reconnecting = false;this.backoff.reset();this.updateSocketIds();this.emitAll('reconnect',attempt);};},{"./on":4,"./socket":5,"./url":6,"backo2":7,"component-bind":8,"component-emitter":9,"debug":10,"engine.io-client":11,"indexof":42,"object-component":43,"socket.io-parser":46}],4:[function(_dereq_,module,exports){ /**
         * Module exports.
         */module.exports = on; /**
         * Helper for subscriptions.
         *
         * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
         * @param {String} event name
         * @param {Function} callback
         * @api public
         */function on(obj,ev,fn){obj.on(ev,fn);return {destroy:function destroy(){obj.removeListener(ev,fn);}};}},{}],5:[function(_dereq_,module,exports){ /**
         * Module dependencies.
         */var parser=_dereq_('socket.io-parser');var Emitter=_dereq_('component-emitter');var toArray=_dereq_('to-array');var on=_dereq_('./on');var bind=_dereq_('component-bind');var debug=_dereq_('debug')('socket.io-client:socket');var hasBin=_dereq_('has-binary'); /**
         * Module exports.
         */module.exports = exports = Socket; /**
         * Internal events (blacklisted).
         * These events can't be emitted by the user.
         *
         * @api private
         */var events={connect:1,connect_error:1,connect_timeout:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1}; /**
         * Shortcut to `Emitter#emit`.
         */var emit=Emitter.prototype.emit; /**
         * `Socket` constructor.
         *
         * @api public
         */function Socket(io,nsp){this.io = io;this.nsp = nsp;this.json = this; // compat
this.ids = 0;this.acks = {};if(this.io.autoConnect)this.open();this.receiveBuffer = [];this.sendBuffer = [];this.connected = false;this.disconnected = true;} /**
         * Mix in `Emitter`.
         */Emitter(Socket.prototype); /**
         * Subscribe to open, close and packet events
         *
         * @api private
         */Socket.prototype.subEvents = function(){if(this.subs)return;var io=this.io;this.subs = [on(io,'open',bind(this,'onopen')),on(io,'packet',bind(this,'onpacket')),on(io,'close',bind(this,'onclose'))];}; /**
         * "Opens" the socket.
         *
         * @api public
         */Socket.prototype.open = Socket.prototype.connect = function(){if(this.connected)return this;this.subEvents();this.io.open(); // ensure open
if('open' == this.io.readyState)this.onopen();return this;}; /**
         * Sends a `message` event.
         *
         * @return {Socket} self
         * @api public
         */Socket.prototype.send = function(){var args=toArray(arguments);args.unshift('message');this.emit.apply(this,args);return this;}; /**
         * Override `emit`.
         * If the event is in `events`, it's emitted normally.
         *
         * @param {String} event name
         * @return {Socket} self
         * @api public
         */Socket.prototype.emit = function(ev){if(events.hasOwnProperty(ev)){emit.apply(this,arguments);return this;}var args=toArray(arguments);var parserType=parser.EVENT; // default
if(hasBin(args)){parserType = parser.BINARY_EVENT;} // binary
var packet={type:parserType,data:args}; // event ack callback
if('function' == typeof args[args.length - 1]){debug('emitting packet with ack id %d',this.ids);this.acks[this.ids] = args.pop();packet.id = this.ids++;}if(this.connected){this.packet(packet);}else {this.sendBuffer.push(packet);}return this;}; /**
         * Sends a packet.
         *
         * @param {Object} packet
         * @api private
         */Socket.prototype.packet = function(packet){packet.nsp = this.nsp;this.io.packet(packet);}; /**
         * Called upon engine `open`.
         *
         * @api private
         */Socket.prototype.onopen = function(){debug('transport is open - connecting'); // write connect packet if necessary
if('/' != this.nsp){this.packet({type:parser.CONNECT});}}; /**
         * Called upon engine `close`.
         *
         * @param {String} reason
         * @api private
         */Socket.prototype.onclose = function(reason){debug('close (%s)',reason);this.connected = false;this.disconnected = true;delete this.id;this.emit('disconnect',reason);}; /**
         * Called with socket packet.
         *
         * @param {Object} packet
         * @api private
         */Socket.prototype.onpacket = function(packet){if(packet.nsp != this.nsp)return;switch(packet.type){case parser.CONNECT:this.onconnect();break;case parser.EVENT:this.onevent(packet);break;case parser.BINARY_EVENT:this.onevent(packet);break;case parser.ACK:this.onack(packet);break;case parser.BINARY_ACK:this.onack(packet);break;case parser.DISCONNECT:this.ondisconnect();break;case parser.ERROR:this.emit('error',packet.data);break;}}; /**
         * Called upon a server event.
         *
         * @param {Object} packet
         * @api private
         */Socket.prototype.onevent = function(packet){var args=packet.data || [];debug('emitting event %j',args);if(null != packet.id){debug('attaching ack callback to event');args.push(this.ack(packet.id));}if(this.connected){emit.apply(this,args);}else {this.receiveBuffer.push(args);}}; /**
         * Produces an ack callback to emit with an event.
         *
         * @api private
         */Socket.prototype.ack = function(id){var self=this;var sent=false;return function(){ // prevent double callbacks
if(sent)return;sent = true;var args=toArray(arguments);debug('sending ack %j',args);var type=hasBin(args)?parser.BINARY_ACK:parser.ACK;self.packet({type:type,id:id,data:args});};}; /**
         * Called upon a server acknowlegement.
         *
         * @param {Object} packet
         * @api private
         */Socket.prototype.onack = function(packet){debug('calling ack %s with %j',packet.id,packet.data);var fn=this.acks[packet.id];fn.apply(this,packet.data);delete this.acks[packet.id];}; /**
         * Called upon server connect.
         *
         * @api private
         */Socket.prototype.onconnect = function(){this.connected = true;this.disconnected = false;this.emit('connect');this.emitBuffered();}; /**
         * Emit buffered events (received and emitted).
         *
         * @api private
         */Socket.prototype.emitBuffered = function(){var i;for(i = 0;i < this.receiveBuffer.length;i++) {emit.apply(this,this.receiveBuffer[i]);}this.receiveBuffer = [];for(i = 0;i < this.sendBuffer.length;i++) {this.packet(this.sendBuffer[i]);}this.sendBuffer = [];}; /**
         * Called upon server disconnect.
         *
         * @api private
         */Socket.prototype.ondisconnect = function(){debug('server disconnect (%s)',this.nsp);this.destroy();this.onclose('io server disconnect');}; /**
         * Called upon forced client/server side disconnections,
         * this method ensures the manager stops tracking us and
         * that reconnections don't get triggered for this.
         *
         * @api private.
         */Socket.prototype.destroy = function(){if(this.subs){ // clean subscriptions to avoid reconnections
for(var i=0;i < this.subs.length;i++) {this.subs[i].destroy();}this.subs = null;}this.io.destroy(this);}; /**
         * Disconnects the socket manually.
         *
         * @return {Socket} self
         * @api public
         */Socket.prototype.close = Socket.prototype.disconnect = function(){if(this.connected){debug('performing disconnect (%s)',this.nsp);this.packet({type:parser.DISCONNECT});} // remove socket from pool
this.destroy();if(this.connected){ // fire events
this.onclose('io client disconnect');}return this;};},{"./on":4,"component-bind":8,"component-emitter":9,"debug":10,"has-binary":38,"socket.io-parser":46,"to-array":50}],6:[function(_dereq_,module,exports){(function(global){ /**
           * Module dependencies.
           */var parseuri=_dereq_('parseuri');var debug=_dereq_('debug')('socket.io-client:url'); /**
           * Module exports.
           */module.exports = url; /**
           * URL parser.
           *
           * @param {String} url
           * @param {Object} An object meant to mimic window.location.
           *                 Defaults to window.location.
           * @api public
           */function url(uri,loc){var obj=uri; // default to window.location
var loc=loc || global.location;if(null == uri)uri = loc.protocol + '//' + loc.host; // relative path support
if('string' == typeof uri){if('/' == uri.charAt(0)){if('/' == uri.charAt(1)){uri = loc.protocol + uri;}else {uri = loc.hostname + uri;}}if(!/^(https?|wss?):\/\//.test(uri)){debug('protocol-less url %s',uri);if('undefined' != typeof loc){uri = loc.protocol + '//' + uri;}else {uri = 'https://' + uri;}} // parse
debug('parse %s',uri);obj = parseuri(uri);} // make sure we treat `localhost:80` and `localhost` equally
if(!obj.port){if(/^(http|ws)$/.test(obj.protocol)){obj.port = '80';}else if(/^(http|ws)s$/.test(obj.protocol)){obj.port = '443';}}obj.path = obj.path || '/'; // define unique id
obj.id = obj.protocol + '://' + obj.host + ':' + obj.port; // define href
obj.href = obj.protocol + '://' + obj.host + (loc && loc.port == obj.port?'':':' + obj.port);return obj;}}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{"debug":10,"parseuri":44}],7:[function(_dereq_,module,exports){ /**
         * Expose `Backoff`.
         */module.exports = Backoff; /**
         * Initialize backoff timer with `opts`.
         *
         * - `min` initial timeout in milliseconds [100]
         * - `max` max timeout [10000]
         * - `jitter` [0]
         * - `factor` [2]
         *
         * @param {Object} opts
         * @api public
         */function Backoff(opts){opts = opts || {};this.ms = opts.min || 100;this.max = opts.max || 10000;this.factor = opts.factor || 2;this.jitter = opts.jitter > 0 && opts.jitter <= 1?opts.jitter:0;this.attempts = 0;} /**
         * Return the backoff duration.
         *
         * @return {Number}
         * @api public
         */Backoff.prototype.duration = function(){var ms=this.ms * Math.pow(this.factor,this.attempts++);if(this.jitter){var rand=Math.random();var deviation=Math.floor(rand * this.jitter * ms);ms = (Math.floor(rand * 10) & 1) == 0?ms - deviation:ms + deviation;}return Math.min(ms,this.max) | 0;}; /**
         * Reset the number of attempts.
         *
         * @api public
         */Backoff.prototype.reset = function(){this.attempts = 0;}; /**
         * Set the minimum duration
         *
         * @api public
         */Backoff.prototype.setMin = function(min){this.ms = min;}; /**
         * Set the maximum duration
         *
         * @api public
         */Backoff.prototype.setMax = function(max){this.max = max;}; /**
         * Set the jitter
         *
         * @api public
         */Backoff.prototype.setJitter = function(jitter){this.jitter = jitter;};},{}],8:[function(_dereq_,module,exports){ /**
         * Slice reference.
         */var slice=[].slice; /**
         * Bind `obj` to `fn`.
         *
         * @param {Object} obj
         * @param {Function|String} fn or string
         * @return {Function}
         * @api public
         */module.exports = function(obj,fn){if('string' == typeof fn)fn = obj[fn];if('function' != typeof fn)throw new Error('bind() requires a function');var args=slice.call(arguments,2);return function(){return fn.apply(obj,args.concat(slice.call(arguments)));};};},{}],9:[function(_dereq_,module,exports){ /**
         * Expose `Emitter`.
         */module.exports = Emitter; /**
         * Initialize a new `Emitter`.
         *
         * @api public
         */function Emitter(obj){if(obj)return mixin(obj);}; /**
         * Mixin the emitter properties.
         *
         * @param {Object} obj
         * @return {Object}
         * @api private
         */function mixin(obj){for(var key in Emitter.prototype) {obj[key] = Emitter.prototype[key];}return obj;} /**
         * Listen on the given `event` with `fn`.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */Emitter.prototype.on = Emitter.prototype.addEventListener = function(event,fn){this._callbacks = this._callbacks || {};(this._callbacks[event] = this._callbacks[event] || []).push(fn);return this;}; /**
         * Adds an `event` listener that will be invoked a single
         * time then automatically removed.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */Emitter.prototype.once = function(event,fn){var self=this;this._callbacks = this._callbacks || {};function on(){self.off(event,on);fn.apply(this,arguments);}on.fn = fn;this.on(event,on);return this;}; /**
         * Remove the given callback for `event` or all
         * registered callbacks.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event,fn){this._callbacks = this._callbacks || {}; // all
if(0 == arguments.length){this._callbacks = {};return this;} // specific event
var callbacks=this._callbacks[event];if(!callbacks)return this; // remove all handlers
if(1 == arguments.length){delete this._callbacks[event];return this;} // remove specific handler
var cb;for(var i=0;i < callbacks.length;i++) {cb = callbacks[i];if(cb === fn || cb.fn === fn){callbacks.splice(i,1);break;}}return this;}; /**
         * Emit `event` with the given args.
         *
         * @param {String} event
         * @param {Mixed} ...
         * @return {Emitter}
         */Emitter.prototype.emit = function(event){this._callbacks = this._callbacks || {};var args=[].slice.call(arguments,1),callbacks=this._callbacks[event];if(callbacks){callbacks = callbacks.slice(0);for(var i=0,len=callbacks.length;i < len;++i) {callbacks[i].apply(this,args);}}return this;}; /**
         * Return array of callbacks for `event`.
         *
         * @param {String} event
         * @return {Array}
         * @api public
         */Emitter.prototype.listeners = function(event){this._callbacks = this._callbacks || {};return this._callbacks[event] || [];}; /**
         * Check if this emitter has `event` handlers.
         *
         * @param {String} event
         * @return {Boolean}
         * @api public
         */Emitter.prototype.hasListeners = function(event){return !!this.listeners(event).length;};},{}],10:[function(_dereq_,module,exports){ /**
         * Expose `debug()` as the module.
         */module.exports = debug; /**
         * Create a debugger with the given `name`.
         *
         * @param {String} name
         * @return {Type}
         * @api public
         */function debug(name){if(!debug.enabled(name))return function(){};return function(fmt){fmt = coerce(fmt);var curr=new Date();var ms=curr - (debug[name] || curr);debug[name] = curr;fmt = name + ' ' + fmt + ' +' + debug.humanize(ms); // This hackery is required for IE8
// where `console.log` doesn't have 'apply'
window.console && console.log && Function.prototype.apply.call(console.log,console,arguments);};} /**
         * The currently active debug mode names.
         */debug.names = [];debug.skips = []; /**
         * Enables a debug mode by name. This can include modes
         * separated by a colon and wildcards.
         *
         * @param {String} name
         * @api public
         */debug.enable = function(name){try{localStorage.debug = name;}catch(e) {}var split=(name || '').split(/[\s,]+/),len=split.length;for(var i=0;i < len;i++) {name = split[i].replace('*','.*?');if(name[0] === '-'){debug.skips.push(new RegExp('^' + name.substr(1) + '$'));}else {debug.names.push(new RegExp('^' + name + '$'));}}}; /**
         * Disable debug output.
         *
         * @api public
         */debug.disable = function(){debug.enable('');}; /**
         * Humanize the given `ms`.
         *
         * @param {Number} m
         * @return {String}
         * @api private
         */debug.humanize = function(ms){var sec=1000,min=60 * 1000,hour=60 * min;if(ms >= hour)return (ms / hour).toFixed(1) + 'h';if(ms >= min)return (ms / min).toFixed(1) + 'm';if(ms >= sec)return (ms / sec | 0) + 's';return ms + 'ms';}; /**
         * Returns true if the given mode name is enabled, false otherwise.
         *
         * @param {String} name
         * @return {Boolean}
         * @api public
         */debug.enabled = function(name){for(var i=0,len=debug.skips.length;i < len;i++) {if(debug.skips[i].test(name)){return false;}}for(var i=0,len=debug.names.length;i < len;i++) {if(debug.names[i].test(name)){return true;}}return false;}; /**
         * Coerce `val`.
         */function coerce(val){if(val instanceof Error)return val.stack || val.message;return val;} // persist
try{if(window.localStorage)debug.enable(localStorage.debug);}catch(e) {}},{}],11:[function(_dereq_,module,exports){module.exports = _dereq_('./lib/');},{"./lib/":12}],12:[function(_dereq_,module,exports){module.exports = _dereq_('./socket'); /**
         * Exports parser
         *
         * @api public
         *
         */module.exports.parser = _dereq_('engine.io-parser');},{"./socket":13,"engine.io-parser":25}],13:[function(_dereq_,module,exports){(function(global){ /**
           * Module dependencies.
           */var transports=_dereq_('./transports');var Emitter=_dereq_('component-emitter');var debug=_dereq_('debug')('engine.io-client:socket');var index=_dereq_('indexof');var parser=_dereq_('engine.io-parser');var parseuri=_dereq_('parseuri');var parsejson=_dereq_('parsejson');var parseqs=_dereq_('parseqs'); /**
           * Module exports.
           */module.exports = Socket; /**
           * Noop function.
           *
           * @api private
           */function noop(){} /**
           * Socket constructor.
           *
           * @param {String|Object} uri or options
           * @param {Object} options
           * @api public
           */function Socket(uri,opts){if(!(this instanceof Socket))return new Socket(uri,opts);opts = opts || {};if(uri && 'object' == typeof uri){opts = uri;uri = null;}if(uri){uri = parseuri(uri);opts.host = uri.host;opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';opts.port = uri.port;if(uri.query)opts.query = uri.query;}this.secure = null != opts.secure?opts.secure:global.location && 'https:' == location.protocol;if(opts.host){var pieces=opts.host.split(':');opts.hostname = pieces.shift();if(pieces.length){opts.port = pieces.pop();}else if(!opts.port){ // if no port is specified manually, use the protocol default
opts.port = this.secure?'443':'80';}}this.agent = opts.agent || false;this.hostname = opts.hostname || (global.location?location.hostname:'localhost');this.port = opts.port || (global.location && location.port?location.port:this.secure?443:80);this.query = opts.query || {};if('string' == typeof this.query)this.query = parseqs.decode(this.query);this.upgrade = false !== opts.upgrade;this.path = (opts.path || '/engine.io').replace(/\/$/,'') + '/';this.forceJSONP = !!opts.forceJSONP;this.jsonp = false !== opts.jsonp;this.forceBase64 = !!opts.forceBase64;this.enablesXDR = !!opts.enablesXDR;this.timestampParam = opts.timestampParam || 't';this.timestampRequests = opts.timestampRequests;this.transports = opts.transports || ['polling','websocket'];this.readyState = '';this.writeBuffer = [];this.callbackBuffer = [];this.policyPort = opts.policyPort || 843;this.rememberUpgrade = opts.rememberUpgrade || false;this.binaryType = null;this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades; // SSL options for Node.js client
this.pfx = opts.pfx || null;this.key = opts.key || null;this.passphrase = opts.passphrase || null;this.cert = opts.cert || null;this.ca = opts.ca || null;this.ciphers = opts.ciphers || null;this.rejectUnauthorized = opts.rejectUnauthorized || null;this.open();}Socket.priorWebsocketSuccess = false; /**
           * Mix in `Emitter`.
           */Emitter(Socket.prototype); /**
           * Protocol version.
           *
           * @api public
           */Socket.protocol = parser.protocol; // this is an int
/**
           * Expose deps for legacy compatibility
           * and standalone browser access.
           */Socket.Socket = Socket;Socket.Transport = _dereq_('./transport');Socket.transports = _dereq_('./transports');Socket.parser = _dereq_('engine.io-parser'); /**
           * Creates transport of the given type.
           *
           * @param {String} transport name
           * @return {Transport}
           * @api private
           */Socket.prototype.createTransport = function(name){debug('creating transport "%s"',name);var query=clone(this.query); // append engine.io protocol identifier
query.EIO = parser.protocol; // transport name
query.transport = name; // session id if we already have one
if(this.id)query.sid = this.id;var transport=new transports[name]({agent:this.agent,hostname:this.hostname,port:this.port,secure:this.secure,path:this.path,query:query,forceJSONP:this.forceJSONP,jsonp:this.jsonp,forceBase64:this.forceBase64,enablesXDR:this.enablesXDR,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,policyPort:this.policyPort,socket:this,pfx:this.pfx,key:this.key,passphrase:this.passphrase,cert:this.cert,ca:this.ca,ciphers:this.ciphers,rejectUnauthorized:this.rejectUnauthorized});return transport;};function clone(obj){var o={};for(var i in obj) {if(obj.hasOwnProperty(i)){o[i] = obj[i];}}return o;} /**
           * Initializes transport to use and starts probe.
           *
           * @api private
           */Socket.prototype.open = function(){var transport;if(this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1){transport = 'websocket';}else if(0 == this.transports.length){ // Emit error on next tick so it can be listened to
var self=this;setTimeout(function(){self.emit('error','No transports available');},0);return;}else {transport = this.transports[0];}this.readyState = 'opening'; // Retry with the next transport if the transport is disabled (jsonp: false)
var transport;try{transport = this.createTransport(transport);}catch(e) {this.transports.shift();this.open();return;}transport.open();this.setTransport(transport);}; /**
           * Sets the current transport. Disables the existing one (if any).
           *
           * @api private
           */Socket.prototype.setTransport = function(transport){debug('setting transport %s',transport.name);var self=this;if(this.transport){debug('clearing existing transport %s',this.transport.name);this.transport.removeAllListeners();} // set up transport
this.transport = transport; // set up transport listeners
transport.on('drain',function(){self.onDrain();}).on('packet',function(packet){self.onPacket(packet);}).on('error',function(e){self.onError(e);}).on('close',function(){self.onClose('transport close');});}; /**
           * Probes a transport.
           *
           * @param {String} transport name
           * @api private
           */Socket.prototype.probe = function(name){debug('probing transport "%s"',name);var transport=this.createTransport(name,{probe:1}),failed=false,self=this;Socket.priorWebsocketSuccess = false;function onTransportOpen(){if(self.onlyBinaryUpgrades){var upgradeLosesBinary=!this.supportsBinary && self.transport.supportsBinary;failed = failed || upgradeLosesBinary;}if(failed)return;debug('probe transport "%s" opened',name);transport.send([{type:'ping',data:'probe'}]);transport.once('packet',function(msg){if(failed)return;if('pong' == msg.type && 'probe' == msg.data){debug('probe transport "%s" pong',name);self.upgrading = true;self.emit('upgrading',transport);if(!transport)return;Socket.priorWebsocketSuccess = 'websocket' == transport.name;debug('pausing current transport "%s"',self.transport.name);self.transport.pause(function(){if(failed)return;if('closed' == self.readyState)return;debug('changing transport and sending upgrade packet');cleanup();self.setTransport(transport);transport.send([{type:'upgrade'}]);self.emit('upgrade',transport);transport = null;self.upgrading = false;self.flush();});}else {debug('probe transport "%s" failed',name);var err=new Error('probe error');err.transport = transport.name;self.emit('upgradeError',err);}});}function freezeTransport(){if(failed)return; // Any callback called by transport should be ignored since now
failed = true;cleanup();transport.close();transport = null;} //Handle any error that happens while probing
function onerror(err){var error=new Error('probe error: ' + err);error.transport = transport.name;freezeTransport();debug('probe transport "%s" failed because of error: %s',name,err);self.emit('upgradeError',error);}function onTransportClose(){onerror("transport closed");} //When the socket is closed while we're probing
function onclose(){onerror("socket closed");} //When the socket is upgraded while we're probing
function onupgrade(to){if(transport && to.name != transport.name){debug('"%s" works - aborting "%s"',to.name,transport.name);freezeTransport();}} //Remove all listeners on the transport and on self
function cleanup(){transport.removeListener('open',onTransportOpen);transport.removeListener('error',onerror);transport.removeListener('close',onTransportClose);self.removeListener('close',onclose);self.removeListener('upgrading',onupgrade);}transport.once('open',onTransportOpen);transport.once('error',onerror);transport.once('close',onTransportClose);this.once('close',onclose);this.once('upgrading',onupgrade);transport.open();}; /**
           * Called when connection is deemed open.
           *
           * @api public
           */Socket.prototype.onOpen = function(){debug('socket open');this.readyState = 'open';Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;this.emit('open');this.flush(); // we check for `readyState` in case an `open`
// listener already closed the socket
if('open' == this.readyState && this.upgrade && this.transport.pause){debug('starting upgrade probes');for(var i=0,l=this.upgrades.length;i < l;i++) {this.probe(this.upgrades[i]);}}}; /**
           * Handles a packet.
           *
           * @api private
           */Socket.prototype.onPacket = function(packet){if('opening' == this.readyState || 'open' == this.readyState){debug('socket receive: type "%s", data "%s"',packet.type,packet.data);this.emit('packet',packet); // Socket is live - any packet counts
this.emit('heartbeat');switch(packet.type){case 'open':this.onHandshake(parsejson(packet.data));break;case 'pong':this.setPing();break;case 'error':var err=new Error('server error');err.code = packet.data;this.emit('error',err);break;case 'message':this.emit('data',packet.data);this.emit('message',packet.data);break;}}else {debug('packet received with socket readyState "%s"',this.readyState);}}; /**
           * Called upon handshake completion.
           *
           * @param {Object} handshake obj
           * @api private
           */Socket.prototype.onHandshake = function(data){this.emit('handshake',data);this.id = data.sid;this.transport.query.sid = data.sid;this.upgrades = this.filterUpgrades(data.upgrades);this.pingInterval = data.pingInterval;this.pingTimeout = data.pingTimeout;this.onOpen(); // In case open handler closes socket
if('closed' == this.readyState)return;this.setPing(); // Prolong liveness of socket on heartbeat
this.removeListener('heartbeat',this.onHeartbeat);this.on('heartbeat',this.onHeartbeat);}; /**
           * Resets ping timeout.
           *
           * @api private
           */Socket.prototype.onHeartbeat = function(timeout){clearTimeout(this.pingTimeoutTimer);var self=this;self.pingTimeoutTimer = setTimeout(function(){if('closed' == self.readyState)return;self.onClose('ping timeout');},timeout || self.pingInterval + self.pingTimeout);}; /**
           * Pings server every `this.pingInterval` and expects response
           * within `this.pingTimeout` or closes connection.
           *
           * @api private
           */Socket.prototype.setPing = function(){var self=this;clearTimeout(self.pingIntervalTimer);self.pingIntervalTimer = setTimeout(function(){debug('writing ping packet - expecting pong within %sms',self.pingTimeout);self.ping();self.onHeartbeat(self.pingTimeout);},self.pingInterval);}; /**
           * Sends a ping packet.
           *
           * @api public
           */Socket.prototype.ping = function(){this.sendPacket('ping');}; /**
           * Called on `drain` event
           *
           * @api private
           */Socket.prototype.onDrain = function(){for(var i=0;i < this.prevBufferLen;i++) {if(this.callbackBuffer[i]){this.callbackBuffer[i]();}}this.writeBuffer.splice(0,this.prevBufferLen);this.callbackBuffer.splice(0,this.prevBufferLen); // setting prevBufferLen = 0 is very important
// for example, when upgrading, upgrade packet is sent over,
// and a nonzero prevBufferLen could cause problems on `drain`
this.prevBufferLen = 0;if(this.writeBuffer.length == 0){this.emit('drain');}else {this.flush();}}; /**
           * Flush write buffers.
           *
           * @api private
           */Socket.prototype.flush = function(){if('closed' != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length){debug('flushing %d packets in socket',this.writeBuffer.length);this.transport.send(this.writeBuffer); // keep track of current length of writeBuffer
// splice writeBuffer and callbackBuffer on `drain`
this.prevBufferLen = this.writeBuffer.length;this.emit('flush');}}; /**
           * Sends a message.
           *
           * @param {String} message.
           * @param {Function} callback function.
           * @return {Socket} for chaining.
           * @api public
           */Socket.prototype.write = Socket.prototype.send = function(msg,fn){this.sendPacket('message',msg,fn);return this;}; /**
           * Sends a packet.
           *
           * @param {String} packet type.
           * @param {String} data.
           * @param {Function} callback function.
           * @api private
           */Socket.prototype.sendPacket = function(type,data,fn){if('closing' == this.readyState || 'closed' == this.readyState){return;}var packet={type:type,data:data};this.emit('packetCreate',packet);this.writeBuffer.push(packet);this.callbackBuffer.push(fn);this.flush();}; /**
           * Closes the connection.
           *
           * @api private
           */Socket.prototype.close = function(){var _this=this;if('opening' == this.readyState || 'open' == this.readyState){var self;(function(){var close=function close(){self.onClose('forced close');debug('socket closing - telling transport to close');self.transport.close();};var cleanupAndClose=function cleanupAndClose(){self.removeListener('upgrade',cleanupAndClose);self.removeListener('upgradeError',cleanupAndClose);close();};var waitForUpgrade=function waitForUpgrade(){ // wait for upgrade to finish since we can't send packets while pausing a transport
self.once('upgrade',cleanupAndClose);self.once('upgradeError',cleanupAndClose);};_this.readyState = 'closing';self = _this;if(_this.writeBuffer.length){_this.once('drain',function(){if(this.upgrading){waitForUpgrade();}else {close();}});}else if(_this.upgrading){waitForUpgrade();}else {close();}})();}return this;}; /**
           * Called upon transport error
           *
           * @api private
           */Socket.prototype.onError = function(err){debug('socket error %j',err);Socket.priorWebsocketSuccess = false;this.emit('error',err);this.onClose('transport error',err);}; /**
           * Called upon transport close.
           *
           * @api private
           */Socket.prototype.onClose = function(reason,desc){if('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState){debug('socket close with reason: "%s"',reason);var self=this; // clear timers
clearTimeout(this.pingIntervalTimer);clearTimeout(this.pingTimeoutTimer); // clean buffers in next tick, so developers can still
// grab the buffers on `close` event
setTimeout(function(){self.writeBuffer = [];self.callbackBuffer = [];self.prevBufferLen = 0;},0); // stop event from firing again for transport
this.transport.removeAllListeners('close'); // ensure transport won't stay open
this.transport.close(); // ignore further transport communication
this.transport.removeAllListeners(); // set ready state
this.readyState = 'closed'; // clear session id
this.id = null; // emit close event
this.emit('close',reason,desc);}}; /**
           * Filters upgrades, returning only those matching client transports.
           *
           * @param {Array} server upgrades
           * @api private
           *
           */Socket.prototype.filterUpgrades = function(upgrades){var filteredUpgrades=[];for(var i=0,j=upgrades.length;i < j;i++) {if(~index(this.transports,upgrades[i]))filteredUpgrades.push(upgrades[i]);}return filteredUpgrades;};}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{"./transport":14,"./transports":15,"component-emitter":9,"debug":22,"engine.io-parser":25,"indexof":42,"parsejson":34,"parseqs":35,"parseuri":36}],14:[function(_dereq_,module,exports){ /**
         * Module dependencies.
         */var parser=_dereq_('engine.io-parser');var Emitter=_dereq_('component-emitter'); /**
         * Module exports.
         */module.exports = Transport; /**
         * Transport abstract constructor.
         *
         * @param {Object} options.
         * @api private
         */function Transport(opts){this.path = opts.path;this.hostname = opts.hostname;this.port = opts.port;this.secure = opts.secure;this.query = opts.query;this.timestampParam = opts.timestampParam;this.timestampRequests = opts.timestampRequests;this.readyState = '';this.agent = opts.agent || false;this.socket = opts.socket;this.enablesXDR = opts.enablesXDR; // SSL options for Node.js client
this.pfx = opts.pfx;this.key = opts.key;this.passphrase = opts.passphrase;this.cert = opts.cert;this.ca = opts.ca;this.ciphers = opts.ciphers;this.rejectUnauthorized = opts.rejectUnauthorized;} /**
         * Mix in `Emitter`.
         */Emitter(Transport.prototype); /**
         * A counter used to prevent collisions in the timestamps used
         * for cache busting.
         */Transport.timestamps = 0; /**
         * Emits an error.
         *
         * @param {String} str
         * @return {Transport} for chaining
         * @api public
         */Transport.prototype.onError = function(msg,desc){var err=new Error(msg);err.type = 'TransportError';err.description = desc;this.emit('error',err);return this;}; /**
         * Opens the transport.
         *
         * @api public
         */Transport.prototype.open = function(){if('closed' == this.readyState || '' == this.readyState){this.readyState = 'opening';this.doOpen();}return this;}; /**
         * Closes the transport.
         *
         * @api private
         */Transport.prototype.close = function(){if('opening' == this.readyState || 'open' == this.readyState){this.doClose();this.onClose();}return this;}; /**
         * Sends multiple packets.
         *
         * @param {Array} packets
         * @api private
         */Transport.prototype.send = function(packets){if('open' == this.readyState){this.write(packets);}else {throw new Error('Transport not open');}}; /**
         * Called upon open
         *
         * @api private
         */Transport.prototype.onOpen = function(){this.readyState = 'open';this.writable = true;this.emit('open');}; /**
         * Called with data.
         *
         * @param {String} data
         * @api private
         */Transport.prototype.onData = function(data){var packet=parser.decodePacket(data,this.socket.binaryType);this.onPacket(packet);}; /**
         * Called with a decoded packet.
         */Transport.prototype.onPacket = function(packet){this.emit('packet',packet);}; /**
         * Called upon close.
         *
         * @api private
         */Transport.prototype.onClose = function(){this.readyState = 'closed';this.emit('close');};},{"component-emitter":9,"engine.io-parser":25}],15:[function(_dereq_,module,exports){(function(global){ /**
           * Module dependencies
           */var XMLHttpRequest=_dereq_('xmlhttprequest');var XHR=_dereq_('./polling-xhr');var JSONP=_dereq_('./polling-jsonp');var websocket=_dereq_('./websocket'); /**
           * Export transports.
           */exports.polling = polling;exports.websocket = websocket; /**
           * Polling transport polymorphic constructor.
           * Decides on xhr vs jsonp based on feature detection.
           *
           * @api private
           */function polling(opts){var xhr;var xd=false;var xs=false;var jsonp=false !== opts.jsonp;if(global.location){var isSSL='https:' == location.protocol;var port=location.port; // some user agents have empty `location.port`
if(!port){port = isSSL?443:80;}xd = opts.hostname != location.hostname || port != opts.port;xs = opts.secure != isSSL;}opts.xdomain = xd;opts.xscheme = xs;xhr = new XMLHttpRequest(opts);if('open' in xhr && !opts.forceJSONP){return new XHR(opts);}else {if(!jsonp)throw new Error('JSONP disabled');return new JSONP(opts);}}}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{"./polling-jsonp":16,"./polling-xhr":17,"./websocket":19,"xmlhttprequest":20}],16:[function(_dereq_,module,exports){(function(global){ /**
           * Module requirements.
           */var Polling=_dereq_('./polling');var inherit=_dereq_('component-inherit'); /**
           * Module exports.
           */module.exports = JSONPPolling; /**
           * Cached regular expressions.
           */var rNewline=/\n/g;var rEscapedNewline=/\\n/g; /**
           * Global JSONP callbacks.
           */var callbacks; /**
           * Callbacks count.
           */var index=0; /**
           * Noop.
           */function empty(){} /**
           * JSONP Polling constructor.
           *
           * @param {Object} opts.
           * @api public
           */function JSONPPolling(opts){Polling.call(this,opts);this.query = this.query || {}; // define global callbacks array if not present
// we do this here (lazily) to avoid unneeded global pollution
if(!callbacks){ // we need to consider multiple engines in the same page
if(!global.___eio)global.___eio = [];callbacks = global.___eio;} // callback identifier
this.index = callbacks.length; // add callback to jsonp global
var self=this;callbacks.push(function(msg){self.onData(msg);}); // append to query string
this.query.j = this.index; // prevent spurious errors from being emitted when the window is unloaded
if(global.document && global.addEventListener){global.addEventListener('beforeunload',function(){if(self.script)self.script.onerror = empty;},false);}} /**
           * Inherits from Polling.
           */inherit(JSONPPolling,Polling); /*
           * JSONP only supports binary as base64 encoded strings
           */JSONPPolling.prototype.supportsBinary = false; /**
           * Closes the socket.
           *
           * @api private
           */JSONPPolling.prototype.doClose = function(){if(this.script){this.script.parentNode.removeChild(this.script);this.script = null;}if(this.form){this.form.parentNode.removeChild(this.form);this.form = null;this.iframe = null;}Polling.prototype.doClose.call(this);}; /**
           * Starts a poll cycle.
           *
           * @api private
           */JSONPPolling.prototype.doPoll = function(){var self=this;var script=document.createElement('script');if(this.script){this.script.parentNode.removeChild(this.script);this.script = null;}script.async = true;script.src = this.uri();script.onerror = function(e){self.onError('jsonp poll error',e);};var insertAt=document.getElementsByTagName('script')[0];insertAt.parentNode.insertBefore(script,insertAt);this.script = script;var isUAgecko='undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);if(isUAgecko){setTimeout(function(){var iframe=document.createElement('iframe');document.body.appendChild(iframe);document.body.removeChild(iframe);},100);}}; /**
           * Writes with a hidden iframe.
           *
           * @param {String} data to send
           * @param {Function} called upon flush.
           * @api private
           */JSONPPolling.prototype.doWrite = function(data,fn){var self=this;if(!this.form){var form=document.createElement('form');var area=document.createElement('textarea');var id=this.iframeId = 'eio_iframe_' + this.index;var iframe;form.className = 'socketio';form.style.position = 'absolute';form.style.top = '-1000px';form.style.left = '-1000px';form.target = id;form.method = 'POST';form.setAttribute('accept-charset','utf-8');area.name = 'd';form.appendChild(area);document.body.appendChild(form);this.form = form;this.area = area;}this.form.action = this.uri();function complete(){initIframe();fn();}function initIframe(){if(self.iframe){try{self.form.removeChild(self.iframe);}catch(e) {self.onError('jsonp polling iframe removal error',e);}}try{ // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
var html='<iframe src="javascript:0" name="' + self.iframeId + '">';iframe = document.createElement(html);}catch(e) {iframe = document.createElement('iframe');iframe.name = self.iframeId;iframe.src = 'javascript:0';}iframe.id = self.iframeId;self.form.appendChild(iframe);self.iframe = iframe;}initIframe(); // escape \n to prevent it from being converted into \r\n by some UAs
// double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
data = data.replace(rEscapedNewline,'\\\n');this.area.value = data.replace(rNewline,'\\n');try{this.form.submit();}catch(e) {}if(this.iframe.attachEvent){this.iframe.onreadystatechange = function(){if(self.iframe.readyState == 'complete'){complete();}};}else {this.iframe.onload = complete;}};}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{"./polling":18,"component-inherit":21}],17:[function(_dereq_,module,exports){(function(global){ /**
           * Module requirements.
           */var XMLHttpRequest=_dereq_('xmlhttprequest');var Polling=_dereq_('./polling');var Emitter=_dereq_('component-emitter');var inherit=_dereq_('component-inherit');var debug=_dereq_('debug')('engine.io-client:polling-xhr'); /**
           * Module exports.
           */module.exports = XHR;module.exports.Request = Request; /**
           * Empty function
           */function empty(){} /**
           * XHR Polling constructor.
           *
           * @param {Object} opts
           * @api public
           */function XHR(opts){Polling.call(this,opts);if(global.location){var isSSL='https:' == location.protocol;var port=location.port; // some user agents have empty `location.port`
if(!port){port = isSSL?443:80;}this.xd = opts.hostname != global.location.hostname || port != opts.port;this.xs = opts.secure != isSSL;}} /**
           * Inherits from Polling.
           */inherit(XHR,Polling); /**
           * XHR supports binary
           */XHR.prototype.supportsBinary = true; /**
           * Creates a request.
           *
           * @param {String} method
           * @api private
           */XHR.prototype.request = function(opts){opts = opts || {};opts.uri = this.uri();opts.xd = this.xd;opts.xs = this.xs;opts.agent = this.agent || false;opts.supportsBinary = this.supportsBinary;opts.enablesXDR = this.enablesXDR; // SSL options for Node.js client
opts.pfx = this.pfx;opts.key = this.key;opts.passphrase = this.passphrase;opts.cert = this.cert;opts.ca = this.ca;opts.ciphers = this.ciphers;opts.rejectUnauthorized = this.rejectUnauthorized;return new Request(opts);}; /**
           * Sends data.
           *
           * @param {String} data to send.
           * @param {Function} called upon flush.
           * @api private
           */XHR.prototype.doWrite = function(data,fn){var isBinary=typeof data !== 'string' && data !== undefined;var req=this.request({method:'POST',data:data,isBinary:isBinary});var self=this;req.on('success',fn);req.on('error',function(err){self.onError('xhr post error',err);});this.sendXhr = req;}; /**
           * Starts a poll cycle.
           *
           * @api private
           */XHR.prototype.doPoll = function(){debug('xhr poll');var req=this.request();var self=this;req.on('data',function(data){self.onData(data);});req.on('error',function(err){self.onError('xhr poll error',err);});this.pollXhr = req;}; /**
           * Request constructor
           *
           * @param {Object} options
           * @api public
           */function Request(opts){this.method = opts.method || 'GET';this.uri = opts.uri;this.xd = !!opts.xd;this.xs = !!opts.xs;this.async = false !== opts.async;this.data = undefined != opts.data?opts.data:null;this.agent = opts.agent;this.isBinary = opts.isBinary;this.supportsBinary = opts.supportsBinary;this.enablesXDR = opts.enablesXDR; // SSL options for Node.js client
this.pfx = opts.pfx;this.key = opts.key;this.passphrase = opts.passphrase;this.cert = opts.cert;this.ca = opts.ca;this.ciphers = opts.ciphers;this.rejectUnauthorized = opts.rejectUnauthorized;this.create();} /**
           * Mix in `Emitter`.
           */Emitter(Request.prototype); /**
           * Creates the XHR object and sends the request.
           *
           * @api private
           */Request.prototype.create = function(){var opts={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR}; // SSL options for Node.js client
opts.pfx = this.pfx;opts.key = this.key;opts.passphrase = this.passphrase;opts.cert = this.cert;opts.ca = this.ca;opts.ciphers = this.ciphers;opts.rejectUnauthorized = this.rejectUnauthorized;var xhr=this.xhr = new XMLHttpRequest(opts);var self=this;try{debug('xhr open %s: %s',this.method,this.uri);xhr.open(this.method,this.uri,this.async);if(this.supportsBinary){ // This has to be done after open because Firefox is stupid
// http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
xhr.responseType = 'arraybuffer';}if('POST' == this.method){try{if(this.isBinary){xhr.setRequestHeader('Content-type','application/octet-stream');}else {xhr.setRequestHeader('Content-type','text/plain;charset=UTF-8');}}catch(e) {}} // ie6 check
if('withCredentials' in xhr){xhr.withCredentials = true;}if(this.hasXDR()){xhr.onload = function(){self.onLoad();};xhr.onerror = function(){self.onError(xhr.responseText);};}else {xhr.onreadystatechange = function(){if(4 != xhr.readyState)return;if(200 == xhr.status || 1223 == xhr.status){self.onLoad();}else { // make sure the `error` event handler that's user-set
// does not throw in the same tick and gets caught here
setTimeout(function(){self.onError(xhr.status);},0);}};}debug('xhr data %s',this.data);xhr.send(this.data);}catch(e) { // Need to defer since .create() is called directly fhrom the constructor
// and thus the 'error' event can only be only bound *after* this exception
// occurs.  Therefore, also, we cannot throw here at all.
setTimeout(function(){self.onError(e);},0);return;}if(global.document){this.index = Request.requestsCount++;Request.requests[this.index] = this;}}; /**
           * Called upon successful response.
           *
           * @api private
           */Request.prototype.onSuccess = function(){this.emit('success');this.cleanup();}; /**
           * Called if we have data.
           *
           * @api private
           */Request.prototype.onData = function(data){this.emit('data',data);this.onSuccess();}; /**
           * Called upon error.
           *
           * @api private
           */Request.prototype.onError = function(err){this.emit('error',err);this.cleanup(true);}; /**
           * Cleans up house.
           *
           * @api private
           */Request.prototype.cleanup = function(fromError){if('undefined' == typeof this.xhr || null === this.xhr){return;} // xmlhttprequest
if(this.hasXDR()){this.xhr.onload = this.xhr.onerror = empty;}else {this.xhr.onreadystatechange = empty;}if(fromError){try{this.xhr.abort();}catch(e) {}}if(global.document){delete Request.requests[this.index];}this.xhr = null;}; /**
           * Called upon load.
           *
           * @api private
           */Request.prototype.onLoad = function(){var data;try{var contentType;try{contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];}catch(e) {}if(contentType === 'application/octet-stream'){data = this.xhr.response;}else {if(!this.supportsBinary){data = this.xhr.responseText;}else {data = 'ok';}}}catch(e) {this.onError(e);}if(null != data){this.onData(data);}}; /**
           * Check if it has XDomainRequest.
           *
           * @api private
           */Request.prototype.hasXDR = function(){return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;}; /**
           * Aborts the request.
           *
           * @api public
           */Request.prototype.abort = function(){this.cleanup();}; /**
           * Aborts pending requests when unloading the window. This is needed to prevent
           * memory leaks (e.g. when using IE) and to ensure that no spurious error is
           * emitted.
           */if(global.document){Request.requestsCount = 0;Request.requests = {};if(global.attachEvent){global.attachEvent('onunload',unloadHandler);}else if(global.addEventListener){global.addEventListener('beforeunload',unloadHandler,false);}}function unloadHandler(){for(var i in Request.requests) {if(Request.requests.hasOwnProperty(i)){Request.requests[i].abort();}}}}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{"./polling":18,"component-emitter":9,"component-inherit":21,"debug":22,"xmlhttprequest":20}],18:[function(_dereq_,module,exports){ /**
         * Module dependencies.
         */var Transport=_dereq_('../transport');var parseqs=_dereq_('parseqs');var parser=_dereq_('engine.io-parser');var inherit=_dereq_('component-inherit');var debug=_dereq_('debug')('engine.io-client:polling'); /**
         * Module exports.
         */module.exports = Polling; /**
         * Is XHR2 supported?
         */var hasXHR2=(function(){var XMLHttpRequest=_dereq_('xmlhttprequest');var xhr=new XMLHttpRequest({xdomain:false});return null != xhr.responseType;})(); /**
         * Polling interface.
         *
         * @param {Object} opts
         * @api private
         */function Polling(opts){var forceBase64=opts && opts.forceBase64;if(!hasXHR2 || forceBase64){this.supportsBinary = false;}Transport.call(this,opts);} /**
         * Inherits from Transport.
         */inherit(Polling,Transport); /**
         * Transport name.
         */Polling.prototype.name = 'polling'; /**
         * Opens the socket (triggers polling). We write a PING message to determine
         * when the transport is open.
         *
         * @api private
         */Polling.prototype.doOpen = function(){this.poll();}; /**
         * Pauses polling.
         *
         * @param {Function} callback upon buffers are flushed and transport is paused
         * @api private
         */Polling.prototype.pause = function(onPause){var pending=0;var self=this;this.readyState = 'pausing';function pause(){debug('paused');self.readyState = 'paused';onPause();}if(this.polling || !this.writable){var total=0;if(this.polling){debug('we are currently polling - waiting to pause');total++;this.once('pollComplete',function(){debug('pre-pause polling complete');--total || pause();});}if(!this.writable){debug('we are currently writing - waiting to pause');total++;this.once('drain',function(){debug('pre-pause writing complete');--total || pause();});}}else {pause();}}; /**
         * Starts polling cycle.
         *
         * @api public
         */Polling.prototype.poll = function(){debug('polling');this.polling = true;this.doPoll();this.emit('poll');}; /**
         * Overloads onData to detect payloads.
         *
         * @api private
         */Polling.prototype.onData = function(data){var self=this;debug('polling got data %s',data);var callback=function callback(packet,index,total){ // if its the first message we consider the transport open
if('opening' == self.readyState){self.onOpen();} // if its a close packet, we close the ongoing requests
if('close' == packet.type){self.onClose();return false;} // otherwise bypass onData and handle the message
self.onPacket(packet);}; // decode payload
parser.decodePayload(data,this.socket.binaryType,callback); // if an event did not trigger closing
if('closed' != this.readyState){ // if we got data we're not polling
this.polling = false;this.emit('pollComplete');if('open' == this.readyState){this.poll();}else {debug('ignoring poll - transport state "%s"',this.readyState);}}}; /**
         * For polling, send a close packet.
         *
         * @api private
         */Polling.prototype.doClose = function(){var self=this;function close(){debug('writing close packet');self.write([{type:'close'}]);}if('open' == this.readyState){debug('transport open - closing');close();}else { // in case we're trying to close while
// handshaking is in progress (GH-164)
debug('transport not open - deferring close');this.once('open',close);}}; /**
         * Writes a packets payload.
         *
         * @param {Array} data packets
         * @param {Function} drain callback
         * @api private
         */Polling.prototype.write = function(packets){var self=this;this.writable = false;var callbackfn=function callbackfn(){self.writable = true;self.emit('drain');};var self=this;parser.encodePayload(packets,this.supportsBinary,function(data){self.doWrite(data,callbackfn);});}; /**
         * Generates uri for connection.
         *
         * @api private
         */Polling.prototype.uri = function(){var query=this.query || {};var schema=this.secure?'https':'http';var port=''; // cache busting is forced
if(false !== this.timestampRequests){query[this.timestampParam] = +new Date() + '-' + Transport.timestamps++;}if(!this.supportsBinary && !query.sid){query.b64 = 1;}query = parseqs.encode(query); // avoid port if default for schema
if(this.port && ('https' == schema && this.port != 443 || 'http' == schema && this.port != 80)){port = ':' + this.port;} // prepend ? to query
if(query.length){query = '?' + query;}return schema + '://' + this.hostname + port + this.path + query;};},{"../transport":14,"component-inherit":21,"debug":22,"engine.io-parser":25,"parseqs":35,"xmlhttprequest":20}],19:[function(_dereq_,module,exports){ /**
         * Module dependencies.
         */var Transport=_dereq_('../transport');var parser=_dereq_('engine.io-parser');var parseqs=_dereq_('parseqs');var inherit=_dereq_('component-inherit');var debug=_dereq_('debug')('engine.io-client:websocket'); /**
         * `ws` exposes a WebSocket-compatible interface in
         * Node, or the `WebSocket` or `MozWebSocket` globals
         * in the browser.
         */var WebSocket=_dereq_('ws'); /**
         * Module exports.
         */module.exports = WS; /**
         * WebSocket transport constructor.
         *
         * @api {Object} connection options
         * @api public
         */function WS(opts){var forceBase64=opts && opts.forceBase64;if(forceBase64){this.supportsBinary = false;}Transport.call(this,opts);} /**
         * Inherits from Transport.
         */inherit(WS,Transport); /**
         * Transport name.
         *
         * @api public
         */WS.prototype.name = 'websocket'; /*
         * WebSockets support binary
         */WS.prototype.supportsBinary = true; /**
         * Opens socket.
         *
         * @api private
         */WS.prototype.doOpen = function(){if(!this.check()){ // let probe timeout
return;}var self=this;var uri=this.uri();var protocols=void 0;var opts={agent:this.agent}; // SSL options for Node.js client
opts.pfx = this.pfx;opts.key = this.key;opts.passphrase = this.passphrase;opts.cert = this.cert;opts.ca = this.ca;opts.ciphers = this.ciphers;opts.rejectUnauthorized = this.rejectUnauthorized;this.ws = new WebSocket(uri,protocols,opts);if(this.ws.binaryType === undefined){this.supportsBinary = false;}this.ws.binaryType = 'arraybuffer';this.addEventListeners();}; /**
         * Adds event listeners to the socket
         *
         * @api private
         */WS.prototype.addEventListeners = function(){var self=this;this.ws.onopen = function(){self.onOpen();};this.ws.onclose = function(){self.onClose();};this.ws.onmessage = function(ev){self.onData(ev.data);};this.ws.onerror = function(e){self.onError('websocket error',e);};}; /**
         * Override `onData` to use a timer on iOS.
         * See: https://gist.github.com/mloughran/2052006
         *
         * @api private
         */if('undefined' != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)){WS.prototype.onData = function(data){var self=this;setTimeout(function(){Transport.prototype.onData.call(self,data);},0);};} /**
         * Writes data to socket.
         *
         * @param {Array} array of packets.
         * @api private
         */WS.prototype.write = function(packets){var self=this;this.writable = false; // encodePacket efficient as it uses WS framing
// no need for encodePayload
for(var i=0,l=packets.length;i < l;i++) {parser.encodePacket(packets[i],this.supportsBinary,function(data){ //Sometimes the websocket has already been closed but the browser didn't
//have a chance of informing us about it yet, in that case send will
//throw an error
try{self.ws.send(data);}catch(e) {debug('websocket closed before onclose event');}});}function ondrain(){self.writable = true;self.emit('drain');} // fake drain
// defer to next tick to allow Socket to clear writeBuffer
setTimeout(ondrain,0);}; /**
         * Called upon close
         *
         * @api private
         */WS.prototype.onClose = function(){Transport.prototype.onClose.call(this);}; /**
         * Closes socket.
         *
         * @api private
         */WS.prototype.doClose = function(){if(typeof this.ws !== 'undefined'){this.ws.close();}}; /**
         * Generates uri for connection.
         *
         * @api private
         */WS.prototype.uri = function(){var query=this.query || {};var schema=this.secure?'wss':'ws';var port=''; // avoid port if default for schema
if(this.port && ('wss' == schema && this.port != 443 || 'ws' == schema && this.port != 80)){port = ':' + this.port;} // append timestamp to URI
if(this.timestampRequests){query[this.timestampParam] = +new Date();} // communicate binary support capabilities
if(!this.supportsBinary){query.b64 = 1;}query = parseqs.encode(query); // prepend ? to query
if(query.length){query = '?' + query;}return schema + '://' + this.hostname + port + this.path + query;}; /**
         * Feature detection for WebSocket.
         *
         * @return {Boolean} whether this transport is available.
         * @api public
         */WS.prototype.check = function(){return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);};},{"../transport":14,"component-inherit":21,"debug":22,"engine.io-parser":25,"parseqs":35,"ws":37}],20:[function(_dereq_,module,exports){ // browser shim for xmlhttprequest module
var hasCORS=_dereq_('has-cors');module.exports = function(opts){var xdomain=opts.xdomain; // scheme must be same when usign XDomainRequest
// http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
var xscheme=opts.xscheme; // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
// https://github.com/Automattic/engine.io-client/pull/217
var enablesXDR=opts.enablesXDR; // XMLHttpRequest can be disabled on IE
try{if('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)){return new XMLHttpRequest();}}catch(e) {} // Use XDomainRequest for IE8 if enablesXDR is true
// because loading bar keeps flashing when using jsonp-polling
// https://github.com/yujiosaka/socke.io-ie8-loading-example
try{if('undefined' != typeof XDomainRequest && !xscheme && enablesXDR){return new XDomainRequest();}}catch(e) {}if(!xdomain){try{return new ActiveXObject('Microsoft.XMLHTTP');}catch(e) {}}};},{"has-cors":40}],21:[function(_dereq_,module,exports){module.exports = function(a,b){var fn=function fn(){};fn.prototype = b.prototype;a.prototype = new fn();a.prototype.constructor = a;};},{}],22:[function(_dereq_,module,exports){ /**
         * This is the web browser implementation of `debug()`.
         *
         * Expose `debug()` as the module.
         */exports = module.exports = _dereq_('./debug');exports.log = log;exports.formatArgs = formatArgs;exports.save = save;exports.load = load;exports.useColors = useColors; /**
         * Colors.
         */exports.colors = ['lightseagreen','forestgreen','goldenrod','dodgerblue','darkorchid','crimson']; /**
         * Currently only WebKit-based Web Inspectors, Firefox >= v31,
         * and the Firebug extension (any Firefox version) are known
         * to support "%c" CSS customizations.
         *
         * TODO: add a `localStorage` variable to explicitly enable/disable colors
         */function useColors(){ // is webkit? http://stackoverflow.com/a/16459606/376773
return 'WebkitAppearance' in document.documentElement.style ||  // is firebug? http://stackoverflow.com/a/398120/376773
window.console && (console.firebug || console.exception && console.table) ||  // is firefox >= v31?
// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1,10) >= 31;} /**
         * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
         */exports.formatters.j = function(v){return JSON.stringify(v);}; /**
         * Colorize log arguments if enabled.
         *
         * @api public
         */function formatArgs(){var args=arguments;var useColors=this.useColors;args[0] = (useColors?'%c':'') + this.namespace + (useColors?' %c':' ') + args[0] + (useColors?'%c ':' ') + '+' + exports.humanize(this.diff);if(!useColors)return args;var c='color: ' + this.color;args = [args[0],c,'color: inherit'].concat(Array.prototype.slice.call(args,1)); // the final "%c" is somewhat tricky, because there could be other
// arguments passed either before or after the %c, so we need to
// figure out the correct index to insert the CSS into
var index=0;var lastC=0;args[0].replace(/%[a-z%]/g,function(match){if('%' === match)return;index++;if('%c' === match){ // we only are interested in the *last* %c
// (the user may have provided their own)
lastC = index;}});args.splice(lastC,0,c);return args;} /**
         * Invokes `console.log()` when available.
         * No-op when `console.log` is not a "function".
         *
         * @api public
         */function log(){ // This hackery is required for IE8,
// where the `console.log` function doesn't have 'apply'
return 'object' == typeof console && 'function' == typeof console.log && Function.prototype.apply.call(console.log,console,arguments);} /**
         * Save `namespaces`.
         *
         * @param {String} namespaces
         * @api private
         */function save(namespaces){try{if(null == namespaces){localStorage.removeItem('debug');}else {localStorage.debug = namespaces;}}catch(e) {}} /**
         * Load `namespaces`.
         *
         * @return {String} returns the previously persisted debug modes
         * @api private
         */function load(){var r;try{r = localStorage.debug;}catch(e) {}return r;} /**
         * Enable namespaces listed in `localStorage.debug` initially.
         */exports.enable(load());},{"./debug":23}],23:[function(_dereq_,module,exports){ /**
         * This is the common logic for both the Node.js and web browser
         * implementations of `debug()`.
         *
         * Expose `debug()` as the module.
         */exports = module.exports = debug;exports.coerce = coerce;exports.disable = disable;exports.enable = enable;exports.enabled = enabled;exports.humanize = _dereq_('ms'); /**
         * The currently active debug mode names, and names to skip.
         */exports.names = [];exports.skips = []; /**
         * Map of special "%n" handling functions, for the debug "format" argument.
         *
         * Valid key names are a single, lowercased letter, i.e. "n".
         */exports.formatters = {}; /**
         * Previously assigned color.
         */var prevColor=0; /**
         * Previous log timestamp.
         */var prevTime; /**
         * Select a color.
         *
         * @return {Number}
         * @api private
         */function selectColor(){return exports.colors[prevColor++ % exports.colors.length];} /**
         * Create a debugger with the given `namespace`.
         *
         * @param {String} namespace
         * @return {Function}
         * @api public
         */function debug(namespace){ // define the `disabled` version
function disabled(){}disabled.enabled = false; // define the `enabled` version
function enabled(){var self=enabled; // set `diff` timestamp
var curr=+new Date();var ms=curr - (prevTime || curr);self.diff = ms;self.prev = prevTime;self.curr = curr;prevTime = curr; // add the `color` if not set
if(null == self.useColors)self.useColors = exports.useColors();if(null == self.color && self.useColors)self.color = selectColor();var args=Array.prototype.slice.call(arguments);args[0] = exports.coerce(args[0]);if('string' !== typeof args[0]){ // anything else let's inspect with %o
args = ['%o'].concat(args);} // apply any `formatters` transformations
var index=0;args[0] = args[0].replace(/%([a-z%])/g,function(match,format){ // if we encounter an escaped % then don't increase the array index
if(match === '%')return match;index++;var formatter=exports.formatters[format];if('function' === typeof formatter){var val=args[index];match = formatter.call(self,val); // now we need to remove `args[index]` since it's inlined in the `format`
args.splice(index,1);index--;}return match;});if('function' === typeof exports.formatArgs){args = exports.formatArgs.apply(self,args);}var logFn=enabled.log || exports.log || console.log.bind(console);logFn.apply(self,args);}enabled.enabled = true;var fn=exports.enabled(namespace)?enabled:disabled;fn.namespace = namespace;return fn;} /**
         * Enables a debug mode by namespaces. This can include modes
         * separated by a colon and wildcards.
         *
         * @param {String} namespaces
         * @api public
         */function enable(namespaces){exports.save(namespaces);var split=(namespaces || '').split(/[\s,]+/);var len=split.length;for(var i=0;i < len;i++) {if(!split[i])continue; // ignore empty strings
namespaces = split[i].replace(/\*/g,'.*?');if(namespaces[0] === '-'){exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));}else {exports.names.push(new RegExp('^' + namespaces + '$'));}}} /**
         * Disable debug output.
         *
         * @api public
         */function disable(){exports.enable('');} /**
         * Returns true if the given mode name is enabled, false otherwise.
         *
         * @param {String} name
         * @return {Boolean}
         * @api public
         */function enabled(name){var i,len;for(i = 0,len = exports.skips.length;i < len;i++) {if(exports.skips[i].test(name)){return false;}}for(i = 0,len = exports.names.length;i < len;i++) {if(exports.names[i].test(name)){return true;}}return false;} /**
         * Coerce `val`.
         *
         * @param {Mixed} val
         * @return {Mixed}
         * @api private
         */function coerce(val){if(val instanceof Error)return val.stack || val.message;return val;}},{"ms":24}],24:[function(_dereq_,module,exports){ /**
         * Helpers.
         */var s=1000;var m=s * 60;var h=m * 60;var d=h * 24;var y=d * 365.25; /**
         * Parse or format the given `val`.
         *
         * Options:
         *
         *  - `long` verbose formatting [false]
         *
         * @param {String|Number} val
         * @param {Object} options
         * @return {String|Number}
         * @api public
         */module.exports = function(val,options){options = options || {};if('string' == typeof val)return parse(val);return options.long?long(val):short(val);}; /**
         * Parse the given `str` and return milliseconds.
         *
         * @param {String} str
         * @return {Number}
         * @api private
         */function parse(str){var match=/^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(str);if(!match)return;var n=parseFloat(match[1]);var type=(match[2] || 'ms').toLowerCase();switch(type){case 'years':case 'year':case 'y':return n * y;case 'days':case 'day':case 'd':return n * d;case 'hours':case 'hour':case 'h':return n * h;case 'minutes':case 'minute':case 'm':return n * m;case 'seconds':case 'second':case 's':return n * s;case 'ms':return n;}} /**
         * Short format for `ms`.
         *
         * @param {Number} ms
         * @return {String}
         * @api private
         */function short(ms){if(ms >= d)return Math.round(ms / d) + 'd';if(ms >= h)return Math.round(ms / h) + 'h';if(ms >= m)return Math.round(ms / m) + 'm';if(ms >= s)return Math.round(ms / s) + 's';return ms + 'ms';} /**
         * Long format for `ms`.
         *
         * @param {Number} ms
         * @return {String}
         * @api private
         */function long(ms){return plural(ms,d,'day') || plural(ms,h,'hour') || plural(ms,m,'minute') || plural(ms,s,'second') || ms + ' ms';} /**
         * Pluralization helper.
         */function plural(ms,n,name){if(ms < n)return;if(ms < n * 1.5)return Math.floor(ms / n) + ' ' + name;return Math.ceil(ms / n) + ' ' + name + 's';}},{}],25:[function(_dereq_,module,exports){(function(global){ /**
           * Module dependencies.
           */var keys=_dereq_('./keys');var hasBinary=_dereq_('has-binary');var sliceBuffer=_dereq_('arraybuffer.slice');var base64encoder=_dereq_('base64-arraybuffer');var after=_dereq_('after');var utf8=_dereq_('utf8'); /**
           * Check if we are running an android browser. That requires us to use
           * ArrayBuffer with polling transports...
           *
           * http://ghinda.net/jpeg-blob-ajax-android/
           */var isAndroid=navigator.userAgent.match(/Android/i); /**
           * Check if we are running in PhantomJS.
           * Uploading a Blob with PhantomJS does not work correctly, as reported here:
           * https://github.com/ariya/phantomjs/issues/11395
           * @type boolean
           */var isPhantomJS=/PhantomJS/i.test(navigator.userAgent); /**
           * When true, avoids using Blobs to encode payloads.
           * @type boolean
           */var dontSendBlobs=isAndroid || isPhantomJS; /**
           * Current protocol version.
           */exports.protocol = 3; /**
           * Packet types.
           */var packets=exports.packets = {open:0, // non-ws
close:1, // non-ws
ping:2,pong:3,message:4,upgrade:5,noop:6};var packetslist=keys(packets); /**
           * Premade error packet.
           */var err={type:'error',data:'parser error'}; /**
           * Create a blob api even for blob builder when vendor prefixes exist
           */var Blob=_dereq_('blob'); /**
           * Encodes a packet.
           *
           *     <packet type id> [ <data> ]
           *
           * Example:
           *
           *     5hello world
           *     3
           *     4
           *
           * Binary is encoded in an identical principle
           *
           * @api private
           */exports.encodePacket = function(packet,supportsBinary,utf8encode,callback){if('function' == typeof supportsBinary){callback = supportsBinary;supportsBinary = false;}if('function' == typeof utf8encode){callback = utf8encode;utf8encode = null;}var data=packet.data === undefined?undefined:packet.data.buffer || packet.data;if(global.ArrayBuffer && data instanceof ArrayBuffer){return encodeArrayBuffer(packet,supportsBinary,callback);}else if(Blob && data instanceof global.Blob){return encodeBlob(packet,supportsBinary,callback);} // might be an object with { base64: true, data: dataAsBase64String }
if(data && data.base64){return encodeBase64Object(packet,callback);} // Sending data as a utf-8 string
var encoded=packets[packet.type]; // data fragment is optional
if(undefined !== packet.data){encoded += utf8encode?utf8.encode(String(packet.data)):String(packet.data);}return callback('' + encoded);};function encodeBase64Object(packet,callback){ // packet data is an object { base64: true, data: dataAsBase64String }
var message='b' + exports.packets[packet.type] + packet.data.data;return callback(message);} /**
           * Encode packet helpers for binary types
           */function encodeArrayBuffer(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback);}var data=packet.data;var contentArray=new Uint8Array(data);var resultBuffer=new Uint8Array(1 + data.byteLength);resultBuffer[0] = packets[packet.type];for(var i=0;i < contentArray.length;i++) {resultBuffer[i + 1] = contentArray[i];}return callback(resultBuffer.buffer);}function encodeBlobAsArrayBuffer(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback);}var fr=new FileReader();fr.onload = function(){packet.data = fr.result;exports.encodePacket(packet,supportsBinary,true,callback);};return fr.readAsArrayBuffer(packet.data);}function encodeBlob(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback);}if(dontSendBlobs){return encodeBlobAsArrayBuffer(packet,supportsBinary,callback);}var length=new Uint8Array(1);length[0] = packets[packet.type];var blob=new Blob([length.buffer,packet.data]);return callback(blob);} /**
           * Encodes a packet with binary data in a base64 string
           *
           * @param {Object} packet, has `type` and `data`
           * @return {String} base64 encoded message
           */exports.encodeBase64Packet = function(packet,callback){var message='b' + exports.packets[packet.type];if(Blob && packet.data instanceof Blob){var fr=new FileReader();fr.onload = function(){var b64=fr.result.split(',')[1];callback(message + b64);};return fr.readAsDataURL(packet.data);}var b64data;try{b64data = String.fromCharCode.apply(null,new Uint8Array(packet.data));}catch(e) { // iPhone Safari doesn't let you apply with typed arrays
var typed=new Uint8Array(packet.data);var basic=new Array(typed.length);for(var i=0;i < typed.length;i++) {basic[i] = typed[i];}b64data = String.fromCharCode.apply(null,basic);}message += global.btoa(b64data);return callback(message);}; /**
           * Decodes a packet. Changes format to Blob if requested.
           *
           * @return {Object} with `type` and `data` (if any)
           * @api private
           */exports.decodePacket = function(data,binaryType,utf8decode){ // String data
if(typeof data == 'string' || data === undefined){if(data.charAt(0) == 'b'){return exports.decodeBase64Packet(data.substr(1),binaryType);}if(utf8decode){try{data = utf8.decode(data);}catch(e) {return err;}}var type=data.charAt(0);if(Number(type) != type || !packetslist[type]){return err;}if(data.length > 1){return {type:packetslist[type],data:data.substring(1)};}else {return {type:packetslist[type]};}}var asArray=new Uint8Array(data);var type=asArray[0];var rest=sliceBuffer(data,1);if(Blob && binaryType === 'blob'){rest = new Blob([rest]);}return {type:packetslist[type],data:rest};}; /**
           * Decodes a packet encoded in a base64 string
           *
           * @param {String} base64 encoded message
           * @return {Object} with `type` and `data` (if any)
           */exports.decodeBase64Packet = function(msg,binaryType){var type=packetslist[msg.charAt(0)];if(!global.ArrayBuffer){return {type:type,data:{base64:true,data:msg.substr(1)}};}var data=base64encoder.decode(msg.substr(1));if(binaryType === 'blob' && Blob){data = new Blob([data]);}return {type:type,data:data};}; /**
           * Encodes multiple messages (payload).
           *
           *     <length>:data
           *
           * Example:
           *
           *     11:hello world2:hi
           *
           * If any contents are binary, they will be encoded as base64 strings. Base64
           * encoded strings are marked with a b before the length specifier
           *
           * @param {Array} packets
           * @api private
           */exports.encodePayload = function(packets,supportsBinary,callback){if(typeof supportsBinary == 'function'){callback = supportsBinary;supportsBinary = null;}var isBinary=hasBinary(packets);if(supportsBinary && isBinary){if(Blob && !dontSendBlobs){return exports.encodePayloadAsBlob(packets,callback);}return exports.encodePayloadAsArrayBuffer(packets,callback);}if(!packets.length){return callback('0:');}function setLengthHeader(message){return message.length + ':' + message;}function encodeOne(packet,doneCallback){exports.encodePacket(packet,!isBinary?false:supportsBinary,true,function(message){doneCallback(null,setLengthHeader(message));});}map(packets,encodeOne,function(err,results){return callback(results.join(''));});}; /**
           * Async array map using after
           */function map(ary,each,done){var result=new Array(ary.length);var next=after(ary.length,done);var eachWithIndex=function eachWithIndex(i,el,cb){each(el,function(error,msg){result[i] = msg;cb(error,result);});};for(var i=0;i < ary.length;i++) {eachWithIndex(i,ary[i],next);}} /*
           * Decodes data when a payload is maybe expected. Possible binary contents are
           * decoded from their base64 representation
           *
           * @param {String} data, callback method
           * @api public
           */exports.decodePayload = function(data,binaryType,callback){if(typeof data != 'string'){return exports.decodePayloadAsBinary(data,binaryType,callback);}if(typeof binaryType === 'function'){callback = binaryType;binaryType = null;}var packet;if(data == ''){ // parser error - ignoring payload
return callback(err,0,1);}var length='',n,msg;for(var i=0,l=data.length;i < l;i++) {var chr=data.charAt(i);if(':' != chr){length += chr;}else {if('' == length || length != (n = Number(length))){ // parser error - ignoring payload
return callback(err,0,1);}msg = data.substr(i + 1,n);if(length != msg.length){ // parser error - ignoring payload
return callback(err,0,1);}if(msg.length){packet = exports.decodePacket(msg,binaryType,true);if(err.type == packet.type && err.data == packet.data){ // parser error in individual packet - ignoring payload
return callback(err,0,1);}var ret=callback(packet,i + n,l);if(false === ret)return;} // advance cursor
i += n;length = '';}}if(length != ''){ // parser error - ignoring payload
return callback(err,0,1);}}; /**
           * Encodes multiple messages (payload) as binary.
           *
           * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
           * 255><data>
           *
           * Example:
           * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
           *
           * @param {Array} packets
           * @return {ArrayBuffer} encoded payload
           * @api private
           */exports.encodePayloadAsArrayBuffer = function(packets,callback){if(!packets.length){return callback(new ArrayBuffer(0));}function encodeOne(packet,doneCallback){exports.encodePacket(packet,true,true,function(data){return doneCallback(null,data);});}map(packets,encodeOne,function(err,encodedPackets){var totalLength=encodedPackets.reduce(function(acc,p){var len;if(typeof p === 'string'){len = p.length;}else {len = p.byteLength;}return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
},0);var resultArray=new Uint8Array(totalLength);var bufferIndex=0;encodedPackets.forEach(function(p){var isString=typeof p === 'string';var ab=p;if(isString){var view=new Uint8Array(p.length);for(var i=0;i < p.length;i++) {view[i] = p.charCodeAt(i);}ab = view.buffer;}if(isString){ // not true binary
resultArray[bufferIndex++] = 0;}else { // true binary
resultArray[bufferIndex++] = 1;}var lenStr=ab.byteLength.toString();for(var i=0;i < lenStr.length;i++) {resultArray[bufferIndex++] = parseInt(lenStr[i]);}resultArray[bufferIndex++] = 255;var view=new Uint8Array(ab);for(var i=0;i < view.length;i++) {resultArray[bufferIndex++] = view[i];}});return callback(resultArray.buffer);});}; /**
           * Encode as Blob
           */exports.encodePayloadAsBlob = function(packets,callback){function encodeOne(packet,doneCallback){exports.encodePacket(packet,true,true,function(encoded){var binaryIdentifier=new Uint8Array(1);binaryIdentifier[0] = 1;if(typeof encoded === 'string'){var view=new Uint8Array(encoded.length);for(var i=0;i < encoded.length;i++) {view[i] = encoded.charCodeAt(i);}encoded = view.buffer;binaryIdentifier[0] = 0;}var len=encoded instanceof ArrayBuffer?encoded.byteLength:encoded.size;var lenStr=len.toString();var lengthAry=new Uint8Array(lenStr.length + 1);for(var i=0;i < lenStr.length;i++) {lengthAry[i] = parseInt(lenStr[i]);}lengthAry[lenStr.length] = 255;if(Blob){var blob=new Blob([binaryIdentifier.buffer,lengthAry.buffer,encoded]);doneCallback(null,blob);}});}map(packets,encodeOne,function(err,results){return callback(new Blob(results));});}; /*
           * Decodes data when a payload is maybe expected. Strings are decoded by
           * interpreting each byte as a key code for entries marked to start with 0. See
           * description of encodePayloadAsBinary
           *
           * @param {ArrayBuffer} data, callback method
           * @api public
           */exports.decodePayloadAsBinary = function(data,binaryType,callback){if(typeof binaryType === 'function'){callback = binaryType;binaryType = null;}var bufferTail=data;var buffers=[];var numberTooLong=false;while(bufferTail.byteLength > 0) {var tailArray=new Uint8Array(bufferTail);var isString=tailArray[0] === 0;var msgLength='';for(var i=1;;i++) {if(tailArray[i] == 255)break;if(msgLength.length > 310){numberTooLong = true;break;}msgLength += tailArray[i];}if(numberTooLong)return callback(err,0,1);bufferTail = sliceBuffer(bufferTail,2 + msgLength.length);msgLength = parseInt(msgLength);var msg=sliceBuffer(bufferTail,0,msgLength);if(isString){try{msg = String.fromCharCode.apply(null,new Uint8Array(msg));}catch(e) { // iPhone Safari doesn't let you apply to typed arrays
var typed=new Uint8Array(msg);msg = '';for(var i=0;i < typed.length;i++) {msg += String.fromCharCode(typed[i]);}}}buffers.push(msg);bufferTail = sliceBuffer(bufferTail,msgLength);}var total=buffers.length;buffers.forEach(function(buffer,i){callback(exports.decodePacket(buffer,binaryType,true),i,total);});};}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{"./keys":26,"after":27,"arraybuffer.slice":28,"base64-arraybuffer":29,"blob":30,"has-binary":31,"utf8":33}],26:[function(_dereq_,module,exports){ /**
         * Gets the keys for an object.
         *
         * @return {Array} keys
         * @api private
         */module.exports = Object.keys || function keys(obj){var arr=[];var has=Object.prototype.hasOwnProperty;for(var i in obj) {if(has.call(obj,i)){arr.push(i);}}return arr;};},{}],27:[function(_dereq_,module,exports){module.exports = after;function after(count,callback,err_cb){var bail=false;err_cb = err_cb || noop;proxy.count = count;return count === 0?callback():proxy;function proxy(err,result){if(proxy.count <= 0){throw new Error('after called too many times');}--proxy.count; // after first error, rest are passed to err_cb
if(err){bail = true;callback(err); // future error callbacks will go to error handler
callback = err_cb;}else if(proxy.count === 0 && !bail){callback(null,result);}}}function noop(){}},{}],28:[function(_dereq_,module,exports){ /**
         * An abstraction for slicing an arraybuffer even when
         * ArrayBuffer.prototype.slice is not supported
         *
         * @api public
         */module.exports = function(arraybuffer,start,end){var bytes=arraybuffer.byteLength;start = start || 0;end = end || bytes;if(arraybuffer.slice){return arraybuffer.slice(start,end);}if(start < 0){start += bytes;}if(end < 0){end += bytes;}if(end > bytes){end = bytes;}if(start >= bytes || start >= end || bytes === 0){return new ArrayBuffer(0);}var abv=new Uint8Array(arraybuffer);var result=new Uint8Array(end - start);for(var i=start,ii=0;i < end;i++,ii++) {result[ii] = abv[i];}return result.buffer;};},{}],29:[function(_dereq_,module,exports){ /*
         * base64-arraybuffer
         * https://github.com/niklasvh/base64-arraybuffer
         *
         * Copyright (c) 2012 Niklas von Hertzen
         * Licensed under the MIT license.
         */(function(chars){"use strict";exports.encode = function(arraybuffer){var bytes=new Uint8Array(arraybuffer),i,len=bytes.length,base64="";for(i = 0;i < len;i += 3) {base64 += chars[bytes[i] >> 2];base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];base64 += chars[bytes[i + 2] & 63];}if(len % 3 === 2){base64 = base64.substring(0,base64.length - 1) + "=";}else if(len % 3 === 1){base64 = base64.substring(0,base64.length - 2) + "==";}return base64;};exports.decode = function(base64){var bufferLength=base64.length * 0.75,len=base64.length,i,p=0,encoded1,encoded2,encoded3,encoded4;if(base64[base64.length - 1] === "="){bufferLength--;if(base64[base64.length - 2] === "="){bufferLength--;}}var arraybuffer=new ArrayBuffer(bufferLength),bytes=new Uint8Array(arraybuffer);for(i = 0;i < len;i += 4) {encoded1 = chars.indexOf(base64[i]);encoded2 = chars.indexOf(base64[i + 1]);encoded3 = chars.indexOf(base64[i + 2]);encoded4 = chars.indexOf(base64[i + 3]);bytes[p++] = encoded1 << 2 | encoded2 >> 4;bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;}return arraybuffer;};})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");},{}],30:[function(_dereq_,module,exports){(function(global){ /**
           * Create a blob builder even when vendor prefixes exist
           */var BlobBuilder=global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder; /**
           * Check if Blob constructor is supported
           */var blobSupported=(function(){try{var b=new Blob(['hi']);return b.size == 2;}catch(e) {return false;}})(); /**
           * Check if BlobBuilder is supported
           */var blobBuilderSupported=BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;function BlobBuilderConstructor(ary,options){options = options || {};var bb=new BlobBuilder();for(var i=0;i < ary.length;i++) {bb.append(ary[i]);}return options.type?bb.getBlob(options.type):bb.getBlob();};module.exports = (function(){if(blobSupported){return global.Blob;}else if(blobBuilderSupported){return BlobBuilderConstructor;}else {return undefined;}})();}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{}],31:[function(_dereq_,module,exports){(function(global){ /*
           * Module requirements.
           */var isArray=_dereq_('isarray'); /**
           * Module exports.
           */module.exports = hasBinary; /**
           * Checks for binary data.
           *
           * Right now only Buffer and ArrayBuffer are supported..
           *
           * @param {Object} anything
           * @api public
           */function hasBinary(data){function _hasBinary(obj){if(!obj)return false;if(global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File){return true;}if(isArray(obj)){for(var i=0;i < obj.length;i++) {if(_hasBinary(obj[i])){return true;}}}else if(obj && 'object' == typeof obj){if(obj.toJSON){obj = obj.toJSON();}for(var key in obj) {if(obj.hasOwnProperty(key) && _hasBinary(obj[key])){return true;}}}return false;}return _hasBinary(data);}}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{"isarray":32}],32:[function(_dereq_,module,exports){module.exports = Array.isArray || function(arr){return Object.prototype.toString.call(arr) == '[object Array]';};},{}],33:[function(_dereq_,module,exports){(function(global){ /*! http://mths.be/utf8js v2.0.0 by @mathias */;(function(root){ // Detect free variables `exports`
var freeExports=typeof exports == 'object' && exports; // Detect free variable `module`
var freeModule=typeof module == 'object' && module && module.exports == freeExports && module; // Detect free variable `global`, from Node.js or Browserified code,
// and use it as `root`
var freeGlobal=typeof global == 'object' && global;if(freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal){root = freeGlobal;} /*--------------------------------------------------------------------------*/var stringFromCharCode=String.fromCharCode; // Taken from http://mths.be/punycode
function ucs2decode(string){var output=[];var counter=0;var length=string.length;var value;var extra;while(counter < length) {value = string.charCodeAt(counter++);if(value >= 0xD800 && value <= 0xDBFF && counter < length){ // high surrogate, and there is a next character
extra = string.charCodeAt(counter++);if((extra & 0xFC00) == 0xDC00){ // low surrogate
output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);}else { // unmatched surrogate; only append this code unit, in case the next
// code unit is the high surrogate of a surrogate pair
output.push(value);counter--;}}else {output.push(value);}}return output;} // Taken from http://mths.be/punycode
function ucs2encode(array){var length=array.length;var index=-1;var value;var output='';while(++index < length) {value = array[index];if(value > 0xFFFF){value -= 0x10000;output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);value = 0xDC00 | value & 0x3FF;}output += stringFromCharCode(value);}return output;} /*--------------------------------------------------------------------------*/function createByte(codePoint,shift){return stringFromCharCode(codePoint >> shift & 0x3F | 0x80);}function encodeCodePoint(codePoint){if((codePoint & 0xFFFFFF80) == 0){ // 1-byte sequence
return stringFromCharCode(codePoint);}var symbol='';if((codePoint & 0xFFFFF800) == 0){ // 2-byte sequence
symbol = stringFromCharCode(codePoint >> 6 & 0x1F | 0xC0);}else if((codePoint & 0xFFFF0000) == 0){ // 3-byte sequence
symbol = stringFromCharCode(codePoint >> 12 & 0x0F | 0xE0);symbol += createByte(codePoint,6);}else if((codePoint & 0xFFE00000) == 0){ // 4-byte sequence
symbol = stringFromCharCode(codePoint >> 18 & 0x07 | 0xF0);symbol += createByte(codePoint,12);symbol += createByte(codePoint,6);}symbol += stringFromCharCode(codePoint & 0x3F | 0x80);return symbol;}function utf8encode(string){var codePoints=ucs2decode(string); // console.log(JSON.stringify(codePoints.map(function(x) {
// 	return 'U+' + x.toString(16).toUpperCase();
// })));
var length=codePoints.length;var index=-1;var codePoint;var byteString='';while(++index < length) {codePoint = codePoints[index];byteString += encodeCodePoint(codePoint);}return byteString;} /*--------------------------------------------------------------------------*/function readContinuationByte(){if(byteIndex >= byteCount){throw Error('Invalid byte index');}var continuationByte=byteArray[byteIndex] & 0xFF;byteIndex++;if((continuationByte & 0xC0) == 0x80){return continuationByte & 0x3F;} // If we end up here, it��s not a continuation byte
throw Error('Invalid continuation byte');}function decodeSymbol(){var byte1;var byte2;var byte3;var byte4;var codePoint;if(byteIndex > byteCount){throw Error('Invalid byte index');}if(byteIndex == byteCount){return false;} // Read first byte
byte1 = byteArray[byteIndex] & 0xFF;byteIndex++; // 1-byte sequence (no continuation bytes)
if((byte1 & 0x80) == 0){return byte1;} // 2-byte sequence
if((byte1 & 0xE0) == 0xC0){var byte2=readContinuationByte();codePoint = (byte1 & 0x1F) << 6 | byte2;if(codePoint >= 0x80){return codePoint;}else {throw Error('Invalid continuation byte');}} // 3-byte sequence (may include unpaired surrogates)
if((byte1 & 0xF0) == 0xE0){byte2 = readContinuationByte();byte3 = readContinuationByte();codePoint = (byte1 & 0x0F) << 12 | byte2 << 6 | byte3;if(codePoint >= 0x0800){return codePoint;}else {throw Error('Invalid continuation byte');}} // 4-byte sequence
if((byte1 & 0xF8) == 0xF0){byte2 = readContinuationByte();byte3 = readContinuationByte();byte4 = readContinuationByte();codePoint = (byte1 & 0x0F) << 0x12 | byte2 << 0x0C | byte3 << 0x06 | byte4;if(codePoint >= 0x010000 && codePoint <= 0x10FFFF){return codePoint;}}throw Error('Invalid UTF-8 detected');}var byteArray;var byteCount;var byteIndex;function utf8decode(byteString){byteArray = ucs2decode(byteString);byteCount = byteArray.length;byteIndex = 0;var codePoints=[];var tmp;while((tmp = decodeSymbol()) !== false) {codePoints.push(tmp);}return ucs2encode(codePoints);} /*--------------------------------------------------------------------------*/var utf8={'version':'2.0.0','encode':utf8encode,'decode':utf8decode}; // Some AMD build optimizers, like r.js, check for specific condition patterns
// like the following:
if(typeof define == 'function' && typeof define.amd == 'object' && define.amd){define(function(){return utf8;});}else if(freeExports && !freeExports.nodeType){if(freeModule){ // in Node.js or RingoJS v0.8.0+
freeModule.exports = utf8;}else { // in Narwhal or RingoJS v0.7.0-
var object={};var hasOwnProperty=object.hasOwnProperty;for(var key in utf8) {hasOwnProperty.call(utf8,key) && (freeExports[key] = utf8[key]);}}}else { // in Rhino or a web browser
root.utf8 = utf8;}})(this);}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{}],34:[function(_dereq_,module,exports){(function(global){ /**
           * JSON parse.
           *
           * @see Based on jQuery#parseJSON (MIT) and JSON2
           * @api private
           */var rvalidchars=/^[\],:{}\s]*$/;var rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;var rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;var rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g;var rtrimLeft=/^\s+/;var rtrimRight=/\s+$/;module.exports = function parsejson(data){if('string' != typeof data || !data){return null;}data = data.replace(rtrimLeft,'').replace(rtrimRight,''); // Attempt to parse using the native JSON parser first
if(global.JSON && JSON.parse){return JSON.parse(data);}if(rvalidchars.test(data.replace(rvalidescape,'@').replace(rvalidtokens,']').replace(rvalidbraces,''))){return new Function('return ' + data)();}};}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{}],35:[function(_dereq_,module,exports){ /**
         * Compiles a querystring
         * Returns string representation of the object
         *
         * @param {Object}
         * @api private
         */exports.encode = function(obj){var str='';for(var i in obj) {if(obj.hasOwnProperty(i)){if(str.length)str += '&';str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);}}return str;}; /**
         * Parses a simple querystring into an object
         *
         * @param {String} qs
         * @api private
         */exports.decode = function(qs){var qry={};var pairs=qs.split('&');for(var i=0,l=pairs.length;i < l;i++) {var pair=pairs[i].split('=');qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);}return qry;};},{}],36:[function(_dereq_,module,exports){ /**
         * Parses an URI
         *
         * @author Steven Levithan <stevenlevithan.com> (MIT license)
         * @api private
         */var re=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;var parts=['source','protocol','authority','userInfo','user','password','host','port','relative','path','directory','file','query','anchor'];module.exports = function parseuri(str){var src=str,b=str.indexOf('['),e=str.indexOf(']');if(b != -1 && e != -1){str = str.substring(0,b) + str.substring(b,e).replace(/:/g,';') + str.substring(e,str.length);}var m=re.exec(str || ''),uri={},i=14;while(i--) {uri[parts[i]] = m[i] || '';}if(b != -1 && e != -1){uri.source = src;uri.host = uri.host.substring(1,uri.host.length - 1).replace(/;/g,':');uri.authority = uri.authority.replace('[','').replace(']','').replace(/;/g,':');uri.ipv6uri = true;}return uri;};},{}],37:[function(_dereq_,module,exports){ /**
         * Module dependencies.
         */var global=(function(){return this;})(); /**
         * WebSocket constructor.
         */var WebSocket=Window.WebSocket || Window.MozWebSocket; /**
         * Module exports.
         */module.exports = WebSocket?ws:null; /**
         * WebSocket constructor.
         *
         * The third `opts` options object gets ignored in web browsers, since it's
         * non-standard, and throws a TypeError if passed to the constructor.
         * See: https://github.com/einaros/ws/issues/227
         *
         * @param {String} uri
         * @param {Array} protocols (optional)
         * @param {Object) opts (optional)
         * @api public
         */function ws(uri,protocols,opts){var instance;if(protocols){instance = new WebSocket(uri,protocols);}else {instance = new WebSocket(uri);}return instance;}if(WebSocket)ws.prototype = WebSocket.prototype;},{}],38:[function(_dereq_,module,exports){(function(global){ /*
           * Module requirements.
           */var isArray=_dereq_('isarray'); /**
           * Module exports.
           */module.exports = hasBinary; /**
           * Checks for binary data.
           *
           * Right now only Buffer and ArrayBuffer are supported..
           *
           * @param {Object} anything
           * @api public
           */function hasBinary(data){function _hasBinary(obj){if(!obj)return false;if(global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File){return true;}if(isArray(obj)){for(var i=0;i < obj.length;i++) {if(_hasBinary(obj[i])){return true;}}}else if(obj && 'object' == typeof obj){if(obj.toJSON){obj = obj.toJSON();}for(var key in obj) {if(Object.prototype.hasOwnProperty.call(obj,key) && _hasBinary(obj[key])){return true;}}}return false;}return _hasBinary(data);}}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{"isarray":39}],39:[function(_dereq_,module,exports){module.exports = _dereq_(32);},{}],40:[function(_dereq_,module,exports){ /**
         * Module dependencies.
         */var global=_dereq_('global'); /**
         * Module exports.
         *
         * Logic borrowed from Modernizr:
         *
         *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
         */try{module.exports = 'XMLHttpRequest' in global && 'withCredentials' in new global.XMLHttpRequest();}catch(err) { // if XMLHttp support is disabled in IE then it will throw
// when trying to create
module.exports = false;}},{"global":41}],41:[function(_dereq_,module,exports){ /**
         * Returns `this`. Execute this without a "context" (i.e. without it being
         * attached to an object of the left-hand side), and `this` points to the
         * "global" scope of the current JS execution.
         */module.exports = (function(){return this;})();},{}],42:[function(_dereq_,module,exports){var indexOf=[].indexOf;module.exports = function(arr,obj){if(indexOf)return arr.indexOf(obj);for(var i=0;i < arr.length;++i) {if(arr[i] === obj)return i;}return -1;};},{}],43:[function(_dereq_,module,exports){ /**
         * HOP ref.
         */var has=Object.prototype.hasOwnProperty; /**
         * Return own keys in `obj`.
         *
         * @param {Object} obj
         * @return {Array}
         * @api public
         */exports.keys = Object.keys || function(obj){var keys=[];for(var key in obj) {if(has.call(obj,key)){keys.push(key);}}return keys;}; /**
         * Return own values in `obj`.
         *
         * @param {Object} obj
         * @return {Array}
         * @api public
         */exports.values = function(obj){var vals=[];for(var key in obj) {if(has.call(obj,key)){vals.push(obj[key]);}}return vals;}; /**
         * Merge `b` into `a`.
         *
         * @param {Object} a
         * @param {Object} b
         * @return {Object} a
         * @api public
         */exports.merge = function(a,b){for(var key in b) {if(has.call(b,key)){a[key] = b[key];}}return a;}; /**
         * Return length of `obj`.
         *
         * @param {Object} obj
         * @return {Number}
         * @api public
         */exports.length = function(obj){return exports.keys(obj).length;}; /**
         * Check if `obj` is empty.
         *
         * @param {Object} obj
         * @return {Boolean}
         * @api public
         */exports.isEmpty = function(obj){return 0 == exports.length(obj);};},{}],44:[function(_dereq_,module,exports){ /**
         * Parses an URI
         *
         * @author Steven Levithan <stevenlevithan.com> (MIT license)
         * @api private
         */var re=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;var parts=['source','protocol','authority','userInfo','user','password','host','port','relative','path','directory','file','query','anchor'];module.exports = function parseuri(str){var m=re.exec(str || ''),uri={},i=14;while(i--) {uri[parts[i]] = m[i] || '';}return uri;};},{}],45:[function(_dereq_,module,exports){(function(global){ /*global Blob,File*/ /**
           * Module requirements
           */var isArray=_dereq_('isarray');var isBuf=_dereq_('./is-buffer'); /**
           * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
           * Anything with blobs or files should be fed through removeBlobs before coming
           * here.
           *
           * @param {Object} packet - socket.io event packet
           * @return {Object} with deconstructed packet and list of buffers
           * @api public
           */exports.deconstructPacket = function(packet){var buffers=[];var packetData=packet.data;function _deconstructPacket(data){if(!data)return data;if(isBuf(data)){var placeholder={_placeholder:true,num:buffers.length};buffers.push(data);return placeholder;}else if(isArray(data)){var newData=new Array(data.length);for(var i=0;i < data.length;i++) {newData[i] = _deconstructPacket(data[i]);}return newData;}else if('object' == typeof data && !(data instanceof Date)){var newData={};for(var key in data) {newData[key] = _deconstructPacket(data[key]);}return newData;}return data;}var pack=packet;pack.data = _deconstructPacket(packetData);pack.attachments = buffers.length; // number of binary 'attachments'
return {packet:pack,buffers:buffers};}; /**
           * Reconstructs a binary packet from its placeholder packet and buffers
           *
           * @param {Object} packet - event packet with placeholders
           * @param {Array} buffers - binary buffers to put in placeholder positions
           * @return {Object} reconstructed packet
           * @api public
           */exports.reconstructPacket = function(packet,buffers){var curPlaceHolder=0;function _reconstructPacket(data){if(data && data._placeholder){var buf=buffers[data.num]; // appropriate buffer (should be natural order anyway)
return buf;}else if(isArray(data)){for(var i=0;i < data.length;i++) {data[i] = _reconstructPacket(data[i]);}return data;}else if(data && 'object' == typeof data){for(var key in data) {data[key] = _reconstructPacket(data[key]);}return data;}return data;}packet.data = _reconstructPacket(packet.data);packet.attachments = undefined; // no longer useful
return packet;}; /**
           * Asynchronously removes Blobs or Files from data via
           * FileReader's readAsArrayBuffer method. Used before encoding
           * data as msgpack. Calls callback with the blobless data.
           *
           * @param {Object} data
           * @param {Function} callback
           * @api private
           */exports.removeBlobs = function(data,callback){function _removeBlobs(obj,curKey,containingObject){if(!obj)return obj; // convert any blob
if(global.Blob && obj instanceof Blob || global.File && obj instanceof File){pendingBlobs++; // async filereader
var fileReader=new FileReader();fileReader.onload = function(){ // this.result == arraybuffer
if(containingObject){containingObject[curKey] = this.result;}else {bloblessData = this.result;} // if nothing pending its callback time
if(! --pendingBlobs){callback(bloblessData);}};fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
}else if(isArray(obj)){ // handle array
for(var i=0;i < obj.length;i++) {_removeBlobs(obj[i],i,obj);}}else if(obj && 'object' == typeof obj && !isBuf(obj)){ // and object
for(var key in obj) {_removeBlobs(obj[key],key,obj);}}}var pendingBlobs=0;var bloblessData=data;_removeBlobs(bloblessData);if(!pendingBlobs){callback(bloblessData);}};}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{"./is-buffer":47,"isarray":48}],46:[function(_dereq_,module,exports){ /**
         * Module dependencies.
         */var debug=_dereq_('debug')('socket.io-parser');var json=_dereq_('json3');var isArray=_dereq_('isarray');var Emitter=_dereq_('component-emitter');var binary=_dereq_('./binary');var isBuf=_dereq_('./is-buffer'); /**
         * Protocol version.
         *
         * @api public
         */exports.protocol = 4; /**
         * Packet types.
         *
         * @api public
         */exports.types = ['CONNECT','DISCONNECT','EVENT','BINARY_EVENT','ACK','BINARY_ACK','ERROR']; /**
         * Packet type `connect`.
         *
         * @api public
         */exports.CONNECT = 0; /**
         * Packet type `disconnect`.
         *
         * @api public
         */exports.DISCONNECT = 1; /**
         * Packet type `event`.
         *
         * @api public
         */exports.EVENT = 2; /**
         * Packet type `ack`.
         *
         * @api public
         */exports.ACK = 3; /**
         * Packet type `error`.
         *
         * @api public
         */exports.ERROR = 4; /**
         * Packet type 'binary event'
         *
         * @api public
         */exports.BINARY_EVENT = 5; /**
         * Packet type `binary ack`. For acks with binary arguments.
         *
         * @api public
         */exports.BINARY_ACK = 6; /**
         * Encoder constructor.
         *
         * @api public
         */exports.Encoder = Encoder; /**
         * Decoder constructor.
         *
         * @api public
         */exports.Decoder = Decoder; /**
         * A socket.io Encoder instance
         *
         * @api public
         */function Encoder(){} /**
         * Encode a packet as a single string if non-binary, or as a
         * buffer sequence, depending on packet type.
         *
         * @param {Object} obj - packet object
         * @param {Function} callback - function to handle encodings (likely engine.write)
         * @return Calls callback with Array of encodings
         * @api public
         */Encoder.prototype.encode = function(obj,callback){debug('encoding packet %j',obj);if(exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type){encodeAsBinary(obj,callback);}else {var encoding=encodeAsString(obj);callback([encoding]);}}; /**
         * Encode packet as string.
         *
         * @param {Object} packet
         * @return {String} encoded
         * @api private
         */function encodeAsString(obj){var str='';var nsp=false; // first is type
str += obj.type; // attachments if we have them
if(exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type){str += obj.attachments;str += '-';} // if we have a namespace other than `/`
// we append it followed by a comma `,`
if(obj.nsp && '/' != obj.nsp){nsp = true;str += obj.nsp;} // immediately followed by the id
if(null != obj.id){if(nsp){str += ',';nsp = false;}str += obj.id;} // json data
if(null != obj.data){if(nsp)str += ',';str += json.stringify(obj.data);}debug('encoded %j as %s',obj,str);return str;} /**
         * Encode packet as 'buffer sequence' by removing blobs, and
         * deconstructing packet into object with placeholders and
         * a list of buffers.
         *
         * @param {Object} packet
         * @return {Buffer} encoded
         * @api private
         */function encodeAsBinary(obj,callback){function writeEncoding(bloblessData){var deconstruction=binary.deconstructPacket(bloblessData);var pack=encodeAsString(deconstruction.packet);var buffers=deconstruction.buffers;buffers.unshift(pack); // add packet info to beginning of data list
callback(buffers); // write all the buffers
}binary.removeBlobs(obj,writeEncoding);} /**
         * A socket.io Decoder instance
         *
         * @return {Object} decoder
         * @api public
         */function Decoder(){this.reconstructor = null;} /**
         * Mix in `Emitter` with Decoder.
         */Emitter(Decoder.prototype); /**
         * Decodes an ecoded packet string into packet JSON.
         *
         * @param {String} obj - encoded packet
         * @return {Object} packet
         * @api public
         */Decoder.prototype.add = function(obj){var packet;if('string' == typeof obj){packet = decodeString(obj);if(exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type){ // binary packet's json
this.reconstructor = new BinaryReconstructor(packet); // no attachments, labeled binary but no binary data to follow
if(this.reconstructor.reconPack.attachments === 0){this.emit('decoded',packet);}}else { // non-binary full packet
this.emit('decoded',packet);}}else if(isBuf(obj) || obj.base64){ // raw binary data
if(!this.reconstructor){throw new Error('got binary data when not reconstructing a packet');}else {packet = this.reconstructor.takeBinaryData(obj);if(packet){ // received final buffer
this.reconstructor = null;this.emit('decoded',packet);}}}else {throw new Error('Unknown type: ' + obj);}}; /**
         * Decode a packet String (JSON data)
         *
         * @param {String} str
         * @return {Object} packet
         * @api private
         */function decodeString(str){var p={};var i=0; // look up type
p.type = Number(str.charAt(0));if(null == exports.types[p.type])return error(); // look up attachments if type binary
if(exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type){var buf='';while(str.charAt(++i) != '-') {buf += str.charAt(i);if(i == str.length)break;}if(buf != Number(buf) || str.charAt(i) != '-'){throw new Error('Illegal attachments');}p.attachments = Number(buf);} // look up namespace (if any)
if('/' == str.charAt(i + 1)){p.nsp = '';while(++i) {var c=str.charAt(i);if(',' == c)break;p.nsp += c;if(i == str.length)break;}}else {p.nsp = '/';} // look up id
var next=str.charAt(i + 1);if('' !== next && Number(next) == next){p.id = '';while(++i) {var c=str.charAt(i);if(null == c || Number(c) != c){--i;break;}p.id += str.charAt(i);if(i == str.length)break;}p.id = Number(p.id);} // look up json data
if(str.charAt(++i)){try{p.data = json.parse(str.substr(i));}catch(e) {return error();}}debug('decoded %s as %j',str,p);return p;} /**
         * Deallocates a parser's resources
         *
         * @api public
         */Decoder.prototype.destroy = function(){if(this.reconstructor){this.reconstructor.finishedReconstruction();}}; /**
         * A manager of a binary event's 'buffer sequence'. Should
         * be constructed whenever a packet of type BINARY_EVENT is
         * decoded.
         *
         * @param {Object} packet
         * @return {BinaryReconstructor} initialized reconstructor
         * @api private
         */function BinaryReconstructor(packet){this.reconPack = packet;this.buffers = [];} /**
         * Method to be called when binary data received from connection
         * after a BINARY_EVENT packet.
         *
         * @param {Buffer | ArrayBuffer} binData - the raw binary data received
         * @return {null | Object} returns null if more binary data is expected or
         *   a reconstructed packet object if all buffers have been received.
         * @api private
         */BinaryReconstructor.prototype.takeBinaryData = function(binData){this.buffers.push(binData);if(this.buffers.length == this.reconPack.attachments){ // done with buffer list
var packet=binary.reconstructPacket(this.reconPack,this.buffers);this.finishedReconstruction();return packet;}return null;}; /**
         * Cleans up binary packet reconstruction variables.
         *
         * @api private
         */BinaryReconstructor.prototype.finishedReconstruction = function(){this.reconPack = null;this.buffers = [];};function error(data){return {type:exports.ERROR,data:'parser error'};}},{"./binary":45,"./is-buffer":47,"component-emitter":9,"debug":10,"isarray":48,"json3":49}],47:[function(_dereq_,module,exports){(function(global){module.exports = isBuf; /**
           * Returns true if obj is a buffer or an arraybuffer.
           *
           * @api private
           */function isBuf(obj){return global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer;}}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{}],48:[function(_dereq_,module,exports){module.exports = _dereq_(32);},{}],49:[function(_dereq_,module,exports){ /*! JSON v3.2.6 | http://bestiejs.github.io/json3 | Copyright 2012-2013, Kit Cambridge | http://kit.mit-license.org */;(function(window){ // Convenience aliases.
var getClass=({}).toString,isProperty,forEach,undef; // Detect the `define` function exposed by asynchronous module loaders. The
// strict `define` check is necessary for compatibility with `r.js`.
var isLoader=typeof define === "function" && define.amd; // Detect native implementations.
var nativeJSON=typeof JSON == "object" && JSON; // Set up the JSON 3 namespace, preferring the CommonJS `exports` object if
// available.
var JSON3=typeof exports == "object" && exports && !exports.nodeType && exports;if(JSON3 && nativeJSON){ // Explicitly delegate to the native `stringify` and `parse`
// implementations in CommonJS environments.
JSON3.stringify = nativeJSON.stringify;JSON3.parse = nativeJSON.parse;}else { // Export for web browsers, JavaScript engines, and asynchronous module
// loaders, using the global `JSON` object if available.
JSON3 = window.JSON = nativeJSON || {};} // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
var isExtended=new Date(-3509827334573292);try{ // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
// results for certain dates in Opera >= 10.53.
isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&  // Safari < 2.0.2 stores the internal millisecond time value correctly,
// but clips the values returned by the date methods to the range of
// signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;}catch(exception) {} // Internal: Determines whether the native `JSON.stringify` and `parse`
// implementations are spec-compliant. Based on work by Ken Snyder.
function has(name){if(has[name] !== undef){ // Return cached feature test result.
return has[name];}var isSupported;if(name == "bug-string-char-index"){ // IE <= 7 doesn't support accessing string characters using square
// bracket notation. IE 8 only supports this for primitives.
isSupported = "a"[0] != "a";}else if(name == "json"){ // Indicates whether both `JSON.stringify` and `JSON.parse` are
// supported.
isSupported = has("json-stringify") && has("json-parse");}else {var value,serialized="{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}"; // Test `JSON.stringify`.
if(name == "json-stringify"){var stringify=JSON3.stringify,stringifySupported=typeof stringify == "function" && isExtended;if(stringifySupported){ // A test function object with a custom `toJSON` method.
(value = function(){return 1;}).toJSON = value;try{stringifySupported =  // Firefox 3.1b1 and b2 serialize string, number, and boolean
// primitives as object literals.
stringify(0) === "0" &&  // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
// literals.
stringify(new Number()) === "0" && stringify(new String()) == '""' &&  // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
// does not define a canonical JSON representation (this applies to
// objects with `toJSON` properties as well, *unless* they are nested
// within an object or array).
stringify(getClass) === undef &&  // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
// FF 3.1b3 pass this test.
stringify(undef) === undef &&  // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
// respectively, if the value is omitted entirely.
stringify() === undef &&  // FF 3.1b1, 2 throw an error if the given value is not a number,
// string, array, object, Boolean, or `null` literal. This applies to
// objects with custom `toJSON` methods as well, unless they are nested
// inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
// methods entirely.
stringify(value) === "1" && stringify([value]) == "[1]" &&  // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
// `"[null]"`.
stringify([undef]) == "[null]" &&  // YUI 3.0.0b1 fails to serialize `null` literals.
stringify(null) == "null" &&  // FF 3.1b1, 2 halts serialization if an array contains a function:
// `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
// elides non-JSON values from objects and arrays, unless they
// define custom `toJSON` methods.
stringify([undef,getClass,null]) == "[null,null,null]" &&  // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
// where character escape codes are expected (e.g., `\b` => `\u0008`).
stringify({"a":[value,true,false,null,"\x00\b\n\f\r\t"]}) == serialized &&  // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
stringify(null,value) === "1" && stringify([1,2],null,1) == "[\n 1,\n 2\n]" &&  // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
// serialize extended years.
stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&  // The milliseconds are optional in ES 5, but required in 5.1.
stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&  // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
// four-digit years instead of six-digit years. Credits: @Yaffle.
stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&  // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
// values less than 1000. Credits: @Yaffle.
stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';}catch(exception) {stringifySupported = false;}}isSupported = stringifySupported;} // Test `JSON.parse`.
if(name == "json-parse"){var parse=JSON3.parse;if(typeof parse == "function"){try{ // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
// Conforming implementations should also coerce the initial argument to
// a string prior to parsing.
if(parse("0") === 0 && !parse(false)){ // Simple parsing test.
value = parse(serialized);var parseSupported=value["a"].length == 5 && value["a"][0] === 1;if(parseSupported){try{ // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
parseSupported = !parse('"\t"');}catch(exception) {}if(parseSupported){try{ // FF 4.0 and 4.0.1 allow leading `+` signs and leading
// decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
// certain octal literals.
parseSupported = parse("01") !== 1;}catch(exception) {}}if(parseSupported){try{ // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
// points. These environments, along with FF 3.1b1 and 2,
// also allow trailing commas in JSON objects and arrays.
parseSupported = parse("1.") !== 1;}catch(exception) {}}}}}catch(exception) {parseSupported = false;}}isSupported = parseSupported;}}return has[name] = !!isSupported;}if(!has("json")){ // Common `[[Class]]` name aliases.
var functionClass="[object Function]";var dateClass="[object Date]";var numberClass="[object Number]";var stringClass="[object String]";var arrayClass="[object Array]";var booleanClass="[object Boolean]"; // Detect incomplete support for accessing string characters by index.
var charIndexBuggy=has("bug-string-char-index"); // Define additional utility methods if the `Date` methods are buggy.
if(!isExtended){var floor=Math.floor; // A mapping between the months of the year and the number of days between
// January 1st and the first of the respective month.
var Months=[0,31,59,90,120,151,181,212,243,273,304,334]; // Internal: Calculates the number of days between the Unix epoch and the
// first day of the given month.
var getDay=function getDay(year,month){return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);};} // Internal: Determines if a property is a direct property of the given
// object. Delegates to the native `Object#hasOwnProperty` method.
if(!(isProperty = ({}).hasOwnProperty)){isProperty = function(property){var members={},constructor;if((members.__proto__ = null,members.__proto__ = { // The *proto* property cannot be set multiple times in recent
// versions of Firefox and SeaMonkey.
"toString":1},members).toString != getClass){ // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
// supports the mutable *proto* property.
isProperty = function(property){ // Capture and break the object's prototype chain (see section 8.6.2
// of the ES 5.1 spec). The parenthesized expression prevents an
// unsafe transformation by the Closure Compiler.
var original=this.__proto__,result=(property in (this.__proto__ = null,this)); // Restore the original prototype chain.
this.__proto__ = original;return result;};}else { // Capture a reference to the top-level `Object` constructor.
constructor = members.constructor; // Use the `constructor` property to simulate `Object#hasOwnProperty` in
// other environments.
isProperty = function(property){var parent=(this.constructor || constructor).prototype;return property in this && !(property in parent && this[property] === parent[property]);};}members = null;return isProperty.call(this,property);};} // Internal: A set of primitive types used by `isHostType`.
var PrimitiveTypes={'boolean':1,'number':1,'string':1,'undefined':1}; // Internal: Determines if the given object `property` value is a
// non-primitive.
var isHostType=function isHostType(object,property){var type=typeof object[property];return type == 'object'?!!object[property]:!PrimitiveTypes[type];}; // Internal: Normalizes the `for...in` iteration algorithm across
// environments. Each enumerated key is yielded to a `callback` function.
forEach = function(object,callback){var size=0,Properties,members,property; // Tests for bugs in the current environment's `for...in` algorithm. The
// `valueOf` property inherits the non-enumerable flag from
// `Object.prototype` in older versions of IE, Netscape, and Mozilla.
(Properties = function(){this.valueOf = 0;}).prototype.valueOf = 0; // Iterate over a new instance of the `Properties` class.
members = new Properties();for(property in members) { // Ignore all properties inherited from `Object.prototype`.
if(isProperty.call(members,property)){size++;}}Properties = members = null; // Normalize the iteration algorithm.
if(!size){ // A list of non-enumerable properties inherited from `Object.prototype`.
members = ["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"]; // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
// properties.
forEach = function(object,callback){var isFunction=getClass.call(object) == functionClass,property,length;var hasProperty=!isFunction && typeof object.constructor != 'function' && isHostType(object,'hasOwnProperty')?object.hasOwnProperty:isProperty;for(property in object) { // Gecko <= 1.0 enumerates the `prototype` property of functions under
// certain conditions; IE does not.
if(!(isFunction && property == "prototype") && hasProperty.call(object,property)){callback(property);}} // Manually invoke the callback for each non-enumerable property.
for(length = members.length;property = members[--length];hasProperty.call(object,property) && callback(property));};}else if(size == 2){ // Safari <= 2.0.4 enumerates shadowed properties twice.
forEach = function(object,callback){ // Create a set of iterated properties.
var members={},isFunction=getClass.call(object) == functionClass,property;for(property in object) { // Store each property name to prevent double enumeration. The
// `prototype` property of functions is not enumerated due to cross-
// environment inconsistencies.
if(!(isFunction && property == "prototype") && !isProperty.call(members,property) && (members[property] = 1) && isProperty.call(object,property)){callback(property);}}};}else { // No bugs detected; use the standard `for...in` algorithm.
forEach = function(object,callback){var isFunction=getClass.call(object) == functionClass,property,isConstructor;for(property in object) {if(!(isFunction && property == "prototype") && isProperty.call(object,property) && !(isConstructor = property === "constructor")){callback(property);}} // Manually invoke the callback for the `constructor` property due to
// cross-environment inconsistencies.
if(isConstructor || isProperty.call(object,property = "constructor")){callback(property);}};}return forEach(object,callback);}; // Public: Serializes a JavaScript `value` as a JSON string. The optional
// `filter` argument may specify either a function that alters how object and
// array members are serialized, or an array of strings and numbers that
// indicates which properties should be serialized. The optional `width`
// argument may be either a string or number that specifies the indentation
// level of the output.
if(!has("json-stringify")){ // Internal: A map of control characters and their escaped equivalents.
var Escapes={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"}; // Internal: Converts `value` into a zero-padded string such that its
// length is at least equal to `width`. The `width` must be <= 6.
var leadingZeroes="000000";var toPaddedString=function toPaddedString(width,value){ // The `|| 0` expression is necessary to work around a bug in
// Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
return (leadingZeroes + (value || 0)).slice(-width);}; // Internal: Double-quotes a string `value`, replacing all ASCII control
// characters (characters with code unit values between 0 and 31) with
// their escaped equivalents. This is an implementation of the
// `Quote(value)` operation defined in ES 5.1 section 15.12.3.
var unicodePrefix="\\u00";var quote=function quote(value){var result='"',index=0,length=value.length,isLarge=length > 10 && charIndexBuggy,symbols;if(isLarge){symbols = value.split("");}for(;index < length;index++) {var charCode=value.charCodeAt(index); // If the character is a control character, append its Unicode or
// shorthand escape sequence; otherwise, append the character as-is.
switch(charCode){case 8:case 9:case 10:case 12:case 13:case 34:case 92:result += Escapes[charCode];break;default:if(charCode < 32){result += unicodePrefix + toPaddedString(2,charCode.toString(16));break;}result += isLarge?symbols[index]:charIndexBuggy?value.charAt(index):value[index];}}return result + '"';}; // Internal: Recursively serializes an object. Implements the
// `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
var serialize=function serialize(property,object,callback,properties,whitespace,indentation,stack){var value,className,year,month,date,time,hours,minutes,seconds,milliseconds,results,element,index,length,prefix,result;try{ // Necessary for host object support.
value = object[property];}catch(exception) {}if(typeof value == "object" && value){className = getClass.call(value);if(className == dateClass && !isProperty.call(value,"toJSON")){if(value > -1 / 0 && value < 1 / 0){ // Dates are serialized according to the `Date#toJSON` method
// specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
// for the ISO 8601 date time string format.
if(getDay){ // Manually compute the year, month, date, hours, minutes,
// seconds, and milliseconds if the `getUTC*` methods are
// buggy. Adapted from @Yaffle's `date-shim` project.
date = floor(value / 864e5);for(year = floor(date / 365.2425) + 1970 - 1;getDay(year + 1,0) <= date;year++);for(month = floor((date - getDay(year,0)) / 30.42);getDay(year,month + 1) <= date;month++);date = 1 + date - getDay(year,month); // The `time` value specifies the time within the day (see ES
// 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
// to compute `A modulo B`, as the `%` operator does not
// correspond to the `modulo` operation for negative numbers.
time = (value % 864e5 + 864e5) % 864e5; // The hours, minutes, seconds, and milliseconds are obtained by
// decomposing the time within the day. See section 15.9.1.10.
hours = floor(time / 36e5) % 24;minutes = floor(time / 6e4) % 60;seconds = floor(time / 1e3) % 60;milliseconds = time % 1e3;}else {year = value.getUTCFullYear();month = value.getUTCMonth();date = value.getUTCDate();hours = value.getUTCHours();minutes = value.getUTCMinutes();seconds = value.getUTCSeconds();milliseconds = value.getUTCMilliseconds();} // Serialize extended years correctly.
value = (year <= 0 || year >= 1e4?(year < 0?"-":"+") + toPaddedString(6,year < 0?-year:year):toPaddedString(4,year)) + "-" + toPaddedString(2,month + 1) + "-" + toPaddedString(2,date) +  // Months, dates, hours, minutes, and seconds should have two
// digits; milliseconds should have three.
"T" + toPaddedString(2,hours) + ":" + toPaddedString(2,minutes) + ":" + toPaddedString(2,seconds) +  // Milliseconds are optional in ES 5.0, but required in 5.1.
"." + toPaddedString(3,milliseconds) + "Z";}else {value = null;}}else if(typeof value.toJSON == "function" && (className != numberClass && className != stringClass && className != arrayClass || isProperty.call(value,"toJSON"))){ // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
// `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
// ignores all `toJSON` methods on these objects unless they are
// defined directly on an instance.
value = value.toJSON(property);}}if(callback){ // If a replacement function was provided, call it to obtain the value
// for serialization.
value = callback.call(object,property,value);}if(value === null){return "null";}className = getClass.call(value);if(className == booleanClass){ // Booleans are represented literally.
return "" + value;}else if(className == numberClass){ // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
// `"null"`.
return value > -1 / 0 && value < 1 / 0?"" + value:"null";}else if(className == stringClass){ // Strings are double-quoted and escaped.
return quote("" + value);} // Recursively serialize objects and arrays.
if(typeof value == "object"){ // Check for cyclic structures. This is a linear search; performance
// is inversely proportional to the number of unique nested objects.
for(length = stack.length;length--;) {if(stack[length] === value){ // Cyclic structures cannot be serialized by `JSON.stringify`.
throw TypeError();}} // Add the object to the stack of traversed objects.
stack.push(value);results = []; // Save the current indentation level and indent one additional level.
prefix = indentation;indentation += whitespace;if(className == arrayClass){ // Recursively serialize array elements.
for(index = 0,length = value.length;index < length;index++) {element = serialize(index,value,callback,properties,whitespace,indentation,stack);results.push(element === undef?"null":element);}result = results.length?whitespace?"[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]":"[" + results.join(",") + "]":"[]";}else { // Recursively serialize object members. Members are selected from
// either a user-specified list of property names, or the object
// itself.
forEach(properties || value,function(property){var element=serialize(property,value,callback,properties,whitespace,indentation,stack);if(element !== undef){ // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
// is not the empty string, let `member` {quote(property) + ":"}
// be the concatenation of `member` and the `space` character."
// The "`space` character" refers to the literal space
// character, not the `space` {width} argument provided to
// `JSON.stringify`.
results.push(quote(property) + ":" + (whitespace?" ":"") + element);}});result = results.length?whitespace?"{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}":"{" + results.join(",") + "}":"{}";} // Remove the object from the traversed object stack.
stack.pop();return result;}}; // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
JSON3.stringify = function(source,filter,width){var whitespace,callback,properties,className;if(typeof filter == "function" || typeof filter == "object" && filter){if((className = getClass.call(filter)) == functionClass){callback = filter;}else if(className == arrayClass){ // Convert the property names array into a makeshift set.
properties = {};for(var index=0,length=filter.length,value;index < length;value = filter[index++],(className = getClass.call(value),className == stringClass || className == numberClass) && (properties[value] = 1));}}if(width){if((className = getClass.call(width)) == numberClass){ // Convert the `width` to an integer and create a string containing
// `width` number of space characters.
if((width -= width % 1) > 0){for(whitespace = "",width > 10 && (width = 10);whitespace.length < width;whitespace += " ");}}else if(className == stringClass){whitespace = width.length <= 10?width:width.slice(0,10);}} // Opera <= 7.54u2 discards the values associated with empty string keys
// (`""`) only if they are used directly within an object member list
// (e.g., `!("" in { "": 1})`).
return serialize("",(value = {},value[""] = source,value),callback,properties,whitespace,"",[]);};} // Public: Parses a JSON source string.
if(!has("json-parse")){var fromCharCode=String.fromCharCode; // Internal: A map of escaped control characters and their unescaped
// equivalents.
var Unescapes={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"}; // Internal: Stores the parser state.
var Index,Source; // Internal: Resets the parser state and throws a `SyntaxError`.
var abort=function abort(){Index = Source = null;throw SyntaxError();}; // Internal: Returns the next token, or `"$"` if the parser has reached
// the end of the source string. A token may be a string, number, `null`
// literal, or Boolean literal.
var lex=function lex(){var source=Source,length=source.length,value,begin,position,isSigned,charCode;while(Index < length) {charCode = source.charCodeAt(Index);switch(charCode){case 9:case 10:case 13:case 32: // Skip whitespace tokens, including tabs, carriage returns, line
// feeds, and space characters.
Index++;break;case 123:case 125:case 91:case 93:case 58:case 44: // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
// the current position.
value = charIndexBuggy?source.charAt(Index):source[Index];Index++;return value;case 34: // `"` delimits a JSON string; advance to the next character and
// begin parsing the string. String tokens are prefixed with the
// sentinel `@` character to distinguish them from punctuators and
// end-of-string tokens.
for(value = "@",Index++;Index < length;) {charCode = source.charCodeAt(Index);if(charCode < 32){ // Unescaped ASCII control characters (those with a code unit
// less than the space character) are not permitted.
abort();}else if(charCode == 92){ // A reverse solidus (`\`) marks the beginning of an escaped
// control character (including `"`, `\`, and `/`) or Unicode
// escape sequence.
charCode = source.charCodeAt(++Index);switch(charCode){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114: // Revive escaped control characters.
value += Unescapes[charCode];Index++;break;case 117: // `\u` marks the beginning of a Unicode escape sequence.
// Advance to the first character and validate the
// four-digit code point.
begin = ++Index;for(position = Index + 4;Index < position;Index++) {charCode = source.charCodeAt(Index); // A valid sequence comprises four hexdigits (case-
// insensitive) that form a single hexadecimal value.
if(!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)){ // Invalid Unicode escape sequence.
abort();}} // Revive the escaped character.
value += fromCharCode("0x" + source.slice(begin,Index));break;default: // Invalid escape sequence.
abort();}}else {if(charCode == 34){ // An unescaped double-quote character marks the end of the
// string.
break;}charCode = source.charCodeAt(Index);begin = Index; // Optimize for the common case where a string is valid.
while(charCode >= 32 && charCode != 92 && charCode != 34) {charCode = source.charCodeAt(++Index);} // Append the string as-is.
value += source.slice(begin,Index);}}if(source.charCodeAt(Index) == 34){ // Advance to the next character and return the revived string.
Index++;return value;} // Unterminated string.
abort();default: // Parse numbers and literals.
begin = Index; // Advance past the negative sign, if one is specified.
if(charCode == 45){isSigned = true;charCode = source.charCodeAt(++Index);} // Parse an integer or floating-point value.
if(charCode >= 48 && charCode <= 57){ // Leading zeroes are interpreted as octal literals.
if(charCode == 48 && (charCode = source.charCodeAt(Index + 1),charCode >= 48 && charCode <= 57)){ // Illegal octal literal.
abort();}isSigned = false; // Parse the integer component.
for(;Index < length && (charCode = source.charCodeAt(Index),charCode >= 48 && charCode <= 57);Index++); // Floats cannot contain a leading decimal point; however, this
// case is already accounted for by the parser.
if(source.charCodeAt(Index) == 46){position = ++Index; // Parse the decimal component.
for(;position < length && (charCode = source.charCodeAt(position),charCode >= 48 && charCode <= 57);position++);if(position == Index){ // Illegal trailing decimal.
abort();}Index = position;} // Parse exponents. The `e` denoting the exponent is
// case-insensitive.
charCode = source.charCodeAt(Index);if(charCode == 101 || charCode == 69){charCode = source.charCodeAt(++Index); // Skip past the sign following the exponent, if one is
// specified.
if(charCode == 43 || charCode == 45){Index++;} // Parse the exponential component.
for(position = Index;position < length && (charCode = source.charCodeAt(position),charCode >= 48 && charCode <= 57);position++);if(position == Index){ // Illegal empty exponent.
abort();}Index = position;} // Coerce the parsed value to a JavaScript number.
return +source.slice(begin,Index);} // A negative sign may only precede numbers.
if(isSigned){abort();} // `true`, `false`, and `null` literals.
if(source.slice(Index,Index + 4) == "true"){Index += 4;return true;}else if(source.slice(Index,Index + 5) == "false"){Index += 5;return false;}else if(source.slice(Index,Index + 4) == "null"){Index += 4;return null;} // Unrecognized token.
abort();}} // Return the sentinel `$` character if the parser has reached the end
// of the source string.
return "$";}; // Internal: Parses a JSON `value` token.
var get=function get(value){var results,hasMembers;if(value == "$"){ // Unexpected end of input.
abort();}if(typeof value == "string"){if((charIndexBuggy?value.charAt(0):value[0]) == "@"){ // Remove the sentinel `@` character.
return value.slice(1);} // Parse object and array literals.
if(value == "["){ // Parses a JSON array, returning a new JavaScript array.
results = [];for(;;hasMembers || (hasMembers = true)) {value = lex(); // A closing square bracket marks the end of the array literal.
if(value == "]"){break;} // If the array literal contains elements, the current token
// should be a comma separating the previous element from the
// next.
if(hasMembers){if(value == ","){value = lex();if(value == "]"){ // Unexpected trailing `,` in array literal.
abort();}}else { // A `,` must separate each array element.
abort();}} // Elisions and leading commas are not permitted.
if(value == ","){abort();}results.push(get(value));}return results;}else if(value == "{"){ // Parses a JSON object, returning a new JavaScript object.
results = {};for(;;hasMembers || (hasMembers = true)) {value = lex(); // A closing curly brace marks the end of the object literal.
if(value == "}"){break;} // If the object literal contains members, the current token
// should be a comma separator.
if(hasMembers){if(value == ","){value = lex();if(value == "}"){ // Unexpected trailing `,` in object literal.
abort();}}else { // A `,` must separate each object member.
abort();}} // Leading commas are not permitted, object property names must be
// double-quoted strings, and a `:` must separate each property
// name and value.
if(value == "," || typeof value != "string" || (charIndexBuggy?value.charAt(0):value[0]) != "@" || lex() != ":"){abort();}results[value.slice(1)] = get(lex());}return results;} // Unexpected token encountered.
abort();}return value;}; // Internal: Updates a traversed object member.
var update=function update(source,property,callback){var element=walk(source,property,callback);if(element === undef){delete source[property];}else {source[property] = element;}}; // Internal: Recursively traverses a parsed JSON object, invoking the
// `callback` function for each value. This is an implementation of the
// `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
var walk=function walk(source,property,callback){var value=source[property],length;if(typeof value == "object" && value){ // `forEach` can't be used to traverse an array in Opera <= 8.54
// because its `Object#hasOwnProperty` implementation returns `false`
// for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
if(getClass.call(value) == arrayClass){for(length = value.length;length--;) {update(value,length,callback);}}else {forEach(value,function(property){update(value,property,callback);});}}return callback.call(source,property,value);}; // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
JSON3.parse = function(source,callback){var result,value;Index = 0;Source = "" + source;result = get(lex()); // If a JSON string contains multiple tokens, it is invalid.
if(lex() != "$"){abort();} // Reset the parser state.
Index = Source = null;return callback && getClass.call(callback) == functionClass?walk((value = {},value[""] = result,value),"",callback):result;};}} // Export for asynchronous module loaders.
if(isLoader){define(function(){return JSON3;});}})(this);},{}],50:[function(_dereq_,module,exports){module.exports = toArray;function toArray(list,index){var array=[];index = index || 0;for(var i=index || 0;i < list.length;i++) {array[i - index] = list[i];}return array;}},{}]},{},[1])(1);});}

cc._RFpop();
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"videoplayer":[function(require,module,exports){
"use strict";
cc._RFpush(module, '100b5UtyNJLNaih42ednEgN', 'videoplayer');
// cases\02_ui\09_videoplayer\videoplayer.js

cc.Class({
    "extends": cc.Component,

    properties: {
        videoPlayer: {
            "default": null,
            type: cc.VideoPlayer
        },
        statusLabel: {
            "default": null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},

    play: function play() {
        this.videoPlayer.play();
    },

    pause: function pause() {
        this.videoPlayer.pause();
    },

    toggleFullscreen: function toggleFullscreen() {
        this.videoPlayer.isFullscreen = true;
    },

    stop: function stop() {
        this.videoPlayer.stop();
    },

    keepRatioSwitch: function keepRatioSwitch() {
        this.videoPlayer.keepAspectRatio = !this.videoPlayer.keepAspectRatio;
    },

    onVideoPlayerEvent: function onVideoPlayerEvent(sender, event) {
        this.statusLabel.string = event;
    },

    toggleVisibility: function toggleVisibility() {
        this.videoPlayer.enabled = !this.videoPlayer.enabled;
    },

    playOnlineVideo: function playOnlineVideo() {
        this.videoPlayer.resourceType = 0;
        this.videoPlayer.url = "http://benchmark.cocos2d-x.org/cocosvideo.mp4";
        this.videoPlayer.play();
    }

});

cc._RFpop();
},{}],"zh":[function(require,module,exports){
"use strict";
cc._RFpush(module, '87f1fs0gohHDIfNg4aePXbt', 'zh');
// i18n\data\zh.js

module.exports = {
  "TestList.fire.30": "返回列表",
  "TestList.fire.37": "查看说明",
  "cases/01_graphics/01_sprite/AtlasSprite.fire.7": "这个精灵来自单张图片",
  "cases/01_graphics/01_sprite/AtlasSprite.fire.11": "这个精灵来自图集",
  "cases/01_graphics/01_sprite/FilledSprite.fire.9": "填充类型：水平",
  "cases/01_graphics/01_sprite/FilledSprite.fire.15": "填充类型：垂直",
  "cases/01_graphics/01_sprite/FilledSprite.fire.23": "填充类型：圆形",
  "cases/01_graphics/01_sprite/SimpleSprite.fire.7": "这是普通精灵",
  "cases/01_graphics/01_sprite/SlicedSprite.fire.7": "这是九宫格精灵",
  "cases/01_graphics/01_sprite/TiledSprite.fire.6": "这是平铺精灵",
  "cases/01_graphics/01_sprite/TrimmedSprite.fire.7": "自动剪裁 ",
  "cases/01_graphics/01_sprite/TrimmedSprite.fire.12": "未自动剪裁",
  "cases/01_graphics/02_particle/AutoRemoveParticle.fire.9": "粒子 1\n\"完成时自动移除\" 禁止",
  "cases/01_graphics/02_particle/AutoRemoveParticle.fire.13": "粒子 2\n\"完成时自动移除\" 开启",
  "cases/01_graphics/02_particle/ToggleParticle.fire.6": "按 \"空格键\" 开关粒子播放",
  "cases/02_ui/01_widget/AdvancedWidget.fire.7": "左上",
  "cases/02_ui/01_widget/AdvancedWidget.fire.9": "top: 10% left: 6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.14": "上",
  "cases/02_ui/01_widget/AdvancedWidget.fire.16": "top: -34px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.21": "右上",
  "cases/02_ui/01_widget/AdvancedWidget.fire.23": "top: 10% right: 6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.28": "左",
  "cases/02_ui/01_widget/AdvancedWidget.fire.30": "left: -50px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.35": "右",
  "cases/02_ui/01_widget/AdvancedWidget.fire.37": "right: -50px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.42": "左下",
  "cases/02_ui/01_widget/AdvancedWidget.fire.44": "bottom: 10% left: 6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.49": "下",
  "cases/02_ui/01_widget/AdvancedWidget.fire.51": "bottom: -34px",
  "cases/02_ui/01_widget/AdvancedWidget.fire.56": "右下",
  "cases/02_ui/01_widget/AdvancedWidget.fire.58": "bottom:10% right:6%",
  "cases/02_ui/01_widget/AdvancedWidget.fire.63": "高级挂件",
  "cases/02_ui/01_widget/AlignOnceWidget.fire.13": "对齐一次: true",
  "cases/02_ui/01_widget/AlignOnceWidget.fire.19": "对齐一次: false",
  "cases/02_ui/01_widget/AnimatedWidget.fire.9": "动画挂件。",
  "cases/02_ui/01_widget/WidgetAlign.fire.18": "挂件对齐方式。",
  "cases/02_ui/01_widget/AutoResize.fire.13": "挂件自动调整大小。",
  "cases/02_ui/02_label/GoldBeatingAnime.js.1": "0",
  "cases/02_ui/02_label/AlignFontLabel.fire.6": "文本对齐",
  "cases/02_ui/02_label/AlignFontLabel.fire.9": "水平对齐",
  "cases/02_ui/02_label/AlignFontLabel.fire.14": "哈啰！\n欢迎使用 \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.16": "对齐: 靠左",
  "cases/02_ui/02_label/AlignFontLabel.fire.21": "哈啰！\n欢迎使用 \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.23": "对齐: 居中",
  "cases/02_ui/02_label/AlignFontLabel.fire.28": "哈啰！\n欢迎使用 \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.30": "对齐: 靠右",
  "cases/02_ui/02_label/AlignFontLabel.fire.33": "垂直对齐",
  "cases/02_ui/02_label/AlignFontLabel.fire.38": "欢迎使用 \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.40": "对齐: 顶部",
  "cases/02_ui/02_label/AlignFontLabel.fire.45": "欢迎使用 \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.47": "对齐: 居中",
  "cases/02_ui/02_label/AlignFontLabel.fire.52": "欢迎使用 \nCocos Creator",
  "cases/02_ui/02_label/AlignFontLabel.fire.54": "对齐: 底部",
  "cases/02_ui/02_label/SystemFontLabel.fire.6": "系统字体",
  "cases/02_ui/02_label/SystemFontLabel.fire.9": "换行",
  "cases/02_ui/02_label/SystemFontLabel.fire.14": "这是系统默认字体",
  "cases/02_ui/02_label/SystemFontLabel.fire.16": "Overflow: CLAMP",
  "cases/02_ui/02_label/SystemFontLabel.fire.21": "这是系统默认字体",
  "cases/02_ui/02_label/SystemFontLabel.fire.23": "Overflow: SHRINK",
  "cases/02_ui/02_label/SystemFontLabel.fire.26": "不换行",
  "cases/02_ui/02_label/SystemFontLabel.fire.31": "这是系统默认字体",
  "cases/02_ui/02_label/SystemFontLabel.fire.33": "Overflow: CLAMP",
  "cases/02_ui/02_label/SystemFontLabel.fire.38": "这是系统默认字体",
  "cases/02_ui/02_label/SystemFontLabel.fire.40": "Overflow: SHRINK",
  "cases/02_ui/02_label/SystemFontLabel.fire.45": "哈喽! 欢迎使用 Cocos Creator",
  "cases/02_ui/02_label/SystemFontLabel.fire.47": "Overflow: RESZIE_HEIGHT",
  "cases/02_ui/03_button/ButtonControl1.js.1": "左边的按钮被点击！",
  "cases/02_ui/03_button/ButtonControl1.js.2": "右边的按钮被点击！",
  "cases/02_ui/03_button/ButtonInScroll.fire.21": "哪个按钮被点击？",
  "cases/02_ui/03_button/ButtonInScroll.fire.27": "拖动显示更多按钮\n\n",
  "cases/02_ui/03_button/ButtonInteractable.fire.7": "播放",
  "cases/02_ui/03_button/ButtonInteractable.fire.16": "停止",
  "cases/02_ui/03_button/ButtonInteractable.fire.21": "交互(interactable): true",
  "cases/02_ui/03_button/ButtonInteractable.fire.23": "交互(interactable): false",
  "cases/02_ui/03_button/ButtonInteractable.js.1": "交互(interactable): ",
  "cases/02_ui/03_button/ButtonInteractable.js.2": "交互(interactable): ",
  "cases/02_ui/03_button/SimpleButton.fire.6": "哪个按钮被点击？",
  "cases/02_ui/05_scrollView/Item.js.1": "Tmpl#",
  "cases/02_ui/04_progressbar/progressbar.fire.7": "水平进度条，进度 0.3",
  "cases/02_ui/04_progressbar/progressbar.fire.11": "反向水平进度条，进度 1.0",
  "cases/02_ui/04_progressbar/progressbar.fire.15": "垂直进度条 \n从下向上",
  "cases/02_ui/04_progressbar/progressbar.fire.19": "垂直进度条 \n从上向下",
  "cases/02_ui/04_progressbar/progressbar.fire.23": "设置了精灵的进度条",
  "cases/02_ui/04_progressbar/progressbar.fire.28": "设置了精灵（子控件）的进度条",
  "cases/02_ui/05_scrollView/ListView.fire.23": "Item #00",
  "cases/02_ui/05_scrollView/ScrollView.fire.7": "Scrollview 完整功能",
  "cases/02_ui/05_scrollView/ScrollView.fire.30": "Scrollview 没有惯性",
  "cases/02_ui/05_scrollView/ScrollView.fire.53": "Scrollview 没有弹性",
  "cases/02_ui/05_scrollView/ScrollView.fire.76": "Scrollview 只能水平滚动",
  "cases/02_ui/05_scrollView/ScrollView.fire.93": "Scrollview 只能垂直滚动",
  "cases/02_ui/05_scrollView/ScrollView.fire.110": "Scrollview 没有滚动条",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.6": "ScrollView 和垂直布局容器",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.40": "ScrollView 和水平布局容器",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.74": "ScrollView 和横向网格布局容器 ",
  "cases/02_ui/06_layout/LayoutInScrollView.fire.144": "ScrollView 和纵向网格布局容器 ",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.6": "水平布局容器",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.31": "垂直布局容器",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.48": "横向网格布局容器",
  "cases/02_ui/06_layout/LayoutResizeChildren.fire.85": "纵向网格布局容器",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.6": "基本",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.31": "水平",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.36": "垂直",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.41": "横向网格布局容器",
  "cases/02_ui/06_layout/LayoutResizeContainer.fire.46": "纵向网格布局容器",
  "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.8": "x:0, y:0",
  "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.12": "x:480, y:320",
  "cases/02_ui/07_change_canvas_anchor/BottomLeftAnchor.fire.16": "x:960, y:640",
  "cases/02_ui/07_editBox/editbox.js.1": "输入文本: ",
  "cases/02_ui/06_layout/LayoutNone.fire.6": "基本布局容器, 类型: none\n自动调整大小",
  "cases/02_ui/06_layout/LayoutNone.fire.35": "水平布局容器\n不自动调整大小",
  "cases/02_ui/06_layout/LayoutNone.fire.60": "垂直布局容器, 类型: none\n不自动调整大小",
  "cases/02_ui/06_layout/LayoutNone.fire.77": "横向网格布局容器 \n不自动调整大小",
  "cases/02_ui/06_layout/LayoutNone.fire.142": "纵向网格布局容器 \n不自动调整大小",
  "cases/02_ui/07_editBox/EditBox.fire.25": "单行密码框:",
  "cases/02_ui/07_editBox/EditBox.fire.27": "单行文本框:",
  "cases/02_ui/07_editBox/EditBox.fire.29": "多行文本框:",
  "cases/02_ui/07_editBox/EditBox.fire.32": "点击",
  "cases/02_ui/07_editBox/EditBox.fire.38": "按钮必须在 EditBox 的上面, \n并且它应该允许点击.",
  "cases/03_gameplay/01_player_control/KeyboardInput.fire.6": "按 'A' 或 'D' 键控制小绵羊",
  "cases/03_gameplay/01_player_control/SpriteFollowTouch.js.1": "touch (",
  "cases/03_gameplay/01_player_control/TouchInput.fire.10": "请触摸任意位置试试",
  "cases/03_gameplay/02_actions/SimpleAction.fire.13": "简单的动作",
  "cases/03_gameplay/03_animation/AnimateCustomProperty.fire.14": "Label",
  "cases/03_gameplay/03_animation/AnimateCustomProperty.fire.18": "自定义动画属性",
  "cases/03_gameplay/03_animation/AnimationEvent.js.1": "开始第",
  "cases/03_gameplay/03_animation/AnimationEvent.fire.6": "开始第1个动画",
  "cases/03_gameplay/03_animation/AnimationEvent.fire.14": "动画事件",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.11": "Linear",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.17": "Case In Expo",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.23": "Case Out Expo",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.29": "Case Out In Expo",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.35": "Back Forward",
  "cases/03_gameplay/03_animation/MoveAnimation.fire.41": "这是一个移动动画。",
  "cases/03_gameplay/03_animation/SpriteAnimation.fire.9": "这是精灵帧动画",
  "cases/04_audio/SimpleAudio.fire.6": "享受音乐!",
  "cases/05_scripting/01_properties/NodeArray.fire.14": "这是节点数组",
  "cases/05_scripting/01_properties/NonSerialized.fire.6": "Label",
  "cases/05_scripting/01_properties/NonSerialized.fire.8": "Label",
  "cases/05_scripting/01_properties/NonSerialized.fire.10": "这是非序列化",
  "cases/05_scripting/01_properties/ReferenceType.fire.8": "Label",
  "cases/05_scripting/01_properties/ReferenceType.fire.11": "这个例子不包括运行时演示",
  "cases/05_scripting/01_properties/ValueType.fire.6": "这个例子不包括运行时演示",
  "cases/05_scripting/02_prefab/InstantiatePrefab.fire.7": "实例化预制资源",
  "cases/05_scripting/03_events/EventInMask.fire.23": "更改节点排序",
  "cases/05_scripting/03_events/SimpleEvent.fire.19": "触摸事件可以支持点击",
  "cases/05_scripting/03_events/SimpleEvent.fire.21": "鼠标事件可以支持单击、悬停、滚轮",
  "cases/05_scripting/03_events/SimpleEvent.fire.23": "自定义事件可以手动触发\n(点击上面的按钮)",
  "cases/05_scripting/03_events/SimpleEvent.fire.25": "基本事件",
  "cases/05_scripting/03_events/TouchPropagation.fire.15": "触摸事件冒泡",
  "cases/05_scripting/04_scheduler/scheduleCallbacks.js.1": "5.00 s",
  "cases/05_scripting/04_scheduler/scheduler.fire.9": "5.00 s",
  "cases/05_scripting/04_scheduler/scheduler.fire.12": "重复定时器",
  "cases/05_scripting/04_scheduler/scheduler.fire.18": "取消定时器",
  "cases/05_scripting/04_scheduler/scheduler.fire.24": "定时执行1次",
  "cases/05_scripting/04_scheduler/scheduler.fire.29": "使用 update 函数每帧更新计数",
  "cases/05_scripting/04_scheduler/scheduler.fire.31": "定时器",
  "cases/05_scripting/05_cross_reference/CrossReference.fire.7": "Label",
  "cases/05_scripting/05_cross_reference/CrossReference.fire.12": "Label",
  "cases/05_scripting/05_cross_reference/CrossReference.fire.14": "交叉引用",
  "cases/05_scripting/06_life_cycle/life_cycle.fire.6": "生命周期",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.5": "资源加载",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.9": "加载 SpriteFrame",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.15": "加载 Texture",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.21": "加载 Audio",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.27": "加载 Txt",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.33": "加载 Font",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.39": "加载 Plist",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.45": "加载 Prefab",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.51": "加载 Scene",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.57": "加载 Animation",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.59": "加载 Spine",
  "cases/05_scripting/07_asset_loading/AssetLoading.fire.65": "当前尚无加载。",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.1": "已加载 ",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.2": "播放 ",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.3": "创建 ",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.4": "播放音乐。",
  "cases/05_scripting/07_asset_loading/AssetLoading.js.5": "这是字体！",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.7": "按类型",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.10": "加载 SpriteFrame",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.17": "按 Url",
  "cases/05_scripting/07_asset_loading/LoadRes.fire.20": "加载预制资源",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.6": "这个例子不包括运行时演示",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.24": "Load All",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.30": "Load SpriteFrame All",
  "cases/05_scripting/07_asset_loading/LoadResAll.fire.36": "Clear All",
  "cases/05_scripting/08_module/load_module.fire.6": "加载模块",
  "cases/05_scripting/08_module/load_module.fire.10": "创建怪物",
  "cases/05_scripting/09_singleton/Singleton.fire.6": "这例子不包含运行时演示",
  "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.1": "下载完成!!",
  "cases/05_scripting/10_loadingBar/LoadingBarCtrl.js.2": "正在下载: ",
  "cases/05_scripting/10_loadingBar/loadingBar.fire.7": "加载完成",
  "cases/05_scripting/10_loadingBar/loadingBar.fire.18": "正在下载",
  "cases/05_scripting/11_network/NetworkCtrl.js.1": "请稍等...",
  "cases/05_scripting/11_network/NetworkCtrl.js.2": "请稍等...",
  "cases/05_scripting/11_network/NetworkCtrl.js.3": "请稍等...",
  "cases/05_scripting/11_network/NetworkCtrl.js.4": "请稍等...",
  "cases/05_scripting/11_network/NetworkCtrl.js.5": "WebSocket\n发送二进制WS已打开.",
  "cases/05_scripting/11_network/NetworkCtrl.js.6": "WebSocket\n收到响应.",
  "cases/05_scripting/11_network/NetworkCtrl.js.7": "WebSocket\n发送二进制遇到错误.",
  "cases/05_scripting/11_network/NetworkCtrl.js.8": "WebSocket\nwebsocket 实例已关闭.",
  "cases/05_scripting/11_network/NetworkCtrl.js.9": "WebSocket\n发送二进制WS等待中...",
  "cases/05_scripting/11_network/NetworkCtrl.js.10": "WebSocket\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.11": "SocketIO\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.12": "SocketIO\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.13": "SocketIO\n",
  "cases/05_scripting/11_network/NetworkCtrl.js.14": "SocketIO\n",
  "cases/05_scripting/11_network/network.fire.7": "Label",
  "cases/05_scripting/11_network/network.fire.6": "XMLHttpRequest",
  "cases/05_scripting/11_network/network.fire.11": "Label",
  "cases/05_scripting/11_network/network.fire.10": "XMLHttpRequest (ArrayBuffer)",
  "cases/05_scripting/11_network/network.fire.15": "Label",
  "cases/05_scripting/11_network/network.fire.14": "WebSocket",
  "cases/05_scripting/11_network/network.fire.19": "Label",
  "cases/05_scripting/11_network/network.fire.18": "SocketIO",
  "cases/collider/Category.fire.3": "组: 碰撞",
  "cases/collider/Category.fire.5": "组: 碰撞",
  "cases/collider/Category.fire.7": "组: 碰撞",
  "cases/collider/Category.fire.9": "组: 默认",
  "cases/collider/Shape.fire.20": "显示多边形",
  "cases/collider/Shape.fire.27": "显示圆",
  "cases/collider/Shape.fire.34": "显示盒子",
  "cases/collider/Shape.fire.43": "显示多边形",
  "cases/collider/Shape.fire.50": "显示圆",
  "cases/collider/Shape.fire.57": "显示盒子",
  "cases/motionStreak/moveMotionStreak.fire.11": "改变拖尾",
  "cases/spine/SpineBoy.fire.11": "调试插槽",
  "cases/spine/SpineBoy.fire.18": "调试关节",
  "cases/spine/SpineBoy.fire.25": "时间缩放",
  "cases/spine/SpineBoy.fire.36": "停止",
  "cases/spine/SpineBoy.fire.43": "走",
  "cases/spine/SpineBoy.fire.50": "跑",
  "cases/spine/SpineBoy.fire.58": "跳",
  "cases/spine/SpineBoy.fire.65": "射击",
  "cases/tiledmap/Puzzle.fire.18": "你赢了",
  "cases/tiledmap/Puzzle.fire.21": "重新开始",
  "res/prefabs/ListItem.prefab.2": "Label ssss",
  "res/prefabs/Monster.prefab.3": "名字:",
  "res/prefabs/Monster.prefab.11": "等级 :",
  "res/prefabs/Monster.prefab.19": "血量 :",
  "res/prefabs/Monster.prefab.27": "攻击 :",
  "res/prefabs/Monster.prefab.35": "防御 :",
  "res/prefabs/loadItem.prefab.1": "Label",
  "resources/test assets/prefab.prefab.2": "这是一个预制",
  "resources/test assets/scene.fire.3": "返回资源加载场景",
  "resources/test assets/scene.fire.6": "返回",
  "scripts/Global/Menu.js.1": "说明暂缺"
};

cc._RFpop();
},{}]},{},["Menu","Shooter","PlatformMotion","videoplayer","LoadingBarCtrl","NetworkCtrl","Wall","ButtonInteractable","AnimationEvent","MoveAnimationCtrl","Foo","Bullet","ActionCallback","LayoutResizeContainerCtrl","HeroControl","Singleton","OrderSwitcher","InitData","SceneList","AlignOnceWidgetCtrl","AdaptiveSprite","FilledSpriteControl","ShowCollider","CustomEvent","Puzzle","AssetLoading","Instruction","polyglot","MyCustomComponent","MouseEvent","PopulatePrefab","ParticleControl1","ProgressBar","zh","AudioControl","MonsterPrefab","SpriteFollowTouch","SpineCtrl","en","Item","scheduleCallbacks","ReferenceTypeProperties","i18n","TouchDragger","Bar","ColliderListener","LoadModuleCtrl","TouchEvent","ListItem","SheepAnimation1","SimpleAction","NodeGroupControl","GoldBeatingAnime","DestroySelf","SimpleKeyboardMovement","NodeGenerator","Helpers","ComeBackToAssetLoad","TagColliderListener","socket-io","NonSerializedProperties","LoadRes_example","ValueTypeProperties","editbox","Monster","ListView","TiledSpriteControl","ButtonControl1","LabelLocalized","PoolHandler","motionStreakCtrl","AnimateCustomPropertyCtrl","SingletonCtrl","SimpleMotion","loadResAll_example"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL0FwcERhdGEvTG9jYWwvQ29jb3NDcmVhdG9yL2FwcC0xLjEuMC9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNhc2VzLzA1X3NjcmlwdGluZy8wM19ldmVudHMvQWN0aW9uQ2FsbGJhY2suanMiLCJzY3JpcHRzL0dsb2JhbC9BZGFwdGl2ZVNwcml0ZS5qcyIsImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BbGlnbk9uY2VXaWRnZXRDdHJsLmpzIiwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL0FuaW1hdGVDdXN0b21Qcm9wZXJ0eUN0cmwuanMiLCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vQW5pbWF0aW9uRXZlbnQuanMiLCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuanMiLCJjYXNlcy8wNF9hdWRpby9BdWRpb0NvbnRyb2wuanMiLCJjYXNlcy8wNV9zY3JpcHRpbmcvMDVfY3Jvc3NfcmVmZXJlbmNlL0Jhci5qcyIsImNhc2VzL2NvbGxpZGVyL1Nob290ZXIvQnVsbGV0LmpzIiwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkNvbnRyb2wxLmpzIiwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkludGVyYWN0YWJsZS5qcyIsImNhc2VzL2NvbGxpZGVyL0NhdGVnb3J5L0NvbGxpZGVyTGlzdGVuZXIuanMiLCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Db21lQmFja1RvQXNzZXRMb2FkLmpzIiwiY2FzZXMvMDVfc2NyaXB0aW5nLzAzX2V2ZW50cy9DdXN0b21FdmVudC5qcyIsImNhc2VzLzA1X3NjcmlwdGluZy8wNl9saWZlX2N5Y2xlL0Rlc3Ryb3lTZWxmLmpzIiwiY2FzZXMvMDFfZ3JhcGhpY3MvMDFfc3ByaXRlL0ZpbGxlZFNwcml0ZUNvbnRyb2wuanMiLCJjYXNlcy8wNV9zY3JpcHRpbmcvMDVfY3Jvc3NfcmVmZXJlbmNlL0Zvby5qcyIsImNhc2VzLzAyX3VpLzAyX2xhYmVsL0dvbGRCZWF0aW5nQW5pbWUuanMiLCJzY3JpcHRzL0dsb2JhbC9IZWxwZXJzLmpzIiwiY2FzZXMvY29sbGlkZXIvUGxhdGZvcm0vSGVyb0NvbnRyb2wuanMiLCJjYXNlcy8wNV9zY3JpcHRpbmcvMDhfbW9kdWxlL0luaXREYXRhLmpzIiwic2NyaXB0cy9HbG9iYWwvSW5zdHJ1Y3Rpb24uanMiLCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L0l0ZW0uanMiLCJpMThuL0xhYmVsTG9jYWxpemVkLmpzIiwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNvbnRhaW5lckN0cmwuanMiLCJzY3JpcHRzL0dsb2JhbC9MaXN0SXRlbS5qcyIsImNhc2VzLzAyX3VpLzA1X3Njcm9sbFZpZXcvTGlzdFZpZXcuanMiLCJjYXNlcy8wNV9zY3JpcHRpbmcvMDhfbW9kdWxlL0xvYWRNb2R1bGVDdHJsLmpzIiwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvTG9hZFJlc19leGFtcGxlLmpzIiwiY2FzZXMvMDVfc2NyaXB0aW5nLzEwX2xvYWRpbmdCYXIvTG9hZGluZ0JhckN0cmwuanMiLCJzY3JpcHRzL0dsb2JhbC9NZW51LmpzIiwiY2FzZXMvMDVfc2NyaXB0aW5nLzAyX3ByZWZhYi9Nb25zdGVyUHJlZmFiLmpzIiwiY2FzZXMvMDVfc2NyaXB0aW5nLzA4X21vZHVsZS9Nb25zdGVyLmpzIiwiY2FzZXMvMDVfc2NyaXB0aW5nLzAzX2V2ZW50cy9Nb3VzZUV2ZW50LmpzIiwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL01vdmVBbmltYXRpb25DdHJsLmpzIiwiY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvTXlDdXN0b21Db21wb25lbnQuanMiLCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcyIsImNhc2VzLzA1X3NjcmlwdGluZy8xMl9wb29sL05vZGVHZW5lcmF0b3IuanMiLCJjYXNlcy8wNV9zY3JpcHRpbmcvMDFfcHJvcGVydGllcy9Ob2RlR3JvdXBDb250cm9sLmpzIiwiY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvTm9uU2VyaWFsaXplZFByb3BlcnRpZXMuanMiLCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL09yZGVyU3dpdGNoZXIuanMiLCJjYXNlcy8wMV9ncmFwaGljcy8wMl9wYXJ0aWNsZS9QYXJ0aWNsZUNvbnRyb2wxLmpzIiwiY2FzZXMvY29sbGlkZXIvVXRpbHMvUGxhdGZvcm1Nb3Rpb24uanMiLCJjYXNlcy8wNV9zY3JpcHRpbmcvMTJfcG9vbC9Qb29sSGFuZGxlci5qcyIsImNhc2VzLzA1X3NjcmlwdGluZy8wMl9wcmVmYWIvUG9wdWxhdGVQcmVmYWIuanMiLCJjYXNlcy8wMl91aS8wNF9wcm9ncmVzc2Jhci9Qcm9ncmVzc0Jhci5qcyIsImNhc2VzL3RpbGVkbWFwL1B1enpsZS5qcyIsImNhc2VzLzA1X3NjcmlwdGluZy8wMV9wcm9wZXJ0aWVzL1JlZmVyZW5jZVR5cGVQcm9wZXJ0aWVzLmpzIiwic2NyaXB0cy9HbG9iYWwvU2NlbmVMaXN0LmpzIiwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL1NoZWVwQW5pbWF0aW9uMS5qcyIsImNhc2VzL2NvbGxpZGVyL1Nob290ZXIvU2hvb3Rlci5qcyIsImNhc2VzL2NvbGxpZGVyL1NoYXBlL1Nob3dDb2xsaWRlci5qcyIsImNhc2VzLzAzX2dhbWVwbGF5LzAyX2FjdGlvbnMvU2ltcGxlQWN0aW9uLmpzIiwiY2FzZXMvMDNfZ2FtZXBsYXkvMDFfcGxheWVyX2NvbnRyb2wvU2ltcGxlS2V5Ym9hcmRNb3ZlbWVudC5qcyIsImNhc2VzL2NvbGxpZGVyL1V0aWxzL1NpbXBsZU1vdGlvbi5qcyIsImNhc2VzLzA1X3NjcmlwdGluZy8wOV9zaW5nbGV0b24vU2luZ2xldG9uQ3RybC5qcyIsImNhc2VzLzA1X3NjcmlwdGluZy8wOV9zaW5nbGV0b24vU2luZ2xldG9uLmpzIiwiY2FzZXMvc3BpbmUvU3BpbmVDdHJsLmpzIiwiY2FzZXMvMDNfZ2FtZXBsYXkvMDFfcGxheWVyX2NvbnRyb2wvU3ByaXRlRm9sbG93VG91Y2guanMiLCJjYXNlcy9jb2xsaWRlci9UYWcvVGFnQ29sbGlkZXJMaXN0ZW5lci5qcyIsImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9UaWxlZFNwcml0ZUNvbnRyb2wuanMiLCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL1RvdWNoRHJhZ2dlci5qcyIsImNhc2VzLzA1X3NjcmlwdGluZy8wM19ldmVudHMvVG91Y2hFdmVudC5qcyIsImNhc2VzLzA1X3NjcmlwdGluZy8wMV9wcm9wZXJ0aWVzL1ZhbHVlVHlwZVByb3BlcnRpZXMuanMiLCJjYXNlcy9jb2xsaWRlci9VdGlscy9XYWxsLmpzIiwiY2FzZXMvMDJfdWkvMDhfZWRpdEJveC9lZGl0Ym94LmpzIiwiaTE4bi9kYXRhL2VuLmpzIiwiaTE4bi9pMThuLmpzIiwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvbG9hZFJlc0FsbF9leGFtcGxlLmpzIiwiY2FzZXMvbW90aW9uU3RyZWFrL21vdGlvblN0cmVha0N0cmwuanMiLCJpMThuL3BvbHlnbG90LmpzIiwiY2FzZXMvMDVfc2NyaXB0aW5nLzA0X3NjaGVkdWxlci9zY2hlZHVsZUNhbGxiYWNrcy5qcyIsImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL3NvY2tldC1pby5qcyIsImNhc2VzLzAyX3VpLzA5X3ZpZGVvcGxheWVyL3ZpZGVvcGxheWVyLmpzIiwiaTE4bi9kYXRhL3poLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ROQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN6dURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICcyODgxZTZLMWVkTEJiZ3ZjKzYvWU43bycsICdBY3Rpb25DYWxsYmFjaycpO1xuLy8gY2FzZXNcXDA1X3NjcmlwdGluZ1xcMDNfZXZlbnRzXFxBY3Rpb25DYWxsYmFjay5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHRvdWNoRXZlbnQgPSB0aGlzLmdldENvbXBvbmVudCgnVG91Y2hFdmVudCcpO1xuICAgICAgICB2YXIgbW91c2VFdmVudCA9IHRoaXMuZ2V0Q29tcG9uZW50KCdNb3VzZUV2ZW50Jyk7XG4gICAgICAgIHZhciBldmVudCA9IHRvdWNoRXZlbnQgfHwgbW91c2VFdmVudDtcbiAgICAgICAgZXZlbnQuX2NhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuNSwgMiwgMSksIGNjLnNjYWxlVG8oMC4yNSwgMSwgMSkpKTtcbiAgICAgICAgfTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzRlZGYxSlRGL0JISUtaVlkzRmFBcXNUJywgJ0FkYXB0aXZlU3ByaXRlJyk7XG4vLyBzY3JpcHRzXFxHbG9iYWxcXEFkYXB0aXZlU3ByaXRlLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIHBhZGRpbmc6IDIwLFxuXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICBiYWNrZ3JvdXA6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmJhY2tncm91cC53aWR0aCAhPT0gdGhpcy5sYWJlbC53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdXAud2lkdGggPSB0aGlzLmxhYmVsLndpZHRoICsgdGhpcy5wYWRkaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJhY2tncm91cC5oZWlnaHQgIT09IHRoaXMubGFiZWwuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmJhY2tncm91cC5oZWlnaHQgPSB0aGlzLmxhYmVsLmhlaWdodCArIHRoaXMucGFkZGluZztcbiAgICAgICAgfVxuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc0ZDFiOXVMWGQ5RFE3WlhUam5tb29ueCcsICdBbGlnbk9uY2VXaWRnZXRDdHJsJyk7XG4vLyBjYXNlc1xcMDJfdWlcXDAxX3dpZGdldFxcQWxpZ25PbmNlV2lkZ2V0Q3RybC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLldpZGdldFxuICAgICAgICB9LFxuICAgICAgICB0aXBzOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGFsaWduT25jZUJ0bjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuYWxpZ25PbmNlVGlwcyA9IFwiXCI7XG4gICAgICAgIHRoaXMuX2FuaW0gPSB0aGlzLnRhcmdldC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICB9LFxuXG4gICAgb25DbGlja0FsaWduT25jZV9UcnVlOiBmdW5jdGlvbiBvbkNsaWNrQWxpZ25PbmNlX1RydWUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5hbGlnbk9uY2VCdG5bMF0uaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWxpZ25PbmNlQnRuWzFdLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlSW5mbyh0cnVlKTtcbiAgICB9LFxuXG4gICAgb25DbGlja0FsaWduT25jZV9GYWxzZTogZnVuY3Rpb24gb25DbGlja0FsaWduT25jZV9GYWxzZShldmVudCkge1xuICAgICAgICB0aGlzLmFsaWduT25jZUJ0blswXS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmFsaWduT25jZUJ0blsxXS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVJbmZvKGZhbHNlKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlSW5mbzogZnVuY3Rpb24gdXBkYXRlSW5mbyhoYXNBbGlnbk9uY2UpIHtcbiAgICAgICAgdGhpcy50YXJnZXQuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRhcmdldC5pc0FsaWduT25jZSA9IGhhc0FsaWduT25jZTtcbiAgICAgICAgdGhpcy50YXJnZXQuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2FuaW0uc3RvcChcImFsaWduT25jZV9tb3ZlXCIpO1xuICAgICAgICB0aGlzLl9hbmltLnBsYXkoXCJhbGlnbk9uY2VfbW92ZVwiKTtcbiAgICAgICAgdGhpcy5hbGlnbk9uY2VUaXBzID0gXCJpc0FsaWduT25jZTogXCIgKyBoYXNBbGlnbk9uY2U7XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5hbGlnbk9uY2VUaXBzICE9PSBcIlwiKSB7XG4gICAgICAgICAgICB0aGlzLnRpcHMuc3RyaW5nID0gdGhpcy5hbGlnbk9uY2VUaXBzICsgXCIsIFdpZGdldCBlbmFibGVkOiBcIiArIHRoaXMudGFyZ2V0LmVuYWJsZWQ7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2ZiMTRjbW43S0pKQ280cVZjT3kvR21TJywgJ0FuaW1hdGVDdXN0b21Qcm9wZXJ0eUN0cmwnKTtcbi8vIGNhc2VzXFwwM19nYW1lcGxheVxcMDNfYW5pbWF0aW9uXFxBbmltYXRlQ3VzdG9tUHJvcGVydHlDdHJsLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBocDogMCxcbiAgICAgICAgZW1pc3Npb25Sb3RlOiAwLFxuICAgICAgICBudW06IDAsXG4gICAgICAgIGhwQmFyOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByb2dyZXNzQmFyXG4gICAgICAgIH0sXG4gICAgICAgIHBhcnRpY2xlOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlBhcnRpY2xlU3lzdGVtXG4gICAgICAgIH0sXG4gICAgICAgIHNjb3JlOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgdGhpcy5ocEJhci5wcm9ncmVzcyA9IHRoaXMuaHA7XG4gICAgICAgIHRoaXMucGFydGljbGUuZW1pc3Npb25SYXRlID0gdGhpcy5lbWlzc2lvblJvdGU7XG4gICAgICAgIHRoaXMuc2NvcmUuc3RyaW5nID0gTWF0aC5jZWlsKHRoaXMubnVtKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzFkYzA5U1I0VGRMVTc0UmpHQkFybG0wJywgJ0FuaW1hdGlvbkV2ZW50Jyk7XG4vLyBjYXNlc1xcMDNfZ2FtZXBsYXlcXDAzX2FuaW1hdGlvblxcQW5pbWF0aW9uRXZlbnQuanNcblxudmFyIGkxOG4gPSByZXF1aXJlKCdpMThuJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuZmluZCgnQ2FudmFzL0xhYmVsJyk7XG4gICAgICAgIHRoaXMuX2xhYmVsID0gbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB0aGlzLl9hbmltQ3RybCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICB9LFxuXG4gICAgb25OZXh0QW5pbWF0aW9uOiBmdW5jdGlvbiBvbk5leHRBbmltYXRpb24oc3RlcCkge1xuICAgICAgICB0aGlzLl9hbmltQ3RybC5wbGF5KFwic3RlcF9cIiArIHN0ZXApO1xuICAgICAgICB0aGlzLl9sYWJlbC5zdHJpbmcgPSBpMThuLnQoXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vQW5pbWF0aW9uRXZlbnQuanMuMVwiKSArIHN0ZXAgKyBcIuS4quWKqOeUu1wiO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNjVhYTZjektIdEtHWm9nK3lqSzFiYzYnLCAnQXNzZXRMb2FkaW5nJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwN19hc3NldF9sb2FkaW5nXFxBc3NldExvYWRpbmcuanNcblxudmFyIGkxOG4gPSByZXF1aXJlKCdpMThuJyk7XG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzaG93V2luZG93OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkQW5pbVRlc3RQcmVmYWI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZFRpcHM6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkTGlzdDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICAvLyBjdXIgbG9hZCBUYXJnZXRcbiAgICAgICAgdGhpcy5fY3VyVHlwZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuX2xhc3RUeXBlID0gXCJcIjtcbiAgICAgICAgdGhpcy5fY3VyUmVzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYnRuTGFiZWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9hdWRpb1NvdXJjZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAvLyBhZGQgbG9hZCByZXMgdXJsXG4gICAgICAgIHRoaXMuX3VybHMgPSB7XG4gICAgICAgICAgICAvLyBSYXcgQXNzZXRcbiAgICAgICAgICAgIEF1ZGlvOiBcInRlc3QgYXNzZXRzL2F1ZGlvXCIsXG4gICAgICAgICAgICBUeHQ6IFwidGVzdCBhc3NldHMvdGV4dFwiLFxuICAgICAgICAgICAgVGV4dHVyZTogXCJ0ZXN0IGFzc2V0cy9QdXJwbGVNb25zdGVyXCIsXG4gICAgICAgICAgICAvLyBSYXcgQXNzZXQsIHVzZSByYXcgdXJsXG4gICAgICAgICAgICBGb250OiBjYy51cmwucmF3KFwicmVzb3VyY2VzL3Rlc3QgYXNzZXRzL2ZvbnQuZm50XCIpLFxuICAgICAgICAgICAgUGxpc3Q6IGNjLnVybC5yYXcoXCJyZXNvdXJjZXMvdGVzdCBhc3NldHMvYXRvbS5wbGlzdFwiKSxcbiAgICAgICAgICAgIC8vIEFzc2V0XG4gICAgICAgICAgICBTcHJpdGVGcmFtZTogXCJ0ZXN0IGFzc2V0cy9pbWFnZVwiLFxuICAgICAgICAgICAgUHJlZmFiOiBcInRlc3QgYXNzZXRzL3ByZWZhYlwiLFxuICAgICAgICAgICAgQW5pbWF0aW9uOiBcInRlc3QgYXNzZXRzL3Nwcml0ZS1hbmltXCIsXG4gICAgICAgICAgICBTY2VuZTogXCJ0ZXN0IGFzc2V0cy9zY2VuZVwiLFxuICAgICAgICAgICAgU3BpbmU6IFwic3BpbmVib3kvc3BpbmVib3lcIlxuICAgICAgICB9O1xuICAgICAgICAvLyByZWdpc3RlcmVkIGV2ZW50XG4gICAgICAgIHRoaXMuX29uUmVnaXN0ZXJlZEV2ZW50KCk7XG4gICAgfSxcblxuICAgIF9vblJlZ2lzdGVyZWRFdmVudDogZnVuY3Rpb24gX29uUmVnaXN0ZXJlZEV2ZW50KCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubG9hZExpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZExpc3RbaV0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vbkNsaWNrLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9vbkNsaWNrOiBmdW5jdGlvbiBfb25DbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5faXNMb2FkaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9vbkNsZWFyKCk7XG5cbiAgICAgICAgdGhpcy5fY3VyVHlwZSA9IGV2ZW50LnRhcmdldC5uYW1lLnNwbGl0KCdfJylbMV07XG4gICAgICAgIGlmICh0aGlzLl9sYXN0VHlwZSAhPT0gXCJcIiAmJiB0aGlzLl9jdXJUeXBlID09PSB0aGlzLl9sYXN0VHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fb25TaG93UmVzQ2xpY2soZXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2J0bkxhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLl9idG5MYWJlbC5zdHJpbmcgPSBpMThuLnQoXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuanMuMVwiKSArIHRoaXMuX2xhc3RUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdFR5cGUgPSB0aGlzLl9jdXJUeXBlO1xuXG4gICAgICAgIHRoaXMuX2J0bkxhYmVsID0gZXZlbnQudGFyZ2V0LmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikuZ2V0Q29tcG9uZW50KFwiY2MuTGFiZWxcIik7XG5cbiAgICAgICAgdGhpcy5sb2FkVGlwcy5zdHJpbmcgPSB0aGlzLl9jdXJUeXBlICsgXCIgTG9hZGluZy4uLi5cIjtcbiAgICAgICAgdGhpcy5faXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9sb2FkKCk7XG4gICAgfSxcblxuICAgIF9sb2FkOiBmdW5jdGlvbiBfbG9hZCgpIHtcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuX3VybHNbdGhpcy5fY3VyVHlwZV07XG4gICAgICAgIHZhciBsb2FkQ2FsbEJhY2sgPSB0aGlzLl9sb2FkQ2FsbEJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9jdXJUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdTcHJpdGVGcmFtZSc6XG4gICAgICAgICAgICAgICAgLy8gc3BlY2lmeSB0aGUgdHlwZSB0byBsb2FkIHN1YiBhc3NldCBmcm9tIHRleHR1cmUncyB1cmxcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyh1cmwsIGNjLlNwcml0ZUZyYW1lLCBsb2FkQ2FsbEJhY2spO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnU3BpbmUnOlxuICAgICAgICAgICAgICAgIC8vIHNwZWNpZnkgdGhlIHR5cGUgdG8gYXZvaWQgdGhlIGR1cGxpY2F0ZWQgbmFtZSBmcm9tIHNwaW5lIGF0bGFzXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXModXJsLCBzcC5Ta2VsZXRvbkRhdGEsIGxvYWRDYWxsQmFjayk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdBbmltYXRpb24nOlxuICAgICAgICAgICAgY2FzZSAnUHJlZmFiJzpcbiAgICAgICAgICAgIGNhc2UgJ1NjZW5lJzpcbiAgICAgICAgICAgIGNhc2UgJ1RleHR1cmUnOlxuICAgICAgICAgICAgY2FzZSAnVHh0JzpcbiAgICAgICAgICAgIGNhc2UgJ0F1ZGlvJzpcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyh1cmwsIGxvYWRDYWxsQmFjayk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKHVybCwgbG9hZENhbGxCYWNrKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfbG9hZENhbGxCYWNrOiBmdW5jdGlvbiBfbG9hZENhbGxCYWNrKGVyciwgcmVzKSB7XG4gICAgICAgIHRoaXMuX2lzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjYy5sb2coJ0Vycm9yIHVybCBbJyArIGVyciArICddJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VyUmVzID0gcmVzO1xuICAgICAgICBpZiAodGhpcy5fY3VyVHlwZSA9PT0gXCJBdWRpb1wiKSB7XG4gICAgICAgICAgICB0aGlzLl9idG5MYWJlbC5zdHJpbmcgPSBpMThuLnQoXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuanMuMlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2J0bkxhYmVsLnN0cmluZyA9IGkxOG4udChcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5qcy4zXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2J0bkxhYmVsLnN0cmluZyArPSB0aGlzLl9jdXJUeXBlO1xuICAgICAgICB0aGlzLmxvYWRUaXBzLnN0cmluZyA9IHRoaXMuX2N1clR5cGUgKyBcIiBMb2FkZWQgU3VjY2Vzc2Z1bGx5IVwiO1xuICAgIH0sXG5cbiAgICBfb25DbGVhcjogZnVuY3Rpb24gX29uQ2xlYXIoKSB7XG4gICAgICAgIHRoaXMuc2hvd1dpbmRvdy5yZW1vdmVBbGxDaGlsZHJlbih0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuX2F1ZGlvU291cmNlICYmIHRoaXMuX2F1ZGlvU291cmNlIGluc3RhbmNlb2YgY2MuQXVkaW9Tb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2F1ZGlvU291cmNlLnN0b3AoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb25TaG93UmVzQ2xpY2s6IGZ1bmN0aW9uIF9vblNob3dSZXNDbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5fY3VyVHlwZSA9PT0gXCJTY2VuZVwiKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5ydW5TY2VuZSh0aGlzLl9jdXJSZXMuc2NlbmUpO1xuICAgICAgICAgICAgY2MubG9hZGVyLnJlbGVhc2VBc3NldCh0aGlzLl9jdXJSZXMpO1xuICAgICAgICAgICAgdGhpcy5fY3VyUmVzID0gbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NyZWF0ZU5vZGUodGhpcy5fY3VyVHlwZSwgdGhpcy5fY3VyUmVzKTtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZU5vZGU6IGZ1bmN0aW9uIF9jcmVhdGVOb2RlKHR5cGUsIHJlcykge1xuICAgICAgICB0aGlzLmxvYWRUaXBzLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHZhciBub2RlID0gbmV3IGNjLk5vZGUoXCJOZXcgXCIgKyB0eXBlKTtcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fY3VyVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIlNwcml0ZUZyYW1lXCI6XG4gICAgICAgICAgICAgICAgY29tcG9uZW50ID0gbm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuc3ByaXRlRnJhbWUgPSByZXM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiVGV4dHVyZVwiOlxuICAgICAgICAgICAgICAgIGNvbXBvbmVudCA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHJlcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiQXVkaW9cIjpcbiAgICAgICAgICAgICAgICBjb21wb25lbnQgPSBub2RlLmFkZENvbXBvbmVudChjYy5BdWRpb1NvdXJjZSk7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LmNsaXAgPSByZXM7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LnBsYXkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdWRpb1NvdXJjZSA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRUaXBzLnN0cmluZyA9IGkxOG4udChcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5qcy40XCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlR4dFwiOlxuICAgICAgICAgICAgICAgIGNvbXBvbmVudCA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQubGluZUhlaWdodCA9IDQwO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5zdHJpbmcgPSByZXM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiRm9udFwiOlxuICAgICAgICAgICAgICAgIGNvbXBvbmVudCA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuZmlsZSA9IHRoaXMuX3VybHMuRm9udDtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQubGluZUhlaWdodCA9IDQwO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5zdHJpbmcgPSBpMThuLnQoXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuanMuNVwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQbGlzdFwiOlxuICAgICAgICAgICAgICAgIGNvbXBvbmVudCA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlBhcnRpY2xlU3lzdGVtKTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuZmlsZSA9IHRoaXMuX3VybHMuUGxpc3Q7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LnJlc2V0U3lzdGVtKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiUHJlZmFiXCI6XG4gICAgICAgICAgICAgICAgdmFyIHByZWZhYiA9IGNjLmluc3RhbnRpYXRlKHJlcyk7XG4gICAgICAgICAgICAgICAgcHJlZmFiLnBhcmVudCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgcHJlZmFiLnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkFuaW1hdGlvblwiOlxuICAgICAgICAgICAgICAgIHZhciBsb2FkQW5pbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubG9hZEFuaW1UZXN0UHJlZmFiKTtcbiAgICAgICAgICAgICAgICBsb2FkQW5pbS5wYXJlbnQgPSBub2RlO1xuICAgICAgICAgICAgICAgIGxvYWRBbmltLnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICAgICAgICAgIHZhciBBYW5pbUN0cmwgPSBsb2FkQW5pbS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICBBYW5pbUN0cmwuYWRkQ2xpcChyZXMpO1xuICAgICAgICAgICAgICAgIEFhbmltQ3RybC5wbGF5KHJlcy5uYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJTcGluZVwiOlxuICAgICAgICAgICAgICAgIGNvbXBvbmVudCA9IG5vZGUuYWRkQ29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuc2tlbGV0b25EYXRhID0gcmVzO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5hbmltYXRpb24gPSBcIndhbGtcIjtcbiAgICAgICAgICAgICAgICBub2RlLnkgPSAtMjQ4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd1dpbmRvdy5hZGRDaGlsZChub2RlKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzhjOTViVDJNM2hCUElkUkRWZnRpVVFHJywgJ0F1ZGlvQ29udHJvbCcpO1xuLy8gY2FzZXNcXDA0X2F1ZGlvXFxBdWRpb0NvbnRyb2wuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG11c2ljUGxheWVyOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvU291cmNlXG4gICAgICAgIH0sXG4gICAgICAgIGRpbmdDbGlwOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG4gICAgICAgIGNoZWVyaW5nQ2xpcDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vIHBsYXkgYXVkaW9Tb3VyY2VcbiAgICAgICAgc2VsZi5tdXNpY1BsYXllci5wbGF5KCk7XG5cbiAgICAgICAgLy8gcGxheSBkaW5nIGluIDEgc2VjLCBwbGF5IGNoZWVyaW5nIGluIDIgc2VjXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChzZWxmLmRpbmdDbGlwLCBmYWxzZSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHNlbGYuY2hlZXJpbmdDbGlwLCBmYWxzZSk7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7fVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc5OTBlMmMvMVZsRTlwbXdkK0Z0c2VhdScsICdCYXInKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDA1X2Nyb3NzX3JlZmVyZW5jZVxcQmFyLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IGZ1bmN0aW9uIHByb3BlcnRpZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZWZUb0ZvbzogcmVxdWlyZSgnRm9vJylcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciB0aXAgPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgdGlwLnN0cmluZyA9IHRoaXMubmFtZSArICcgaGFzIHJlZmVyZW5jZSB0byAnICsgdGhpcy5yZWZUb0Zvby5uYW1lO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMjBkN2R6ZlZoWk5oNGdOWnp3YVFnRWwnLCAnQnVsbGV0Jyk7XG4vLyBjYXNlc1xcY29sbGlkZXJcXFNob290ZXJcXEJ1bGxldC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3BlZWQ6IDEwMFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgb25Db2xsaXNpb25FbnRlcjogZnVuY3Rpb24gb25Db2xsaXNpb25FbnRlcihvdGhlciwgc2VsZikge1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIHRoaXMubm9kZS55ICs9IHRoaXMuc3BlZWQgKiBkdDtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2U2ZGM3ZFdjeHhKdW9mWEI3ZXJnR25DJywgJ0J1dHRvbkNvbnRyb2wxJyk7XG4vLyBjYXNlc1xcMDJfdWlcXDAzX2J1dHRvblxcQnV0dG9uQ29udHJvbDEuanNcblxudmFyIGkxOG4gPSByZXF1aXJlKCdpMThuJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYnV0dG9uTGVmdDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uXG4gICAgICAgIH0sXG4gICAgICAgIGJ1dHRvblJpZ2h0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5CdXR0b25cbiAgICAgICAgfSxcbiAgICAgICAgZGlzcGxheToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgLy8gWW91IGNhbiBhbHNvIHJlZ2lzdGVyIGV2ZW50IGxpc3RlbmVyIHVzaW5nIHRoZSBtZXRob2QgYmVsb3dcbiAgICAgICAgLy8gdGhpcy5idXR0b25MZWZ0LmdldENvbXBvbmVudChjYy5CdXR0b24pLm9uKGNjLkVCdXR0b24uRVZFTlRfVE9VQ0hfVVAsIHRoaXMub25CdG5MZWZ0Q2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMuYnV0dG9uUmlnaHQuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikub24oY2MuRUJ1dHRvbi5FVkVOVF9UT1VDSF9VUCwgdGhpcy5vbkJ0blJpZ2h0Q2xpY2tlZCwgdGhpcyk7XG4gICAgfSxcblxuICAgIG9uQnRuTGVmdENsaWNrZWQ6IGZ1bmN0aW9uIG9uQnRuTGVmdENsaWNrZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdMZWZ0IGJ1dHRvbiBjbGlja2VkIScpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuc3RyaW5nID0gaTE4bi50KFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkNvbnRyb2wxLmpzLjFcIik7XG4gICAgfSxcblxuICAgIG9uQnRuUmlnaHRDbGlja2VkOiBmdW5jdGlvbiBvbkJ0blJpZ2h0Q2xpY2tlZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1JpZ2h0IGJ1dHRvbiBjbGlja2VkIScpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuc3RyaW5nID0gaTE4bi50KFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkNvbnRyb2wxLmpzLjJcIik7XG4gICAgfSxcblxuICAgIG9uQnRuSW5TY3JvbGxDbGlja2VkOiBmdW5jdGlvbiBvbkJ0bkluU2Nyb2xsQ2xpY2tlZChldmVudCkge1xuICAgICAgICB2YXIgbXNnID0gZXZlbnQudGFyZ2V0Lm5hbWUgKyAnIGNsaWNrZWQhJztcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LnN0cmluZyA9IG1zZztcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzE4ZTYwVDJOWnBFd1pBdW5TKzJyRk1LJywgJ0J1dHRvbkludGVyYWN0YWJsZScpO1xuLy8gY2FzZXNcXDAyX3VpXFwwM19idXR0b25cXEJ1dHRvbkludGVyYWN0YWJsZS5qc1xuXG52YXIgaTE4biA9IHJlcXVpcmUoJ2kxOG4nKTtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBidXR0b25MZWZ0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5CdXR0b25cbiAgICAgICAgfSxcbiAgICAgICAgYnV0dG9uUmlnaHQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvblxuICAgICAgICB9LFxuICAgICAgICBsYWJlbExlZnQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsUmlnaHQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25CdG5MZWZ0Q2xpY2tlZDogZnVuY3Rpb24gb25CdG5MZWZ0Q2xpY2tlZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0xlZnQgYnV0dG9uIGNsaWNrZWQhJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uTGVmdC5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5idXR0b25SaWdodC5pbnRlcmFjdGFibGUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudXBkYXRlSW5mbygpO1xuICAgIH0sXG5cbiAgICBvbkJ0blJpZ2h0Q2xpY2tlZDogZnVuY3Rpb24gb25CdG5SaWdodENsaWNrZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSaWdodCBidXR0b24gY2xpY2tlZCEnKTtcbiAgICAgICAgdGhpcy5idXR0b25SaWdodC5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5idXR0b25MZWZ0LmludGVyYWN0YWJsZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy51cGRhdGVJbmZvKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUluZm86IGZ1bmN0aW9uIHVwZGF0ZUluZm8oKSB7XG4gICAgICAgIHRoaXMubGFiZWxMZWZ0LnN0cmluZyA9IGkxOG4udChcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JbnRlcmFjdGFibGUuanMuMVwiKSArIHRoaXMuYnV0dG9uTGVmdC5pbnRlcmFjdGFibGU7XG4gICAgICAgIHRoaXMubGFiZWxSaWdodC5zdHJpbmcgPSBpMThuLnQoXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW50ZXJhY3RhYmxlLmpzLjJcIikgKyB0aGlzLmJ1dHRvblJpZ2h0LmludGVyYWN0YWJsZTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzlkNjBmWHh0WEZOZUk3OVBNNkVYWXVaJywgJ0NvbGxpZGVyTGlzdGVuZXInKTtcbi8vIGNhc2VzXFxjb2xsaWRlclxcQ2F0ZWdvcnlcXENvbGxpZGVyTGlzdGVuZXIuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7XG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRHJhd0JvdW5kaW5nQm94ID0gdHJ1ZTtcblxuICAgICAgICBjYy5kaXJlY3Rvci5zZXREaXNwbGF5U3RhdHModHJ1ZSk7XG4gICAgICAgIHRoaXMudG91Y2hpbmdOdW1iZXIgPSAwO1xuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvbkVudGVyOiBmdW5jdGlvbiBvbkNvbGxpc2lvbkVudGVyKG90aGVyKSB7XG4gICAgICAgIHRoaXMubm9kZS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcbiAgICAgICAgdGhpcy50b3VjaGluZ051bWJlcisrO1xuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uU3RheShvdGhlcikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnb24gY29sbGlzaW9uIHN0YXknKTtcbiAgICB9LFxuXG4gICAgb25Db2xsaXNpb25FeGl0OiBmdW5jdGlvbiBvbkNvbGxpc2lvbkV4aXQoKSB7XG4gICAgICAgIHRoaXMudG91Y2hpbmdOdW1iZXItLTtcbiAgICAgICAgaWYgKHRoaXMudG91Y2hpbmdOdW1iZXIgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnY2I1ODVrK2N4Rktqb2hsb1ROMStGdVUnLCAnQ29tZUJhY2tUb0Fzc2V0TG9hZCcpO1xuLy8gY2FzZXNcXDA1X3NjcmlwdGluZ1xcMDdfYXNzZXRfbG9hZGluZ1xcQ29tZUJhY2tUb0Fzc2V0TG9hZC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBvbkNvbWVCbGFjazogZnVuY3Rpb24gb25Db21lQmxhY2soKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIkFzc2V0TG9hZGluZy5maXJlXCIpO1xuICAgIH1cblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzVjYzIzYW9ZY3hJS2F6UkZ3S1dHRUk3JywgJ0N1c3RvbUV2ZW50Jyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwM19ldmVudHNcXEN1c3RvbUV2ZW50LmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgdG91Y2hFdmVudCA9IHRoaXMuZ2V0Q29tcG9uZW50KCdUb3VjaEV2ZW50Jyk7XG5cbiAgICAgICAgLy8gRW1pdCBDVVNUT01fRVZFTlQgdG8gaXRzIGxpc3RlbmVycyB3aGlsZSB0b3VjaCBlbmRcbiAgICAgICAgdG91Y2hFdmVudC5fY2FsbGJhY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ0NVU1RPTV9FVkVOVCcpO1xuICAgICAgICB9KS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHZhciBhZGRCdXR0b24gPSBjYy5maW5kKCdDYW52YXMvYWRkJyk7XG4gICAgICAgIHZhciBjYW5jZWxCdXR0b24gPSBjYy5maW5kKCdDYW52YXMvY2FuY2VsJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gb25DdXN0b21FdmVudChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDIsIDEpLCBjYy5zY2FsZVRvKDAuMjUsIDEsIDEpKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5vZGUub24oJ0NVU1RPTV9FVkVOVCcsIG9uQ3VzdG9tRXZlbnQsIGFkZEJ1dHRvbik7XG4gICAgICAgIHRoaXMubm9kZS5vbignQ1VTVE9NX0VWRU5UJywgb25DdXN0b21FdmVudCwgY2FuY2VsQnV0dG9uKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2MwNzMwMm0vb0ZKZUlxMmlnUENKYldFJywgJ0Rlc3Ryb3lTZWxmJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwNl9saWZlX2N5Y2xlXFxEZXN0cm95U2VsZi5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUG9zOiBcIiArIHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLnggKyBcIiwgXCIgKyB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS55KTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMiwgMjAwLCAwKSwgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQb3M6IFwiICsgdGhpcy5ub2RlLnggKyBcIiwgXCIgKyB0aGlzLm5vZGUueSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9LCB0aGlzKSkpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNTBhOTVPYkxxRkgycno2ZVNodkd1TksnLCAnRmlsbGVkU3ByaXRlQ29udHJvbCcpO1xuLy8gY2FzZXNcXDAxX2dyYXBoaWNzXFwwMV9zcHJpdGVcXEZpbGxlZFNwcml0ZUNvbnRyb2wuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgc3BlZWQ6IDAuMSxcblxuICAgICAgICBob3Jpem9udGFsOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuXG4gICAgICAgIHZlcnRpY2FsOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuXG4gICAgICAgIHJhZGlhbF9yb3VuZDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfSxcblxuICAgICAgICByYWRpYWxfc2VtaWNpcmNsZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICAvLyB1cGRhdGUgZmlsbCBzdGFydFxuICAgICAgICB0aGlzLl91cGRhdGFGaWxsU3RhcnQodGhpcy5ob3Jpem9udGFsLCBkdCk7XG4gICAgICAgIHRoaXMuX3VwZGF0YUZpbGxTdGFydCh0aGlzLnZlcnRpY2FsLCBkdCk7XG4gICAgICAgIC8vIHVwZGF0ZSBmaWxsIHJhbmdlXG4gICAgICAgIHRoaXMuX3VwZGF0ZUZpbGxSYW5nZSh0aGlzLnJhZGlhbF9yb3VuZCwgMSwgZHQpO1xuICAgICAgICB0aGlzLl91cGRhdGVGaWxsUmFuZ2UodGhpcy5yYWRpYWxfc2VtaWNpcmNsZSwgMC41LCBkdCk7XG4gICAgfSxcblxuICAgIF91cGRhdGFGaWxsU3RhcnQ6IGZ1bmN0aW9uIF91cGRhdGFGaWxsU3RhcnQoc3ByaXRlLCBkdCkge1xuICAgICAgICB2YXIgZmlsbFN0YXJ0ID0gc3ByaXRlLmZpbGxTdGFydDtcbiAgICAgICAgZmlsbFN0YXJ0ID0gZmlsbFN0YXJ0ID4gMCA/IGZpbGxTdGFydCAtPSBkdCAqIHRoaXMuc3BlZWQgOiAxO1xuICAgICAgICBzcHJpdGUuZmlsbFN0YXJ0ID0gZmlsbFN0YXJ0O1xuICAgIH0sXG5cbiAgICBfdXBkYXRlRmlsbFJhbmdlOiBmdW5jdGlvbiBfdXBkYXRlRmlsbFJhbmdlKHNwcml0ZSwgcmFuZ2UsIGR0KSB7XG4gICAgICAgIHZhciBmaWxsUmFuZ2UgPSBzcHJpdGUuZmlsbFJhbmdlO1xuICAgICAgICBmaWxsUmFuZ2UgPSBmaWxsUmFuZ2UgPCByYW5nZSA/IGZpbGxSYW5nZSArPSBkdCAqIHRoaXMuc3BlZWQgOiAwO1xuICAgICAgICBzcHJpdGUuZmlsbFJhbmdlID0gZmlsbFJhbmdlO1xuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICcxZWEzNm5ZaWtWT3VwNkJ6YUVJTVlQSCcsICdGb28nKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDA1X2Nyb3NzX3JlZmVyZW5jZVxcRm9vLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IGZ1bmN0aW9uIHByb3BlcnRpZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZWZUb0JhcjogcmVxdWlyZSgnQmFyJylcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciB0aXAgPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgdGlwLnN0cmluZyA9IHRoaXMubmFtZSArICcgaGFzIHJlZmVyZW5jZSB0byAnICsgdGhpcy5yZWZUb0Jhci5uYW1lO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYmZmNDlHbjlMVkYwWVpCMFEvTU9ndVAnLCAnR29sZEJlYXRpbmdBbmltZScpO1xuLy8gY2FzZXNcXDAyX3VpXFwwMl9sYWJlbFxcR29sZEJlYXRpbmdBbmltZS5qc1xuXG52YXIgaTE4biA9IHJlcXVpcmUoJ2kxOG4nKTtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNwZWVkOiA1MCxcbiAgICAgICAgZ29sZF9sYWJlbDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmN1ckdvbGQgPSAwO1xuICAgICAgICB0aGlzLmN1ckluZGV4ID0gMDtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgdGhpcy5jdXJJbmRleCArPSBkdCAqIHRoaXMuc3BlZWQ7XG4gICAgICAgIGlmICh0aGlzLmN1ckluZGV4ID4gMTApIHtcbiAgICAgICAgICAgIHRoaXMuY3VySW5kZXggPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJHb2xkKys7XG4gICAgICAgICAgICB0aGlzLmdvbGRfbGFiZWwuc3RyaW5nICs9IHRoaXMuY3VyR29sZDtcbiAgICAgICAgICAgIGlmICh0aGlzLmdvbGRfbGFiZWwuc3RyaW5nLmxlbmd0aCA+IDEwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nb2xkX2xhYmVsLnN0cmluZyA9IGkxOG4udChcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0dvbGRCZWF0aW5nQW5pbWUuanMuMVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1ckdvbGQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdjODY0ME0zb3pSRXJyVi9HbzN1VGtudCcsICdIZWxwZXJzJyk7XG4vLyBzY3JpcHRzXFxHbG9iYWxcXEhlbHBlcnMuanNcblxuLy8gUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdWRlZCkgYW5kIG1heCAoZXhjbHVkZWQpXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldFJhbmRvbUludDogZ2V0UmFuZG9tSW50XG59O1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMzM5ZDJkZzFRcEVLS3hCSkJ6SGlESjAnLCAnSGVyb0NvbnRyb2wnKTtcbi8vIGNhc2VzXFxjb2xsaWRlclxcUGxhdGZvcm1cXEhlcm9Db250cm9sLmpzXG5cblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNwZWVkOiBjYy52MigwLCAwKSxcbiAgICAgICAgbWF4U3BlZWQ6IGNjLnYyKDIwMDAsIDIwMDApLFxuICAgICAgICBncmF2aXR5OiAtMTAwMCxcbiAgICAgICAgZHJhZzogMTAwMCxcbiAgICAgICAgZGlyZWN0aW9uOiAwLFxuICAgICAgICBqdW1wU3BlZWQ6IDMwMFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7XG5cbiAgICAgICAgLy9hZGQga2V5Ym9hcmQgaW5wdXQgbGlzdGVuZXIgdG8gY2FsbCB0dXJuTGVmdCBhbmQgdHVyblJpZ2h0XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5LRVlCT0FSRCxcbiAgICAgICAgICAgIG9uS2V5UHJlc3NlZDogdGhpcy5vbktleVByZXNzZWQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIG9uS2V5UmVsZWFzZWQ6IHRoaXMub25LZXlSZWxlYXNlZC5iaW5kKHRoaXMpXG4gICAgICAgIH0sIHRoaXMubm9kZSk7XG5cbiAgICAgICAgdGhpcy5jb2xsaXNpb25YID0gMDtcbiAgICAgICAgdGhpcy5jb2xsaXNpb25ZID0gMDtcblxuICAgICAgICB0aGlzLnByZVBvc2l0aW9uID0gY2MudjIoKTtcbiAgICAgICAgdGhpcy5wcmVTdGVwID0gY2MudjIoKTtcblxuICAgICAgICB0aGlzLnRvdWNoaW5nTnVtYmVyID0gMDtcbiAgICB9LFxuXG4gICAgb25EaXNhYmxlZDogZnVuY3Rpb24gb25EaXNhYmxlZCgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREZWJ1Z0RyYXcgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgb25LZXlQcmVzc2VkOiBmdW5jdGlvbiBvbktleVByZXNzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIGNjLktFWS5hOlxuICAgICAgICAgICAgY2FzZSBjYy5LRVkubGVmdDpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IC0xO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5LRVkuZDpcbiAgICAgICAgICAgIGNhc2UgY2MuS0VZLnJpZ2h0OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2MuS0VZLnc6XG4gICAgICAgICAgICBjYXNlIGNjLktFWS51cDpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuanVtcGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmp1bXBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkLnkgPSB0aGlzLmp1bXBTcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25LZXlSZWxlYXNlZDogZnVuY3Rpb24gb25LZXlSZWxlYXNlZChrZXlDb2RlLCBldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgY2MuS0VZLmE6XG4gICAgICAgICAgICBjYXNlIGNjLktFWS5sZWZ0OlxuICAgICAgICAgICAgY2FzZSBjYy5LRVkuZDpcbiAgICAgICAgICAgIGNhc2UgY2MuS0VZLnJpZ2h0OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvbkVudGVyOiBmdW5jdGlvbiBvbkNvbGxpc2lvbkVudGVyKG90aGVyLCBzZWxmKSB7XG4gICAgICAgIHRoaXMubm9kZS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcblxuICAgICAgICB0aGlzLnRvdWNoaW5nTnVtYmVyKys7XG5cbiAgICAgICAgdmFyIG90aGVyQWFiYiA9IG90aGVyLndvcmxkLmFhYmI7XG4gICAgICAgIHZhciBzZWxmQWFiYiA9IHNlbGYud29ybGQuYWFiYi5jbG9uZSgpO1xuICAgICAgICB2YXIgcHJlQWFiYiA9IHNlbGYud29ybGQucHJlQWFiYjtcblxuICAgICAgICBzZWxmQWFiYi54ID0gcHJlQWFiYi54O1xuICAgICAgICBzZWxmQWFiYi55ID0gcHJlQWFiYi55O1xuXG4gICAgICAgIHNlbGZBYWJiLnggPSBzZWxmLndvcmxkLmFhYmIueDtcbiAgICAgICAgaWYgKGNjLkludGVyc2VjdGlvbi5yZWN0UmVjdChzZWxmQWFiYiwgb3RoZXJBYWJiKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWQueCA8IDAgJiYgc2VsZkFhYmIueE1heCA+IG90aGVyQWFiYi54TWF4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggPSBvdGhlckFhYmIueE1heDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxpc2lvblggPSAtMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zcGVlZC54ID4gMCAmJiBzZWxmQWFiYi54TWluIDwgb3RoZXJBYWJiLnhNaW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCA9IG90aGVyQWFiYi54TWluIC0gc2VsZkFhYmIud2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25YID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zcGVlZC54ID0gMDtcbiAgICAgICAgICAgIG90aGVyLnRvdWNoaW5nWCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmQWFiYi55ID0gc2VsZi53b3JsZC5hYWJiLnk7XG4gICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucmVjdFJlY3Qoc2VsZkFhYmIsIG90aGVyQWFiYikpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkLnkgPCAwICYmIHNlbGZBYWJiLnlNYXggPiBvdGhlckFhYmIueU1heCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ID0gb3RoZXJBYWJiLnlNYXg7XG4gICAgICAgICAgICAgICAgdGhpcy5qdW1waW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25ZID0gLTE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3BlZWQueSA+IDAgJiYgc2VsZkFhYmIueU1pbiA8IG90aGVyQWFiYi55TWluKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSBvdGhlckFhYmIueU1pbiAtIHNlbGZBYWJiLmhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxpc2lvblkgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNwZWVkLnkgPSAwO1xuICAgICAgICAgICAgb3RoZXIudG91Y2hpbmdZID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvblN0YXk6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uU3RheShvdGhlciwgc2VsZikge1xuICAgICAgICBpZiAodGhpcy5jb2xsaXNpb25ZID09PSAtMSkge1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IGNjLnYyKG90aGVyLndvcmxkLmFhYmIueCAtIG90aGVyLndvcmxkLnByZUFhYmIueCwgMCk7XG5cbiAgICAgICAgICAgIHZhciB0ZW1wID0gY2MuYWZmaW5lVHJhbnNmb3JtQ2xvbmUoc2VsZi53b3JsZC50cmFuc2Zvcm0pO1xuICAgICAgICAgICAgdGVtcC50eCA9IHRlbXAudHkgPSAwO1xuXG4gICAgICAgICAgICBvZmZzZXQgPSBjYy5wb2ludEFwcGx5QWZmaW5lVHJhbnNmb3JtKG9mZnNldCwgdGVtcCk7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCArPSBvZmZzZXQueDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkNvbGxpc2lvbkV4aXQ6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRXhpdChvdGhlcikge1xuICAgICAgICB0aGlzLnRvdWNoaW5nTnVtYmVyLS07XG4gICAgICAgIGlmICh0aGlzLnRvdWNoaW5nTnVtYmVyID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSBjYy5Db2xvci5XSElURTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvdGhlci50b3VjaGluZ1gpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uWCA9IDA7XG4gICAgICAgICAgICBvdGhlci50b3VjaGluZ1ggPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChvdGhlci50b3VjaGluZ1kpIHtcbiAgICAgICAgICAgIG90aGVyLnRvdWNoaW5nWSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jb2xsaXNpb25ZID0gMDtcbiAgICAgICAgICAgIHRoaXMuanVtcGluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGlzaW9uWSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZC55ICs9IHRoaXMuZ3Jhdml0eSAqIGR0O1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuc3BlZWQueSkgPiB0aGlzLm1heFNwZWVkLnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkLnkgPSB0aGlzLnNwZWVkLnkgPiAwID8gdGhpcy5tYXhTcGVlZC55IDogLXRoaXMubWF4U3BlZWQueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWQueCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkLnggLT0gdGhpcy5kcmFnICogZHQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BlZWQueCA8PSAwKSB0aGlzLnNwZWVkLnggPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNwZWVkLnggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZC54ICs9IHRoaXMuZHJhZyAqIGR0O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkLnggPj0gMCkgdGhpcy5zcGVlZC54ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQueCArPSAodGhpcy5kaXJlY3Rpb24gPiAwID8gMSA6IC0xKSAqIHRoaXMuZHJhZyAqIGR0O1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuc3BlZWQueCkgPiB0aGlzLm1heFNwZWVkLngpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkLnggPSB0aGlzLnNwZWVkLnggPiAwID8gdGhpcy5tYXhTcGVlZC54IDogLXRoaXMubWF4U3BlZWQueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNwZWVkLnggKiB0aGlzLmNvbGxpc2lvblggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkLnggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmVQb3NpdGlvbi54ID0gdGhpcy5ub2RlLng7XG4gICAgICAgIHRoaXMucHJlUG9zaXRpb24ueSA9IHRoaXMubm9kZS55O1xuXG4gICAgICAgIHRoaXMucHJlU3RlcC54ID0gdGhpcy5zcGVlZC54ICogZHQ7XG4gICAgICAgIHRoaXMucHJlU3RlcC55ID0gdGhpcy5zcGVlZC55ICogZHQ7XG5cbiAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy5zcGVlZC54ICogZHQ7XG4gICAgICAgIHRoaXMubm9kZS55ICs9IHRoaXMuc3BlZWQueSAqIGR0O1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnM2FlNGNVc0djQklFNHE3S3NwNFpYL0gnLCAnSW5pdERhdGEnKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDA4X21vZHVsZVxcSW5pdERhdGEuanNcblxuXG52YXIgX21vbnN0ZXJJbmZvID0ge1xuICAgIG5hbWU6IFwiU2xpbWVcIixcbiAgICBocDogMTAwLFxuICAgIGx2OiAxLFxuICAgIGF0azogMTAsXG4gICAgZGVmZW5zZTogNSxcbiAgICBpbWFnZVVybDogXCJ0ZXN0IGFzc2V0cy9QdXJwbGVNb25zdGVyXCJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vbnN0ZXJJbmZvOiBfbW9uc3RlckluZm9cbn07XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc2YTg3MWd5NzNGRExhcDNFamUvMmg2aScsICdJbnN0cnVjdGlvbicpO1xuLy8gc2NyaXB0c1xcR2xvYmFsXFxJbnN0cnVjdGlvbi5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogJycsXG4gICAgICAgICAgICBtdWx0aWxpbmU6IHRydWVcbiAgICAgICAgfVxuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZVxuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzkyMGM4YTVNYWhBaGJDVFN2bVF2YUIrJywgJ0l0ZW0nKTtcbi8vIGNhc2VzXFwwMl91aVxcMDVfc2Nyb2xsVmlld1xcSXRlbS5qc1xuXG52YXIgaTE4biA9IHJlcXVpcmUoJ2kxOG4nKTtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgaXRlbUlEOiAwXG4gICAgfSxcblxuICAgIHVwZGF0ZUl0ZW06IGZ1bmN0aW9uIHVwZGF0ZUl0ZW0odG1wbElkLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5pdGVtSUQgPSBpdGVtSWQ7XG4gICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gaTE4bi50KFwiY2FzZXMvMDJfdWkvMDVfc2Nyb2xsVmlldy9JdGVtLmpzLjFcIikgKyB0bXBsSWQgKyAnIEl0ZW0jJyArIHRoaXMuaXRlbUlEO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZTRmODhhZHAzaEVSb0o0OERaMlBTQWwnLCAnTGFiZWxMb2NhbGl6ZWQnKTtcbi8vIGkxOG5cXExhYmVsTG9jYWxpemVkLmpzXG5cbnZhciBpMThuID0gcmVxdWlyZSgnaTE4bicpO1xuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuTGFiZWwsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRleHRLZXk6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogJ1RFWFRfS0VZJyxcbiAgICAgICAgICAgIG11bHRpbGluZTogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXA6ICdFbnRlciBpMThuIGtleSBoZXJlJyxcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gbm90aWZ5KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZ05vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2dOb2RlLnNldFN0cmluZyh0aGlzLnN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU5vZGVTaXplKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzdHJpbmc6IHtcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcDogJ0hlcmUgc2hvd3MgdGhlIGxvY2FsaXplZCBzdHJpbmcgb2YgVGV4dCBLZXknLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkxOG4udCh0aGlzLnRleHRLZXkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0S2V5ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgY2Mud2FybignUGxlYXNlIHNldCBsYWJlbCB0ZXh0IGtleSBpbiBUZXh0IEtleSBwcm9wZXJ0eS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMmJiZWR0VjNibENWSmJtZjJFOWgvMFYnLCAnTGF5b3V0UmVzaXplQ29udGFpbmVyQ3RybCcpO1xuLy8gY2FzZXNcXDAyX3VpXFwwNl9sYXlvdXRcXExheW91dFJlc2l6ZUNvbnRhaW5lckN0cmwuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGl0ZW1UZW1wOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICBsYXlvdXRIb3Jpem9udGFsTnVtOiA1LFxuICAgICAgICBsYXlvdXRIb3Jpem9udGFsOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgbGF5b3V0VmVydGljYWxOdW06IDMsXG4gICAgICAgIGxheW91dFZlcnRpY2FsOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgZ3JpZExheW91dEF4aXNIb3Jpem9udGFsTnVtOiAxMCxcbiAgICAgICAgZ3JpZExheW91dEF4aXNIb3Jpem9udGFsOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgZ3JpZExheW91dEF4aXNWZXJ0aWNhbE51bTogMTIsXG4gICAgICAgIGdyaWRMYXlvdXRBeGlzVmVydGljYWw6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLl9jdXJUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fY3VySW5kZXggPSAwO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlSXRlbTogZnVuY3Rpb24gX2NyZWF0ZUl0ZW0ocGFyZW50Tm9kZSwgaWR4KSB7XG4gICAgICAgIHZhciBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtVGVtcCk7XG4gICAgICAgIHZhciBsYWJlbCA9IGl0ZW0uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCk7XG4gICAgICAgIGxhYmVsLnN0cmluZyA9IGlkeDtcbiAgICAgICAgaXRlbS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLl9jdXJUaW1lICs9IGR0O1xuICAgICAgICBpZiAodGhpcy5fY3VyVGltZSA+PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJUaW1lID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJJbmRleCA8IHRoaXMubGF5b3V0SG9yaXpvbnRhbE51bSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUl0ZW0odGhpcy5sYXlvdXRIb3Jpem9udGFsLCB0aGlzLl9jdXJJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fY3VySW5kZXggPCB0aGlzLmxheW91dFZlcnRpY2FsTnVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlSXRlbSh0aGlzLmxheW91dFZlcnRpY2FsLCB0aGlzLl9jdXJJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fY3VySW5kZXggPCB0aGlzLmdyaWRMYXlvdXRBeGlzSG9yaXpvbnRhbE51bSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUl0ZW0odGhpcy5ncmlkTGF5b3V0QXhpc0hvcml6b250YWwsIHRoaXMuX2N1ckluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJJbmRleCA8IHRoaXMuZ3JpZExheW91dEF4aXNWZXJ0aWNhbE51bSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUl0ZW0odGhpcy5ncmlkTGF5b3V0QXhpc1ZlcnRpY2FsLCB0aGlzLl9jdXJJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jdXJJbmRleCsrO1xuICAgICAgICB9XG4gICAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2FhNjNiV05FOGhCZjRQNFNwMFgydVQwJywgJ0xpc3RJdGVtJyk7XG4vLyBzY3JpcHRzXFxHbG9iYWxcXExpc3RJdGVtLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIHVybDogJydcbiAgICB9LFxuXG4gICAgbG9hZEV4YW1wbGU6IGZ1bmN0aW9uIGxvYWRFeGFtcGxlKCkge1xuICAgICAgICBpZiAodGhpcy51cmwpIHtcbiAgICAgICAgICAgIGNjLmZpbmQoJ01lbnUnKS5nZXRDb21wb25lbnQoJ01lbnUnKS5sb2FkU2NlbmUodGhpcy51cmwpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdlNjQ1OCtoZjVWQW5JWG9jbXZoZ2dxQycsICdMaXN0VmlldycpO1xuLy8gY2FzZXNcXDAyX3VpXFwwNV9zY3JvbGxWaWV3XFxMaXN0Vmlldy5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGl0ZW1UZW1wbGF0ZTogeyAvLyBpdGVtIHRlbXBsYXRlIHRvIGluc3RhbnRpYXRlIG90aGVyIGl0ZW1zXG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIHNjcm9sbFZpZXc6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNjcm9sbFZpZXdcbiAgICAgICAgfSxcbiAgICAgICAgc3Bhd25Db3VudDogMCwgLy8gaG93IG1hbnkgaXRlbXMgd2UgYWN0dWFsbHkgc3Bhd25cbiAgICAgICAgdG90YWxDb3VudDogMCwgLy8gaG93IG1hbnkgaXRlbXMgd2UgbmVlZCBmb3IgdGhlIHdob2xlIGxpc3RcbiAgICAgICAgc3BhY2luZzogMCwgLy8gc3BhY2UgYmV0d2VlbiBlYWNoIGl0ZW1cbiAgICAgICAgYnVmZmVyWm9uZTogMCwgLy8gd2hlbiBpdGVtIGlzIGF3YXkgZnJvbSBidWZmZXJab25lLCB3ZSByZWxvY2F0ZSBpdFxuICAgICAgICBsYWJlbDogY2MuTGFiZWxcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50O1xuICAgICAgICB0aGlzLml0ZW1zID0gW107IC8vIGFycmF5IHRvIHN0b3JlIHNwYXduZWQgaXRlbXNcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVGltZXIgPSAwO1xuICAgICAgICB0aGlzLnVwZGF0ZUludGVydmFsID0gMC4yO1xuICAgICAgICB0aGlzLmxhc3RDb250ZW50UG9zWSA9IDA7IC8vIHVzZSB0aGlzIHZhcmlhYmxlIHRvIGRldGVjdCBpZiB3ZSBhcmUgc2Nyb2xsaW5nIHVwIG9yIGRvd25cbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmhlaWdodCA9IHRoaXMudG90YWxDb3VudCAqICh0aGlzLml0ZW1UZW1wbGF0ZS5oZWlnaHQgKyB0aGlzLnNwYWNpbmcpICsgdGhpcy5zcGFjaW5nOyAvLyBnZXQgdG90YWwgY29udGVudCBoZWlnaHRcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNwYXduQ291bnQ7ICsraSkge1xuICAgICAgICAgICAgLy8gc3Bhd24gaXRlbXMsIHdlIG9ubHkgbmVlZCB0byBkbyB0aGlzIG9uY2VcbiAgICAgICAgICAgIHZhciBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtVGVtcGxhdGUpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFkZENoaWxkKGl0ZW0pO1xuICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbigwLCAtaXRlbS5oZWlnaHQgKiAoMC41ICsgaSkgLSB0aGlzLnNwYWNpbmcgKiAoaSArIDEpKTtcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KCdJdGVtJykudXBkYXRlSXRlbShpLCBpKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRQb3NpdGlvbkluVmlldzogZnVuY3Rpb24gZ2V0UG9zaXRpb25JblZpZXcoaXRlbSkge1xuICAgICAgICAvLyBnZXQgaXRlbSBwb3NpdGlvbiBpbiBzY3JvbGx2aWV3J3Mgbm9kZSBzcGFjZVxuICAgICAgICB2YXIgd29ybGRQb3MgPSBpdGVtLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoaXRlbS5wb3NpdGlvbik7XG4gICAgICAgIHZhciB2aWV3UG9zID0gdGhpcy5zY3JvbGxWaWV3Lm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xuICAgICAgICByZXR1cm4gdmlld1BvcztcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lciArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlVGltZXIgPCB0aGlzLnVwZGF0ZUludGVydmFsKSByZXR1cm47IC8vIHdlIGRvbid0IG5lZWQgdG8gZG8gdGhlIG1hdGggZXZlcnkgZnJhbWVcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lciA9IDA7XG4gICAgICAgIHZhciBpdGVtcyA9IHRoaXMuaXRlbXM7XG4gICAgICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlclpvbmU7XG4gICAgICAgIHZhciBpc0Rvd24gPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC55IDwgdGhpcy5sYXN0Q29udGVudFBvc1k7IC8vIHNjcm9sbGluZyBkaXJlY3Rpb25cbiAgICAgICAgdmFyIG9mZnNldCA9ICh0aGlzLml0ZW1UZW1wbGF0ZS5oZWlnaHQgKyB0aGlzLnNwYWNpbmcpICogaXRlbXMubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgdmlld1BvcyA9IHRoaXMuZ2V0UG9zaXRpb25JblZpZXcoaXRlbXNbaV0pO1xuICAgICAgICAgICAgaWYgKGlzRG93bikge1xuICAgICAgICAgICAgICAgIC8vIGlmIGF3YXkgZnJvbSBidWZmZXIgem9uZSBhbmQgbm90IHJlYWNoaW5nIHRvcCBvZiBjb250ZW50XG4gICAgICAgICAgICAgICAgaWYgKHZpZXdQb3MueSA8IC1idWZmZXIgJiYgaXRlbXNbaV0ueSArIG9mZnNldCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0uc2V0UG9zaXRpb25ZKGl0ZW1zW2ldLnkgKyBvZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldLmdldENvbXBvbmVudCgnSXRlbScpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbUlkID0gaXRlbS5pdGVtSUQgLSBpdGVtcy5sZW5ndGg7IC8vIHVwZGF0ZSBpdGVtIGlkXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udXBkYXRlSXRlbShpLCBpdGVtSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgYXdheSBmcm9tIGJ1ZmZlciB6b25lIGFuZCBub3QgcmVhY2hpbmcgYm90dG9tIG9mIGNvbnRlbnRcbiAgICAgICAgICAgICAgICBpZiAodmlld1Bvcy55ID4gYnVmZmVyICYmIGl0ZW1zW2ldLnkgLSBvZmZzZXQgPiAtdGhpcy5jb250ZW50LmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS5zZXRQb3NpdGlvblkoaXRlbXNbaV0ueSAtIG9mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gaXRlbXNbaV0uZ2V0Q29tcG9uZW50KCdJdGVtJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpdGVtSUQ6ICcgKyBpdGVtLml0ZW1JRCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtSWQgPSBpdGVtLml0ZW1JRCArIGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS51cGRhdGVJdGVtKGksIGl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHVwZGF0ZSBsYXN0Q29udGVudFBvc1lcbiAgICAgICAgdGhpcy5sYXN0Q29udGVudFBvc1kgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC55O1xuICAgIH0sXG5cbiAgICBzY3JvbGxFdmVudDogZnVuY3Rpb24gc2Nyb2xsRXZlbnQoc2VuZGVyLCBldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIlNjcm9sbCB0byBUb3BcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2Nyb2xsIHRvIEJvdHRvbVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTY3JvbGwgdG8gTGVmdFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJTY3JvbGwgdG8gUmlnaHRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiU2Nyb2xsaW5nXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIkJvdW5jZSBUb3BcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiQm91bmNlIGJvdHRvbVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJCb3VuY2UgbGVmdFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gXCJCb3VuY2UgcmlnaHRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiQXV0byBzY3JvbGwgZW5kZWRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnOWU3MDJHdWJIcEsrNHZBYjN5dTJPVzUnLCAnTG9hZE1vZHVsZUN0cmwnKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDA4X21vZHVsZVxcTG9hZE1vZHVsZUN0cmwuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG1vbnN0ZXJUZW1wOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICBidG5fY3JlYXRlTW9uc3Rlcjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuYnRuX2NyZWF0ZU1vbnN0ZXIub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLmNyZWF0ZU1vc3Rlci5iaW5kKHRoaXMpKTtcbiAgICB9LFxuXG4gICAgY3JlYXRlTW9zdGVyOiBmdW5jdGlvbiBjcmVhdGVNb3N0ZXIoKSB7XG4gICAgICAgIHZhciBtb25zdGVyID0gY2MuaW5zdGFudGlhdGUodGhpcy5tb25zdGVyVGVtcCk7XG4gICAgICAgIHZhciBNb25zdGVyID0gcmVxdWlyZShcIk1vbnN0ZXJcIik7XG4gICAgICAgIHZhciBtb25zdGVyQ29tcCA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xuICAgICAgICB2YXIgSW5pdERhdGEgPSByZXF1aXJlKFwiSW5pdERhdGFcIik7XG4gICAgICAgIG1vbnN0ZXJDb21wLmluaXRJbmZvKEluaXREYXRhLm1vbnN0ZXJJbmZvKTtcbiAgICAgICAgbW9uc3Rlci5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIG1vbnN0ZXIuc2V0UG9zaXRpb24oY2MucCgwLCAwKSk7XG4gICAgICAgIHRoaXMuYnRuX2NyZWF0ZU1vbnN0ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZDdjMTlERzhNNURwN3ZIclF1NWE4Z0snLCAnTG9hZFJlc19leGFtcGxlJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwN19hc3NldF9sb2FkaW5nXFxMb2FkUmVzX2V4YW1wbGUuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGxvYWRTcHJpdGVGcmFtZTogZnVuY3Rpb24gbG9hZFNwcml0ZUZyYW1lKCkge1xuICAgICAgICB0aGlzLl9jbGVhclJlc291cmNlKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJ0ZXN0IGFzc2V0cy9hdGxhc1wiLCBjYy5TcHJpdGVBdGxhcywgZnVuY3Rpb24gKGVyciwgYXRsYXMpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgICAgICAgIHNlbGYuY29udGVudC5hZGRDaGlsZChub2RlKTtcbiAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjYy52MigwLCAwKTtcbiAgICAgICAgICAgIHZhciBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoJ3NoZWVwX3J1bl8wJyk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBsb2FkUHJlZmFiOiBmdW5jdGlvbiBsb2FkUHJlZmFiKCkge1xuICAgICAgICB0aGlzLl9jbGVhclJlc291cmNlKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoXCJ0ZXN0IGFzc2V0cy9wcmVmYWJcIiwgZnVuY3Rpb24gKGVyciwgcHJlZmFiKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICAgICAgICBzZWxmLmNvbnRlbnQuYWRkQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY2MudjIoMCwgMCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfY2xlYXJSZXNvdXJjZTogZnVuY3Rpb24gX2NsZWFyUmVzb3VyY2UoKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbih0cnVlKTtcbiAgICAgICAgY2MubG9hZGVyLnJlbGVhc2VBbGwoKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzEwMmE5d1U0MFJKZDRTblFxUVF6UVQ5JywgJ0xvYWRpbmdCYXJDdHJsJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwxMF9sb2FkaW5nQmFyXFxMb2FkaW5nQmFyQ3RybC5qc1xuXG52YXIgaTE4biA9IHJlcXVpcmUoJ2kxOG4nKTtcblxuLy9cbi8vIFRpcHPvvJpcbi8vIOaJvuWIsOeahOS4i+i9veWbvueJh+e9keWdgOi/h+mVv++8jOWPr+S7peW/veeVpeOAglxuLy8g5pys5pWZ56iL5Li76KaB6L+Y5piv5L2T546w5aaC5L2V5L2/55SoTG9hZGVy55qE6L+b5bqm5p2h44CCXG4vL1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcHJvZ3Jlc3NCYXI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJvZ3Jlc3NCYXJcbiAgICAgICAgfSxcblxuICAgICAgICBwcm9ncmVzc1RpcHM6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcblxuICAgICAgICBsYW9kQmc6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLl91cmxzID0gW1xuICAgICAgICAvLyBSYXcgQXNzZXQsIG5lZWQgZXh0ZW5zaW9uXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImRpbmcud2F2XCIsXG4gICAgICAgICAgICB1cmw6IGNjLnVybC5yYXcoXCJyZXNvdXJjZXMvYXVkaW8vZGluZy53YXZcIilcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IFwiY2hlZXJpbmcud2F2XCIsXG4gICAgICAgICAgICB1cmw6IGNjLnVybC5yYXcoXCJyZXNvdXJjZXMvYXVkaW8vY2hlZXJpbmcud2F2XCIpXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiBcIm11c2ljX2xvZ28ubXAzXCIsXG4gICAgICAgICAgICB1cmw6IGNjLnVybC5yYXcoXCJyZXNvdXJjZXMvYXVkaW8vbXVzaWNfbG9nby5tcDNcIilcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IFwiYXVkaW8ubXAzXCIsXG4gICAgICAgICAgICB1cmw6IGNjLnVybC5yYXcoXCJyZXNvdXJjZXMvdGVzdCBhc3NldHMvYXVkaW8ubXAzXCIpXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiBcImZvbnQucG5nXCIsXG4gICAgICAgICAgICB1cmw6IGNjLnVybC5yYXcoXCJyZXNvdXJjZXMvdGVzdCBhc3NldHMvZm9udC5wbmdcIilcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IFwibWlrYWRvX291dGxpbmVfc2hhZG93LnBuZ1wiLFxuICAgICAgICAgICAgdXJsOiBjYy51cmwucmF3KFwicmVzb3VyY2VzL2ZvbnQvbWlrYWRvX291dGxpbmVfc2hhZG93LnBuZ1wiKVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogXCJlbmxpZ3NoLWNoaW5lc2UucG5nXCIsXG4gICAgICAgICAgICB1cmw6IGNjLnVybC5yYXcoXCJyZXNvdXJjZXMvZm9udC9lbmxpZ3NoLWNoaW5lc2UucG5nXCIpXG4gICAgICAgIH1dO1xuXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAwO1xuICAgICAgICBjYy5sb2FkZXIucmVsZWFzZUFsbCgpO1xuICAgICAgICBjYy5sb2FkZXIubG9hZCh0aGlzLl91cmxzLCB0aGlzLl9wcm9ncmVzc0NhbGxiYWNrLmJpbmQodGhpcyksIHRoaXMuX2NvbXBsZXRlQ2FsbGJhY2suYmluZCh0aGlzKSk7XG4gICAgfSxcblxuICAgIF9wcm9ncmVzc0NhbGxiYWNrOiBmdW5jdGlvbiBfcHJvZ3Jlc3NDYWxsYmFjayhjb21wbGV0ZWRDb3VudCwgdG90YWxDb3VudCwgcmVzKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQ7XG4gICAgICAgIHRoaXMucmVzb3VyY2UgPSByZXM7XG4gICAgICAgIHRoaXMuY29tcGxldGVkQ291bnQgPSBjb21wbGV0ZWRDb3VudDtcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gdG90YWxDb3VudDtcbiAgICB9LFxuXG4gICAgX2NvbXBsZXRlQ2FsbGJhY2s6IGZ1bmN0aW9uIF9jb21wbGV0ZUNhbGxiYWNrKGVycm9yLCByZXMpIHt9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAoIXRoaXMucmVzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSB0aGlzLnByb2dyZXNzQmFyLnByb2dyZXNzO1xuICAgICAgICBpZiAocHJvZ3Jlc3MgPj0gMSkge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc1RpcHMuc3RyaW5nID0gaTE4bi50KFwiY2FzZXMvMDVfc2NyaXB0aW5nLzEwX2xvYWRpbmdCYXIvTG9hZGluZ0JhckN0cmwuanMuMVwiKTtcbiAgICAgICAgICAgIHRoaXMubGFvZEJnLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2dyZXNzIDwgdGhpcy5wcm9ncmVzcykge1xuICAgICAgICAgICAgcHJvZ3Jlc3MgKz0gZHQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICAgICAgICB0aGlzLnByb2dyZXNzVGlwcy5zdHJpbmcgPSBpMThuLnQoXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTBfbG9hZGluZ0Jhci9Mb2FkaW5nQmFyQ3RybC5qcy4yXCIpICsgdGhpcy5yZXNvdXJjZS5pZCArIFwiIChcIiArIHRoaXMuY29tcGxldGVkQ291bnQgKyBcIi9cIiArIHRoaXMudG90YWxDb3VudCArIFwiKVwiO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMDQ1MjVweVlCbE4yNlNXYXdhVUYzZEEnLCAnTWVudScpO1xuLy8gc2NyaXB0c1xcR2xvYmFsXFxNZW51LmpzXG5cbnZhciBpMThuID0gcmVxdWlyZSgnaTE4bicpO1xuXG52YXIgZW1wdHlGdW5jID0gZnVuY3Rpb24gZW1wdHlGdW5jKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG59O1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIHJlYWRtZToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBtYXNrOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGJ0bkluZm86IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvblxuICAgICAgICB9LFxuICAgICAgICBidG5CYWNrOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5CdXR0b25cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUodGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmVVcmwgPSAnVGVzdExpc3QuZmlyZSc7XG4gICAgICAgIHRoaXMuY29udGVudFBvcyA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNNZW51ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2FkSW5zdHJ1Y3Rpb24odGhpcy5jdXJyZW50U2NlbmVVcmwpO1xuICAgIH0sXG5cbiAgICBiYWNrVG9MaXN0OiBmdW5jdGlvbiBiYWNrVG9MaXN0KCkge1xuICAgICAgICB0aGlzLnNob3dSZWFkbWUobnVsbCwgZmFsc2UpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZVVybCA9ICdUZXN0TGlzdC5maXJlJztcbiAgICAgICAgdGhpcy5pc01lbnUgPSB0cnVlO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ1Rlc3RMaXN0JywgdGhpcy5vbkxvYWRTY2VuZUZpbmlzaC5iaW5kKHRoaXMpKTtcbiAgICB9LFxuXG4gICAgbG9hZFNjZW5lOiBmdW5jdGlvbiBsb2FkU2NlbmUodXJsKSB7XG4gICAgICAgIHRoaXMuY29udGVudFBvcyA9IGNjLmZpbmQoJ0NhbnZhcy90ZXN0TGlzdCcpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5nZXRDb250ZW50UG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmVVcmwgPSB1cmw7XG4gICAgICAgIHRoaXMuaXNNZW51ID0gZmFsc2U7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSh1cmwsIHRoaXMub25Mb2FkU2NlbmVGaW5pc2guYmluZCh0aGlzKSk7XG4gICAgfSxcblxuICAgIG9uTG9hZFNjZW5lRmluaXNoOiBmdW5jdGlvbiBvbkxvYWRTY2VuZUZpbmlzaCgpIHtcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuY3VycmVudFNjZW5lVXJsO1xuICAgICAgICB0aGlzLmxvYWRJbnN0cnVjdGlvbih1cmwpO1xuICAgICAgICBpZiAodGhpcy5pc01lbnUgJiYgdGhpcy5jb250ZW50UG9zKSB7XG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvdGVzdExpc3QnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2V0Q29udGVudFBvc2l0aW9uKHRoaXMuY29udGVudFBvcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbG9hZEluc3RydWN0aW9uOiBmdW5jdGlvbiBsb2FkSW5zdHJ1Y3Rpb24odXJsKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHVybEFyciA9IHVybC5zcGxpdCgnLycpO1xuICAgICAgICB2YXIgZmlsZU5hbWUgPSB1cmxBcnJbdXJsQXJyLmxlbmd0aCAtIDFdLnJlcGxhY2UoJy5maXJlJywgJycpO1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcygncmVhZG1lLycgKyBmaWxlTmFtZSwgZnVuY3Rpb24gKGVyciwgdHh0KSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0LnN0cmluZyA9IGkxOG4udChcInNjcmlwdHMvR2xvYmFsL01lbnUuanMuMVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLnRleHQuc3RyaW5nID0gdHh0O1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2hvd1JlYWRtZTogZnVuY3Rpb24gc2hvd1JlYWRtZShldmVudCwgYWN0aXZlKSB7XG4gICAgICAgIGlmIChhY3RpdmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yZWFkbWUuYWN0aXZlID0gIXRoaXMucmVhZG1lLmFjdGl2ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVhZG1lLmFjdGl2ZSA9IGFjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yZWFkbWUuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2sub24oJ3RvdWNoc3RhcnQnLCBlbXB0eUZ1bmMsIHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYXNrLm9mZigndG91Y2hzdGFydCcsIGVtcHR5RnVuYywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxhYmVsVHh0ID0gdGhpcy5yZWFkbWUuYWN0aXZlID8gJ+WFs+mXreivtOaYjicgOiAn5p+l55yL6K+05piOJztcbiAgICAgICAgY2MuZmluZCgnbGFiZWwnLCB0aGlzLmJ0bkluZm8ubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBsYWJlbFR4dDtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzhjYjRkbTJRRXBKN3BuYVMvY2pydmdGJywgJ01vbnN0ZXJQcmVmYWInKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDAyX3ByZWZhYlxcTW9uc3RlclByZWZhYi5qc1xuXG52YXIgSGVscGVycyA9IHJlcXVpcmUoJ0hlbHBlcnMnKTtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzcHJpdGVMaXN0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IFtdLFxuICAgICAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgcmFuZG9tSWR4ID0gSGVscGVycy5nZXRSYW5kb21JbnQoMCwgdGhpcy5zcHJpdGVMaXN0Lmxlbmd0aCk7XG4gICAgICAgIHZhciBzcHJpdGUgPSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUxpc3RbcmFuZG9tSWR4XTtcbiAgICB9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZTMxYjArUG9EUkpYSURIRnh5NjB2RXMnLCAnTW9uc3RlcicpO1xuLy8gY2FzZXNcXDA1X3NjcmlwdGluZ1xcMDhfbW9kdWxlXFxNb25zdGVyLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBuaWNrbmFtZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBsdjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBocDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBhdGs6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgZGVmZW5zZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBpbWFnZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpbml0SW5mbzogZnVuY3Rpb24gaW5pdEluZm8oaW5mbykge1xuICAgICAgICB0aGlzLm5pY2tuYW1lLnN0cmluZyA9IGluZm8ubmFtZTtcbiAgICAgICAgdGhpcy5sdi5zdHJpbmcgPSBpbmZvLmx2O1xuICAgICAgICB0aGlzLmhwLnN0cmluZyA9IGluZm8uaHA7XG4gICAgICAgIHRoaXMuYXRrLnN0cmluZyA9IGluZm8uYXRrO1xuICAgICAgICB0aGlzLmRlZmVuc2Uuc3RyaW5nID0gaW5mby5kZWZlbnNlO1xuXG4gICAgICAgIHZhciBpbWFnZSA9IHRoaXMuaW1hZ2U7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKGluZm8uaW1hZ2VVcmwsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyb3IsIHNwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jYy5sb2FkZXIubG9hZCgsIGZ1bmN0aW9uIChlcnJvciwgcmVzKSB7XG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIC8vfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc2ZGYwZnQxank1Smc0Y1EwMzlqdDhqQycsICdNb3VzZUV2ZW50Jyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwM19ldmVudHNcXE1vdXNlRXZlbnQuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICBtb3ZlOiBmdW5jdGlvbiBtb3ZlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubm9kZS54ICs9IGV2ZW50LmdldERlbHRhWCgpO1xuICAgICAgICB0aGlzLm5vZGUueSArPSBldmVudC5nZXREZWx0YVkoKTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsID0gMDtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSA1MDtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0RPV04sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX01PVkUsIHRoaXMubW92ZSwgdGhpcyk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMTYwO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDUwO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX1VQLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDUwO1xuICAgICAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9NT1ZFLCB0aGlzLm1vdmUsIHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9XSEVFTCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbCArPSBldmVudC5nZXRTY3JvbGxZKCk7XG4gICAgICAgICAgICB2YXIgaCA9IHRoaXMubm9kZS5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbCA9IGNjLmNsYW1wZih0aGlzLnNjcm9sbCwgLTIgKiBoLCAwLjcgKiBoKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDEgLSB0aGlzLnNjcm9sbCAvIGg7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMWRjOTVkcTNtVkk2NThicjBsMlpiaTAnLCAnTW92ZUFuaW1hdGlvbkN0cmwnKTtcbi8vIGNhc2VzXFwwM19nYW1lcGxheVxcMDNfYW5pbWF0aW9uXFxNb3ZlQW5pbWF0aW9uQ3RybC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkFuaW1hdGlvblxuICAgICAgICB9LFxuXG4gICAgICAgIG5vZGVzOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogW10sXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMub25SZWdpc3RlcmVkRXZlbnQoKTtcbiAgICB9LFxuXG4gICAgb25SZWdpc3RlcmVkRXZlbnQ6IGZ1bmN0aW9uIG9uUmVnaXN0ZXJlZEV2ZW50KCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubm9kZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZXNbaV0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uUGxheUFuaW1hdGlvbi5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvblBsYXlBbmltYXRpb246IGZ1bmN0aW9uIG9uUGxheUFuaW1hdGlvbihldmVudCkge1xuICAgICAgICB0aGlzLnRhcmdldC5zdG9wKCk7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudGFyZ2V0Ll9uYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiTGluZWFyXCI6XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQucGxheShcImxpbmVhclwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJDYXNlSW5fRXhwb1wiOlxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnBsYXkoXCJjYXNlSW4tZXhwb1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJDYXNlT3V0X0V4cG9cIjpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5wbGF5KFwiY2FzZU91dC1leHBvXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkNhc2VJbk91dF9FeHBvXCI6XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQucGxheShcImNhc2VJbk91dC1leHBvXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkJhY2tfRm9yd2FyZFwiOlxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnBsYXkoXCJiYWNrLWZvcndhcmRcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNmI4YmFFcEx1eEFDSU1ObElMMnZ3MlcnLCAnTXlDdXN0b21Db21wb25lbnQnKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDAxX3Byb3BlcnRpZXNcXE15Q3VzdG9tQ29tcG9uZW50LmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwb3dlcjogMTBcbiAgICB9LFxuXG4gICAgZ2V0UG93ZXI6IGZ1bmN0aW9uIGdldFBvd2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3dlcjtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzEwOTA4aDFhSFJQUG93eFFRelVDVk1EJywgJ05ldHdvcmtDdHJsJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwxMV9uZXR3b3JrXFxOZXR3b3JrQ3RybC5qc1xuXG52YXIgaTE4biA9IHJlcXVpcmUoJ2kxOG4nKTtcblxuaWYgKCF3aW5kb3cuaW8pIHtcbiAgICB3aW5kb3cuaW8gPSByZXF1aXJlKCdzb2NrZXQtaW8nKTtcbn1cblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB4aHI6IGNjLkxhYmVsLFxuICAgICAgICB4aHJBQjogY2MuTGFiZWwsXG4gICAgICAgIHdlYnNvY2tldDogY2MuTGFiZWwsXG4gICAgICAgIHNvY2tldElPOiBjYy5MYWJlbCxcblxuICAgICAgICB4aHJSZXNwOiBjYy5MYWJlbCxcbiAgICAgICAgeGhyQUJSZXNwOiBjYy5MYWJlbCxcbiAgICAgICAgd2Vic29ja2V0UmVzcDogY2MuTGFiZWwsXG4gICAgICAgIHNvY2tldElPUmVzcDogY2MuTGFiZWxcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuX3dzaVNlbmRCaW5hcnkgPSBudWxsO1xuXG4gICAgICAgIHRoaXMueGhyUmVzcC5zdHJpbmcgPSBpMThuLnQoXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4xXCIpO1xuICAgICAgICB0aGlzLnhockFCUmVzcC5zdHJpbmcgPSBpMThuLnQoXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4yXCIpO1xuICAgICAgICB0aGlzLndlYnNvY2tldFJlc3Auc3RyaW5nID0gaTE4bi50KFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuM1wiKTtcbiAgICAgICAgdGhpcy5zb2NrZXRJT1Jlc3Auc3RyaW5nID0gaTE4bi50KFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuNFwiKTtcblxuICAgICAgICB0aGlzLnNlbmRYSFIoKTtcbiAgICAgICAgdGhpcy5zZW5kWEhSQUIoKTtcbiAgICAgICAgdGhpcy5wcmVwYXJlV2ViU29ja2V0KCk7XG4gICAgICAgIHRoaXMuc2VuZFNvY2tldElPKCk7XG4gICAgfSxcblxuICAgIHNlbmRYSFI6IGZ1bmN0aW9uIHNlbmRYSFIoKSB7XG4gICAgICAgIHZhciB4aHIgPSBjYy5sb2FkZXIuZ2V0WE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgdGhpcy5zdHJlYW1YSFJFdmVudHNUb0xhYmVsKHhociwgdGhpcy54aHIsIHRoaXMueGhyUmVzcCwgJ0dFVCcpO1xuXG4gICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIFwiaHR0cHM6Ly9odHRwYmluLm9yZy9nZXQ/c2hvd19lbnY9MVwiLCB0cnVlKTtcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHQtRW5jb2RpbmdcIiwgXCJnemlwLGRlZmxhdGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3RlOiBJbiBJbnRlcm5ldCBFeHBsb3JlciwgdGhlIHRpbWVvdXQgcHJvcGVydHkgbWF5IGJlIHNldCBvbmx5IGFmdGVyIGNhbGxpbmcgdGhlIG9wZW4oKVxuICAgICAgICAvLyBtZXRob2QgYW5kIGJlZm9yZSBjYWxsaW5nIHRoZSBzZW5kKCkgbWV0aG9kLlxuICAgICAgICB4aHIudGltZW91dCA9IDUwMDA7IC8vIDUgc2Vjb25kcyBmb3IgdGltZW91dFxuXG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgfSxcblxuICAgIHNlbmRYSFJBQjogZnVuY3Rpb24gc2VuZFhIUkFCKCkge1xuICAgICAgICB2YXIgeGhyID0gY2MubG9hZGVyLmdldFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHRoaXMuc3RyZWFtWEhSRXZlbnRzVG9MYWJlbCh4aHIsIHRoaXMueGhyQUIsIHRoaXMueGhyQUJSZXNwLCBcIlBPU1RcIik7XG5cbiAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIFwiaHR0cHM6Ly9odHRwYmluLm9yZy9wb3N0XCIpO1xuICAgICAgICAvL3NldCBDb250ZW50LXR5cGUgXCJ0ZXh0L3BsYWluXCIgdG8gcG9zdCBBcnJheUJ1ZmZlciBvciBBcnJheUJ1ZmZlclZpZXdcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3BsYWluXCIpO1xuICAgICAgICAvLyBVaW50OEFycmF5IGlzIGFuIEFycmF5QnVmZmVyVmlld1xuICAgICAgICB4aHIuc2VuZChuZXcgVWludDhBcnJheShbMSwgMiwgMywgNCwgNV0pKTtcbiAgICB9LFxuXG4gICAgcHJlcGFyZVdlYlNvY2tldDogZnVuY3Rpb24gcHJlcGFyZVdlYlNvY2tldCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgd2Vic29ja2V0TGFiZWwgPSB0aGlzLndlYnNvY2tldDtcbiAgICAgICAgdmFyIHJlc3BMYWJlbCA9IHRoaXMud2Vic29ja2V0UmVzcDtcbiAgICAgICAgdGhpcy5fd3NpU2VuZEJpbmFyeSA9IG5ldyBXZWJTb2NrZXQoXCJ3czovL2VjaG8ud2Vic29ja2V0Lm9yZ1wiKTtcbiAgICAgICAgdGhpcy5fd3NpU2VuZEJpbmFyeS5iaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xuICAgICAgICB0aGlzLl93c2lTZW5kQmluYXJ5Lm9ub3BlbiA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgIHdlYnNvY2tldExhYmVsLnN0cmluZyA9IGkxOG4udChcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjVcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fd3NpU2VuZEJpbmFyeS5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICB2YXIgYmluYXJ5ID0gbmV3IFVpbnQxNkFycmF5KGV2dC5kYXRhKTtcbiAgICAgICAgICAgIHZhciBiaW5hcnlTdHIgPSAncmVzcG9uc2UgYmluIG1zZzogJztcblxuICAgICAgICAgICAgdmFyIHN0ciA9ICcnO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiaW5hcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYmluYXJ5W2ldID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBcIlxcJ1xcXFwwXFwnXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhleENoYXIgPSAnMHgnICsgYmluYXJ5W2ldLnRvU3RyaW5nKCcxNicpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGhleENoYXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYmluYXJ5U3RyICs9IHN0cjtcbiAgICAgICAgICAgIHJlc3BMYWJlbC5zdHJpbmcgPSBiaW5hcnlTdHI7XG4gICAgICAgICAgICB3ZWJzb2NrZXRMYWJlbC5zdHJpbmcgPSBpMThuLnQoXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy42XCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX3dzaVNlbmRCaW5hcnkub25lcnJvciA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgIHdlYnNvY2tldExhYmVsLnN0cmluZyA9IGkxOG4udChcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjdcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fd3NpU2VuZEJpbmFyeS5vbmNsb3NlID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgd2Vic29ja2V0TGFiZWwuc3RyaW5nID0gaTE4bi50KFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuOFwiKTtcbiAgICAgICAgICAgIC8vIEFmdGVyIGNsb3NlLCBpdCdzIG5vIGxvbmdlciBwb3NzaWJsZSB0byB1c2UgaXQgYWdhaW4sXG4gICAgICAgICAgICAvLyBpZiB5b3Ugd2FudCB0byBzZW5kIGFub3RoZXIgcmVxdWVzdCwgeW91IG5lZWQgdG8gY3JlYXRlIGEgbmV3IHdlYnNvY2tldCBpbnN0YW5jZVxuICAgICAgICAgICAgc2VsZi5fd3NpU2VuZEJpbmFyeSA9IG51bGw7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5zZW5kV2ViU29ja2V0QmluYXJ5LCAxKTtcbiAgICB9LFxuXG4gICAgc2VuZFdlYlNvY2tldEJpbmFyeTogZnVuY3Rpb24gc2VuZFdlYlNvY2tldEJpbmFyeShzZW5kZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dzaVNlbmRCaW5hcnkucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgICAgICAgIHRoaXMud2Vic29ja2V0LnN0cmluZyA9IGkxOG4udChcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjlcIik7XG4gICAgICAgICAgICB2YXIgYnVmID0gXCJIZWxsbyBXZWJTb2NrZXTkuK3mlocsXFwwIEknbVxcMCBhXFwwIGJpbmFyeVxcMCBtZXNzYWdlXFwwLlwiO1xuXG4gICAgICAgICAgICB2YXIgYXJyRGF0YSA9IG5ldyBVaW50MTZBcnJheShidWYubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYXJyRGF0YVtpXSA9IGJ1Zi5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl93c2lTZW5kQmluYXJ5LnNlbmQoYXJyRGF0YS5idWZmZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHdhcm5pbmdTdHIgPSBcInNlbmQgYmluYXJ5IHdlYnNvY2tldCBpbnN0YW5jZSB3YXNuJ3QgcmVhZHkuLi5cIjtcbiAgICAgICAgICAgIHRoaXMud2Vic29ja2V0LnN0cmluZyA9IGkxOG4udChcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjEwXCIpICsgd2FybmluZ1N0cjtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRXZWJTb2NrZXRCaW5hcnkoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIFNvY2tldCBJTyBjYWxsYmFja3MgZm9yIHRlc3RpbmdcbiAgICB0ZXN0ZXZlbnQ6IGZ1bmN0aW9uIHRlc3RldmVudChkYXRhKSB7XG4gICAgICAgIHZhciBtc2cgPSB0aGlzLnRhZyArIFwiIHNheXMgJ3Rlc3RldmVudCcgd2l0aCBkYXRhOiBcIiArIGRhdGE7XG4gICAgICAgIHRoaXMuc29ja2V0SU8uc3RyaW5nID0gaTE4bi50KFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuMTFcIikgKyBtc2c7XG4gICAgfSxcblxuICAgIG1lc3NhZ2U6IGZ1bmN0aW9uIG1lc3NhZ2UoZGF0YSkge1xuICAgICAgICB2YXIgbXNnID0gdGhpcy50YWcgKyBcIiByZWNlaXZlZCBtZXNzYWdlOiBcIiArIGRhdGE7XG4gICAgICAgIHRoaXMuc29ja2V0SU9SZXNwLnN0cmluZyA9IG1zZztcbiAgICB9LFxuXG4gICAgZGlzY29ubmVjdGlvbjogZnVuY3Rpb24gZGlzY29ubmVjdGlvbigpIHtcbiAgICAgICAgdmFyIG1zZyA9IHRoaXMudGFnICsgXCIgZGlzY29ubmVjdGVkIVwiO1xuICAgICAgICB0aGlzLnNvY2tldElPLnN0cmluZyA9IGkxOG4udChcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjEyXCIpICsgbXNnO1xuICAgIH0sXG5cbiAgICBzZW5kU29ja2V0SU86IGZ1bmN0aW9uIHNlbmRTb2NrZXRJTygpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvL2NyZWF0ZSBhIGNsaWVudCBieSB1c2luZyB0aGlzIHN0YXRpYyBtZXRob2QsIHVybCBkb2VzIG5vdCBuZWVkIHRvIGNvbnRhaW4gdGhlIHByb3RvY29sXG4gICAgICAgIHZhciBzaW9jbGllbnQgPSBpby5jb25uZWN0KFwid3M6Ly90b29scy5pdGhhcmJvcnMuY29tOjQwMDBcIiwgeyBcImZvcmNlIG5ldyBjb25uZWN0aW9uXCI6IHRydWUgfSk7XG4gICAgICAgIHRoaXMuX3Npb0NsaWVudCA9IHNpb2NsaWVudDtcblxuICAgICAgICAvL2lmIHlvdSBuZWVkIHRvIHRyYWNrIG11bHRpcGxlIHNvY2tldHMgaXQgaXMgYmVzdCB0byBzdG9yZSB0aGVtIHdpdGggdGFncyBpbiB5b3VyIG93biBhcnJheSBmb3Igbm93XG4gICAgICAgIHRoaXMudGFnID0gc2lvY2xpZW50LnRhZyA9IFwiVGVzdCBDbGllbnRcIjtcblxuICAgICAgICAvL3JlZ2lzdGVyIGV2ZW50IGNhbGxiYWNrc1xuICAgICAgICAvL3RoaXMgaXMgYW4gZXhhbXBsZSBvZiBhIGhhbmRsZXIgZGVjbGFyZWQgaW5saW5lXG4gICAgICAgIHNpb2NsaWVudC5vbihcImNvbm5lY3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG1zZyA9IHNpb2NsaWVudC50YWcgKyBcIiBDb25uZWN0ZWQhXCI7XG4gICAgICAgICAgICBzZWxmLnNvY2tldElPLnN0cmluZyA9IGkxOG4udChcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjEzXCIpICsgbXNnO1xuXG4gICAgICAgICAgICAvLyBTZW5kIG1lc3NhZ2UgYWZ0ZXIgY29ubmVjdGlvblxuICAgICAgICAgICAgc2VsZi5fc2lvQ2xpZW50LnNlbmQoXCJIZWxsbyBTb2NrZXQuSU8hXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL2V4YW1wbGUgb2YgYSBoYW5kbGVyIHRoYXQgaXMgc2hhcmVkIGJldHdlZW4gbXVsdGlwbGUgY2xpZW50c1xuICAgICAgICBzaW9jbGllbnQub24oXCJtZXNzYWdlXCIsIHRoaXMubWVzc2FnZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICBzaW9jbGllbnQub24oXCJlY2hvdGVzdFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY2MubG9nKFwiZWNob3Rlc3QgJ29uJyBjYWxsYmFjayBmaXJlZCFcIik7XG4gICAgICAgICAgICB2YXIgbXNnID0gdGhpcy50YWcgKyBcIiBzYXlzICdlY2hvdGVzdCcgd2l0aCBkYXRhOiBcIiArIGRhdGE7XG4gICAgICAgICAgICBzZWxmLnNvY2tldElPLnN0cmluZyA9IGkxOG4udChcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjE0XCIpICsgbXNnO1xuICAgICAgICB9KTtcblxuICAgICAgICBzaW9jbGllbnQub24oXCJ0ZXN0ZXZlbnRcIiwgdGhpcy50ZXN0ZXZlbnQuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgc2lvY2xpZW50Lm9uKFwiZGlzY29ubmVjdFwiLCB0aGlzLmRpc2Nvbm5lY3Rpb24uYmluZCh0aGlzKSk7XG4gICAgfSxcblxuICAgIHN0cmVhbVhIUkV2ZW50c1RvTGFiZWw6IGZ1bmN0aW9uIHN0cmVhbVhIUkV2ZW50c1RvTGFiZWwoeGhyLCBldmVudExhYmVsLCBsYWJlbCwgbWV0aG9kLCByZXNwb25zZUhhbmRsZXIpIHtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSByZXNwb25zZUhhbmRsZXIgfHwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kICsgXCIgUmVzcG9uc2UgKDMwIGNoYXJzKTogXCIgKyByZXNwb25zZS5zdWJzdHJpbmcoMCwgMzApICsgXCIuLi5cIjtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZXZlbnRMYWJlbE9yaWdpbiA9IGV2ZW50TGFiZWwuc3RyaW5nO1xuICAgICAgICAvLyBTaW1wbGUgZXZlbnRzXG4gICAgICAgIFsnbG9hZHN0YXJ0JywgJ2Fib3J0JywgJ2Vycm9yJywgJ2xvYWQnLCAnbG9hZGVuZCcsICd0aW1lb3V0J10uZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRuYW1lKSB7XG4gICAgICAgICAgICB4aHJbXCJvblwiICsgZXZlbnRuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBldmVudExhYmVsLnN0cmluZyA9IGV2ZW50TGFiZWxPcmlnaW4gKyBcIlxcbkV2ZW50IDogXCIgKyBldmVudG5hbWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTcGVjaWFsIGV2ZW50XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IGhhbmRsZXIoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdjMjE0OUcvNWoxSklLZDJHR3pRZlM3MicsICdOb2RlR2VuZXJhdG9yJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwxMl9wb29sXFxOb2RlR2VuZXJhdG9yLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHJlZ2lvbk9yaWdpbjogY2MuVmVjMixcbiAgICAgICAgcmVnaW9uU2l6ZTogY2MuU2l6ZVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmdlbmVyYXRlTm9kZSwgMik7XG4gICAgICAgIHRoaXMuX3Bvb2wgPSBuZXcgY2MuTm9kZVBvb2woJ1Bvb2xIYW5kbGVyJyk7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlTm9kZTogZnVuY3Rpb24gZ2VuZXJhdGVOb2RlKCkge1xuICAgICAgICB2YXIgbW9uc3RlciA9IHRoaXMuX3Bvb2wuZ2V0KCk7XG4gICAgICAgIGlmICghbW9uc3Rlcikge1xuICAgICAgICAgICAgbW9uc3RlciA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiKTtcbiAgICAgICAgfVxuICAgICAgICBtb25zdGVyLnggPSB0aGlzLnJlZ2lvbk9yaWdpbi54ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5yZWdpb25TaXplLndpZHRoKTtcbiAgICAgICAgbW9uc3Rlci55ID0gdGhpcy5yZWdpb25PcmlnaW4ueSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMucmVnaW9uU2l6ZS5oZWlnaHQpO1xuXG4gICAgICAgIHZhciBhbmdsZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgdmFyIGR4ID0gNTAwICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICB2YXIgZHkgPSA1MDAgKiBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICAgICAgLy8gQWRkIHBvb2wgaGFuZGxlciBjb21wb25lbnQgd2hpY2ggd2lsbCBjb250cm9sIHRoZSB0b3VjaCBldmVudFxuICAgICAgICBtb25zdGVyLmFkZENvbXBvbmVudCgnUG9vbEhhbmRsZXInKTtcblxuICAgICAgICBtb25zdGVyLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoNSwgZHgsIGR5KSwgY2MuY2FsbEZ1bmModGhpcy5yZW1vdmVOb2RlLCB0aGlzLCBtb25zdGVyKSkpO1xuXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChtb25zdGVyKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlTm9kZTogZnVuY3Rpb24gcmVtb3ZlTm9kZShzZW5kZXIsIG1vbnN0ZXIpIHtcbiAgICAgICAgdGhpcy5fcG9vbC5wdXQobW9uc3Rlcik7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdiZDRhMiticml0QWxvZjBVZE1DVkI4YycsICdOb2RlR3JvdXBDb250cm9sJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwMV9wcm9wZXJ0aWVzXFxOb2RlR3JvdXBDb250cm9sLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbm9kZUxpc3Q6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogW10sXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmluZXJ2YWxJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudG9nZ2xlTm9kZXNWaXNpYmlsaXR5KCk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uIG9uRGVzdHJveSgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmluZXJ2YWxJZCk7XG4gICAgfSxcblxuICAgIHRvZ2dsZU5vZGVzVmlzaWJpbGl0eTogZnVuY3Rpb24gdG9nZ2xlTm9kZXNWaXNpYmlsaXR5KCkge1xuICAgICAgICBjb25zb2xlLmxvZygndG9nZ2xlIHZpc2liaWxpdHknKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm5vZGVMaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGVMaXN0W2ldLmFjdGl2ZSA9ICF0aGlzLm5vZGVMaXN0W2ldLmFjdGl2ZTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZDQxMTRQZ3liaEozTC9rME45VGtDWkknLCAnTm9uU2VyaWFsaXplZFByb3BlcnRpZXMnKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDAxX3Byb3BlcnRpZXNcXE5vblNlcmlhbGl6ZWRQcm9wZXJ0aWVzLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbXlTZXJpYWxpemVkVGV4dDogJycsXG4gICAgICAgIG15Tm9uU2VyaWFsaXplZFRleHQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogJycsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBsYWJlbDE6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsMjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5teU5vblNlcmlhbGl6ZWRUZXh0ID0gJ0NhbiBvbmx5IHNldCB2YWx1ZSBpbiBzY3JpcHQnO1xuICAgICAgICB0aGlzLmxhYmVsMS5zdHJpbmcgPSB0aGlzLm15U2VyaWFsaXplZFRleHQ7XG4gICAgICAgIHRoaXMubGFiZWwyLnN0cmluZyA9IHRoaXMubXlOb25TZXJpYWxpemVkVGV4dDtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzM4NWZiRTllZ2hCMUl3SDM0V0hHSG1rJywgJ09yZGVyU3dpdGNoZXInKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDAzX2V2ZW50c1xcT3JkZXJTd2l0Y2hlci5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgY29udGFpbmVyOiBjYy5Ob2RlXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIFwic3dpdGNoXCI6IGZ1bmN0aW9uIF9zd2l0Y2goKSB7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY29udGFpbmVyLmNoaWxkcmVuO1xuICAgICAgICB2YXIgbGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBpZiAobGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdmFyIHNyYyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxlbmd0aCk7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNoaWxkcmVuW3NyY107XG4gICAgICAgICAgICB2YXIgZHN0ID0gc3JjID09PSBsZW5ndGggLSAxID8gMCA6IHNyYyArIDE7XG4gICAgICAgICAgICBub2RlLnNldFNpYmxpbmdJbmRleChkc3QpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc3OWFlM2hpUCtKQWhJS2VoYVd5aUt1aCcsICdQYXJ0aWNsZUNvbnRyb2wxJyk7XG4vLyBjYXNlc1xcMDFfZ3JhcGhpY3NcXDAyX3BhcnRpY2xlXFxQYXJ0aWNsZUNvbnRyb2wxLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwYXJ0aWNsZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgLy8gdXNlIHNwYWNlIHRvIHRvZ2dsZSBwYXJ0aWNsZVxuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkTGlzdGVuZXIoe1xuICAgICAgICAgICAgZXZlbnQ6IGNjLkV2ZW50TGlzdGVuZXIuS0VZQk9BUkQsXG4gICAgICAgICAgICBvbktleVByZXNzZWQ6IGZ1bmN0aW9uIG9uS2V5UHJlc3NlZChrZXlDb2RlLCBldmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSBjYy5LRVkuc3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50b2dnbGVQYXJ0aWNsZVBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNlbGYpO1xuICAgIH0sXG5cbiAgICB0b2dnbGVQYXJ0aWNsZVBsYXk6IGZ1bmN0aW9uIHRvZ2dsZVBhcnRpY2xlUGxheSgpIHtcbiAgICAgICAgdmFyIG15UGFydGljbGUgPSB0aGlzLnBhcnRpY2xlLmdldENvbXBvbmVudChjYy5QYXJ0aWNsZVN5c3RlbSk7XG4gICAgICAgIGlmIChteVBhcnRpY2xlLmlzRnVsbCgpKSB7XG4gICAgICAgICAgICAvLyBjaGVjayBpZiBwYXJ0aWNsZSBoYXMgZnVsbHkgcGxhZWRcbiAgICAgICAgICAgIG15UGFydGljbGUuc3RvcFN5c3RlbSgpOyAvLyBzdG9wIHBhcnRpY2xlIHN5c3RlbVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG15UGFydGljbGUucmVzZXRTeXN0ZW0oKTsgLy8gcmVzdGFydCBwYXJ0aWNsZSBzeXN0ZW1cbiAgICAgICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzBmNzYxRVptS2hOTEtKcFVYVHJiNGZGJywgJ1BsYXRmb3JtTW90aW9uJyk7XG4vLyBjYXNlc1xcY29sbGlkZXJcXFV0aWxzXFxQbGF0Zm9ybU1vdGlvbi5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3BlZWQ6IDEwLFxuICAgICAgICBkaXN0YW5jZTogMjAwXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLl9tb3ZlZERpc3RhbmNlID0gdGhpcy5kaXN0YW5jZSAvIDI7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IDE7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgdmFyIGQgPSB0aGlzLnNwZWVkICogdGhpcy5fZGlyZWN0aW9uICogZHQ7XG5cbiAgICAgICAgdmFyIG1vdmVkRGlzdGFuY2UgPSB0aGlzLl9tb3ZlZERpc3RhbmNlICsgTWF0aC5hYnMoZCk7XG4gICAgICAgIHRoaXMuX21vdmVkRGlzdGFuY2UgKz0gTWF0aC5hYnMoZCk7XG5cbiAgICAgICAgaWYgKG1vdmVkRGlzdGFuY2UgPiB0aGlzLmRpc3RhbmNlKSB7XG4gICAgICAgICAgICBkID0gdGhpcy5kaXN0YW5jZSAtIHRoaXMuX21vdmVkRGlzdGFuY2U7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlZERpc3RhbmNlID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbiAqPSAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVkRGlzdGFuY2UgPSBtb3ZlZERpc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub2RlLnggKz0gZDtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2VhOWFjK3Q5MkpGWTZoT1V1aUlIVUFUJywgJ1Bvb2xIYW5kbGVyJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwxMl9wb29sXFxQb29sSGFuZGxlci5qc1xuXG5mdW5jdGlvbiBwYXVzZXJlc3VtZSgpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlc3VtZVRhcmdldCh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucGF1c2VUYXJnZXQodGhpcyk7XG4gICAgfVxuICAgIHRoaXMucGF1c2VkID0gIXRoaXMucGF1c2VkO1xufVxuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubm9kZS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgcGF1c2VyZXN1bWUsIHRoaXMubm9kZSk7XG4gICAgfSxcblxuICAgIHVudXNlOiBmdW5jdGlvbiB1bnVzZSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHBhdXNlcmVzdW1lLCB0aGlzLm5vZGUpO1xuICAgIH0sXG5cbiAgICByZXVzZTogZnVuY3Rpb24gcmV1c2UoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHBhdXNlcmVzdW1lLCB0aGlzLm5vZGUpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNzU1MThJMEltSkhYcVdOTkdSSU9tSmcnLCAnUG9wdWxhdGVQcmVmYWInKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDAyX3ByZWZhYlxcUG9wdWxhdGVQcmVmYWIuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJvb3Q6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBwcmVmYWI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIGNhbnZhczoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5DYW52YXNcbiAgICAgICAgfSxcbiAgICAgICAgbnVtYmVyVG9TcGF3bjogMCxcbiAgICAgICAgc3Bhd25JbnRlcnZhbDogMFxuICAgIH0sXG5cbiAgICBhZGRTcGF3bjogZnVuY3Rpb24gYWRkU3Bhd24oKSB7XG4gICAgICAgIGlmICh0aGlzLnNwYXduQ291bnQgPj0gdGhpcy5udW1iZXJUb1NwYXduKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyUmVwZWF0ZXIoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbW9uc3RlciA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiKTtcbiAgICAgICAgbW9uc3Rlci5wYXJlbnQgPSB0aGlzLnJvb3Q7XG4gICAgICAgIC8vdGhpcy5jYW52YXMubm9kZS5hZGRDaGlsZChtb25zdGVyKTtcbiAgICAgICAgbW9uc3Rlci5wb3NpdGlvbiA9IHRoaXMuZ2V0UmFuZG9tUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5zcGF3bkNvdW50Kys7XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYucmFuZG9tUmFuZ2UgPSBjYy5wKDMwMCwgMjAwKTtcbiAgICAgICAgc2VsZi5zcGF3bkNvdW50ID0gMDtcbiAgICAgICAgc2VsZi5zY2hlZHVsZShzZWxmLmFkZFNwYXduLCBzZWxmLnNwYXduSW50ZXJ2YWwpO1xuICAgIH0sXG5cbiAgICBnZXRSYW5kb21Qb3NpdGlvbjogZnVuY3Rpb24gZ2V0UmFuZG9tUG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiBjYy5wKGNjLnJhbmRvbU1pbnVzMVRvMSgpICogdGhpcy5yYW5kb21SYW5nZS54LCBjYy5yYW5kb21NaW51czFUbzEoKSAqIHRoaXMucmFuZG9tUmFuZ2UueSk7XG4gICAgfSxcblxuICAgIGNsZWFyUmVwZWF0ZXI6IGZ1bmN0aW9uIGNsZWFyUmVwZWF0ZXIoKSB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmFkZFNwYXduKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzg0YTQzeWI5T3hCWDZITVF4UHpIUXl6JywgJ1Byb2dyZXNzQmFyJyk7XG4vLyBjYXNlc1xcMDJfdWlcXDA0X3Byb2dyZXNzYmFyXFxQcm9ncmVzc0Jhci5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaG9yaXpvbnRhbEJhcjoge1xuICAgICAgICAgICAgdHlwZTogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbFxuICAgICAgICB9LFxuICAgICAgICBob3Jpem9udGFsQmFyUmV2ZXJzZToge1xuICAgICAgICAgICAgdHlwZTogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbFxuICAgICAgICB9LFxuICAgICAgICB2ZXJ0aWNhbEJhcjoge1xuICAgICAgICAgICAgdHlwZTogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbFxuICAgICAgICB9LFxuICAgICAgICB2ZXJ0aWNhbEJhclJldmVyc2U6IHtcbiAgICAgICAgICAgIHR5cGU6IGNjLlByb2dyZXNzQmFyLFxuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9ncmVzc0Jhcih0aGlzLmhvcml6b250YWxCYXIsIGR0KTtcbiAgICAgICAgdGhpcy5fdXBkYXRlUHJvZ3Jlc3NCYXIodGhpcy52ZXJ0aWNhbEJhciwgZHQpO1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9ncmVzc0Jhcih0aGlzLmhvcml6b250YWxCYXJSZXZlcnNlLCBkdCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVByb2dyZXNzQmFyKHRoaXMudmVydGljYWxCYXJSZXZlcnNlLCBkdCk7XG4gICAgfSxcblxuICAgIF91cGRhdGVQcm9ncmVzc0JhcjogZnVuY3Rpb24gX3VwZGF0ZVByb2dyZXNzQmFyKHByb2dyZXNzQmFyLCBkdCkge1xuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSBwcm9ncmVzc0Jhci5wcm9ncmVzcztcbiAgICAgICAgaWYgKHByb2dyZXNzIDwgMS4wKSB7XG4gICAgICAgICAgICBwcm9ncmVzcyArPSBkdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2dyZXNzID0gMDtcbiAgICAgICAgfVxuICAgICAgICBwcm9ncmVzc0Jhci5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNjI4OWNabDZ6SkVjTFZRZDYwSm5BelcnLCAnUHV6emxlJyk7XG4vLyBjYXNlc1xcdGlsZWRtYXBcXFB1enpsZS5qc1xuXG5cbnZhciBNb3ZlRGlyZWN0aW9uID0gY2MuRW51bSh7XG4gICAgTk9ORTogMCxcbiAgICBVUDogMSxcbiAgICBET1dOOiAyLFxuICAgIExFRlQ6IDMsXG4gICAgUklHSFQ6IDRcbn0pO1xuXG52YXIgbWluVGlsZXNDb3VudCA9IDI7XG52YXIgbWFwTW92ZVN0ZXAgPSAxO1xudmFyIG1pbk1vdmVWYWx1ZSA9IDUwO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG4gICAgZWRpdG9yOiB7XG4gICAgICAgIHJlcXVpcmVDb21wb25lbnQ6IGNjLlRpbGVkTWFwXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX3RvdWNoU3RhcnRQb3M6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgX3RvdWNoaW5nOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IGZhbHNlLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIF9pc01hcExvYWRlZDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZSxcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBmbG9vckxheWVyTmFtZToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiAnZmxvb3InXG4gICAgICAgIH0sXG5cbiAgICAgICAgYmFycmllckxheWVyTmFtZToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiAnYmFycmllcidcbiAgICAgICAgfSxcblxuICAgICAgICBvYmplY3RHcm91cE5hbWU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogJ3BsYXllcnMnXG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RhcnRPYmplY3ROYW1lOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6ICdTcGF3blBvaW50J1xuICAgICAgICB9LFxuXG4gICAgICAgIHN1Y2Nlc3NPYmplY3ROYW1lOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6ICdTdWNjZXNzUG9pbnQnXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuX3BsYXllciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncGxheWVyJyk7XG4gICAgICAgIGlmICghdGhpcy5faXNNYXBMb2FkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BsYXllci5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHtcbiAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJELFxuICAgICAgICAgICAgb25LZXlQcmVzc2VkOiBmdW5jdGlvbiBvbktleVByZXNzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9vbktleVByZXNzZWQoa2V5Q29kZSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzZWxmLm5vZGUpO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLl90b3VjaGluZyA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLl90b3VjaFN0YXJ0UG9zID0gZXZlbnQudG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgfSwgc2VsZik7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKCFzZWxmLl90b3VjaGluZykgcmV0dXJuO1xuXG4gICAgICAgICAgICBzZWxmLl90b3VjaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHRvdWNoUG9zID0gZXZlbnQudG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIHZhciBtb3ZlZFggPSB0b3VjaFBvcy54IC0gc2VsZi5fdG91Y2hTdGFydFBvcy54O1xuICAgICAgICAgICAgdmFyIG1vdmVkWSA9IHRvdWNoUG9zLnkgLSBzZWxmLl90b3VjaFN0YXJ0UG9zLnk7XG4gICAgICAgICAgICB2YXIgbW92ZWRYVmFsdWUgPSBNYXRoLmFicyhtb3ZlZFgpO1xuICAgICAgICAgICAgdmFyIG1vdmVkWVZhbHVlID0gTWF0aC5hYnMobW92ZWRZKTtcbiAgICAgICAgICAgIGlmIChtb3ZlZFhWYWx1ZSA8IG1pbk1vdmVWYWx1ZSAmJiBtb3ZlZFlWYWx1ZSA8IG1pbk1vdmVWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIHRvdWNoIG1vdmVkIG5vdCBlbm91Z2hcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBuZXdUaWxlID0gY2MucCh0aGlzLl9jdXJUaWxlLngsIHRoaXMuX2N1clRpbGUueSk7XG4gICAgICAgICAgICB2YXIgbWFwTW92ZURpciA9IE1vdmVEaXJlY3Rpb24uTk9ORTtcbiAgICAgICAgICAgIGlmIChtb3ZlZFhWYWx1ZSA+PSBtb3ZlZFlWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIG1vdmUgdG8gcmlnaHQgb3IgbGVmdFxuICAgICAgICAgICAgICAgIGlmIChtb3ZlZFggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1RpbGUueCArPSAxO1xuICAgICAgICAgICAgICAgICAgICBtYXBNb3ZlRGlyID0gTW92ZURpcmVjdGlvbi5MRUZUO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1RpbGUueCAtPSAxO1xuICAgICAgICAgICAgICAgICAgICBtYXBNb3ZlRGlyID0gTW92ZURpcmVjdGlvbi5SSUdIVDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG1vdmUgdG8gdXAgb3IgZG93blxuICAgICAgICAgICAgICAgIGlmIChtb3ZlZFkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1RpbGUueSAtPSAxO1xuICAgICAgICAgICAgICAgICAgICBtYXBNb3ZlRGlyID0gTW92ZURpcmVjdGlvbi5VUDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXdUaWxlLnkgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgbWFwTW92ZURpciA9IE1vdmVEaXJlY3Rpb24uRE9XTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90cnlNb3ZlVG9OZXdUaWxlKG5ld1RpbGUsIG1hcE1vdmVEaXIpO1xuICAgICAgICB9LCBzZWxmKTtcbiAgICB9LFxuXG4gICAgcmVzdGFydEdhbWU6IGZ1bmN0aW9uIHJlc3RhcnRHYW1lKCkge1xuICAgICAgICB0aGlzLl9zdWNjZWVkTGF5ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXRNYXBQb3MoKTtcbiAgICAgICAgdGhpcy5fY3VyVGlsZSA9IHRoaXMuX3N0YXJ0VGlsZTtcbiAgICAgICAgdGhpcy5fdXBkYXRlUGxheWVyUG9zKCk7XG4gICAgfSxcblxuICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydChlcnIpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuO1xuXG4gICAgICAgIC8vIGluaXQgdGhlIG1hcCBwb3NpdGlvblxuICAgICAgICB0aGlzLl9pbml0TWFwUG9zKCk7XG5cbiAgICAgICAgLy8gaW5pdCB0aGUgc3VjY2VlZCBsYXllclxuICAgICAgICB0aGlzLl9zdWNjZWVkTGF5ZXIgPSB0aGlzLm5vZGUuZ2V0UGFyZW50KCkuZ2V0Q2hpbGRCeU5hbWUoJ3N1Y2NlZWRMYXllcicpO1xuICAgICAgICB0aGlzLl9zdWNjZWVkTGF5ZXIuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gaW5pdCB0aGUgcGxheWVyIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuX3RpbGVkTWFwID0gdGhpcy5ub2RlLmdldENvbXBvbmVudCgnY2MuVGlsZWRNYXAnKTtcbiAgICAgICAgdmFyIG9iamVjdEdyb3VwID0gdGhpcy5fdGlsZWRNYXAuZ2V0T2JqZWN0R3JvdXAodGhpcy5vYmplY3RHcm91cE5hbWUpO1xuICAgICAgICBpZiAoIW9iamVjdEdyb3VwKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0T2JqID0gb2JqZWN0R3JvdXAuZ2V0T2JqZWN0KHRoaXMuc3RhcnRPYmplY3ROYW1lKTtcbiAgICAgICAgdmFyIGVuZE9iaiA9IG9iamVjdEdyb3VwLmdldE9iamVjdCh0aGlzLnN1Y2Nlc3NPYmplY3ROYW1lKTtcbiAgICAgICAgaWYgKCFzdGFydE9iaiB8fCAhZW5kT2JqKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0UG9zID0gY2MucChzdGFydE9iai54LCBzdGFydE9iai55KTtcbiAgICAgICAgdmFyIGVuZFBvcyA9IGNjLnAoZW5kT2JqLngsIGVuZE9iai55KTtcblxuICAgICAgICB0aGlzLl9sYXllckZsb29yID0gdGhpcy5fdGlsZWRNYXAuZ2V0TGF5ZXIodGhpcy5mbG9vckxheWVyTmFtZSk7XG4gICAgICAgIHRoaXMuX2xheWVyQmFycmllciA9IHRoaXMuX3RpbGVkTWFwLmdldExheWVyKHRoaXMuYmFycmllckxheWVyTmFtZSk7XG4gICAgICAgIGlmICghdGhpcy5fbGF5ZXJGbG9vciB8fCAhdGhpcy5fbGF5ZXJCYXJyaWVyKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fY3VyVGlsZSA9IHRoaXMuX3N0YXJ0VGlsZSA9IHRoaXMuX2dldFRpbGVQb3Moc3RhcnRQb3MpO1xuICAgICAgICB0aGlzLl9lbmRUaWxlID0gdGhpcy5fZ2V0VGlsZVBvcyhlbmRQb3MpO1xuXG4gICAgICAgIGlmICh0aGlzLl9wbGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVBsYXllclBvcygpO1xuICAgICAgICAgICAgdGhpcy5fcGxheWVyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pc01hcExvYWRlZCA9IHRydWU7XG4gICAgfSxcblxuICAgIF9pbml0TWFwUG9zOiBmdW5jdGlvbiBfaW5pdE1hcFBvcygpIHtcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGNjLnZpc2libGVSZWN0LmJvdHRvbUxlZnQpO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlUGxheWVyUG9zOiBmdW5jdGlvbiBfdXBkYXRlUGxheWVyUG9zKCkge1xuICAgICAgICB2YXIgcG9zID0gdGhpcy5fbGF5ZXJGbG9vci5nZXRQb3NpdGlvbkF0KHRoaXMuX2N1clRpbGUpO1xuICAgICAgICB0aGlzLl9wbGF5ZXIuc2V0UG9zaXRpb24ocG9zKTtcbiAgICB9LFxuXG4gICAgX2dldFRpbGVQb3M6IGZ1bmN0aW9uIF9nZXRUaWxlUG9zKHBvc0luUGl4ZWwpIHtcbiAgICAgICAgdmFyIG1hcFNpemUgPSB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcbiAgICAgICAgdmFyIHRpbGVTaXplID0gdGhpcy5fdGlsZWRNYXAuZ2V0VGlsZVNpemUoKTtcbiAgICAgICAgdmFyIHggPSBNYXRoLmZsb29yKHBvc0luUGl4ZWwueCAvIHRpbGVTaXplLndpZHRoKTtcbiAgICAgICAgdmFyIHkgPSBNYXRoLmZsb29yKChtYXBTaXplLmhlaWdodCAtIHBvc0luUGl4ZWwueSkgLyB0aWxlU2l6ZS5oZWlnaHQpO1xuXG4gICAgICAgIHJldHVybiBjYy5wKHgsIHkpO1xuICAgIH0sXG5cbiAgICBfb25LZXlQcmVzc2VkOiBmdW5jdGlvbiBfb25LZXlQcmVzc2VkKGtleUNvZGUsIGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5faXNNYXBMb2FkZWQgfHwgdGhpcy5fc3VjY2VlZExheWVyLmFjdGl2ZSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBuZXdUaWxlID0gY2MucCh0aGlzLl9jdXJUaWxlLngsIHRoaXMuX2N1clRpbGUueSk7XG4gICAgICAgIHZhciBtYXBNb3ZlRGlyID0gTW92ZURpcmVjdGlvbi5OT05FO1xuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgY2MuS0VZLnVwOlxuICAgICAgICAgICAgICAgIG5ld1RpbGUueSAtPSAxO1xuICAgICAgICAgICAgICAgIG1hcE1vdmVEaXIgPSBNb3ZlRGlyZWN0aW9uLkRPV047XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLktFWS5kb3duOlxuICAgICAgICAgICAgICAgIG5ld1RpbGUueSArPSAxO1xuICAgICAgICAgICAgICAgIG1hcE1vdmVEaXIgPSBNb3ZlRGlyZWN0aW9uLlVQO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5LRVkubGVmdDpcbiAgICAgICAgICAgICAgICBuZXdUaWxlLnggLT0gMTtcbiAgICAgICAgICAgICAgICBtYXBNb3ZlRGlyID0gTW92ZURpcmVjdGlvbi5SSUdIVDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2MuS0VZLnJpZ2h0OlxuICAgICAgICAgICAgICAgIG5ld1RpbGUueCArPSAxO1xuICAgICAgICAgICAgICAgIG1hcE1vdmVEaXIgPSBNb3ZlRGlyZWN0aW9uLkxFRlQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3RyeU1vdmVUb05ld1RpbGUobmV3VGlsZSwgbWFwTW92ZURpcik7XG4gICAgfSxcblxuICAgIF90cnlNb3ZlVG9OZXdUaWxlOiBmdW5jdGlvbiBfdHJ5TW92ZVRvTmV3VGlsZShuZXdUaWxlLCBtYXBNb3ZlRGlyKSB7XG4gICAgICAgIHZhciBtYXBTaXplID0gdGhpcy5fdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpO1xuICAgICAgICBpZiAobmV3VGlsZS54IDwgMCB8fCBuZXdUaWxlLnggPj0gbWFwU2l6ZS53aWR0aCkgcmV0dXJuO1xuICAgICAgICBpZiAobmV3VGlsZS55IDwgMCB8fCBuZXdUaWxlLnkgPj0gbWFwU2l6ZS5oZWlnaHQpIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5fbGF5ZXJCYXJyaWVyLmdldFRpbGVHSURBdChuZXdUaWxlKSkge1xuICAgICAgICAgICAgY2MubG9nKCdUaGlzIHdheSBpcyBibG9ja2VkIScpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwbGF5ZXIgcG9zaXRpb25cbiAgICAgICAgdGhpcy5fY3VyVGlsZSA9IG5ld1RpbGU7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVBsYXllclBvcygpO1xuXG4gICAgICAgIC8vIG1vdmUgdGhlIG1hcCBpZiBuZWNlc3NhcnlcbiAgICAgICAgdGhpcy5fdHJ5TW92ZU1hcChtYXBNb3ZlRGlyKTtcblxuICAgICAgICAvLyBjaGVjayB0aGUgcGxheWVyIGlzIHN1Y2Nlc3Mgb3Igbm90XG4gICAgICAgIGlmIChjYy5wb2ludEVxdWFsVG9Qb2ludCh0aGlzLl9jdXJUaWxlLCB0aGlzLl9lbmRUaWxlKSkge1xuICAgICAgICAgICAgY2MubG9nKCdzdWNjZWVkJyk7XG4gICAgICAgICAgICB0aGlzLl9zdWNjZWVkTGF5ZXIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdHJ5TW92ZU1hcDogZnVuY3Rpb24gX3RyeU1vdmVNYXAobW92ZURpcikge1xuICAgICAgICAvLyBnZXQgbmVjZXNzYXJ5IGRhdGFcbiAgICAgICAgdmFyIG1hcENvbnRlbnRTaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIHZhciBtYXBQb3MgPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHBsYXllclBvcyA9IHRoaXMuX3BsYXllci5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgdmlld1NpemUgPSBjYy5zaXplKGNjLnZpc2libGVSZWN0LndpZHRoLCBjYy52aXNpYmxlUmVjdC5oZWlnaHQpO1xuICAgICAgICB2YXIgdGlsZVNpemUgPSB0aGlzLl90aWxlZE1hcC5nZXRUaWxlU2l6ZSgpO1xuICAgICAgICB2YXIgbWluRGlzWCA9IG1pblRpbGVzQ291bnQgKiB0aWxlU2l6ZS53aWR0aDtcbiAgICAgICAgdmFyIG1pbkRpc1kgPSBtaW5UaWxlc0NvdW50ICogdGlsZVNpemUuaGVpZ2h0O1xuXG4gICAgICAgIHZhciBkaXNYID0gcGxheWVyUG9zLnggKyBtYXBQb3MueDtcbiAgICAgICAgdmFyIGRpc1kgPSBwbGF5ZXJQb3MueSArIG1hcFBvcy55O1xuICAgICAgICB2YXIgbmV3UG9zO1xuICAgICAgICBzd2l0Y2ggKG1vdmVEaXIpIHtcbiAgICAgICAgICAgIGNhc2UgTW92ZURpcmVjdGlvbi5VUDpcbiAgICAgICAgICAgICAgICBpZiAoZGlzWSA8IG1pbkRpc1kpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zID0gY2MucChtYXBQb3MueCwgbWFwUG9zLnkgKyB0aWxlU2l6ZS5oZWlnaHQgKiBtYXBNb3ZlU3RlcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNb3ZlRGlyZWN0aW9uLkRPV046XG4gICAgICAgICAgICAgICAgaWYgKHZpZXdTaXplLmhlaWdodCAtIGRpc1kgLSB0aWxlU2l6ZS5oZWlnaHQgPCBtaW5EaXNZKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1BvcyA9IGNjLnAobWFwUG9zLngsIG1hcFBvcy55IC0gdGlsZVNpemUuaGVpZ2h0ICogbWFwTW92ZVN0ZXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTW92ZURpcmVjdGlvbi5MRUZUOlxuICAgICAgICAgICAgICAgIGlmICh2aWV3U2l6ZS53aWR0aCAtIGRpc1ggLSB0aWxlU2l6ZS53aWR0aCA8IG1pbkRpc1gpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zID0gY2MucChtYXBQb3MueCAtIHRpbGVTaXplLndpZHRoICogbWFwTW92ZVN0ZXAsIG1hcFBvcy55KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1vdmVEaXJlY3Rpb24uUklHSFQ6XG4gICAgICAgICAgICAgICAgaWYgKGRpc1ggPCBtaW5EaXNYKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1BvcyA9IGNjLnAobWFwUG9zLnggKyB0aWxlU2l6ZS53aWR0aCAqIG1hcE1vdmVTdGVwLCBtYXBQb3MueSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3UG9zKSB7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHBvc2l0aW9uIHJhbmdlIG9mIG1hcFxuICAgICAgICAgICAgdmFyIG1pblggPSB2aWV3U2l6ZS53aWR0aCAtIG1hcENvbnRlbnRTaXplLndpZHRoIC0gY2MudmlzaWJsZVJlY3QubGVmdDtcbiAgICAgICAgICAgIHZhciBtYXhYID0gY2MudmlzaWJsZVJlY3QubGVmdC54O1xuICAgICAgICAgICAgdmFyIG1pblkgPSB2aWV3U2l6ZS5oZWlnaHQgLSBtYXBDb250ZW50U2l6ZS5oZWlnaHQgLSBjYy52aXNpYmxlUmVjdC5ib3R0b207XG4gICAgICAgICAgICB2YXIgbWF4WSA9IGNjLnZpc2libGVSZWN0LmJvdHRvbS55O1xuXG4gICAgICAgICAgICBpZiAobmV3UG9zLnggPCBtaW5YKSBuZXdQb3MueCA9IG1pblg7XG4gICAgICAgICAgICBpZiAobmV3UG9zLnggPiBtYXhYKSBuZXdQb3MueCA9IG1heFg7XG4gICAgICAgICAgICBpZiAobmV3UG9zLnkgPCBtaW5ZKSBuZXdQb3MueSA9IG1pblk7XG4gICAgICAgICAgICBpZiAobmV3UG9zLnkgPiBtYXhZKSBuZXdQb3MueSA9IG1heFk7XG5cbiAgICAgICAgICAgIGlmICghY2MucG9pbnRFcXVhbFRvUG9pbnQobmV3UG9zLCBtYXBQb3MpKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKCdNb3ZlIHRoZSBtYXAgdG8gbmV3IHBvc2l0aW9uOiAnLCBuZXdQb3MpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihuZXdQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc5MzQxZjNmRGRCTWpKTEtoNEQra0pKSycsICdSZWZlcmVuY2VUeXBlUHJvcGVydGllcycpO1xuLy8gY2FzZXNcXDA1X3NjcmlwdGluZ1xcMDFfcHJvcGVydGllc1xcUmVmZXJlbmNlVHlwZVByb3BlcnRpZXMuanNcblxudmFyIE15Q3VzdG9tQ29tcG9uZW50ID0gcmVxdWlyZSgnTXlDdXN0b21Db21wb25lbnQnKTtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBteU5vZGU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgbXlTcHJpdGU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuICAgICAgICBteUxhYmVsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBteUNvbXBvbmVudDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogTXlDdXN0b21Db21wb25lbnRcbiAgICAgICAgfSxcbiAgICAgICAgbXlTcHJpdGVGcmFtZToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcbiAgICAgICAgbXlBdGxhczoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXNcbiAgICAgICAgfSxcbiAgICAgICAgbXlQcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICBteUF1ZGlvQ2xpcDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5teUxhYmVsLnN0cmluZyA9IHRoaXMubXlDb21wb25lbnQuZ2V0UG93ZXIoKS50b1N0cmluZygpO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge31cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNDczYjh3eHM1NU9zSnZveFZkWUN6VEYnLCAnU2NlbmVMaXN0Jyk7XG4vLyBzY3JpcHRzXFxHbG9iYWxcXFNjZW5lTGlzdC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGl0ZW1QcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNyZWF0ZUl0ZW06IGZ1bmN0aW9uIGNyZWF0ZUl0ZW0oeCwgeSwgbmFtZSwgdXJsKSB7XG4gICAgICAgIHZhciBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtUHJlZmFiKTtcbiAgICAgICAgdmFyIGl0ZW1Db21wID0gaXRlbS5nZXRDb21wb25lbnQoJ0xpc3RJdGVtJyk7XG4gICAgICAgIHZhciBsYWJlbCA9IGl0ZW1Db21wLmxhYmVsO1xuICAgICAgICBsYWJlbC5zdHJpbmcgPSBuYW1lO1xuXG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgIGl0ZW1Db21wLnVybCA9IHVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGl0ZW0ud2lkdGggPSB3O1xuICAgICAgICBpdGVtLnggPSB4O1xuICAgICAgICBpdGVtLnkgPSB5O1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoaXRlbSk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNjZW5lcyA9IGNjLmdhbWUuX3NjZW5lSW5mb3M7XG4gICAgICAgIHZhciBsaXN0ID0ge307XG4gICAgICAgIGlmIChzY2VuZXMpIHtcbiAgICAgICAgICAgIHZhciBpLCBqO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNjZW5lcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPSBzY2VuZXNbaV0udXJsO1xuICAgICAgICAgICAgICAgIHZhciBkaXJuYW1lID0gY2MucGF0aC5kaXJuYW1lKHVybCkucmVwbGFjZSgnZGI6Ly9hc3NldHMvY2FzZXMvJywgJycpO1xuICAgICAgICAgICAgICAgIGlmIChkaXJuYW1lID09PSAnZGI6Ly9hc3NldHMvcmVzb3VyY2VzL3Rlc3QgYXNzZXRzJykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHNjZW5lbmFtZSA9IGNjLnBhdGguYmFzZW5hbWUodXJsLCAnLmZpcmUnKTtcbiAgICAgICAgICAgICAgICBpZiAoc2NlbmVuYW1lID09PSAnVGVzdExpc3QnKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGlmICghZGlybmFtZSkgZGlybmFtZSA9ICdfcm9vdCc7XG4gICAgICAgICAgICAgICAgaWYgKCFsaXN0W2Rpcm5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RbZGlybmFtZV0gPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGlzdFtkaXJuYW1lXVtzY2VuZW5hbWVdID0gdXJsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGlycyA9IE9iamVjdC5rZXlzKGxpc3QpO1xuICAgICAgICAgICAgZGlycy5zb3J0KCk7XG4gICAgICAgICAgICB2YXIgeSA9IC01MDtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGRpcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlybmFtZSA9IGRpcnNbaV07XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmNyZWF0ZUl0ZW0oMTAwLCB5LCBkaXJuYW1lKTtcbiAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChjYy5XaWRnZXQpLmxlZnQgPSA2MDtcbiAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB5IC09IDUwO1xuICAgICAgICAgICAgICAgIHZhciBzY2VuZW5hbWVzID0gT2JqZWN0LmtleXMobGlzdFtkaXJuYW1lXSk7XG4gICAgICAgICAgICAgICAgc2NlbmVuYW1lcy5zb3J0KCk7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHNjZW5lbmFtZXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9uYW1lID0gc2NlbmVuYW1lc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IGxpc3RbZGlybmFtZV1bX25hbWVdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2l0ZW0gPSB0aGlzLmNyZWF0ZUl0ZW0oMjAwLCB5LCBfbmFtZSwgdXJsKTtcbiAgICAgICAgICAgICAgICAgICAgX2l0ZW0uZ2V0Q29tcG9uZW50KGNjLldpZGdldCkubGVmdCA9IDEyMDtcbiAgICAgICAgICAgICAgICAgICAgX2l0ZW0uY29sb3IgPSBjYy5Db2xvci5XSElURTtcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gTWF0aC5hYnMoeSkgKyAzMDtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYWU2ZmNSOGN1RkdSWUhXNTI1VkpEL2snLCAnU2hlZXBBbmltYXRpb24xJyk7XG4vLyBjYXNlc1xcMDNfZ2FtZXBsYXlcXDAzX2FuaW1hdGlvblxcU2hlZXBBbmltYXRpb24xLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc2hlZXBBbmltOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5BbmltYXRpb25cbiAgICAgICAgfVxuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBhbmltID0gdGhpcy5zaGVlcEFuaW07XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYW5pbS5wbGF5KCdzaGVlcF9qdW1wJyk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge31cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMDkyYTN3WUY3cEJVTGRQOVNMd0dVQlEnLCAnU2hvb3RlcicpO1xuLy8gY2FzZXNcXGNvbGxpZGVyXFxTaG9vdGVyXFxTaG9vdGVyLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgYnVsbGV0OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTtcblxuICAgICAgICB2YXIgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xuXG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5UT1VDSF9PTkVfQllfT05FLFxuICAgICAgICAgICAgb25Ub3VjaEJlZ2FuOiBmdW5jdGlvbiBvblRvdWNoQmVnYW4odG91Y2gsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvdWNoTG9jID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcblxuICAgICAgICAgICAgICAgIHZhciBidWxsZXQgPSBjYy5pbnN0YW50aWF0ZShfdGhpcy5idWxsZXQpO1xuICAgICAgICAgICAgICAgIGJ1bGxldC5wb3NpdGlvbiA9IHRvdWNoTG9jO1xuICAgICAgICAgICAgICAgIGJ1bGxldC5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgc2NlbmUuYWRkQ2hpbGQoYnVsbGV0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5ub2RlKTtcbiAgICB9LFxuXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiBvbkRpc2FibGUoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNWE2ZGZSemhUQk1wNVUzaWw4REptQlonLCAnU2hvd0NvbGxpZGVyJyk7XG4vLyBjYXNlc1xcY29sbGlkZXJcXFNoYXBlXFxTaG93Q29sbGlkZXIuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcblxuICAgIG9uQnRuQ2xpY2s6IGZ1bmN0aW9uIG9uQnRuQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdmFyIHNoYXBlQ2xhc3NOYW1lID0gJ2NjLicgKyB0YXJnZXQubmFtZSArICdDb2xsaWRlcic7XG4gICAgICAgIHZhciBub2RlUGF0aCA9ICdDYW52YXMvcm9vdC8nICsgdGFyZ2V0LnBhcmVudC5uYW1lO1xuICAgICAgICB2YXIgY29sbGlkZXIgPSBjYy5maW5kKG5vZGVQYXRoKS5nZXRDb21wb25lbnQoc2hhcGVDbGFzc05hbWUpO1xuICAgICAgICBjb2xsaWRlci5lbmFibGVkID0gIWNvbGxpZGVyLmVuYWJsZWQ7XG5cbiAgICAgICAgdmFyIGxhYmVsID0gdGFyZ2V0LmdldENoaWxkQnlOYW1lKCdMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGlmIChjb2xsaWRlci5lbmFibGVkKSB7XG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBsYWJlbC5zdHJpbmcucmVwbGFjZSgnU2hvdycsICdIaWRlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBsYWJlbC5zdHJpbmcucmVwbGFjZSgnSGlkZScsICdTaG93Jyk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2I2MDY3YTErSjVGVzRHMzBubVZMVS9kJywgJ1NpbXBsZUFjdGlvbicpO1xuLy8gY2FzZXNcXDAzX2dhbWVwbGF5XFwwMl9hY3Rpb25zXFxTaW1wbGVBY3Rpb24uanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGp1bXBlcjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGNvbG9yTm9kZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc3F1YXNoQWN0aW9uID0gY2Muc2NhbGVUbygwLjIsIDEsIDAuNik7XG4gICAgICAgIHRoaXMuc3RyZXRjaEFjdGlvbiA9IGNjLnNjYWxlVG8oMC4yLCAxLCAxLjIpO1xuICAgICAgICB0aGlzLnNjYWxlQmFja0FjdGlvbiA9IGNjLnNjYWxlVG8oMC4xLCAxLCAxKTtcbiAgICAgICAgdGhpcy5tb3ZlVXBBY3Rpb24gPSBjYy5tb3ZlQnkoMSwgY2MucCgwLCAyMDApKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpO1xuICAgICAgICB0aGlzLm1vdmVEb3duQWN0aW9uID0gY2MubW92ZUJ5KDEsIGNjLnAoMCwgLTIwMCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcbiAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKHRoaXMuc3F1YXNoQWN0aW9uLCB0aGlzLnN0cmV0Y2hBY3Rpb24sIHRoaXMubW92ZVVwQWN0aW9uLCB0aGlzLnNjYWxlQmFja0FjdGlvbiwgdGhpcy5tb3ZlRG93bkFjdGlvbiwgdGhpcy5zcXVhc2hBY3Rpb24sIHRoaXMuc2NhbGVCYWNrQWN0aW9uKTtcbiAgICAgICAgLy8gdGhpcyBpcyBhIHRlbXAgYXBpIHdoaWNoIHdpbGwgYmUgY29tYmluZWQgdG8gY2MuTm9kZVxuICAgICAgICB0aGlzLmp1bXBlci5ydW5BY3Rpb24oc2VxKTtcblxuICAgICAgICB0aGlzLmNvbG9yTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MudGludFRvKDIsIDI1NSwgMCwgMCksIGNjLmRlbGF5VGltZSgwLjUpLCBjYy5mYWRlT3V0KDEpLCBjYy5kZWxheVRpbWUoMC41KSwgY2MuZmFkZUluKDEpLCBjYy5kZWxheVRpbWUoMC41KSwgY2MudGludFRvKDIsIDI1NSwgMjU1LCAyNTUpKS5yZXBlYXQoMikpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYzNmOTcxaXlDZEloNnhkYU80OVhQMEYnLCAnU2ltcGxlS2V5Ym9hcmRNb3ZlbWVudCcpO1xuLy8gY2FzZXNcXDAzX2dhbWVwbGF5XFwwMV9wbGF5ZXJfY29udHJvbFxcU2ltcGxlS2V5Ym9hcmRNb3ZlbWVudC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNoZWVwOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvLyBzZXQgaW5pdGlhbCBtb3ZlIGRpcmVjdGlvblxuICAgICAgICBzZWxmLnR1cm5SaWdodCgpO1xuXG4gICAgICAgIC8vYWRkIGtleWJvYXJkIGlucHV0IGxpc3RlbmVyIHRvIGNhbGwgdHVybkxlZnQgYW5kIHR1cm5SaWdodFxuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkTGlzdGVuZXIoe1xuICAgICAgICAgICAgZXZlbnQ6IGNjLkV2ZW50TGlzdGVuZXIuS0VZQk9BUkQsXG4gICAgICAgICAgICBvbktleVByZXNzZWQ6IGZ1bmN0aW9uIG9uS2V5UHJlc3NlZChrZXlDb2RlLCBldmVudCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5hOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5sZWZ0OlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3R1cm4gbGVmdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50dXJuTGVmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLmQ6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLnJpZ2h0OlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3R1cm4gcmlnaHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudHVyblJpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNlbGYubm9kZSk7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIHRoaXMuc2hlZXAueCArPSB0aGlzLnNwZWVkICogZHQ7XG4gICAgfSxcblxuICAgIHR1cm5MZWZ0OiBmdW5jdGlvbiB0dXJuTGVmdCgpIHtcbiAgICAgICAgdGhpcy5zcGVlZCA9IC0xMDA7XG4gICAgICAgIHRoaXMuc2hlZXAuc2NhbGVYID0gMTtcbiAgICB9LFxuXG4gICAgdHVyblJpZ2h0OiBmdW5jdGlvbiB0dXJuUmlnaHQoKSB7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAxMDA7XG4gICAgICAgIHRoaXMuc2hlZXAuc2NhbGVYID0gLTE7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdmZGUzM3JXdDgxTXZaV083UVEzanYzaicsICdTaW1wbGVNb3Rpb24nKTtcbi8vIGNhc2VzXFxjb2xsaWRlclxcVXRpbHNcXFNpbXBsZU1vdGlvbi5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbW92ZVNwZWVkOiAxMDAsXG4gICAgICAgIHJvdGF0aW9uU3BlZWQ6IDkwXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIHRoaXMubm9kZS54ICs9IGR0ICogdGhpcy5tb3ZlU3BlZWQ7XG4gICAgICAgIHRoaXMubm9kZS5yb3RhdGlvbiArPSBkdCAqIHRoaXMucm90YXRpb25TcGVlZDtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2ZjZmVmdmpQZ2RHRUtuZk93dW9JVkpEJywgJ1NpbmdsZXRvbkN0cmwnKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDA5X3NpbmdsZXRvblxcU2luZ2xldG9uQ3RybC5qc1xuXG52YXIgU2luZ2xldG9uID0gcmVxdWlyZShcIlNpbmdsZXRvblwiKTtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7fSxcblxuICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZShcIk1vbnN0ZXJcIik7XG4gICAgICAgIHZhciBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBTaW5nbGV0b24uaW5zdGFuY2UubW9uc3Rlckljb247XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMzc5ZDJLNEdVdEN2N3BCOSt3dXo0TGInLCAnU2luZ2xldG9uJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwOV9zaW5nbGV0b25cXFNpbmdsZXRvbi5qc1xuXG52YXIgU2luZ2xldG9uID0gY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG1vbnN0ZXJJY29uOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBpbnN0YW5jZTogbnVsbFxuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgU2luZ2xldG9uLmluc3RhbmNlID0gdGhpcztcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzkxMTE1T1daOWhKa0lYYXFDTlJVc1pDJywgJ1NwaW5lQ3RybCcpO1xuLy8gY2FzZXNcXHNwaW5lXFxTcGluZUN0cmwuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuICAgIGVkaXRvcjoge1xuICAgICAgICByZXF1aXJlQ29tcG9uZW50OiBzcC5Ta2VsZXRvblxuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG1peFRpbWU6IDAuMlxuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNwaW5lID0gdGhpcy5zcGluZSA9IHRoaXMuZ2V0Q29tcG9uZW50KCdzcC5Ta2VsZXRvbicpO1xuICAgICAgICB0aGlzLl9zZXRNaXgoJ3dhbGsnLCAncnVuJyk7XG4gICAgICAgIHRoaXMuX3NldE1peCgncnVuJywgJ2p1bXAnKTtcbiAgICAgICAgdGhpcy5fc2V0TWl4KCd3YWxrJywgJ2p1bXAnKTtcblxuICAgICAgICBzcGluZS5zZXRTdGFydExpc3RlbmVyKGZ1bmN0aW9uICh0cmFjaykge1xuICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3BpbmUuZ2V0U3RhdGUoKS5nZXRDdXJyZW50KHRyYWNrKTtcbiAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb25OYW1lID0gZW50cnkuYW5pbWF0aW9uID8gZW50cnkuYW5pbWF0aW9uLm5hbWUgOiBcIlwiO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIlt0cmFjayAlc10gc3RhcnQ6ICVzXCIsIHRyYWNrLCBhbmltYXRpb25OYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNwaW5lLnNldEVuZExpc3RlbmVyKGZ1bmN0aW9uICh0cmFjaykge1xuICAgICAgICAgICAgY2MubG9nKFwiW3RyYWNrICVzXSBlbmRcIiwgdHJhY2spO1xuICAgICAgICB9KTtcbiAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihmdW5jdGlvbiAodHJhY2ssIGxvb3BDb3VudCkge1xuICAgICAgICAgICAgY2MubG9nKFwiW3RyYWNrICVzXSBjb21wbGV0ZTogJXNcIiwgdHJhY2ssIGxvb3BDb3VudCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzcGluZS5zZXRFdmVudExpc3RlbmVyKGZ1bmN0aW9uICh0cmFjaywgZXZlbnQpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcIlt0cmFjayAlc10gZXZlbnQ6ICVzLCAlcywgJXMsICVzXCIsIHRyYWNrLCBldmVudC5kYXRhLm5hbWUsIGV2ZW50LmludFZhbHVlLCBldmVudC5mbG9hdFZhbHVlLCBldmVudC5zdHJpbmdWYWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgLy8gY2MuZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHtcbiAgICAgICAgLy8gICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLlRPVUNIX0FMTF9BVF9PTkNFLFxuICAgICAgICAvLyAgICAgb25Ub3VjaGVzQmVnYW4gKCkge1xuICAgICAgICAvLyAgICAgICAgIHNlbGYudG9nZ2xlVGltZVNjYWxlKCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sIHRoaXMubm9kZSk7XG4gICAgfSxcblxuICAgIC8vIE9QVElPTlNcblxuICAgIHRvZ2dsZURlYnVnU2xvdHM6IGZ1bmN0aW9uIHRvZ2dsZURlYnVnU2xvdHMoKSB7XG4gICAgICAgIHRoaXMuc3BpbmUuZGVidWdTbG90cyA9ICF0aGlzLnNwaW5lLmRlYnVnU2xvdHM7XG4gICAgfSxcblxuICAgIHRvZ2dsZURlYnVnQm9uZXM6IGZ1bmN0aW9uIHRvZ2dsZURlYnVnQm9uZXMoKSB7XG4gICAgICAgIHRoaXMuc3BpbmUuZGVidWdCb25lcyA9ICF0aGlzLnNwaW5lLmRlYnVnQm9uZXM7XG4gICAgfSxcblxuICAgIHRvZ2dsZVRpbWVTY2FsZTogZnVuY3Rpb24gdG9nZ2xlVGltZVNjYWxlKCkge1xuICAgICAgICBpZiAodGhpcy5zcGluZS50aW1lU2NhbGUgPT09IDEuMCkge1xuICAgICAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGUgPSAwLjM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZSA9IDEuMDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBBTklNQVRJT05TXG5cbiAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICB0aGlzLnNwaW5lLmNsZWFyVHJhY2soMCk7XG4gICAgfSxcblxuICAgIHdhbGs6IGZ1bmN0aW9uIHdhbGsoKSB7XG4gICAgICAgIHRoaXMuc3BpbmUuc2V0QW5pbWF0aW9uKDAsICd3YWxrJywgdHJ1ZSk7XG4gICAgfSxcblxuICAgIHJ1bjogZnVuY3Rpb24gcnVuKCkge1xuICAgICAgICB0aGlzLnNwaW5lLnNldEFuaW1hdGlvbigwLCAncnVuJywgdHJ1ZSk7XG4gICAgfSxcblxuICAgIGp1bXA6IGZ1bmN0aW9uIGp1bXAoKSB7XG4gICAgICAgIHZhciBvbGRBbmltID0gdGhpcy5zcGluZS5hbmltYXRpb247XG4gICAgICAgIHRoaXMuc3BpbmUuc2V0QW5pbWF0aW9uKDAsICdqdW1wJywgZmFsc2UpO1xuICAgICAgICBpZiAob2xkQW5pbSkge1xuICAgICAgICAgICAgdGhpcy5zcGluZS5hZGRBbmltYXRpb24oMCwgb2xkQW5pbSA9PT0gJ3J1bicgPyAncnVuJyA6ICd3YWxrJywgdHJ1ZSwgMCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvb3Q6IGZ1bmN0aW9uIHNob290KCkge1xuICAgICAgICB0aGlzLnNwaW5lLnNldEFuaW1hdGlvbigxLCAnc2hvb3QnLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIC8vXG5cbiAgICBfc2V0TWl4OiBmdW5jdGlvbiBfc2V0TWl4KGFuaW0xLCBhbmltMikge1xuICAgICAgICB0aGlzLnNwaW5lLnNldE1peChhbmltMSwgYW5pbTIsIHRoaXMubWl4VGltZSk7XG4gICAgICAgIHRoaXMuc3BpbmUuc2V0TWl4KGFuaW0yLCBhbmltMSwgdGhpcy5taXhUaW1lKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzkwYWVkODZYdTFEWm9hZXZGZGN0aFkzJywgJ1Nwcml0ZUZvbGxvd1RvdWNoJyk7XG4vLyBjYXNlc1xcMDNfZ2FtZXBsYXlcXDAxX3BsYXllcl9jb250cm9sXFxTcHJpdGVGb2xsb3dUb3VjaC5qc1xuXG52YXIgaTE4biA9IHJlcXVpcmUoJ2kxOG4nKTtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB0b3VjaExvY2F0aW9uRGlzcGxheToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgZm9sbG93ZXI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgZm9sbG93U3BlZWQ6IDBcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5tb3ZlVG9Qb3MgPSBjYy5wKDAsIDApO1xuICAgICAgICBzZWxmLmlzTW92aW5nID0gZmFsc2U7XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5UT1VDSF9PTkVfQllfT05FLFxuICAgICAgICAgICAgb25Ub3VjaEJlZ2FuOiBmdW5jdGlvbiBvblRvdWNoQmVnYW4odG91Y2gsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvdWNoTG9jID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgICAgICBzZWxmLmlzTW92aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzZWxmLm1vdmVUb1BvcyA9IHNlbGYuZm9sbG93ZXIucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRvdWNoTG9jKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gZG9uJ3QgY2FwdHVyZSBldmVudFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVG91Y2hNb3ZlZDogZnVuY3Rpb24gb25Ub3VjaE1vdmVkKHRvdWNoLCBldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciB0b3VjaExvYyA9IHRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgc2VsZi50b3VjaExvY2F0aW9uRGlzcGxheS5zdHJpbmcgPSBpMThuLnQoXCJjYXNlcy8wM19nYW1lcGxheS8wMV9wbGF5ZXJfY29udHJvbC9TcHJpdGVGb2xsb3dUb3VjaC5qcy4xXCIpICsgTWF0aC5mbG9vcih0b3VjaExvYy54KSArICcsICcgKyBNYXRoLmZsb29yKHRvdWNoTG9jLnkpICsgJyknO1xuICAgICAgICAgICAgICAgIHNlbGYubW92ZVRvUG9zID0gc2VsZi5mb2xsb3dlci5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodG91Y2hMb2MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVG91Y2hFbmRlZDogZnVuY3Rpb24gb25Ub3VjaEVuZGVkKHRvdWNoLCBldmVudCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaXNNb3ZpbmcgPSBmYWxzZTsgLy8gd2hlbiB0b3VjaCBlbmRlZCwgc3RvcCBtb3ZpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc2VsZi5ub2RlKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTW92aW5nKSByZXR1cm47XG4gICAgICAgIHZhciBvbGRQb3MgPSB0aGlzLmZvbGxvd2VyLnBvc2l0aW9uO1xuICAgICAgICAvLyBnZXQgbW92ZSBkaXJlY3Rpb25cbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGNjLnBOb3JtYWxpemUoY2MucFN1Yih0aGlzLm1vdmVUb1Bvcywgb2xkUG9zKSk7XG4gICAgICAgIC8vIG11bHRpcGx5IGRpcmVjdGlvbiB3aXRoIGRpc3RhbmNlIHRvIGdldCBuZXcgcG9zaXRpb25cbiAgICAgICAgdmFyIG5ld1BvcyA9IGNjLnBBZGQob2xkUG9zLCBjYy5wTXVsdChkaXJlY3Rpb24sIHRoaXMuZm9sbG93U3BlZWQgKiBkdCkpO1xuICAgICAgICAvLyBzZXQgbmV3IHBvc2l0aW9uXG4gICAgICAgIHRoaXMuZm9sbG93ZXIuc2V0UG9zaXRpb24obmV3UG9zKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2NjMmExdGZBdGxFV29MbWtmTGJnUVMzJywgJ1RhZ0NvbGxpZGVyTGlzdGVuZXInKTtcbi8vIGNhc2VzXFxjb2xsaWRlclxcVGFnXFxUYWdDb2xsaWRlckxpc3RlbmVyLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25FbmFibGU6IGZ1bmN0aW9uIG9uRW5hYmxlKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiBvbkRpc2FibGUoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gZmFsc2U7XG4gICAgfSxcblxuICAgIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uIG9uQ29sbGlzaW9uRW50ZXIob3RoZXIsIHNlbGYpIHtcbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSAnQ29sbGlzaW9uIG9uIHRhZyA6ICcgKyBzZWxmLnRhZztcbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdlNjk0MUhMcklWRkxva3VNVFM4SFNVbycsICdUaWxlZFNwcml0ZUNvbnRyb2wnKTtcbi8vIGNhc2VzXFwwMV9ncmFwaGljc1xcMDFfc3ByaXRlXFxUaWxlZFNwcml0ZUNvbnRyb2wuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgc3BlZWQ6IDEwMCxcblxuICAgICAgICBwcm9ncmVzc0Jhcjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ3JvdW5kOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLl91cGRhdGVXZGl0aCh0aGlzLnByb2dyZXNzQmFyLCA1MDAsIGR0KTtcbiAgICAgICAgdGhpcy5fdXBkYXRlV2RpdGgodGhpcy5ncm91bmQsIDEwMDAsIGR0KTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZVdkaXRoOiBmdW5jdGlvbiBfdXBkYXRlV2RpdGgobm9kZSwgcmFuZ2UsIGR0KSB7XG4gICAgICAgIHZhciB3aWR0aCA9IG5vZGUud2lkdGg7XG4gICAgICAgIHdpZHRoID0gd2lkdGggPCByYW5nZSA/IHdpZHRoICs9IGR0ICogdGhpcy5zcGVlZCA6IDA7XG4gICAgICAgIG5vZGUud2lkdGggPSB3aWR0aDtcbiAgICB9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnOTUwMjFYNUtqeFAzNjlPT05lMzE2c0gnLCAnVG91Y2hEcmFnZ2VyJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwM19ldmVudHNcXFRvdWNoRHJhZ2dlci5qc1xuXG52YXIgVG91Y2hEcmFnZ2VyID0gY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHByb3BhZ2F0ZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gLi4uXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMTYwO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgfSwgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgdmFyIGRlbHRhID0gZXZlbnQudG91Y2guZ2V0RGVsdGEoKTtcbiAgICAgICAgICAgIHRoaXMueCArPSBkZWx0YS54O1xuICAgICAgICAgICAgdGhpcy55ICs9IGRlbHRhLnk7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRDb21wb25lbnQoVG91Y2hEcmFnZ2VyKS5wcm9wYWdhdGUpIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9LCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm9wYWNpdHkgPSAxNjA7XG4gICAgICAgIH0sIHRoaXMubm9kZSk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdhMTRiZmFEK2dSSktyVFZqS3dpdGM1MycsICdUb3VjaEV2ZW50Jyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwM19ldmVudHNcXFRvdWNoRXZlbnQuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICBfY2FsbGJhY2s6IG51bGwsXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAxMDA7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDEwMDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDEwMDtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdkOWJmNmJGYit0Rjc3OXN0TEVtanpUVicsICdWYWx1ZVR5cGVQcm9wZXJ0aWVzJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwMV9wcm9wZXJ0aWVzXFxWYWx1ZVR5cGVQcm9wZXJ0aWVzLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gbnVtYmVyXG4gICAgICAgIG15TnVtYmVyOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IDAsXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHN0cmluZ1xuICAgICAgICBteVN0cmluZzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiAnZGVmYXVsdCB0ZXh0J1xuICAgICAgICB9LFxuICAgICAgICBteVZlYzI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogY2MuVmVjMi5aRVJPXG4gICAgICAgIH0sXG4gICAgICAgIG15Q29sb3I6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogY2MuQ29sb3IuV0hJVEVcbiAgICAgICAgfSxcbiAgICAgICAgbXlPdGhlck51bWJlcjogMCxcbiAgICAgICAgbXlPdGhlclN0cmluZzogJ25vIHR5cGUgZGVmaW5pdGlvbicsXG4gICAgICAgIG15T3RoZXJWZWMyOiBjYy5WZWMyLk9ORSxcbiAgICAgICAgbXlPdGhlckNvbG9yOiBjYy5Db2xvci5CTEFDS1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHt9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzFhMjc5b1hOb3hGRkk1MTZmc3dBYlZvJywgJ1dhbGwnKTtcbi8vIGNhc2VzXFxjb2xsaWRlclxcVXRpbHNcXFdhbGwuanNcblxudmFyIFdhbGxUeXBlID0gY2MuRW51bSh7XG4gICAgTGVmdDogMCxcbiAgICBSaWdodDogMSxcbiAgICBUb3A6IDIsXG4gICAgQm90dG9tOiAzXG59KTtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBXYWxsVHlwZS5MZWZ0LFxuICAgICAgICAgICAgdHlwZTogV2FsbFR5cGVcbiAgICAgICAgfSxcblxuICAgICAgICB3aWR0aDogNVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIHZhciBjb2xsaWRlciA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKTtcbiAgICAgICAgaWYgKCFjb2xsaWRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIHZhciB0eXBlID0gdGhpcy50eXBlO1xuXG4gICAgICAgIHZhciB3aWR0aCA9IGNjLndpblNpemUud2lkdGg7XG4gICAgICAgIHZhciBoZWlnaHQgPSBjYy53aW5TaXplLmhlaWdodDtcblxuICAgICAgICB2YXIgd2FsbFdpZHRoID0gdGhpcy53aWR0aDtcblxuICAgICAgICBpZiAodHlwZSA9PT0gV2FsbFR5cGUuTGVmdCkge1xuICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICBub2RlLndpZHRoID0gd2FsbFdpZHRoO1xuICAgICAgICAgICAgbm9kZS54ID0gMDtcbiAgICAgICAgICAgIG5vZGUueSA9IGhlaWdodCAvIDI7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gV2FsbFR5cGUuUmlnaHQpIHtcbiAgICAgICAgICAgIG5vZGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgICAgbm9kZS53aWR0aCA9IHdhbGxXaWR0aDtcbiAgICAgICAgICAgIG5vZGUueCA9IHdpZHRoO1xuICAgICAgICAgICAgbm9kZS55ID0gaGVpZ2h0IC8gMjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBXYWxsVHlwZS5Ub3ApIHtcbiAgICAgICAgICAgIG5vZGUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIG5vZGUuaGVpZ2h0ID0gd2FsbFdpZHRoO1xuICAgICAgICAgICAgbm9kZS54ID0gd2lkdGggLyAyO1xuICAgICAgICAgICAgbm9kZS55ID0gaGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFdhbGxUeXBlLkJvdHRvbSkge1xuICAgICAgICAgICAgbm9kZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgbm9kZS5oZWlnaHQgPSB3YWxsV2lkdGg7XG4gICAgICAgICAgICBub2RlLnggPSB3aWR0aCAvIDI7XG4gICAgICAgICAgICBub2RlLnkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgY29sbGlkZXIuc2l6ZSA9IG5vZGUuZ2V0Q29udGVudFNpemUoKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2RkNjU0REZQb1JOVktSV091UWRMaUVFJywgJ2VkaXRib3gnKTtcbi8vIGNhc2VzXFwwMl91aVxcMDhfZWRpdEJveFxcZWRpdGJveC5qc1xuXG52YXIgaTE4biA9IHJlcXVpcmUoJ2kxOG4nKTtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBzaW5nbGVMaW5lVGV4dDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2luZ2xlTGluZVBhc3N3b3JkOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkVkaXRCb3hcbiAgICAgICAgfSxcblxuICAgICAgICBtdWx0aUxpbmVUZXh0OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkVkaXRCb3hcbiAgICAgICAgfSxcblxuICAgICAgICBzaG93RWRpdG9yQm94TGFiZWw6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBzaW5nbGVMaW5lRWRpdEJveERpZEJlZ2luRWRpdGluZzogZnVuY3Rpb24gc2luZ2xlTGluZUVkaXRCb3hEaWRCZWdpbkVkaXRpbmcoc2VuZGVyKSB7XG4gICAgICAgIGNjLmxvZyhzZW5kZXIubm9kZS5uYW1lICsgXCIgc2luZ2xlIGxpbmUgZWRpdEJveERpZEJlZ2luRWRpdGluZ1wiKTtcbiAgICB9LFxuXG4gICAgc2luZ2xlTGluZUVkaXRCb3hEaWRDaGFuZ2VkOiBmdW5jdGlvbiBzaW5nbGVMaW5lRWRpdEJveERpZENoYW5nZWQodGV4dCwgc2VuZGVyKSB7XG4gICAgICAgIGNjLmxvZyhzZW5kZXIubm9kZS5uYW1lICsgXCIgc2luZ2xlIGxpbmUgZWRpdEJveERpZENoYW5nZWQ6IFwiICsgdGV4dCk7XG4gICAgfSxcblxuICAgIHNpbmdsZUxpbmVFZGl0Qm94RGlkRW5kRWRpdGluZzogZnVuY3Rpb24gc2luZ2xlTGluZUVkaXRCb3hEaWRFbmRFZGl0aW5nKHNlbmRlcikge1xuICAgICAgICBjYy5sb2coc2VuZGVyLm5vZGUubmFtZSArIFwiIHNpbmdsZSBsaW5lIGVkaXRCb3hEaWRFbmRFZGl0aW5nOiBcIiArIHRoaXMuc2luZ2xlTGluZVRleHQuc3RyaW5nKTtcbiAgICB9LFxuXG4gICAgc2luZ2xlTGluZVBhc3N3b3JkRWRpdEJveERpZEJlZ2luRWRpdGluZzogZnVuY3Rpb24gc2luZ2xlTGluZVBhc3N3b3JkRWRpdEJveERpZEJlZ2luRWRpdGluZyhzZW5kZXIpIHtcbiAgICAgICAgY2MubG9nKHNlbmRlci5ub2RlLm5hbWUgKyBcIiBzaW5nbGUgbGluZSBwYXNzd29yZCBlZGl0Qm94RGlkQmVnaW5FZGl0aW5nXCIpO1xuICAgIH0sXG5cbiAgICBzaW5nbGVMaW5lUGFzc3dvcmRFZGl0Qm94RGlkQ2hhbmdlZDogZnVuY3Rpb24gc2luZ2xlTGluZVBhc3N3b3JkRWRpdEJveERpZENoYW5nZWQodGV4dCwgc2VuZGVyKSB7XG4gICAgICAgIGNjLmxvZyhzZW5kZXIubm9kZS5uYW1lICsgXCIgc2luZ2xlIGxpbmUgcGFzc3dvcmQgZWRpdEJveERpZENoYW5nZWQ6IFwiICsgdGV4dCk7XG4gICAgfSxcblxuICAgIHNpbmdsZUxpbmVQYXNzd29yZEVkaXRCb3hEaWRFbmRFZGl0aW5nOiBmdW5jdGlvbiBzaW5nbGVMaW5lUGFzc3dvcmRFZGl0Qm94RGlkRW5kRWRpdGluZyhzZW5kZXIpIHtcbiAgICAgICAgY2MubG9nKHNlbmRlci5ub2RlLm5hbWUgKyBcIiBzaW5nbGUgbGluZSBwYXNzd29yZCBlZGl0Qm94RGlkRW5kRWRpdGluZzogXCIgKyB0aGlzLnNpbmdsZUxpbmVQYXNzd29yZC5zdHJpbmcpO1xuICAgIH0sXG5cbiAgICBtdWx0aUxpbmVQYXNzd29yZEVkaXRCb3hEaWRCZWdpbkVkaXRpbmc6IGZ1bmN0aW9uIG11bHRpTGluZVBhc3N3b3JkRWRpdEJveERpZEJlZ2luRWRpdGluZyhzZW5kZXIpIHtcbiAgICAgICAgY2MubG9nKHNlbmRlci5ub2RlLm5hbWUgKyBcIiBtdWx0aSBsaW5lIGVkaXRCb3hEaWRCZWdpbkVkaXRpbmdcIik7XG4gICAgfSxcblxuICAgIG11bHRpTGluZVBhc3N3b3JkRWRpdEJveERpZENoYW5nZWQ6IGZ1bmN0aW9uIG11bHRpTGluZVBhc3N3b3JkRWRpdEJveERpZENoYW5nZWQodGV4dCwgc2VuZGVyKSB7XG4gICAgICAgIGNjLmxvZyhzZW5kZXIubm9kZS5uYW1lICsgXCIgbXVsdGkgbGluZSBlZGl0Qm94RGlkQ2hhbmdlZDogXCIgKyB0ZXh0KTtcbiAgICB9LFxuXG4gICAgbXVsdGlMaW5lUGFzc3dvcmRFZGl0Qm94RGlkRW5kRWRpdGluZzogZnVuY3Rpb24gbXVsdGlMaW5lUGFzc3dvcmRFZGl0Qm94RGlkRW5kRWRpdGluZyhzZW5kZXIpIHtcbiAgICAgICAgY2MubG9nKHNlbmRlci5ub2RlLm5hbWUgKyBcIiBtdWx0aSBsaW5lIGVkaXRCb3hEaWRFbmRFZGl0aW5nOiBcIiArIHRoaXMubXVsdGlMaW5lVGV4dC5zdHJpbmcpO1xuICAgIH0sXG4gICAgYnV0dG9uQ2xpY2tlZDogZnVuY3Rpb24gYnV0dG9uQ2xpY2tlZCgpIHtcbiAgICAgICAgY2MubG9nKFwiYnV0dG9uIENsaWNrZWQhXCIpO1xuICAgICAgICBpZiAodGhpcy5zaW5nbGVMaW5lVGV4dC5zdHJpbmcgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0VkaXRvckJveExhYmVsLnN0cmluZyA9IGkxOG4udChcImNhc2VzLzAyX3VpLzA3X2VkaXRCb3gvZWRpdGJveC5qcy4xXCIpICsgdGhpcy5zaW5nbGVMaW5lVGV4dC5zdHJpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dFZGl0b3JCb3hMYWJlbC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnOTIwYzVWTHpKeEtqWUNBb0lVd1VIeW0nLCAnZW4nKTtcbi8vIGkxOG5cXGRhdGFcXGVuLmpzXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBcIlRlc3RMaXN0LmZpcmUuMzBcIjogXCJCYWNrIGxpc3RcIixcbiAgXCJUZXN0TGlzdC5maXJlLjM3XCI6IFwiVmlldyBpbnRyb1wiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9BdGxhc1Nwcml0ZS5maXJlLjdcIjogXCJUaGlzIGlzIFNwaXJ0ZSBTaW5nbGUuXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDFfc3ByaXRlL0F0bGFzU3ByaXRlLmZpcmUuMTFcIjogXCJUaGlzIGlzIFNwaXJ0ZSBGcm9tIEF0bGFzLlwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9GaWxsZWRTcHJpdGUuZmlyZS45XCI6IFwiRmlsbCBUeXBlOiBIT1JJWk9OVEFMXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDFfc3ByaXRlL0ZpbGxlZFNwcml0ZS5maXJlLjE1XCI6IFwiRmlsbCBUeXBlOiBWRVJUSUNBTFwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9GaWxsZWRTcHJpdGUuZmlyZS4yM1wiOiBcIkZJTEwgVHlwZTogUkFESUFMXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDFfc3ByaXRlL1NpbXBsZVNwcml0ZS5maXJlLjdcIjogXCJUaGlzIGlzIFNpbXBsZSBTcHJpdGUuXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDFfc3ByaXRlL1NsaWNlZFNwcml0ZS5maXJlLjdcIjogXCJUaGlzIGlzIFNsaWNlZCBTcHJpdGUuXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDFfc3ByaXRlL1RpbGVkU3ByaXRlLmZpcmUuNlwiOiBcIlRoaXMgaXMgVGlsZWQgU3ByaXRlLlwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9UcmltbWVkU3ByaXRlLmZpcmUuN1wiOiBcIlRSSU1NRUQgXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDFfc3ByaXRlL1RyaW1tZWRTcHJpdGUuZmlyZS4xMlwiOiBcIk5vIFRSSU1NRURcIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMl9wYXJ0aWNsZS9BdXRvUmVtb3ZlUGFydGljbGUuZmlyZS45XCI6IFwiUGFydGljbGUgMVxcblxcXCJBdXRvIFJlbW92ZSBPbiBGaW5pc2hcXFwiIGRpc2FibGVkXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDJfcGFydGljbGUvQXV0b1JlbW92ZVBhcnRpY2xlLmZpcmUuMTNcIjogXCJQYXJ0aWNsZSAyXFxuXFxcIkF1dG8gUmVtb3ZlIE9uIEZpbmlzaFxcXCIgZW5hYmxlZFwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAyX3BhcnRpY2xlL1RvZ2dsZVBhcnRpY2xlLmZpcmUuNlwiOiBcIlByZXNzIFxcXCJTcGFjZVxcXCIgdG8gdG9nZ2xlIHBhcnRpY2xlIHBsYXlcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS43XCI6IFwiVG9wIExlZnRcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS45XCI6IFwidG9wOiAxMCUgbGVmdDogNiVcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4xNFwiOiBcIlRvcCBMZWZ0XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuMTZcIjogXCJ0b3A6IC0zNHB4XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuMjFcIjogXCJUb3AgUmlnaHRcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4yM1wiOiBcInRvcDogMTAlIHJpZ2h0OiA2JVwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjI4XCI6IFwiTGVmdFwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjMwXCI6IFwibGVmdDogLTUwcHhcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4zNVwiOiBcIlJpZ2h0XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuMzdcIjogXCJyaWdodDogLTUwcHhcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS40MlwiOiBcIkJvdHRvbSBMZWZ0XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuNDRcIjogXCJib3R0b206IDEwJSBsZWZ0OiA2JVwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjQ5XCI6IFwiQm90dG9tXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuNTFcIjogXCJib3R0b206IC0zNHB4XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuNTZcIjogXCJCb3R0b20gUmlnaHRcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS41OFwiOiBcImJvdHRvbToxMCUgcmlnaHQ6NiVcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS42M1wiOiBcIlRoaXMgaXMgQWR2YW5jZWQgV0lkZ2V0LlwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BbGlnbk9uY2VXaWRnZXQuZmlyZS4xM1wiOiBcIkFsaWduT25jZTogdHJ1ZVwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BbGlnbk9uY2VXaWRnZXQuZmlyZS4xOVwiOiBcIkFsaWduT25jZTogZmFsc2VcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQW5pbWF0ZWRXaWRnZXQuZmlyZS45XCI6IFwiVGhpcyBpcyBBbmltYXRpb24gV2lkZ2V0LlwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BdXRvUmVzaXplLmZpcmUuMTNcIjogXCJUaGlzIGlzIFdpZGdldCBBdXRvIFJlc2l6ZS5cIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvV2lkZ2V0QWxpZ24uZmlyZS4xOFwiOiBcIlRoaXMgaXMgV2lkZ2V0IEFsaWduLlwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0dvbGRCZWF0aW5nQW5pbWUuanMuMVwiOiBcIjBcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjZcIjogXCJBbGlnbiBMYWJlbFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuOVwiOiBcIkhvcml6b250YWwgQWxpZ25cIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjE0XCI6IFwiSGVsbG8hIFxcbldlbGNvbWUgQ29tZSBUbyBcXG5Db2NvcyBDcmVhdG9yXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvQWxpZ25Gb250TGFiZWwuZmlyZS4xNlwiOiBcIkFsaWduOiBMRUZUXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvQWxpZ25Gb250TGFiZWwuZmlyZS4yMVwiOiBcIkhlbGxvISBcXG5XZWxjb21lIENvbWUgVG8gXFxuQ29jb3MgQ3JlYXRvclwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMjNcIjogXCJBbGlnbjogQ0VOVEVSXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvQWxpZ25Gb250TGFiZWwuZmlyZS4yOFwiOiBcIkhlbGxvISBcXG5XZWxjb21lIENvbWUgVG8gXFxuQ29jb3MgQ3JlYXRvclwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMzBcIjogXCJBbGlnbjogUklHSFRcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjMzXCI6IFwiVmVydGljYWwgQWxpZ25cIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjM4XCI6IFwiV2VsY29tZSBDb21lIFRvIFxcbkNvY29zIENyZWF0b3JcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjQwXCI6IFwiQWxpZ246IFRPUFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuNDVcIjogXCJXZWxjb21lIENvbWUgVG8gXFxuQ29jb3MgQ3JlYXRvclwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuNDdcIjogXCJBbGlnbjogQ0VOVEVSXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvQWxpZ25Gb250TGFiZWwuZmlyZS41MlwiOiBcIldlbGNvbWUgQ29tZSBUbyBcXG5Db2NvcyBDcmVhdG9yXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvQWxpZ25Gb250TGFiZWwuZmlyZS41NFwiOiBcIkFsaWduOiBCT1RUT01cIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS42XCI6IFwiU3lzdGVtIEZvbnRcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS45XCI6IFwiV3JhcFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjE0XCI6IFwiVGhpcyBpcyBTeXN0ZW0gRm9udFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjE2XCI6IFwiT3ZlcmZsb3c6IENMQU1QXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuMjFcIjogXCJUaGlzIGlzIFN5c3RlbSBGb250XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuMjNcIjogXCJPdmVyZmxvdzogU0hSSU5LXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuMjZcIjogXCJObyBXcmFwXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuMzFcIjogXCJUaGlzIGlzIFN5c3RlbSBGb250XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuMzNcIjogXCJPdmVyZmxvdzogQ0xBTVBcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS4zOFwiOiBcIlRoaXMgaXMgU3lzdGVtIEZvbnRcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS40MFwiOiBcIk92ZXJmbG93OiBTSFJJTktcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS40NVwiOiBcIkhlbGxvISBXZWxjb21lIENvbWUgVG8gQ29jb3MgQ3JlYXRvclwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjQ3XCI6IFwiT3ZlcmZsb3c6IFJFU1pJRV9IRUlHSFRcIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uQ29udHJvbDEuanMuMVwiOiBcIkxlZnQgYnV0dG9uIGNsaWNrZWQhXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkNvbnRyb2wxLmpzLjJcIjogXCJSaWdodCBidXR0b24gY2xpY2tlZCFcIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW50ZXJhY3RhYmxlLmZpcmUuN1wiOiBcIlBMQVlcIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW50ZXJhY3RhYmxlLmZpcmUuMTZcIjogXCJTVE9QXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkludGVyYWN0YWJsZS5maXJlLjIxXCI6IFwiaW50ZXJhY3RhYmxlOiB0cnVlXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkludGVyYWN0YWJsZS5maXJlLjIzXCI6IFwiaW50ZXJhY3RhYmxlOiBmYWxzZVwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JblNjcm9sbC5maXJlLjIxXCI6IFwiV2hpY2ggYnV0dG9uIGlzIGNsaWNrZWQ/XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkluU2Nyb2xsLmZpcmUuMjdcIjogXCJkcmFnIHRvIHJldmVhbCBtb3JlIGJ1dHRvbnNcXG5cXG5cIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW50ZXJhY3RhYmxlLmpzLjFcIjogXCJpbnRlcmFjdGFibGU6IFwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JbnRlcmFjdGFibGUuanMuMlwiOiBcImludGVyYWN0YWJsZTogXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL1NpbXBsZUJ1dHRvbi5maXJlLjZcIjogXCJXaGljaCBidXR0b24gaXMgY2xpY2tlZD9cIixcbiAgXCJjYXNlcy8wMl91aS8wNF9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5maXJlLjdcIjogXCJIb3Jpem9udGFsIGJhciB3aXRoIHByb2dyZXNzIDAuM1wiLFxuICBcImNhc2VzLzAyX3VpLzA0X3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmZpcmUuMTFcIjogXCJIb3Jpem9udGFsIGJhciByZXZlcnNlIHdpdGggcHJvZ3Jlc3MgMS4wXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDRfcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIuZmlyZS4xNVwiOiBcIlZlcnRpY2FsIGJhciBcXG5mcm9tIGJvdHRvbVwiLFxuICBcImNhc2VzLzAyX3VpLzA0X3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmZpcmUuMTlcIjogXCJWZXJ0aWNhbCBiYXIgXFxuZnJvbSB0b3BcIixcbiAgXCJjYXNlcy8wMl91aS8wNF9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5maXJlLjIzXCI6IFwiUHJvZ3Jlc3MgYmFyIHdpdGggc3ByaXRlXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDRfcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIuZmlyZS4yOFwiOiBcIlByb2dyZXNzIGJhciB3aXRoIGNoaWxkIHNwcml0ZVwiLFxuICBcImNhc2VzLzAyX3VpLzA1X3Njcm9sbFZpZXcvSXRlbS5qcy4xXCI6IFwiVG1wbCNcIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L0xpc3RWaWV3LmZpcmUuMjNcIjogXCJJdGVtICMwMFwiLFxuICBcImNhc2VzLzAyX3VpLzA1X3Njcm9sbFZpZXcvU2Nyb2xsVmlldy5maXJlLjdcIjogXCJTY3JvbGx2aWV3IGZ1bGwgZnVuY3Rpb25hbGl0eVwiLFxuICBcImNhc2VzLzAyX3VpLzA1X3Njcm9sbFZpZXcvU2Nyb2xsVmlldy5maXJlLjMwXCI6IFwiU2Nyb2xsdmlldyB3aXRob3V0IGluZXJ0aWFcIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L1Njcm9sbFZpZXcuZmlyZS41M1wiOiBcIlNjcm9sbHZpZXcgd2l0aG91dCBlbGFzdGljXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDVfc2Nyb2xsVmlldy9TY3JvbGxWaWV3LmZpcmUuNzZcIjogXCJTY3JvbGx2aWV3IGhvcml6b250YWwgc2Nyb2xsIG9ubHlcIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L1Njcm9sbFZpZXcuZmlyZS45M1wiOiBcIlNjcm9sbHZpZXcgdmVydGljYWwgb25seVwiLFxuICBcImNhc2VzLzAyX3VpLzA1X3Njcm9sbFZpZXcvU2Nyb2xsVmlldy5maXJlLjExMFwiOiBcIlNjcm9sbHZpZXcgbm8gc2Nyb2xsYmFyXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNvbnRhaW5lci5maXJlLjZcIjogXCJCYXNpY1wiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXRSZXNpemVDb250YWluZXIuZmlyZS4zMVwiOiBcIkhvcml6b250YWxcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0UmVzaXplQ29udGFpbmVyLmZpcmUuMzZcIjogXCJWZXJ0aWNhbFwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXRSZXNpemVDb250YWluZXIuZmlyZS40MVwiOiBcIkdyaWQgTGF5b3V0IEF4aXMgaG9yaXpvbnRhbFwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXRSZXNpemVDb250YWluZXIuZmlyZS40NlwiOiBcIkdyaWQgTGF5b3V0IEF4aXMgdmVydGljYWxcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0UmVzaXplQ2hpbGRyZW4uZmlyZS42XCI6IFwiSG9yaXpvbnRhbCBsYXlvdXQgbm9uZVwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXRSZXNpemVDaGlsZHJlbi5maXJlLjMxXCI6IFwiVmVydGljYWwgbGF5b3V0IG5vbmVcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0UmVzaXplQ2hpbGRyZW4uZmlyZS40OFwiOiBcIkdyaWQgc3RhcnQgYXhpcyBob3Jpem9udGFsIG5vbmVcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0UmVzaXplQ2hpbGRyZW4uZmlyZS44NVwiOiBcIkdyaWQgc3RhcnQgYXhpcyB2ZXJ0aWNhbCBub25lXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dEluU2Nyb2xsVmlldy5maXJlLjZcIjogXCJTY3JvbGxWaWV3IHdpdGggdmVydGljYWwgIGxheW91dFwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXRJblNjcm9sbFZpZXcuZmlyZS40MFwiOiBcIlNjcm9sbFZpZXcgd2l0aCBob3Jpem9udGFsIGxheW91dFwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXRJblNjcm9sbFZpZXcuZmlyZS43NFwiOiBcIlNjcm9sbFZpZXcgd2l0aCBHcmlkIExheW91dFxcbnN0YXJ0IGF4aXM6IGhvcml6b250YWwgXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dEluU2Nyb2xsVmlldy5maXJlLjE0NFwiOiBcIlNjcm9sbFZpZXcgd2l0aCBHcmlkIExheW91dFxcbnN0YXJ0IGF4aXM6IHZlcnRpY2FsIFwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXROb25lLmZpcmUuNlwiOiBcIkJhc2ljIGxheW91dCwgVHlwZTogbm9uZVxcblJlc2l6ZSBjb250YWluZXJcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0Tm9uZS5maXJlLjM1XCI6IFwiSG9yaXpvbnRhbCBsYXlvdXQgbm9uZVxcbk5vIHJlc2l6ZVwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXROb25lLmZpcmUuNjBcIjogXCJWZXJ0aWNhbCBsYXlvdXQsIFR5cGU6IG5vbmVcXG5ObyByZXNpemVcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0Tm9uZS5maXJlLjc3XCI6IFwiR3JpZCBzdGFydCBheGlzOiBob3Jpem9udGFsIFxcbk5vIHJlc2l6ZVwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXROb25lLmZpcmUuMTQyXCI6IFwiR3JpZCBzdGFydCBheGlzOiB2ZXJ0aWNhbCBcXG5ObyByZXNpemVcIixcbiAgXCJjYXNlcy8wMl91aS8wN19jaGFuZ2VfY2FudmFzX2FuY2hvci9Cb3R0b21MZWZ0QW5jaG9yLmZpcmUuOFwiOiBcIng6MCwgeTowXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDdfY2hhbmdlX2NhbnZhc19hbmNob3IvQm90dG9tTGVmdEFuY2hvci5maXJlLjEyXCI6IFwieDo0ODAsIHk6MzIwXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDdfY2hhbmdlX2NhbnZhc19hbmNob3IvQm90dG9tTGVmdEFuY2hvci5maXJlLjE2XCI6IFwieDo5NjAsIHk6NjQwXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDdfZWRpdEJveC9lZGl0Ym94LmpzLjFcIjogXCJFbnRlciBUZXh0OiBcIixcbiAgXCJjYXNlcy8wMl91aS8wN19lZGl0Qm94L0VkaXRCb3guZmlyZS4yNVwiOiBcIlNpbmdsZSBMaW5lIFBhc3N3b3JkOlwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2VkaXRCb3gvRWRpdEJveC5maXJlLjI3XCI6IFwiU2luZ2xlIExpbmUgVGV4dDpcIixcbiAgXCJjYXNlcy8wMl91aS8wN19lZGl0Qm94L0VkaXRCb3guZmlyZS4yOVwiOiBcIk11dGlwbGUgTGluZSBUZXh0OlwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2VkaXRCb3gvRWRpdEJveC5maXJlLjMyXCI6IFwiQ2xpY2tcIixcbiAgXCJjYXNlcy8wMl91aS8wN19lZGl0Qm94L0VkaXRCb3guZmlyZS4zOFwiOiBcIkJ1dHRvbiBtdXN0IGJlIG9uIHRvcCBvZiBFZGl0Qm94LCBcXG5hbmQgaXQgc2hvdWxkIGVuYWJsZSBjbGljay5cIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wMV9wbGF5ZXJfY29udHJvbC9LZXlib2FyZElucHV0LmZpcmUuNlwiOiBcIlByZXNzICdBJyBvciAnRCcgdG8gY29udHJvbCBzaGVlcFwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAxX3BsYXllcl9jb250cm9sL1RvdWNoSW5wdXQuZmlyZS4xMFwiOiBcIlRyeSB0b3VjaGluZyBhbnl3aGVyZS5cIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wMV9wbGF5ZXJfY29udHJvbC9TcHJpdGVGb2xsb3dUb3VjaC5qcy4xXCI6IFwidG91Y2ggKFwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAyX2FjdGlvbnMvU2ltcGxlQWN0aW9uLmZpcmUuMTNcIjogXCJUaGlzIGlzIFNpbXBsZSBBY3Rpb24uXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL0FuaW1hdGVDdXN0b21Qcm9wZXJ0eS5maXJlLjE0XCI6IFwiTGFiZWxcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vQW5pbWF0ZUN1c3RvbVByb3BlcnR5LmZpcmUuMThcIjogXCJUaGlzIGlzIEFuaW1hdGUgQ3VzdG9tIFByb3BlcnR5LlwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9BbmltYXRpb25FdmVudC5maXJlLjZcIjogXCJTdGFydCB0aGUgZmlyc3QgYW5pbWF0aW9uXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL0FuaW1hdGlvbkV2ZW50LmZpcmUuMTRcIjogXCJUaGlzIGlzIEFuaW1hdGlvbiBFdmVudC5cIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vQW5pbWF0aW9uRXZlbnQuanMuMVwiOiBcIlN0YXJ0IHRoZVwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9Nb3ZlQW5pbWF0aW9uLmZpcmUuMTFcIjogXCJMaW5lYXJcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vTW92ZUFuaW1hdGlvbi5maXJlLjE3XCI6IFwiQ2FzZSBJbiBFeHBvXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL01vdmVBbmltYXRpb24uZmlyZS4yM1wiOiBcIkNhc2UgT3V0IEV4cG9cIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vTW92ZUFuaW1hdGlvbi5maXJlLjI5XCI6IFwiQ2FzZSBPdXQgSW4gRXhwb1wiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9Nb3ZlQW5pbWF0aW9uLmZpcmUuMzVcIjogXCJCYWNrIEZvcndhcmRcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vTW92ZUFuaW1hdGlvbi5maXJlLjQxXCI6IFwiVGhpcyBpcyBNb3ZlIEFuaW1hdGlvbi5cIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vU3ByaXRlQW5pbWF0aW9uLmZpcmUuOVwiOiBcIlRoaXMgaXMgU3ByaWVGcmFtZSBBbmltYXRpb24uXCIsXG4gIFwiY2FzZXMvMDRfYXVkaW8vU2ltcGxlQXVkaW8uZmlyZS42XCI6IFwiRW5qb3kgdGhlIG11c2ljIVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wMV9wcm9wZXJ0aWVzL05vZGVBcnJheS5maXJlLjE0XCI6IFwiVGhpcyBpcyBOb2RlIEFycmF5LlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wMV9wcm9wZXJ0aWVzL05vblNlcmlhbGl6ZWQuZmlyZS42XCI6IFwiTGFiZWxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDFfcHJvcGVydGllcy9Ob25TZXJpYWxpemVkLmZpcmUuOFwiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvTm9uU2VyaWFsaXplZC5maXJlLjEwXCI6IFwiVGhpcyBpcyBOb24gU2VyaWFsaXplZC5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDFfcHJvcGVydGllcy9SZWZlcmVuY2VUeXBlLmZpcmUuOFwiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvUmVmZXJlbmNlVHlwZS5maXJlLjExXCI6IFwiVGhpcyBleGFtcGxlIGRvZXMgbm90IGluY2x1ZGUgdGhlIHJ1bnRpbWUgZGVtb25zdHJhdGlvblwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wMV9wcm9wZXJ0aWVzL1ZhbHVlVHlwZS5maXJlLjZcIjogXCJUaGlzIGV4YW1wbGUgZG9lcyBub3QgaW5jbHVkZSB0aGUgcnVudGltZSBkZW1vbnN0cmF0aW9uXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAyX3ByZWZhYi9JbnN0YW50aWF0ZVByZWZhYi5maXJlLjdcIjogXCJUaGlzIGlzIEluc3RhbnRpYXRlIFByZWZhYi5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL0V2ZW50SW5NYXNrLmZpcmUuMjNcIjogXCJDaGFuZ2Ugb3JkZXIgb2Ygbm9kZXNcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL1NpbXBsZUV2ZW50LmZpcmUuMTlcIjogXCJUb3VjaCBldmVudCBjYW4gc3VwcG9ydCBjbGlja1wiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wM19ldmVudHMvU2ltcGxlRXZlbnQuZmlyZS4yMVwiOiBcIk1vdXNlIGV2ZW50IGNhbiBzdXBwb3J0IGNsaWNrLCBob3Zlciwgd2hlZWxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL1NpbXBsZUV2ZW50LmZpcmUuMjNcIjogXCJDdXN0b20gZXZlbnQgY2FuIGJlIHRyaWdnZXJlZCBtYW51YWxseVxcbihDbGljayBidXR0b24gYWJvdmUpXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAzX2V2ZW50cy9TaW1wbGVFdmVudC5maXJlLjI1XCI6IFwiVGhpcyBpcyBTaW1wbGUgRXZlbnQuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAzX2V2ZW50cy9Ub3VjaFByb3BhZ2F0aW9uLmZpcmUuMTVcIjogXCJUaGlzIGlzIFRvdWNoIFByb3BhZ2F0aW9uLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNF9zY2hlZHVsZXIvc2NoZWR1bGVDYWxsYmFja3MuanMuMVwiOiBcIjUuMDAgc1wiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNF9zY2hlZHVsZXIvc2NoZWR1bGVyLmZpcmUuOVwiOiBcIjUuMDAgc1wiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNF9zY2hlZHVsZXIvc2NoZWR1bGVyLmZpcmUuMTJcIjogXCJSZXBlYXQgU2NoZWR1bGVcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDRfc2NoZWR1bGVyL3NjaGVkdWxlci5maXJlLjE4XCI6IFwiQ2FuY2VsIFNjaGVkdWxlc1wiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNF9zY2hlZHVsZXIvc2NoZWR1bGVyLmZpcmUuMjRcIjogXCJTY2hlZHVsZSBPbmNlXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA0X3NjaGVkdWxlci9zY2hlZHVsZXIuZmlyZS4yOVwiOiBcIkNvdW50ZXIgdXNlIHVwZGF0ZSBmdW5jdGlvbiB0byBjaGFuZ2Ugc3RyaW5nIHZhbHVlIGVhY2ggZnJhbWVcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDRfc2NoZWR1bGVyL3NjaGVkdWxlci5maXJlLjMxXCI6IFwiVGhpcyBpcyBTY2hlZHVsZXIuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA1X2Nyb3NzX3JlZmVyZW5jZS9Dcm9zc1JlZmVyZW5jZS5maXJlLjdcIjogXCJMYWJlbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNV9jcm9zc19yZWZlcmVuY2UvQ3Jvc3NSZWZlcmVuY2UuZmlyZS4xMlwiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA1X2Nyb3NzX3JlZmVyZW5jZS9Dcm9zc1JlZmVyZW5jZS5maXJlLjE0XCI6IFwiVGhpcyBpcyBDcm9zcyBSZWZlcmVuY2UuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA2X2xpZmVfY3ljbGUvbGlmZV9jeWNsZS5maXJlLjZcIjogXCJUaGlzIGlzIExpZmUgY3ljbGUuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuNVwiOiBcIkFzc2V0IExvYWRpbmdcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuZmlyZS45XCI6IFwiTG9hZCBTcHJpdGVGcmFtZVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjE1XCI6IFwiTG9hZCBUZXh0dXJlXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuMjFcIjogXCJMb2FkIEF1ZGlvXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuMjdcIjogXCJMb2FkIFR4dFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjMzXCI6IFwiTG9hZCBGb250XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuMzlcIjogXCJMb2FkIFBsaXN0XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuNDVcIjogXCJMb2FkIFByZWZhYlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjUxXCI6IFwiTG9hZCBTY2VuZVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjU3XCI6IFwiTG9hZCBBbmltYXRpb25cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuZmlyZS41OVwiOiBcIkxvYWQgU3BpbmVcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuZmlyZS42NVwiOiBcIk5vdCBjdXJyZW50bHkgbG9hZGVkIEVudGl0eS5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuanMuMVwiOiBcIkxvYWRlZCBcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuanMuMlwiOiBcIlBsYXkgXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmpzLjNcIjogXCJDcmVhdGUgXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmpzLjRcIjogXCJQbGF5aW5nIE11c2ljLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5qcy41XCI6IFwiVGhpcyBpcyBGb250IVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0xvYWRSZXMuZmlyZS43XCI6IFwiQnkgVHlwZVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0xvYWRSZXMuZmlyZS4xMFwiOiBcIkxvYWQgU3ByaXRlRnJhbWVcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Mb2FkUmVzLmZpcmUuMTdcIjogXCJCeSBVcmxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Mb2FkUmVzLmZpcmUuMjBcIjogXCJMb2FkIFByZWZhYlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0xvYWRSZXNBbGwuZmlyZS42XCI6IFwiTG9hZFJlc0FsbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0xvYWRSZXNBbGwuZmlyZS4yNFwiOiBcIkxvYWQgQWxsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvTG9hZFJlc0FsbC5maXJlLjMwXCI6IFwiTG9hZCBTcHJpdGVGcmFtZSBBbGxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Mb2FkUmVzQWxsLmZpcmUuMzZcIjogXCJDbGVhciBBbGxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDhfbW9kdWxlL2xvYWRfbW9kdWxlLmZpcmUuNlwiOiBcIkxvYWQgTW9kdWxlXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA4X21vZHVsZS9sb2FkX21vZHVsZS5maXJlLjEwXCI6IFwiQ3JlYXRlIE1vbnN0ZXJcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDlfc2luZ2xldG9uL1NpbmdsZXRvbi5maXJlLjZcIjogXCJUaGlzIGV4YW1wbGUgZG9lcyBub3QgaW5jbHVkZSB0aGUgcnVudGltZSBkZW1vbnN0cmF0aW9uXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzEwX2xvYWRpbmdCYXIvTG9hZGluZ0JhckN0cmwuanMuMVwiOiBcImRvd25sb2FkIGNvbXBsZXRlISFcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTBfbG9hZGluZ0Jhci9Mb2FkaW5nQmFyQ3RybC5qcy4yXCI6IFwiZG93bG9hZGluZzogXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzEwX2xvYWRpbmdCYXIvbG9hZGluZ0Jhci5maXJlLjdcIjogXCJMb2FkaW5nIENvbXBsZXRlZFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMF9sb2FkaW5nQmFyL2xvYWRpbmdCYXIuZmlyZS4xOFwiOiBcIkRvd2xvYWRpbmdcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4xXCI6IFwid2FpdGluZy4uLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjJcIjogXCJ3YWl0aW5nLi4uXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuM1wiOiBcIndhaXRpbmcuLi5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy40XCI6IFwid2FpdGluZy4uLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjVcIjogXCJXZWJTb2NrZXRcXFxcblNlbmQgQmluYXJ5IFdTIHdhcyBvcGVuZWQuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuNlwiOiBcIldlYlNvY2tldFxcXFxuUmVzcG9uc2UgZ2V0LlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjdcIjogXCJXZWJTb2NrZXRcXFxcbnNlbmRCaW5hcnkgRXJyb3Igd2FzIGZpcmVkLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjhcIjogXCJXZWJTb2NrZXRcXFxcbndlYnNvY2tldCBpbnN0YW5jZSBjbG9zZWQuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuOVwiOiBcIldlYlNvY2tldFxcXFxuU2VuZCBCaW5hcnkgV1MgaXMgd2FpdGluZy4uLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjEwXCI6IFwiV2ViU29ja2V0XFxcXG5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4xMVwiOiBcIlNvY2tldElPXFxcXG5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4xMlwiOiBcIlNvY2tldElPXFxcXG5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4xM1wiOiBcIlNvY2tldElPXFxcXG5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4xNFwiOiBcIlNvY2tldElPXFxcXG5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9uZXR3b3JrLmZpcmUuN1wiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvbmV0d29yay5maXJlLjZcIjogXCJYTUxIdHRwUmVxdWVzdFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL25ldHdvcmsuZmlyZS4xMVwiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvbmV0d29yay5maXJlLjEwXCI6IFwiWE1MSHR0cFJlcXVlc3QgKEFycmF5QnVmZmVyKVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL25ldHdvcmsuZmlyZS4xNVwiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvbmV0d29yay5maXJlLjE0XCI6IFwiV2ViU29ja2V0XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvbmV0d29yay5maXJlLjE5XCI6IFwiTGFiZWxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9uZXR3b3JrLmZpcmUuMThcIjogXCJTb2NrZXRJT1wiLFxuICBcImNhc2VzL2NvbGxpZGVyL0NhdGVnb3J5LmZpcmUuM1wiOiBcIkdyb3VwOiBDb2xsaWRlclwiLFxuICBcImNhc2VzL2NvbGxpZGVyL0NhdGVnb3J5LmZpcmUuNVwiOiBcIkdyb3VwOiBDb2xsaWRlclwiLFxuICBcImNhc2VzL2NvbGxpZGVyL0NhdGVnb3J5LmZpcmUuN1wiOiBcIkdyb3VwOiBDb2xsaWRlclwiLFxuICBcImNhc2VzL2NvbGxpZGVyL0NhdGVnb3J5LmZpcmUuOVwiOiBcIkdyb3VwOiBEZWZhdWx0XCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvU2hhcGUuZmlyZS4yMFwiOiBcIlNob3cgUG9seWdvblwiLFxuICBcImNhc2VzL2NvbGxpZGVyL1NoYXBlLmZpcmUuMjdcIjogXCJTaG93IENpcmNsZVwiLFxuICBcImNhc2VzL2NvbGxpZGVyL1NoYXBlLmZpcmUuMzRcIjogXCJTaG93IEJveFwiLFxuICBcImNhc2VzL2NvbGxpZGVyL1NoYXBlLmZpcmUuNDNcIjogXCJTaG93IFBvbHlnb25cIixcbiAgXCJjYXNlcy9jb2xsaWRlci9TaGFwZS5maXJlLjUwXCI6IFwiU2hvdyBDaXJjbGVcIixcbiAgXCJjYXNlcy9jb2xsaWRlci9TaGFwZS5maXJlLjU3XCI6IFwiU2hvdyBCb3hcIixcbiAgXCJjYXNlcy9tb3Rpb25TdHJlYWsvbW92ZU1vdGlvblN0cmVhay5maXJlLjExXCI6IFwiQ2hhbmdlIE1vdGlvblN0cmVha1wiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuMTFcIjogXCJEZWJ1ZyBTbG90c1wiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuMThcIjogXCJEZWJ1ZyBCb25lc1wiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuMjVcIjogXCJUaW1lIFNjYWxlXCIsXG4gIFwiY2FzZXMvc3BpbmUvU3BpbmVCb3kuZmlyZS4zNlwiOiBcIlN0b3BcIixcbiAgXCJjYXNlcy9zcGluZS9TcGluZUJveS5maXJlLjQzXCI6IFwiV2Fsa1wiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuNTBcIjogXCJSdW5cIixcbiAgXCJjYXNlcy9zcGluZS9TcGluZUJveS5maXJlLjU4XCI6IFwiSnVtcFwiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuNjVcIjogXCJTaG9vdFwiLFxuICBcImNhc2VzL3RpbGVkbWFwL1B1enpsZS5maXJlLjE4XCI6IFwiWW91IFdpblwiLFxuICBcImNhc2VzL3RpbGVkbWFwL1B1enpsZS5maXJlLjIxXCI6IFwiUmVzdGFydFwiLFxuICBcInJlcy9wcmVmYWJzL0xpc3RJdGVtLnByZWZhYi4yXCI6IFwiTGFiZWwgc3Nzc1wiLFxuICBcInJlcy9wcmVmYWJzL01vbnN0ZXIucHJlZmFiLjNcIjogXCJOYW1lOlwiLFxuICBcInJlcy9wcmVmYWJzL01vbnN0ZXIucHJlZmFiLjExXCI6IFwiTGV2ZWwgOlwiLFxuICBcInJlcy9wcmVmYWJzL01vbnN0ZXIucHJlZmFiLjE5XCI6IFwiSHAgOlwiLFxuICBcInJlcy9wcmVmYWJzL01vbnN0ZXIucHJlZmFiLjI3XCI6IFwiQXR0YWNrIDpcIixcbiAgXCJyZXMvcHJlZmFicy9Nb25zdGVyLnByZWZhYi4zNVwiOiBcIkRlZmVuc2UgOlwiLFxuICBcInJlcy9wcmVmYWJzL2xvYWRJdGVtLnByZWZhYi4xXCI6IFwiTGFiZWxcIixcbiAgXCJyZXNvdXJjZXMvdGVzdCBhc3NldHMvcHJlZmFiLnByZWZhYi4yXCI6IFwiVGhpcyBpcyBQcmVmYWJcIixcbiAgXCJyZXNvdXJjZXMvdGVzdCBhc3NldHMvc2NlbmUuZmlyZS4zXCI6IFwiUmV0dXJuIEFzc2V0IExvYWRpbmcgU2NlbmVcIixcbiAgXCJyZXNvdXJjZXMvdGVzdCBhc3NldHMvc2NlbmUuZmlyZS42XCI6IFwiUmV0dXJuXCIsXG4gIFwic2NyaXB0cy9HbG9iYWwvTWVudS5qcy4xXCI6IFwiVGVtcG9yYXJ5IGxhY2sgb2YgaW50cm9kdWN0aW9uXCJcbn07XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc5Mzc4OUMvc2h0SUw2ZW50WXNaUGplZScsICdpMThuJyk7XG4vLyBpMThuXFxpMThuLmpzXG5cbnZhciBQb2x5Z2xvdCA9IHJlcXVpcmUoJ3BvbHlnbG90Jyk7XG52YXIgbGFuZyA9IGNjLnN5cy5sYW5ndWFnZTtcbmlmIChsYW5nICE9PSAnemgnKSB7XG4gICAgbGFuZyA9ICdlbic7XG59XG52YXIgZGF0YSA9IHJlcXVpcmUobGFuZyk7IC8vIHVwZGF0ZSB0aGlzIHRvIHNldCB5b3VyIGRlZmF1bHQgZGlzcGxheWluZyBsYW5ndWFnZSBpbiBlZGl0b3Jcbi8vIGxldCBwb2x5Z2xvdCA9IG51bGw7XG52YXIgcG9seWdsb3QgPSBuZXcgUG9seWdsb3QoeyBwaHJhc2VzOiBkYXRhLCBhbGxvd01pc3Npbmc6IHRydWUgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGFsbG93IHlvdSB0byBzd2l0Y2ggbGFuZ3VhZ2UgZHVyaW5nIHJ1bnRpbWUsIGxhbmd1YWdlIGFyZ3VtZW50IHNob3VsZCBiZSB0aGUgc2FtZSBhcyB5b3VyIGRhdGEgZmlsZSBuYW1lXG4gICAgICogc3VjaCBhcyB3aGVuIGxhbmd1YWdlIGlzICd6aCcsIGl0IHdpbGwgbG9hZCB5b3VyICd6aC5qcycgZGF0YSBzb3VyY2UuXG4gICAgICogQG1ldGhvZCBpbml0XG4gICAgICogQHBhcmFtIGxhbmd1YWdlIC0gdGhlIGxhbmd1YWdlIHNwZWNpZmljIGRhdGEgZmlsZSBuYW1lLCBzdWNoIGFzICd6aCcgdG8gbG9hZCAnemguanMnXG4gICAgICovXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChsYW5ndWFnZSkge1xuICAgICAgICBsYW5nID0gbGFuZ3VhZ2U7XG4gICAgICAgIGRhdGEgPSByZXF1aXJlKGxhbmcpO1xuICAgICAgICBwb2x5Z2xvdC5yZXBsYWNlKGRhdGEpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogdGhpcyBtZXRob2QgdGFrZXMgYSB0ZXh0IGtleSBhcyBpbnB1dCwgYW5kIHJldHVybiB0aGUgbG9jYWxpemVkIHN0cmluZ1xuICAgICAqIFBsZWFzZSByZWFkIGh0dHBzOi8vZ2l0aHViLmNvbS9haXJibmIvcG9seWdsb3QuanMgZm9yIGRldGFpbHNcbiAgICAgKiBAbWV0aG9kIHRcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGxvY2FsaXplZCBzdHJpbmdcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogdmFyIG15VGV4dCA9IGkxOG4udCgnTVlfVEVYVF9LRVknKTtcbiAgICAgKlxuICAgICAqIC8vIGlmIHlvdXIgZGF0YSBzb3VyY2UgaXMgZGVmaW5lZCBhc1xuICAgICAqIC8vIHtcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwifVxuICAgICAqIC8vIHlvdSBjYW4gdXNlIHRoZSBmb2xsb3dpbmcgdG8gaW50ZXJwb2xhdGUgdGhlIHRleHRcbiAgICAgKiB2YXIgZ3JlZXRpbmdUZXh0ID0gaTE4bi50KCdoZWxsb19uYW1lJywge25hbWU6ICduYW50YXMnfSk7IC8vIEhlbGxvLCBuYW50YXNcbiAgICAgKi9cbiAgICB0OiBmdW5jdGlvbiB0KGtleSwgb3B0KSB7XG4gICAgICAgIHJldHVybiBwb2x5Z2xvdC50KGtleSwgb3B0KTtcbiAgICB9XG59O1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZmVlM2RjTG9hWkN2cko5RlpyQm5nYmInLCAnbG9hZFJlc0FsbF9leGFtcGxlJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwN19hc3NldF9sb2FkaW5nXFxsb2FkUmVzQWxsX2V4YW1wbGUuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGJ0bkNsZWFyQWxsOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBzY3JvbGxWaWV3OiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNjcm9sbFZpZXdcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XG4gICAgICAgIHRoaXMuY29udGVudC5oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLmJ0bkNsZWFyQWxsLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBfY3JlYXRlTGFiZWw6IGZ1bmN0aW9uIF9jcmVhdGVMYWJlbCh0ZXh0KSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5sYWJlbCk7XG4gICAgICAgIHZhciBsYWJlbCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gdGV4dDtcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZENoaWxkKG5vZGUpO1xuICAgIH0sXG5cbiAgICBfY2xlYXI6IGZ1bmN0aW9uIF9jbGVhcigpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKHRydWUpO1xuICAgICAgICBjYy5sb2FkZXIucmVsZWFzZUFsbCgpO1xuICAgIH0sXG5cbiAgICBvbkNsZWFyQWxsOiBmdW5jdGlvbiBvbkNsZWFyQWxsKCkge1xuICAgICAgICB0aGlzLmNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5jb250ZW50LmhlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuYnRuQ2xlYXJBbGwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgfSxcblxuICAgIG9uTG9hZEFsbDogZnVuY3Rpb24gb25Mb2FkQWxsKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgICAgIHNlbGYuX2NyZWF0ZUxhYmVsKFwiTG9hZCBBbGwgQXNzZXRzXCIpO1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0FsbChcInRlc3QgYXNzZXRzXCIsIGZ1bmN0aW9uIChlcnIsIGFzc2V0cykge1xuICAgICAgICAgICAgY2MubG9nKGFzc2V0cy5sZW5ndGgpO1xuICAgICAgICAgICAgc2VsZi5jb3VudCA9IGFzc2V0cy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IFwiXCI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXNzZXRzW2ldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gYXNzZXRzW2ldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBhc3NldHNbaV0udXJsIHx8IGFzc2V0c1tpXS5uYW1lIHx8IGFzc2V0c1tpXSB8fCB0ZXh0dXJlRmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuX2NyZWF0ZUxhYmVsKFwiYXNzZXQ6IFwiICsgdGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmJ0bkNsZWFyQWxsLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmNvbnRlbnQuaGVpZ2h0ID0gc2VsZi5jb3VudCAqIDYwO1xuICAgICAgICAgICAgc2VsZi5zY3JvbGxWaWV3LnNjcm9sbFRvVG9wKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBvbkxvYWRTcHJpdGVGcmFtZUFsbDogZnVuY3Rpb24gb25Mb2FkU3ByaXRlRnJhbWVBbGwoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fY2xlYXIoKTtcbiAgICAgICAgc2VsZi5fY3JlYXRlTGFiZWwoXCJMb2FkIEFsbCBTcHJpdGUgRnJhbWVcIik7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQWxsKFwidGVzdCBhc3NldHNcIiwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIGFzc2V0cykge1xuICAgICAgICAgICAgc2VsZi5jb3VudCA9IGFzc2V0cy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IFwiXCI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXNzZXRzW2ldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gYXNzZXRzW2ldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBhc3NldHNbaV0udXJsIHx8IGFzc2V0c1tpXS5fbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5fY3JlYXRlTGFiZWwoXCJzcHJpdGUgZnJhbWU6IFwiICsgdGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmJ0bkNsZWFyQWxsLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmNvbnRlbnQuaGVpZ2h0ID0gc2VsZi5jb3VudCAqIDIwO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZjc3MjJ6bEtQNUhvS01ZNVZ2V1BDT04nLCAnbW90aW9uU3RyZWFrQ3RybCcpO1xuLy8gY2FzZXNcXG1vdGlvblN0cmVha1xcbW90aW9uU3RyZWFrQ3RybC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbW90aW9uU3RyZWFrOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk1vdGlvblN0cmVha1xuICAgICAgICB9LFxuXG4gICAgICAgIG5ld1RleHR1cmU6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5UZXh0dXJlMkRcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5fY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub2xkVGV4dHVyZSA9IHRoaXMubW90aW9uU3RyZWFrLnRleHR1cmU7XG4gICAgfSxcblxuICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIG9uQ2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnNldE1vdGlvblN0cmVhaygyLCAzLCAyMCwgdGhpcy5uZXdUZXh0dXJlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TW90aW9uU3RyZWFrKDAuNSwgMSwgMzAsIHRoaXMub2xkVGV4dHVyZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2hhbmdlZCA9ICF0aGlzLl9jaGFuZ2VkO1xuICAgIH0sXG5cbiAgICBzZXRNb3Rpb25TdHJlYWs6IGZ1bmN0aW9uIHNldE1vdGlvblN0cmVhayhmYWRlVGltZSwgbWluU2VnLCBzdHJva2UsIHRleHR1cmUpIHtcbiAgICAgICAgdGhpcy5tb3Rpb25TdHJlYWsuZmFkZVRpbWUgPSBmYWRlVGltZTtcbiAgICAgICAgdGhpcy5tb3Rpb25TdHJlYWsubWluU2VnID0gbWluU2VnO1xuICAgICAgICB0aGlzLm1vdGlvblN0cmVhay5zdHJva2UgPSBzdHJva2U7XG4gICAgICAgIHRoaXMubW90aW9uU3RyZWFrLnRleHR1cmUgPSB0ZXh0dXJlO1xuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc2OWRlY1NncFJsRTFyekVLcDBSekczVicsICdwb2x5Z2xvdCcpO1xuLy8gaTE4blxccG9seWdsb3QuanNcblxuLy8gICAgIChjKSAyMDEyLTIwMTYgQWlyYm5iLCBJbmMuXG4vL1xuLy8gICAgIHBvbHlnbG90LmpzIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBCU0Rcbi8vICAgICBsaWNlbnNlLiBGb3IgYWxsIGxpY2Vuc2luZyBpbmZvcm1hdGlvbiwgZGV0YWlscywgYW5kIGRvY3VtZW50aW9uOlxuLy8gICAgIGh0dHA6Ly9haXJibmIuZ2l0aHViLmNvbS9wb2x5Z2xvdC5qc1xuLy9cbi8vXG4vLyBQb2x5Z2xvdC5qcyBpcyBhbiBJMThuIGhlbHBlciBsaWJyYXJ5IHdyaXR0ZW4gaW4gSmF2YVNjcmlwdCwgbWFkZSB0b1xuLy8gd29yayBib3RoIGluIHRoZSBicm93c2VyIGFuZCBpbiBOb2RlLiBJdCBwcm92aWRlcyBhIHNpbXBsZSBzb2x1dGlvbiBmb3Jcbi8vIGludGVycG9sYXRpb24gYW5kIHBsdXJhbGl6YXRpb24sIGJhc2VkIG9mZiBvZiBBaXJibmInc1xuLy8gZXhwZXJpZW5jZSBhZGRpbmcgSTE4biBmdW5jdGlvbmFsaXR5IHRvIGl0cyBCYWNrYm9uZS5qcyBhbmQgTm9kZSBhcHBzLlxuLy9cbi8vIFBvbHlsZ2xvdCBpcyBhZ25vc3RpYyB0byB5b3VyIHRyYW5zbGF0aW9uIGJhY2tlbmQuIEl0IGRvZXNuJ3QgcGVyZm9ybSBhbnlcbi8vIHRyYW5zbGF0aW9uOyBpdCBzaW1wbHkgZ2l2ZXMgeW91IGEgd2F5IHRvIG1hbmFnZSB0cmFuc2xhdGVkIHBocmFzZXMgZnJvbVxuLy8geW91ciBjbGllbnQtIG9yIHNlcnZlci1zaWRlIEphdmFTY3JpcHQgYXBwbGljYXRpb24uXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeShyb290KTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkocm9vdCk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5Qb2x5Z2xvdCA9IGZhY3Rvcnkocm9vdCk7XG4gIH1cbn0pKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdGhpcywgZnVuY3Rpb24gKHJvb3QpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xuXG4gIC8vICMjIyBQb2x5Z2xvdCBjbGFzcyBjb25zdHJ1Y3RvclxuICBmdW5jdGlvbiBQb2x5Z2xvdChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5waHJhc2VzID0ge307XG4gICAgdGhpcy5leHRlbmQob3B0aW9ucy5waHJhc2VzIHx8IHt9KTtcbiAgICB0aGlzLmN1cnJlbnRMb2NhbGUgPSBvcHRpb25zLmxvY2FsZSB8fCAnZW4nO1xuICAgIHRoaXMuYWxsb3dNaXNzaW5nID0gISFvcHRpb25zLmFsbG93TWlzc2luZztcbiAgICB0aGlzLndhcm4gPSBvcHRpb25zLndhcm4gfHwgd2FybjtcbiAgfVxuXG4gIC8vICMjIyBWZXJzaW9uXG4gIFBvbHlnbG90LlZFUlNJT04gPSAnMS4wLjAnO1xuXG4gIC8vICMjIyBwb2x5Z2xvdC5sb2NhbGUoW2xvY2FsZV0pXG4gIC8vXG4gIC8vIEdldCBvciBzZXQgbG9jYWxlLiBJbnRlcm5hbGx5LCBQb2x5Z2xvdCBvbmx5IHVzZXMgbG9jYWxlIGZvciBwbHVyYWxpemF0aW9uLlxuICBQb2x5Z2xvdC5wcm90b3R5cGUubG9jYWxlID0gZnVuY3Rpb24gKG5ld0xvY2FsZSkge1xuICAgIGlmIChuZXdMb2NhbGUpIHRoaXMuY3VycmVudExvY2FsZSA9IG5ld0xvY2FsZTtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TG9jYWxlO1xuICB9O1xuXG4gIC8vICMjIyBwb2x5Z2xvdC5leHRlbmQocGhyYXNlcylcbiAgLy9cbiAgLy8gVXNlIGBleHRlbmRgIHRvIHRlbGwgUG9seWdsb3QgaG93IHRvIHRyYW5zbGF0ZSBhIGdpdmVuIGtleS5cbiAgLy9cbiAgLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4gIC8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuICAvLyAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiXG4gIC8vICAgICB9KTtcbiAgLy9cbiAgLy8gVGhlIGtleSBjYW4gYmUgYW55IHN0cmluZy4gIEZlZWwgZnJlZSB0byBjYWxsIGBleHRlbmRgIG11bHRpcGxlIHRpbWVzO1xuICAvLyBpdCB3aWxsIG92ZXJyaWRlIGFueSBwaHJhc2VzIHdpdGggdGhlIHNhbWUga2V5LCBidXQgbGVhdmUgZXhpc3RpbmcgcGhyYXNlc1xuICAvLyB1bnRvdWNoZWQuXG4gIC8vXG4gIC8vIEl0IGlzIGFsc28gcG9zc2libGUgdG8gcGFzcyBuZXN0ZWQgcGhyYXNlIG9iamVjdHMsIHdoaWNoIGdldCBmbGF0dGVuZWRcbiAgLy8gaW50byBhbiBvYmplY3Qgd2l0aCB0aGUgbmVzdGVkIGtleXMgY29uY2F0ZW5hdGVkIHVzaW5nIGRvdCBub3RhdGlvbi5cbiAgLy9cbiAgLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4gIC8vICAgICAgIFwibmF2XCI6IHtcbiAgLy8gICAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbiAgLy8gICAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiLFxuICAvLyAgICAgICAgIFwic2lkZWJhclwiOiB7XG4gIC8vICAgICAgICAgICBcIndlbGNvbWVcIjogXCJXZWxjb21lXCJcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH0pO1xuICAvL1xuICAvLyAgICAgY29uc29sZS5sb2cocG9seWdsb3QucGhyYXNlcyk7XG4gIC8vICAgICAvLyB7XG4gIC8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuICAvLyAgICAgLy8gICAnbmF2LmhlbGxvX25hbWUnOiAnSGVsbG8sICV7bmFtZX0nLFxuICAvLyAgICAgLy8gICAnbmF2LnNpZGViYXIud2VsY29tZSc6ICdXZWxjb21lJ1xuICAvLyAgICAgLy8gfVxuICAvL1xuICAvLyBgZXh0ZW5kYCBhY2NlcHRzIGFuIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudCwgYHByZWZpeGAsIHdoaWNoIGNhbiBiZSB1c2VkXG4gIC8vIHRvIHByZWZpeCBldmVyeSBrZXkgaW4gdGhlIHBocmFzZXMgb2JqZWN0IHdpdGggc29tZSBzdHJpbmcsIHVzaW5nIGRvdFxuICAvLyBub3RhdGlvbi5cbiAgLy9cbiAgLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4gIC8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuICAvLyAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiXG4gIC8vICAgICB9LCBcIm5hdlwiKTtcbiAgLy9cbiAgLy8gICAgIGNvbnNvbGUubG9nKHBvbHlnbG90LnBocmFzZXMpO1xuICAvLyAgICAgLy8ge1xuICAvLyAgICAgLy8gICAnbmF2LmhlbGxvJzogJ0hlbGxvJyxcbiAgLy8gICAgIC8vICAgJ25hdi5oZWxsb19uYW1lJzogJ0hlbGxvLCAle25hbWV9J1xuICAvLyAgICAgLy8gfVxuICAvL1xuICAvLyBUaGlzIGZlYXR1cmUgaXMgdXNlZCBpbnRlcm5hbGx5IHRvIHN1cHBvcnQgbmVzdGVkIHBocmFzZSBvYmplY3RzLlxuICBQb2x5Z2xvdC5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgICB2YXIgcGhyYXNlO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG1vcmVQaHJhc2VzKSB7XG4gICAgICBpZiAobW9yZVBocmFzZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBwaHJhc2UgPSBtb3JlUGhyYXNlc1trZXldO1xuICAgICAgICBpZiAocHJlZml4KSBrZXkgPSBwcmVmaXggKyAnLicgKyBrZXk7XG4gICAgICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRoaXMuZXh0ZW5kKHBocmFzZSwga2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBocmFzZXNba2V5XSA9IHBocmFzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyAjIyMgcG9seWdsb3QudW5zZXQocGhyYXNlcylcbiAgLy8gVXNlIGB1bnNldGAgdG8gc2VsZWN0aXZlbHkgcmVtb3ZlIGtleXMgZnJvbSBhIHBvbHlnbG90IGluc3RhbmNlLlxuICAvL1xuICAvLyAgICAgcG9seWdsb3QudW5zZXQoXCJzb21lX2tleVwiKTtcbiAgLy8gICAgIHBvbHlnbG90LnVuc2V0KHtcbiAgLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4gIC8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbiAgLy8gICAgIH0pO1xuICAvL1xuICAvLyBUaGUgdW5zZXQgbWV0aG9kIGNhbiB0YWtlIGVpdGhlciBhIHN0cmluZyAoZm9yIHRoZSBrZXkpLCBvciBhbiBvYmplY3QgaGFzaCB3aXRoXG4gIC8vIHRoZSBrZXlzIHRoYXQgeW91IHdvdWxkIGxpa2UgdG8gdW5zZXQuXG4gIFBvbHlnbG90LnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uIChtb3JlUGhyYXNlcywgcHJlZml4KSB7XG4gICAgdmFyIHBocmFzZTtcblxuICAgIGlmICh0eXBlb2YgbW9yZVBocmFzZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkZWxldGUgdGhpcy5waHJhc2VzW21vcmVQaHJhc2VzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIga2V5IGluIG1vcmVQaHJhc2VzKSB7XG4gICAgICAgIGlmIChtb3JlUGhyYXNlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgcGhyYXNlID0gbW9yZVBocmFzZXNba2V5XTtcbiAgICAgICAgICBpZiAocHJlZml4KSBrZXkgPSBwcmVmaXggKyAnLicgKyBrZXk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLnVuc2V0KHBocmFzZSwga2V5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMucGhyYXNlc1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyAjIyMgcG9seWdsb3QuY2xlYXIoKVxuICAvL1xuICAvLyBDbGVhcnMgYWxsIHBocmFzZXMuIFVzZWZ1bCBmb3Igc3BlY2lhbCBjYXNlcywgc3VjaCBhcyBmcmVlaW5nXG4gIC8vIHVwIG1lbW9yeSBpZiB5b3UgaGF2ZSBsb3RzIG9mIHBocmFzZXMgYnV0IG5vIGxvbmdlciBuZWVkIHRvXG4gIC8vIHBlcmZvcm0gYW55IHRyYW5zbGF0aW9uLiBBbHNvIHVzZWQgaW50ZXJuYWxseSBieSBgcmVwbGFjZWAuXG4gIFBvbHlnbG90LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnBocmFzZXMgPSB7fTtcbiAgfTtcblxuICAvLyAjIyMgcG9seWdsb3QucmVwbGFjZShwaHJhc2VzKVxuICAvL1xuICAvLyBDb21wbGV0ZWx5IHJlcGxhY2UgdGhlIGV4aXN0aW5nIHBocmFzZXMgd2l0aCBhIG5ldyBzZXQgb2YgcGhyYXNlcy5cbiAgLy8gTm9ybWFsbHksIGp1c3QgdXNlIGBleHRlbmRgIHRvIGFkZCBtb3JlIHBocmFzZXMsIGJ1dCB1bmRlciBjZXJ0YWluXG4gIC8vIGNpcmN1bXN0YW5jZXMsIHlvdSBtYXkgd2FudCB0byBtYWtlIHN1cmUgbm8gb2xkIHBocmFzZXMgYXJlIGx5aW5nIGFyb3VuZC5cbiAgUG9seWdsb3QucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAobmV3UGhyYXNlcykge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLmV4dGVuZChuZXdQaHJhc2VzKTtcbiAgfTtcblxuICAvLyAjIyMgcG9seWdsb3QudChrZXksIG9wdGlvbnMpXG4gIC8vXG4gIC8vIFRoZSBtb3N0LXVzZWQgbWV0aG9kLiBQcm92aWRlIGEga2V5LCBhbmQgYHRgIHdpbGwgcmV0dXJuIHRoZVxuICAvLyBwaHJhc2UuXG4gIC8vXG4gIC8vICAgICBwb2x5Z2xvdC50KFwiaGVsbG9cIik7XG4gIC8vICAgICA9PiBcIkhlbGxvXCJcbiAgLy9cbiAgLy8gVGhlIHBocmFzZSB2YWx1ZSBpcyBwcm92aWRlZCBmaXJzdCBieSBhIGNhbGwgdG8gYHBvbHlnbG90LmV4dGVuZCgpYCBvclxuICAvLyBgcG9seWdsb3QucmVwbGFjZSgpYC5cbiAgLy9cbiAgLy8gUGFzcyBpbiBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBwZXJmb3JtIGludGVycG9sYXRpb24uXG4gIC8vXG4gIC8vICAgICBwb2x5Z2xvdC50KFwiaGVsbG9fbmFtZVwiLCB7bmFtZTogXCJTcGlrZVwifSk7XG4gIC8vICAgICA9PiBcIkhlbGxvLCBTcGlrZVwiXG4gIC8vXG4gIC8vIElmIHlvdSBsaWtlLCB5b3UgY2FuIHByb3ZpZGUgYSBkZWZhdWx0IHZhbHVlIGluIGNhc2UgdGhlIHBocmFzZSBpcyBtaXNzaW5nLlxuICAvLyBVc2UgdGhlIHNwZWNpYWwgb3B0aW9uIGtleSBcIl9cIiB0byBzcGVjaWZ5IGEgZGVmYXVsdC5cbiAgLy9cbiAgLy8gICAgIHBvbHlnbG90LnQoXCJpX2xpa2VfdG9fd3JpdGVfaW5fbGFuZ3VhZ2VcIiwge1xuICAvLyAgICAgICBfOiBcIkkgbGlrZSB0byB3cml0ZSBpbiAle2xhbmd1YWdlfS5cIixcbiAgLy8gICAgICAgbGFuZ3VhZ2U6IFwiSmF2YVNjcmlwdFwiXG4gIC8vICAgICB9KTtcbiAgLy8gICAgID0+IFwiSSBsaWtlIHRvIHdyaXRlIGluIEphdmFTY3JpcHQuXCJcbiAgLy9cbiAgUG9seWdsb3QucHJvdG90eXBlLnQgPSBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG4gICAgdmFyIHBocmFzZSwgcmVzdWx0O1xuICAgIG9wdGlvbnMgPSBvcHRpb25zID09IG51bGwgPyB7fSA6IG9wdGlvbnM7XG4gICAgLy8gYWxsb3cgbnVtYmVyIGFzIGEgcGx1cmFsaXphdGlvbiBzaG9ydGN1dFxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcicpIHtcbiAgICAgIG9wdGlvbnMgPSB7IHNtYXJ0X2NvdW50OiBvcHRpb25zIH07XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5waHJhc2VzW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICBwaHJhc2UgPSB0aGlzLnBocmFzZXNba2V5XTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLl8gPT09ICdzdHJpbmcnKSB7XG4gICAgICBwaHJhc2UgPSBvcHRpb25zLl87XG4gICAgfSBlbHNlIGlmICh0aGlzLmFsbG93TWlzc2luZykge1xuICAgICAgcGhyYXNlID0ga2V5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndhcm4oJ01pc3NpbmcgdHJhbnNsYXRpb24gZm9yIGtleTogXCInICsga2V5ICsgJ1wiJyk7XG4gICAgICByZXN1bHQgPSBrZXk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnc3RyaW5nJykge1xuICAgICAgb3B0aW9ucyA9IGNsb25lKG9wdGlvbnMpO1xuICAgICAgcmVzdWx0ID0gY2hvb3NlUGx1cmFsRm9ybShwaHJhc2UsIHRoaXMuY3VycmVudExvY2FsZSwgb3B0aW9ucy5zbWFydF9jb3VudCk7XG4gICAgICByZXN1bHQgPSBpbnRlcnBvbGF0ZShyZXN1bHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vICMjIyBwb2x5Z2xvdC5oYXMoa2V5KVxuICAvL1xuICAvLyBDaGVjayBpZiBwb2x5Z2xvdCBoYXMgYSB0cmFuc2xhdGlvbiBmb3IgZ2l2ZW4ga2V5XG4gIFBvbHlnbG90LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGtleSBpbiB0aGlzLnBocmFzZXM7XG4gIH07XG5cbiAgLy8gIyMjIyBQbHVyYWxpemF0aW9uIG1ldGhvZHNcbiAgLy8gVGhlIHN0cmluZyB0aGF0IHNlcGFyYXRlcyB0aGUgZGlmZmVyZW50IHBocmFzZSBwb3NzaWJpbGl0aWVzLlxuICB2YXIgZGVsaW1ldGVyID0gJ3x8fHwnO1xuXG4gIC8vIE1hcHBpbmcgZnJvbSBwbHVyYWxpemF0aW9uIGdyb3VwIHBsdXJhbCBsb2dpYy5cbiAgdmFyIHBsdXJhbFR5cGVzID0ge1xuICAgIGNoaW5lc2U6IGZ1bmN0aW9uIGNoaW5lc2Uobikge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSxcbiAgICBnZXJtYW46IGZ1bmN0aW9uIGdlcm1hbihuKSB7XG4gICAgICByZXR1cm4gbiAhPT0gMSA/IDEgOiAwO1xuICAgIH0sXG4gICAgZnJlbmNoOiBmdW5jdGlvbiBmcmVuY2gobikge1xuICAgICAgcmV0dXJuIG4gPiAxID8gMSA6IDA7XG4gICAgfSxcbiAgICBydXNzaWFuOiBmdW5jdGlvbiBydXNzaWFuKG4pIHtcbiAgICAgIHJldHVybiBuICUgMTAgPT09IDEgJiYgbiAlIDEwMCAhPT0gMTEgPyAwIDogbiAlIDEwID49IDIgJiYgbiAlIDEwIDw9IDQgJiYgKG4gJSAxMDAgPCAxMCB8fCBuICUgMTAwID49IDIwKSA/IDEgOiAyO1xuICAgIH0sXG4gICAgY3plY2g6IGZ1bmN0aW9uIGN6ZWNoKG4pIHtcbiAgICAgIHJldHVybiBuID09PSAxID8gMCA6IG4gPj0gMiAmJiBuIDw9IDQgPyAxIDogMjtcbiAgICB9LFxuICAgIHBvbGlzaDogZnVuY3Rpb24gcG9saXNoKG4pIHtcbiAgICAgIHJldHVybiBuID09PSAxID8gMCA6IG4gJSAxMCA+PSAyICYmIG4gJSAxMCA8PSA0ICYmIChuICUgMTAwIDwgMTAgfHwgbiAlIDEwMCA+PSAyMCkgPyAxIDogMjtcbiAgICB9LFxuICAgIGljZWxhbmRpYzogZnVuY3Rpb24gaWNlbGFuZGljKG4pIHtcbiAgICAgIHJldHVybiBuICUgMTAgIT09IDEgfHwgbiAlIDEwMCA9PT0gMTEgPyAxIDogMDtcbiAgICB9XG4gIH07XG5cbiAgLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgdG8gaW5kaXZpZHVhbCBsb2NhbGVzLlxuICB2YXIgcGx1cmFsVHlwZVRvTGFuZ3VhZ2VzID0ge1xuICAgIGNoaW5lc2U6IFsnZmEnLCAnaWQnLCAnamEnLCAna28nLCAnbG8nLCAnbXMnLCAndGgnLCAndHInLCAnemgnXSxcbiAgICBnZXJtYW46IFsnZGEnLCAnZGUnLCAnZW4nLCAnZXMnLCAnZmknLCAnZWwnLCAnaGUnLCAnaHUnLCAnaXQnLCAnbmwnLCAnbm8nLCAncHQnLCAnc3YnXSxcbiAgICBmcmVuY2g6IFsnZnInLCAndGwnLCAncHQtYnInXSxcbiAgICBydXNzaWFuOiBbJ2hyJywgJ3J1J10sXG4gICAgY3plY2g6IFsnY3MnLCAnc2snXSxcbiAgICBwb2xpc2g6IFsncGwnXSxcbiAgICBpY2VsYW5kaWM6IFsnaXMnXVxuICB9O1xuXG4gIGZ1bmN0aW9uIGxhbmdUb1R5cGVNYXAobWFwcGluZykge1xuICAgIHZhciB0eXBlLFxuICAgICAgICBsYW5ncyxcbiAgICAgICAgbCxcbiAgICAgICAgcmV0ID0ge307XG4gICAgZm9yICh0eXBlIGluIG1hcHBpbmcpIHtcbiAgICAgIGlmIChtYXBwaW5nLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgICAgIGxhbmdzID0gbWFwcGluZ1t0eXBlXTtcbiAgICAgICAgZm9yIChsIGluIGxhbmdzKSB7XG4gICAgICAgICAgcmV0W2xhbmdzW2xdXSA9IHR5cGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFRyaW0gYSBzdHJpbmcuXG4gIHZhciB0cmltUmUgPSAvXlxccyt8XFxzKyQvZztcbiAgZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgICByZXR1cm4gcmVwbGFjZS5jYWxsKHN0ciwgdHJpbVJlLCAnJyk7XG4gIH1cblxuICAvLyBCYXNlZCBvbiBhIHBocmFzZSB0ZXh0IHRoYXQgY29udGFpbnMgYG5gIHBsdXJhbCBmb3JtcyBzZXBhcmF0ZWRcbiAgLy8gYnkgYGRlbGltZXRlcmAsIGEgYGxvY2FsZWAsIGFuZCBhIGBjb3VudGAsIGNob29zZSB0aGUgY29ycmVjdFxuICAvLyBwbHVyYWwgZm9ybSwgb3Igbm9uZSBpZiBgY291bnRgIGlzIGBudWxsYC5cbiAgZnVuY3Rpb24gY2hvb3NlUGx1cmFsRm9ybSh0ZXh0LCBsb2NhbGUsIGNvdW50KSB7XG4gICAgdmFyIHJldCwgdGV4dHMsIGNob3NlblRleHQ7XG4gICAgaWYgKGNvdW50ICE9IG51bGwgJiYgdGV4dCkge1xuICAgICAgdGV4dHMgPSB0ZXh0LnNwbGl0KGRlbGltZXRlcik7XG4gICAgICBjaG9zZW5UZXh0ID0gdGV4dHNbcGx1cmFsVHlwZUluZGV4KGxvY2FsZSwgY291bnQpXSB8fCB0ZXh0c1swXTtcbiAgICAgIHJldCA9IHRyaW0oY2hvc2VuVGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldCA9IHRleHQ7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBmdW5jdGlvbiBwbHVyYWxUeXBlTmFtZShsb2NhbGUpIHtcbiAgICB2YXIgbGFuZ1RvUGx1cmFsVHlwZSA9IGxhbmdUb1R5cGVNYXAocGx1cmFsVHlwZVRvTGFuZ3VhZ2VzKTtcbiAgICByZXR1cm4gbGFuZ1RvUGx1cmFsVHlwZVtsb2NhbGVdIHx8IGxhbmdUb1BsdXJhbFR5cGUuZW47XG4gIH1cblxuICBmdW5jdGlvbiBwbHVyYWxUeXBlSW5kZXgobG9jYWxlLCBjb3VudCkge1xuICAgIHJldHVybiBwbHVyYWxUeXBlc1twbHVyYWxUeXBlTmFtZShsb2NhbGUpXShjb3VudCk7XG4gIH1cblxuICAvLyAjIyMgaW50ZXJwb2xhdGVcbiAgLy9cbiAgLy8gRG9lcyB0aGUgZGlydHkgd29yay4gQ3JlYXRlcyBhIGBSZWdFeHBgIG9iamVjdCBmb3IgZWFjaFxuICAvLyBpbnRlcnBvbGF0aW9uIHBsYWNlaG9sZGVyLlxuICB2YXIgZG9sbGFyUmVnZXggPSAvXFwkL2c7XG4gIHZhciBkb2xsYXJCaWxsc1lhbGwgPSAnJCQkJCc7XG4gIGZ1bmN0aW9uIGludGVycG9sYXRlKHBocmFzZSwgb3B0aW9ucykge1xuICAgIGZvciAodmFyIGFyZyBpbiBvcHRpb25zKSB7XG4gICAgICBpZiAoYXJnICE9PSAnXycgJiYgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShhcmcpKSB7XG4gICAgICAgIC8vIEVuc3VyZSByZXBsYWNlbWVudCB2YWx1ZSBpcyBlc2NhcGVkIHRvIHByZXZlbnQgc3BlY2lhbCAkLXByZWZpeGVkXG4gICAgICAgIC8vIHJlZ2V4IHJlcGxhY2UgdG9rZW5zLiB0aGUgXCIkJCQkXCIgaXMgbmVlZGVkIGJlY2F1c2UgZWFjaCBcIiRcIiBuZWVkcyB0b1xuICAgICAgICAvLyBiZSBlc2NhcGVkIHdpdGggXCIkXCIgaXRzZWxmLCBhbmQgd2UgbmVlZCB0d28gaW4gdGhlIHJlc3VsdGluZyBvdXRwdXQuXG4gICAgICAgIHZhciByZXBsYWNlbWVudCA9IG9wdGlvbnNbYXJnXTtcbiAgICAgICAgaWYgKHR5cGVvZiByZXBsYWNlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICByZXBsYWNlbWVudCA9IHJlcGxhY2UuY2FsbChvcHRpb25zW2FyZ10sIGRvbGxhclJlZ2V4LCBkb2xsYXJCaWxsc1lhbGwpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdlIGNyZWF0ZSBhIG5ldyBgUmVnRXhwYCBlYWNoIHRpbWUgaW5zdGVhZCBvZiB1c2luZyBhIG1vcmUtZWZmaWNpZW50XG4gICAgICAgIC8vIHN0cmluZyByZXBsYWNlIHNvIHRoYXQgdGhlIHNhbWUgYXJndW1lbnQgY2FuIGJlIHJlcGxhY2VkIG11bHRpcGxlIHRpbWVzXG4gICAgICAgIC8vIGluIHRoZSBzYW1lIHBocmFzZS5cbiAgICAgICAgcGhyYXNlID0gcmVwbGFjZS5jYWxsKHBocmFzZSwgbmV3IFJlZ0V4cCgnJVxcXFx7JyArIGFyZyArICdcXFxcfScsICdnJyksIHJlcGxhY2VtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBocmFzZTtcbiAgfVxuXG4gIC8vICMjIyB3YXJuXG4gIC8vXG4gIC8vIFByb3ZpZGVzIGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBpZiBhIHBocmFzZSBrZXkgaXMgbWlzc2luZy5cbiAgZnVuY3Rpb24gd2FybihtZXNzYWdlKSB7XG4gICAgcm9vdC5jb25zb2xlICYmIHJvb3QuY29uc29sZS53YXJuICYmIHJvb3QuY29uc29sZS53YXJuKCdXQVJOSU5HOiAnICsgbWVzc2FnZSk7XG4gIH1cblxuICAvLyAjIyMgY2xvbmVcbiAgLy9cbiAgLy8gQ2xvbmUgYW4gb2JqZWN0LlxuICBmdW5jdGlvbiBjbG9uZShzb3VyY2UpIHtcbiAgICB2YXIgcmV0ID0ge307XG4gICAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgIHJldFtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHJldHVybiBQb2x5Z2xvdDtcbn0pO1xuLy9cblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzkzMGRlSW14b1pJa3A2dWdqTVU1VUxXJywgJ3NjaGVkdWxlQ2FsbGJhY2tzJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwNF9zY2hlZHVsZXJcXHNjaGVkdWxlQ2FsbGJhY2tzLmpzXG5cbnZhciBpMThuID0gcmVxdWlyZSgnaTE4bicpO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRpbWU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogNVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jYWxsYmFjazogZnVuY3Rpb24gX2NhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHRoaXMuc2VxKTtcbiAgICAgICAgaWYgKHRoaXMucmVwZWF0KSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50aW5nID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY291bnRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWUgPSA1O1xuICAgICAgICB0aGlzLmNvdW50ZXIuc3RyaW5nID0gdGhpcy50aW1lLnRvRml4ZWQoMikgKyAnIHMnO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNxdWFzaEFjdGlvbiA9IGNjLnNjYWxlVG8oMC4yLCAxLCAwLjYpO1xuICAgICAgICB2YXIgc3RyZXRjaEFjdGlvbiA9IGNjLnNjYWxlVG8oMC4yLCAxLCAxLjIpO1xuICAgICAgICB2YXIgc2NhbGVCYWNrQWN0aW9uID0gY2Muc2NhbGVUbygwLjEsIDEsIDEpO1xuICAgICAgICB2YXIgbW92ZVVwQWN0aW9uID0gY2MubW92ZUJ5KDEsIGNjLnAoMCwgMTAwKSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKTtcbiAgICAgICAgdmFyIG1vdmVEb3duQWN0aW9uID0gY2MubW92ZUJ5KDEsIGNjLnAoMCwgLTEwMCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcbiAgICAgICAgdGhpcy5zZXEgPSBjYy5zZXF1ZW5jZShzcXVhc2hBY3Rpb24sIHN0cmV0Y2hBY3Rpb24sIG1vdmVVcEFjdGlvbiwgc2NhbGVCYWNrQWN0aW9uLCBtb3ZlRG93bkFjdGlvbiwgc3F1YXNoQWN0aW9uLCBzY2FsZUJhY2tBY3Rpb24pO1xuXG4gICAgICAgIHRoaXMuY291bnRlciA9IGNjLmZpbmQoJ0NhbnZhcy9jb3VudF9sYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIHRoaXMuY291bnRlci5zdHJpbmcgPSB0aGlzLnRpbWUudG9GaXhlZCgyKSArICcgcyc7XG4gICAgICAgIHRoaXMuY291bnRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXBlYXQgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuY291bnRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudGltZSAtPSBkdDtcbiAgICAgICAgICAgIHRoaXMuY291bnRlci5zdHJpbmcgPSB0aGlzLnRpbWUudG9GaXhlZCgyKSArICcgcyc7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcENvdW50aW5nOiBmdW5jdGlvbiBzdG9wQ291bnRpbmcoKSB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLl9jYWxsYmFjayk7XG4gICAgICAgIHRoaXMuY291bnRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb3VudGVyLnN0cmluZyA9IGkxOG4udChcImNhc2VzLzA1X3NjcmlwdGluZy8wNF9zY2hlZHVsZXIvc2NoZWR1bGVDYWxsYmFja3MuanMuMVwiKTtcbiAgICAgICAgdGhpcy50aW1lID0gNTtcbiAgICB9LFxuXG4gICAgcmVwZWF0U2NoZWR1bGU6IGZ1bmN0aW9uIHJlcGVhdFNjaGVkdWxlKCkge1xuICAgICAgICB0aGlzLnN0b3BDb3VudGluZygpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuX2NhbGxiYWNrLCA1KTtcbiAgICAgICAgdGhpcy5yZXBlYXQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvdW50aW5nID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgb25lU2NoZWR1bGU6IGZ1bmN0aW9uIG9uZVNjaGVkdWxlKCkge1xuICAgICAgICB0aGlzLnN0b3BDb3VudGluZygpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLl9jYWxsYmFjaywgNSk7XG4gICAgICAgIHRoaXMucmVwZWF0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY291bnRpbmcgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBjYW5jZWxTY2hlZHVsZXM6IGZ1bmN0aW9uIGNhbmNlbFNjaGVkdWxlcygpIHtcbiAgICAgICAgdGhpcy5yZXBlYXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdG9wQ291bnRpbmcoKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2NjZmM5V0RUc1JKVmFTcWhRSWR6cU5HJywgJ3NvY2tldC1pbycpO1xuLy8gY2FzZXNcXDA1X3NjcmlwdGluZ1xcMTFfbmV0d29ya1xcc29ja2V0LWlvLmpzXG5cbmlmKCFDQ19KU0IgJiYgIWNjLnN5cy5pc05hdGl2ZSl7IShmdW5jdGlvbihlKXtpZihcIm9iamVjdFwiID09IHR5cGVvZiBleHBvcnRzICYmIFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cyA9IGUoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZGVmaW5lICYmIGRlZmluZS5hbWQpZGVmaW5lKFtdLGUpO2Vsc2Uge3ZhciBmO1widW5kZWZpbmVkXCIgIT0gdHlwZW9mIHdpbmRvdz9mID0gd2luZG93OlwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIGdsb2JhbD9mID0gZ2xvYmFsOlwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIHNlbGYgJiYgKGYgPSBzZWxmKSxmLmlvID0gZSgpO319KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZSA9PSBcImZ1bmN0aW9uXCIgJiYgcmVxdWlyZTtpZighdSAmJiBhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG8gKyBcIidcIik7fXZhciBmPW5bb10gPSB7ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKTt9LGYsZi5leHBvcnRzLGUsdCxuLHIpO31yZXR1cm4gbltvXS5leHBvcnRzO312YXIgaT10eXBlb2YgcmVxdWlyZSA9PSBcImZ1bmN0aW9uXCIgJiYgcmVxdWlyZTtmb3IodmFyIG89MDtvIDwgci5sZW5ndGg7bysrKSBzKHJbb10pO3JldHVybiBzO30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXttb2R1bGUuZXhwb3J0cyA9IF9kZXJlcV8oJy4vbGliLycpO30se1wiLi9saWIvXCI6Mn1dLDI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAgICAgICAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAgICAgICAgICovdmFyIHVybD1fZGVyZXFfKCcuL3VybCcpO3ZhciBwYXJzZXI9X2RlcmVxXygnc29ja2V0LmlvLXBhcnNlcicpO3ZhciBNYW5hZ2VyPV9kZXJlcV8oJy4vbWFuYWdlcicpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50Jyk7IC8qKlxuICAgICAgICAgKiBNb2R1bGUgZXhwb3J0cy5cbiAgICAgICAgICovbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gbG9va3VwOyAvKipcbiAgICAgICAgICogTWFuYWdlcnMgY2FjaGUuXG4gICAgICAgICAqL3ZhciBjYWNoZT1leHBvcnRzLm1hbmFnZXJzID0ge307IC8qKlxuICAgICAgICAgKiBMb29rcyB1cCBhbiBleGlzdGluZyBgTWFuYWdlcmAgZm9yIG11bHRpcGxleGluZy5cbiAgICAgICAgICogSWYgdGhlIHVzZXIgc3VtbW9uczpcbiAgICAgICAgICpcbiAgICAgICAgICogICBgaW8oJ2h0dHA6Ly9sb2NhbGhvc3QvYScpO2BcbiAgICAgICAgICogICBgaW8oJ2h0dHA6Ly9sb2NhbGhvc3QvYicpO2BcbiAgICAgICAgICpcbiAgICAgICAgICogV2UgcmV1c2UgdGhlIGV4aXN0aW5nIGluc3RhbmNlIGJhc2VkIG9uIHNhbWUgc2NoZW1lL3BvcnQvaG9zdCxcbiAgICAgICAgICogYW5kIHdlIGluaXRpYWxpemUgc29ja2V0cyBmb3IgZWFjaCBuYW1lc3BhY2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL2Z1bmN0aW9uIGxvb2t1cCh1cmksb3B0cyl7aWYodHlwZW9mIHVyaSA9PSAnb2JqZWN0Jyl7b3B0cyA9IHVyaTt1cmkgPSB1bmRlZmluZWQ7fW9wdHMgPSBvcHRzIHx8IHt9O3ZhciBwYXJzZWQ9dXJsKHVyaSk7dmFyIHNvdXJjZT1wYXJzZWQuc291cmNlO3ZhciBpZD1wYXJzZWQuaWQ7dmFyIGlvO2lmKG9wdHMuZm9yY2VOZXcgfHwgb3B0c1snZm9yY2UgbmV3IGNvbm5lY3Rpb24nXSB8fCBmYWxzZSA9PT0gb3B0cy5tdWx0aXBsZXgpe2RlYnVnKCdpZ25vcmluZyBzb2NrZXQgY2FjaGUgZm9yICVzJyxzb3VyY2UpO2lvID0gTWFuYWdlcihzb3VyY2Usb3B0cyk7fWVsc2Uge2lmKCFjYWNoZVtpZF0pe2RlYnVnKCduZXcgaW8gaW5zdGFuY2UgZm9yICVzJyxzb3VyY2UpO2NhY2hlW2lkXSA9IE1hbmFnZXIoc291cmNlLG9wdHMpO31pbyA9IGNhY2hlW2lkXTt9cmV0dXJuIGlvLnNvY2tldChwYXJzZWQucGF0aCk7fSAvKipcbiAgICAgICAgICogUHJvdG9jb2wgdmVyc2lvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZXhwb3J0cy5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDsgLyoqXG4gICAgICAgICAqIGBjb25uZWN0YC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHVyaVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9leHBvcnRzLmNvbm5lY3QgPSBsb29rdXA7IC8qKlxuICAgICAgICAgKiBFeHBvc2UgY29uc3RydWN0b3JzIGZvciBzdGFuZGFsb25lIGJ1aWxkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9leHBvcnRzLk1hbmFnZXIgPSBfZGVyZXFfKCcuL21hbmFnZXInKTtleHBvcnRzLlNvY2tldCA9IF9kZXJlcV8oJy4vc29ja2V0Jyk7fSx7XCIuL21hbmFnZXJcIjozLFwiLi9zb2NrZXRcIjo1LFwiLi91cmxcIjo2LFwiZGVidWdcIjoxMCxcInNvY2tldC5pby1wYXJzZXJcIjo0Nn1dLDM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAgICAgICAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAgICAgICAgICovdmFyIHVybD1fZGVyZXFfKCcuL3VybCcpO3ZhciBlaW89X2RlcmVxXygnZW5naW5lLmlvLWNsaWVudCcpO3ZhciBTb2NrZXQ9X2RlcmVxXygnLi9zb2NrZXQnKTt2YXIgRW1pdHRlcj1fZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcicpO3ZhciBwYXJzZXI9X2RlcmVxXygnc29ja2V0LmlvLXBhcnNlcicpO3ZhciBvbj1fZGVyZXFfKCcuL29uJyk7dmFyIGJpbmQ9X2RlcmVxXygnY29tcG9uZW50LWJpbmQnKTt2YXIgb2JqZWN0PV9kZXJlcV8oJ29iamVjdC1jb21wb25lbnQnKTt2YXIgZGVidWc9X2RlcmVxXygnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudDptYW5hZ2VyJyk7dmFyIGluZGV4T2Y9X2RlcmVxXygnaW5kZXhvZicpO3ZhciBCYWNrb2ZmPV9kZXJlcV8oJ2JhY2tvMicpOyAvKipcbiAgICAgICAgICogTW9kdWxlIGV4cG9ydHNcbiAgICAgICAgICovbW9kdWxlLmV4cG9ydHMgPSBNYW5hZ2VyOyAvKipcbiAgICAgICAgICogYE1hbmFnZXJgIGNvbnN0cnVjdG9yLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW5naW5lIGluc3RhbmNlIG9yIGVuZ2luZSB1cmkvb3B0c1xuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9mdW5jdGlvbiBNYW5hZ2VyKHVyaSxvcHRzKXtpZighKHRoaXMgaW5zdGFuY2VvZiBNYW5hZ2VyKSlyZXR1cm4gbmV3IE1hbmFnZXIodXJpLG9wdHMpO2lmKHVyaSAmJiAnb2JqZWN0JyA9PSB0eXBlb2YgdXJpKXtvcHRzID0gdXJpO3VyaSA9IHVuZGVmaW5lZDt9b3B0cyA9IG9wdHMgfHwge307b3B0cy5wYXRoID0gb3B0cy5wYXRoIHx8ICcvc29ja2V0LmlvJzt0aGlzLm5zcHMgPSB7fTt0aGlzLnN1YnMgPSBbXTt0aGlzLm9wdHMgPSBvcHRzO3RoaXMucmVjb25uZWN0aW9uKG9wdHMucmVjb25uZWN0aW9uICE9PSBmYWxzZSk7dGhpcy5yZWNvbm5lY3Rpb25BdHRlbXB0cyhvcHRzLnJlY29ubmVjdGlvbkF0dGVtcHRzIHx8IEluZmluaXR5KTt0aGlzLnJlY29ubmVjdGlvbkRlbGF5KG9wdHMucmVjb25uZWN0aW9uRGVsYXkgfHwgMTAwMCk7dGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heChvcHRzLnJlY29ubmVjdGlvbkRlbGF5TWF4IHx8IDUwMDApO3RoaXMucmFuZG9taXphdGlvbkZhY3RvcihvcHRzLnJhbmRvbWl6YXRpb25GYWN0b3IgfHwgMC41KTt0aGlzLmJhY2tvZmYgPSBuZXcgQmFja29mZih7bWluOnRoaXMucmVjb25uZWN0aW9uRGVsYXkoKSxtYXg6dGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heCgpLGppdHRlcjp0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKX0pO3RoaXMudGltZW91dChudWxsID09IG9wdHMudGltZW91dD8yMDAwMDpvcHRzLnRpbWVvdXQpO3RoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO3RoaXMudXJpID0gdXJpO3RoaXMuY29ubmVjdGVkID0gW107dGhpcy5lbmNvZGluZyA9IGZhbHNlO3RoaXMucGFja2V0QnVmZmVyID0gW107dGhpcy5lbmNvZGVyID0gbmV3IHBhcnNlci5FbmNvZGVyKCk7dGhpcy5kZWNvZGVyID0gbmV3IHBhcnNlci5EZWNvZGVyKCk7dGhpcy5hdXRvQ29ubmVjdCA9IG9wdHMuYXV0b0Nvbm5lY3QgIT09IGZhbHNlO2lmKHRoaXMuYXV0b0Nvbm5lY3QpdGhpcy5vcGVuKCk7fSAvKipcbiAgICAgICAgICogUHJvcGFnYXRlIGdpdmVuIGV2ZW50IHRvIHNvY2tldHMgYW5kIGVtaXQgb24gYHRoaXNgXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9NYW5hZ2VyLnByb3RvdHlwZS5lbWl0QWxsID0gZnVuY3Rpb24oKXt0aGlzLmVtaXQuYXBwbHkodGhpcyxhcmd1bWVudHMpO2Zvcih2YXIgbnNwIGluIHRoaXMubnNwcykge3RoaXMubnNwc1tuc3BdLmVtaXQuYXBwbHkodGhpcy5uc3BzW25zcF0sYXJndW1lbnRzKTt9fTsgLyoqXG4gICAgICAgICAqIFVwZGF0ZSBgc29ja2V0LmlkYCBvZiBhbGwgc29ja2V0c1xuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovTWFuYWdlci5wcm90b3R5cGUudXBkYXRlU29ja2V0SWRzID0gZnVuY3Rpb24oKXtmb3IodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHt0aGlzLm5zcHNbbnNwXS5pZCA9IHRoaXMuZW5naW5lLmlkO319OyAvKipcbiAgICAgICAgICogTWl4IGluIGBFbWl0dGVyYC5cbiAgICAgICAgICovRW1pdHRlcihNYW5hZ2VyLnByb3RvdHlwZSk7IC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBgcmVjb25uZWN0aW9uYCBjb25maWcuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdHJ1ZS9mYWxzZSBpZiBpdCBzaG91bGQgYXV0b21hdGljYWxseSByZWNvbm5lY3RcbiAgICAgICAgICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb24gPSBmdW5jdGlvbih2KXtpZighYXJndW1lbnRzLmxlbmd0aClyZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uO3RoaXMuX3JlY29ubmVjdGlvbiA9ICEhdjtyZXR1cm4gdGhpczt9OyAvKipcbiAgICAgICAgICogU2V0cyB0aGUgcmVjb25uZWN0aW9uIGF0dGVtcHRzIGNvbmZpZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG1heCByZWNvbm5lY3Rpb24gYXR0ZW1wdHMgYmVmb3JlIGdpdmluZyB1cFxuICAgICAgICAgKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL01hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkF0dGVtcHRzID0gZnVuY3Rpb24odil7aWYoIWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzO3RoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzID0gdjtyZXR1cm4gdGhpczt9OyAvKipcbiAgICAgICAgICogU2V0cyB0aGUgZGVsYXkgYmV0d2VlbiByZWNvbm5lY3Rpb25zLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXlcbiAgICAgICAgICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25EZWxheSA9IGZ1bmN0aW9uKHYpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheTt0aGlzLl9yZWNvbm5lY3Rpb25EZWxheSA9IHY7dGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRNaW4odik7cmV0dXJuIHRoaXM7fTtNYW5hZ2VyLnByb3RvdHlwZS5yYW5kb21pemF0aW9uRmFjdG9yID0gZnVuY3Rpb24odil7aWYoIWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIHRoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3I7dGhpcy5fcmFuZG9taXphdGlvbkZhY3RvciA9IHY7dGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRKaXR0ZXIodik7cmV0dXJuIHRoaXM7fTsgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIG1heGltdW0gZGVsYXkgYmV0d2VlbiByZWNvbm5lY3Rpb25zLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXlcbiAgICAgICAgICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25EZWxheU1heCA9IGZ1bmN0aW9uKHYpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heDt0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heCA9IHY7dGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRNYXgodik7cmV0dXJuIHRoaXM7fTsgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIGNvbm5lY3Rpb24gdGltZW91dC4gYGZhbHNlYCB0byBkaXNhYmxlXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovTWFuYWdlci5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uKHYpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLl90aW1lb3V0O3RoaXMuX3RpbWVvdXQgPSB2O3JldHVybiB0aGlzO307IC8qKlxuICAgICAgICAgKiBTdGFydHMgdHJ5aW5nIHRvIHJlY29ubmVjdCBpZiByZWNvbm5lY3Rpb24gaXMgZW5hYmxlZCBhbmQgd2UgaGF2ZSBub3RcbiAgICAgICAgICogc3RhcnRlZCByZWNvbm5lY3RpbmcgeWV0XG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9NYW5hZ2VyLnByb3RvdHlwZS5tYXliZVJlY29ubmVjdE9uT3BlbiA9IGZ1bmN0aW9uKCl7IC8vIE9ubHkgdHJ5IHRvIHJlY29ubmVjdCBpZiBpdCdzIHRoZSBmaXJzdCB0aW1lIHdlJ3JlIGNvbm5lY3RpbmdcbmlmKCF0aGlzLnJlY29ubmVjdGluZyAmJiB0aGlzLl9yZWNvbm5lY3Rpb24gJiYgdGhpcy5iYWNrb2ZmLmF0dGVtcHRzID09PSAwKXsgLy8ga2VlcHMgcmVjb25uZWN0aW9uIGZyb20gZmlyaW5nIHR3aWNlIGZvciB0aGUgc2FtZSByZWNvbm5lY3Rpb24gbG9vcFxudGhpcy5yZWNvbm5lY3QoKTt9fTsgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0IGBzb2NrZXRgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25hbCwgY2FsbGJhY2tcbiAgICAgICAgICogQHJldHVybiB7TWFuYWdlcn0gc2VsZlxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9NYW5hZ2VyLnByb3RvdHlwZS5vcGVuID0gTWFuYWdlci5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uKGZuKXtkZWJ1ZygncmVhZHlTdGF0ZSAlcycsdGhpcy5yZWFkeVN0YXRlKTtpZih+dGhpcy5yZWFkeVN0YXRlLmluZGV4T2YoJ29wZW4nKSlyZXR1cm4gdGhpcztkZWJ1Zygnb3BlbmluZyAlcycsdGhpcy51cmkpO3RoaXMuZW5naW5lID0gZWlvKHRoaXMudXJpLHRoaXMub3B0cyk7dmFyIHNvY2tldD10aGlzLmVuZ2luZTt2YXIgc2VsZj10aGlzO3RoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJzt0aGlzLnNraXBSZWNvbm5lY3QgPSBmYWxzZTsgLy8gZW1pdCBgb3BlbmBcbnZhciBvcGVuU3ViPW9uKHNvY2tldCwnb3BlbicsZnVuY3Rpb24oKXtzZWxmLm9ub3BlbigpO2ZuICYmIGZuKCk7fSk7IC8vIGVtaXQgYGNvbm5lY3RfZXJyb3JgXG52YXIgZXJyb3JTdWI9b24oc29ja2V0LCdlcnJvcicsZnVuY3Rpb24oZGF0YSl7ZGVidWcoJ2Nvbm5lY3RfZXJyb3InKTtzZWxmLmNsZWFudXAoKTtzZWxmLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztzZWxmLmVtaXRBbGwoJ2Nvbm5lY3RfZXJyb3InLGRhdGEpO2lmKGZuKXt2YXIgZXJyPW5ldyBFcnJvcignQ29ubmVjdGlvbiBlcnJvcicpO2Vyci5kYXRhID0gZGF0YTtmbihlcnIpO31lbHNlIHsgLy8gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIG5vIGZuIHRvIGhhbmRsZSB0aGUgZXJyb3JcbnNlbGYubWF5YmVSZWNvbm5lY3RPbk9wZW4oKTt9fSk7IC8vIGVtaXQgYGNvbm5lY3RfdGltZW91dGBcbmlmKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KXt2YXIgdGltZW91dD10aGlzLl90aW1lb3V0O2RlYnVnKCdjb25uZWN0IGF0dGVtcHQgd2lsbCB0aW1lb3V0IGFmdGVyICVkJyx0aW1lb3V0KTsgLy8gc2V0IHRpbWVyXG52YXIgdGltZXI9c2V0VGltZW91dChmdW5jdGlvbigpe2RlYnVnKCdjb25uZWN0IGF0dGVtcHQgdGltZWQgb3V0IGFmdGVyICVkJyx0aW1lb3V0KTtvcGVuU3ViLmRlc3Ryb3koKTtzb2NrZXQuY2xvc2UoKTtzb2NrZXQuZW1pdCgnZXJyb3InLCd0aW1lb3V0Jyk7c2VsZi5lbWl0QWxsKCdjb25uZWN0X3RpbWVvdXQnLHRpbWVvdXQpO30sdGltZW91dCk7dGhpcy5zdWJzLnB1c2goe2Rlc3Ryb3k6ZnVuY3Rpb24gZGVzdHJveSgpe2NsZWFyVGltZW91dCh0aW1lcik7fX0pO310aGlzLnN1YnMucHVzaChvcGVuU3ViKTt0aGlzLnN1YnMucHVzaChlcnJvclN1Yik7cmV0dXJuIHRoaXM7fTsgLyoqXG4gICAgICAgICAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBvcGVuLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovTWFuYWdlci5wcm90b3R5cGUub25vcGVuID0gZnVuY3Rpb24oKXtkZWJ1Zygnb3BlbicpOyAvLyBjbGVhciBvbGQgc3Vic1xudGhpcy5jbGVhbnVwKCk7IC8vIG1hcmsgYXMgb3BlblxudGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO3RoaXMuZW1pdCgnb3BlbicpOyAvLyBhZGQgbmV3IHN1YnNcbnZhciBzb2NrZXQ9dGhpcy5lbmdpbmU7dGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCdkYXRhJyxiaW5kKHRoaXMsJ29uZGF0YScpKSk7dGhpcy5zdWJzLnB1c2gob24odGhpcy5kZWNvZGVyLCdkZWNvZGVkJyxiaW5kKHRoaXMsJ29uZGVjb2RlZCcpKSk7dGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCdlcnJvcicsYmluZCh0aGlzLCdvbmVycm9yJykpKTt0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsJ2Nsb3NlJyxiaW5kKHRoaXMsJ29uY2xvc2UnKSkpO307IC8qKlxuICAgICAgICAgKiBDYWxsZWQgd2l0aCBkYXRhLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovTWFuYWdlci5wcm90b3R5cGUub25kYXRhID0gZnVuY3Rpb24oZGF0YSl7dGhpcy5kZWNvZGVyLmFkZChkYXRhKTt9OyAvKipcbiAgICAgICAgICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9NYW5hZ2VyLnByb3RvdHlwZS5vbmRlY29kZWQgPSBmdW5jdGlvbihwYWNrZXQpe3RoaXMuZW1pdCgncGFja2V0JyxwYWNrZXQpO307IC8qKlxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBzb2NrZXQgZXJyb3IuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9NYW5hZ2VyLnByb3RvdHlwZS5vbmVycm9yID0gZnVuY3Rpb24oZXJyKXtkZWJ1ZygnZXJyb3InLGVycik7dGhpcy5lbWl0QWxsKCdlcnJvcicsZXJyKTt9OyAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBzb2NrZXQgZm9yIHRoZSBnaXZlbiBgbnNwYC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7U29ja2V0fVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9NYW5hZ2VyLnByb3RvdHlwZS5zb2NrZXQgPSBmdW5jdGlvbihuc3Ape3ZhciBzb2NrZXQ9dGhpcy5uc3BzW25zcF07aWYoIXNvY2tldCl7c29ja2V0ID0gbmV3IFNvY2tldCh0aGlzLG5zcCk7dGhpcy5uc3BzW25zcF0gPSBzb2NrZXQ7dmFyIHNlbGY9dGhpcztzb2NrZXQub24oJ2Nvbm5lY3QnLGZ1bmN0aW9uKCl7c29ja2V0LmlkID0gc2VsZi5lbmdpbmUuaWQ7aWYoISB+aW5kZXhPZihzZWxmLmNvbm5lY3RlZCxzb2NrZXQpKXtzZWxmLmNvbm5lY3RlZC5wdXNoKHNvY2tldCk7fX0pO31yZXR1cm4gc29ja2V0O307IC8qKlxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBhIHNvY2tldCBjbG9zZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldFxuICAgICAgICAgKi9NYW5hZ2VyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oc29ja2V0KXt2YXIgaW5kZXg9aW5kZXhPZih0aGlzLmNvbm5lY3RlZCxzb2NrZXQpO2lmKH5pbmRleCl0aGlzLmNvbm5lY3RlZC5zcGxpY2UoaW5kZXgsMSk7aWYodGhpcy5jb25uZWN0ZWQubGVuZ3RoKXJldHVybjt0aGlzLmNsb3NlKCk7fTsgLyoqXG4gICAgICAgICAqIFdyaXRlcyBhIHBhY2tldC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovTWFuYWdlci5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24ocGFja2V0KXtkZWJ1Zygnd3JpdGluZyBwYWNrZXQgJWonLHBhY2tldCk7dmFyIHNlbGY9dGhpcztpZighc2VsZi5lbmNvZGluZyl7IC8vIGVuY29kZSwgdGhlbiB3cml0ZSB0byBlbmdpbmUgd2l0aCByZXN1bHRcbnNlbGYuZW5jb2RpbmcgPSB0cnVlO3RoaXMuZW5jb2Rlci5lbmNvZGUocGFja2V0LGZ1bmN0aW9uKGVuY29kZWRQYWNrZXRzKXtmb3IodmFyIGk9MDtpIDwgZW5jb2RlZFBhY2tldHMubGVuZ3RoO2krKykge3NlbGYuZW5naW5lLndyaXRlKGVuY29kZWRQYWNrZXRzW2ldKTt9c2VsZi5lbmNvZGluZyA9IGZhbHNlO3NlbGYucHJvY2Vzc1BhY2tldFF1ZXVlKCk7fSk7fWVsc2UgeyAvLyBhZGQgcGFja2V0IHRvIHRoZSBxdWV1ZVxuc2VsZi5wYWNrZXRCdWZmZXIucHVzaChwYWNrZXQpO319OyAvKipcbiAgICAgICAgICogSWYgcGFja2V0IGJ1ZmZlciBpcyBub24tZW1wdHksIGJlZ2lucyBlbmNvZGluZyB0aGVcbiAgICAgICAgICogbmV4dCBwYWNrZXQgaW4gbGluZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAqL01hbmFnZXIucHJvdG90eXBlLnByb2Nlc3NQYWNrZXRRdWV1ZSA9IGZ1bmN0aW9uKCl7aWYodGhpcy5wYWNrZXRCdWZmZXIubGVuZ3RoID4gMCAmJiAhdGhpcy5lbmNvZGluZyl7dmFyIHBhY2s9dGhpcy5wYWNrZXRCdWZmZXIuc2hpZnQoKTt0aGlzLnBhY2tldChwYWNrKTt9fTsgLyoqXG4gICAgICAgICAqIENsZWFuIHVwIHRyYW5zcG9ydCBzdWJzY3JpcHRpb25zIGFuZCBwYWNrZXQgYnVmZmVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovTWFuYWdlci5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uKCl7dmFyIHN1Yjt3aGlsZShzdWIgPSB0aGlzLnN1YnMuc2hpZnQoKSkgc3ViLmRlc3Ryb3koKTt0aGlzLnBhY2tldEJ1ZmZlciA9IFtdO3RoaXMuZW5jb2RpbmcgPSBmYWxzZTt0aGlzLmRlY29kZXIuZGVzdHJveSgpO307IC8qKlxuICAgICAgICAgKiBDbG9zZSB0aGUgY3VycmVudCBzb2NrZXQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9NYW5hZ2VyLnByb3RvdHlwZS5jbG9zZSA9IE1hbmFnZXIucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbigpe3RoaXMuc2tpcFJlY29ubmVjdCA9IHRydWU7dGhpcy5iYWNrb2ZmLnJlc2V0KCk7dGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7dGhpcy5lbmdpbmUgJiYgdGhpcy5lbmdpbmUuY2xvc2UoKTt9OyAvKipcbiAgICAgICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGNsb3NlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovTWFuYWdlci5wcm90b3R5cGUub25jbG9zZSA9IGZ1bmN0aW9uKHJlYXNvbil7ZGVidWcoJ2Nsb3NlJyk7dGhpcy5jbGVhbnVwKCk7dGhpcy5iYWNrb2ZmLnJlc2V0KCk7dGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7dGhpcy5lbWl0KCdjbG9zZScscmVhc29uKTtpZih0aGlzLl9yZWNvbm5lY3Rpb24gJiYgIXRoaXMuc2tpcFJlY29ubmVjdCl7dGhpcy5yZWNvbm5lY3QoKTt9fTsgLyoqXG4gICAgICAgICAqIEF0dGVtcHQgYSByZWNvbm5lY3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3QgPSBmdW5jdGlvbigpe2lmKHRoaXMucmVjb25uZWN0aW5nIHx8IHRoaXMuc2tpcFJlY29ubmVjdClyZXR1cm4gdGhpczt2YXIgc2VsZj10aGlzO2lmKHRoaXMuYmFja29mZi5hdHRlbXB0cyA+PSB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cyl7ZGVidWcoJ3JlY29ubmVjdCBmYWlsZWQnKTt0aGlzLmJhY2tvZmYucmVzZXQoKTt0aGlzLmVtaXRBbGwoJ3JlY29ubmVjdF9mYWlsZWQnKTt0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO31lbHNlIHt2YXIgZGVsYXk9dGhpcy5iYWNrb2ZmLmR1cmF0aW9uKCk7ZGVidWcoJ3dpbGwgd2FpdCAlZG1zIGJlZm9yZSByZWNvbm5lY3QgYXR0ZW1wdCcsZGVsYXkpO3RoaXMucmVjb25uZWN0aW5nID0gdHJ1ZTt2YXIgdGltZXI9c2V0VGltZW91dChmdW5jdGlvbigpe2lmKHNlbGYuc2tpcFJlY29ubmVjdClyZXR1cm47ZGVidWcoJ2F0dGVtcHRpbmcgcmVjb25uZWN0Jyk7c2VsZi5lbWl0QWxsKCdyZWNvbm5lY3RfYXR0ZW1wdCcsc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdGluZycsc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTsgLy8gY2hlY2sgYWdhaW4gZm9yIHRoZSBjYXNlIHNvY2tldCBjbG9zZWQgaW4gYWJvdmUgZXZlbnRzXG5pZihzZWxmLnNraXBSZWNvbm5lY3QpcmV0dXJuO3NlbGYub3BlbihmdW5jdGlvbihlcnIpe2lmKGVycil7ZGVidWcoJ3JlY29ubmVjdCBhdHRlbXB0IGVycm9yJyk7c2VsZi5yZWNvbm5lY3RpbmcgPSBmYWxzZTtzZWxmLnJlY29ubmVjdCgpO3NlbGYuZW1pdEFsbCgncmVjb25uZWN0X2Vycm9yJyxlcnIuZGF0YSk7fWVsc2Uge2RlYnVnKCdyZWNvbm5lY3Qgc3VjY2VzcycpO3NlbGYub25yZWNvbm5lY3QoKTt9fSk7fSxkZWxheSk7dGhpcy5zdWJzLnB1c2goe2Rlc3Ryb3k6ZnVuY3Rpb24gZGVzdHJveSgpe2NsZWFyVGltZW91dCh0aW1lcik7fX0pO319OyAvKipcbiAgICAgICAgICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZWNvbm5lY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9NYW5hZ2VyLnByb3RvdHlwZS5vbnJlY29ubmVjdCA9IGZ1bmN0aW9uKCl7dmFyIGF0dGVtcHQ9dGhpcy5iYWNrb2ZmLmF0dGVtcHRzO3RoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7dGhpcy5iYWNrb2ZmLnJlc2V0KCk7dGhpcy51cGRhdGVTb2NrZXRJZHMoKTt0aGlzLmVtaXRBbGwoJ3JlY29ubmVjdCcsYXR0ZW1wdCk7fTt9LHtcIi4vb25cIjo0LFwiLi9zb2NrZXRcIjo1LFwiLi91cmxcIjo2LFwiYmFja28yXCI6NyxcImNvbXBvbmVudC1iaW5kXCI6OCxcImNvbXBvbmVudC1lbWl0dGVyXCI6OSxcImRlYnVnXCI6MTAsXCJlbmdpbmUuaW8tY2xpZW50XCI6MTEsXCJpbmRleG9mXCI6NDIsXCJvYmplY3QtY29tcG9uZW50XCI6NDMsXCJzb2NrZXQuaW8tcGFyc2VyXCI6NDZ9XSw0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXG4gICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxuICAgICAgICAgKi9tb2R1bGUuZXhwb3J0cyA9IG9uOyAvKipcbiAgICAgICAgICogSGVscGVyIGZvciBzdWJzY3JpcHRpb25zLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdHxFdmVudEVtaXR0ZXJ9IG9iaiB3aXRoIGBFbWl0dGVyYCBtaXhpbiBvciBgRXZlbnRFbWl0dGVyYFxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9mdW5jdGlvbiBvbihvYmosZXYsZm4pe29iai5vbihldixmbik7cmV0dXJuIHtkZXN0cm95OmZ1bmN0aW9uIGRlc3Ryb3koKXtvYmoucmVtb3ZlTGlzdGVuZXIoZXYsZm4pO319O319LHt9XSw1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXG4gICAgICAgICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gICAgICAgICAqL3ZhciBwYXJzZXI9X2RlcmVxXygnc29ja2V0LmlvLXBhcnNlcicpO3ZhciBFbWl0dGVyPV9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7dmFyIHRvQXJyYXk9X2RlcmVxXygndG8tYXJyYXknKTt2YXIgb249X2RlcmVxXygnLi9vbicpO3ZhciBiaW5kPV9kZXJlcV8oJ2NvbXBvbmVudC1iaW5kJyk7dmFyIGRlYnVnPV9kZXJlcV8oJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6c29ja2V0Jyk7dmFyIGhhc0Jpbj1fZGVyZXFfKCdoYXMtYmluYXJ5Jyk7IC8qKlxuICAgICAgICAgKiBNb2R1bGUgZXhwb3J0cy5cbiAgICAgICAgICovbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gU29ja2V0OyAvKipcbiAgICAgICAgICogSW50ZXJuYWwgZXZlbnRzIChibGFja2xpc3RlZCkuXG4gICAgICAgICAqIFRoZXNlIGV2ZW50cyBjYW4ndCBiZSBlbWl0dGVkIGJ5IHRoZSB1c2VyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovdmFyIGV2ZW50cz17Y29ubmVjdDoxLGNvbm5lY3RfZXJyb3I6MSxjb25uZWN0X3RpbWVvdXQ6MSxkaXNjb25uZWN0OjEsZXJyb3I6MSxyZWNvbm5lY3Q6MSxyZWNvbm5lY3RfYXR0ZW1wdDoxLHJlY29ubmVjdF9mYWlsZWQ6MSxyZWNvbm5lY3RfZXJyb3I6MSxyZWNvbm5lY3Rpbmc6MX07IC8qKlxuICAgICAgICAgKiBTaG9ydGN1dCB0byBgRW1pdHRlciNlbWl0YC5cbiAgICAgICAgICovdmFyIGVtaXQ9RW1pdHRlci5wcm90b3R5cGUuZW1pdDsgLyoqXG4gICAgICAgICAqIGBTb2NrZXRgIGNvbnN0cnVjdG9yLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9mdW5jdGlvbiBTb2NrZXQoaW8sbnNwKXt0aGlzLmlvID0gaW87dGhpcy5uc3AgPSBuc3A7dGhpcy5qc29uID0gdGhpczsgLy8gY29tcGF0XG50aGlzLmlkcyA9IDA7dGhpcy5hY2tzID0ge307aWYodGhpcy5pby5hdXRvQ29ubmVjdCl0aGlzLm9wZW4oKTt0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTt0aGlzLnNlbmRCdWZmZXIgPSBbXTt0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO3RoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTt9IC8qKlxuICAgICAgICAgKiBNaXggaW4gYEVtaXR0ZXJgLlxuICAgICAgICAgKi9FbWl0dGVyKFNvY2tldC5wcm90b3R5cGUpOyAvKipcbiAgICAgICAgICogU3Vic2NyaWJlIHRvIG9wZW4sIGNsb3NlIGFuZCBwYWNrZXQgZXZlbnRzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLnN1YkV2ZW50cyA9IGZ1bmN0aW9uKCl7aWYodGhpcy5zdWJzKXJldHVybjt2YXIgaW89dGhpcy5pbzt0aGlzLnN1YnMgPSBbb24oaW8sJ29wZW4nLGJpbmQodGhpcywnb25vcGVuJykpLG9uKGlvLCdwYWNrZXQnLGJpbmQodGhpcywnb25wYWNrZXQnKSksb24oaW8sJ2Nsb3NlJyxiaW5kKHRoaXMsJ29uY2xvc2UnKSldO307IC8qKlxuICAgICAgICAgKiBcIk9wZW5zXCIgdGhlIHNvY2tldC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovU29ja2V0LnByb3RvdHlwZS5vcGVuID0gU29ja2V0LnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24oKXtpZih0aGlzLmNvbm5lY3RlZClyZXR1cm4gdGhpczt0aGlzLnN1YkV2ZW50cygpO3RoaXMuaW8ub3BlbigpOyAvLyBlbnN1cmUgb3BlblxuaWYoJ29wZW4nID09IHRoaXMuaW8ucmVhZHlTdGF0ZSl0aGlzLm9ub3BlbigpO3JldHVybiB0aGlzO307IC8qKlxuICAgICAgICAgKiBTZW5kcyBhIGBtZXNzYWdlYCBldmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL1NvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKCl7dmFyIGFyZ3M9dG9BcnJheShhcmd1bWVudHMpO2FyZ3MudW5zaGlmdCgnbWVzc2FnZScpO3RoaXMuZW1pdC5hcHBseSh0aGlzLGFyZ3MpO3JldHVybiB0aGlzO307IC8qKlxuICAgICAgICAgKiBPdmVycmlkZSBgZW1pdGAuXG4gICAgICAgICAqIElmIHRoZSBldmVudCBpcyBpbiBgZXZlbnRzYCwgaXQncyBlbWl0dGVkIG5vcm1hbGx5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxuICAgICAgICAgKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovU29ja2V0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXYpe2lmKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShldikpe2VtaXQuYXBwbHkodGhpcyxhcmd1bWVudHMpO3JldHVybiB0aGlzO312YXIgYXJncz10b0FycmF5KGFyZ3VtZW50cyk7dmFyIHBhcnNlclR5cGU9cGFyc2VyLkVWRU5UOyAvLyBkZWZhdWx0XG5pZihoYXNCaW4oYXJncykpe3BhcnNlclR5cGUgPSBwYXJzZXIuQklOQVJZX0VWRU5UO30gLy8gYmluYXJ5XG52YXIgcGFja2V0PXt0eXBlOnBhcnNlclR5cGUsZGF0YTphcmdzfTsgLy8gZXZlbnQgYWNrIGNhbGxiYWNrXG5pZignZnVuY3Rpb24nID09IHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pe2RlYnVnKCdlbWl0dGluZyBwYWNrZXQgd2l0aCBhY2sgaWQgJWQnLHRoaXMuaWRzKTt0aGlzLmFja3NbdGhpcy5pZHNdID0gYXJncy5wb3AoKTtwYWNrZXQuaWQgPSB0aGlzLmlkcysrO31pZih0aGlzLmNvbm5lY3RlZCl7dGhpcy5wYWNrZXQocGFja2V0KTt9ZWxzZSB7dGhpcy5zZW5kQnVmZmVyLnB1c2gocGFja2V0KTt9cmV0dXJuIHRoaXM7fTsgLyoqXG4gICAgICAgICAqIFNlbmRzIGEgcGFja2V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCl7cGFja2V0Lm5zcCA9IHRoaXMubnNwO3RoaXMuaW8ucGFja2V0KHBhY2tldCk7fTsgLyoqXG4gICAgICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBgb3BlbmAuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLm9ub3BlbiA9IGZ1bmN0aW9uKCl7ZGVidWcoJ3RyYW5zcG9ydCBpcyBvcGVuIC0gY29ubmVjdGluZycpOyAvLyB3cml0ZSBjb25uZWN0IHBhY2tldCBpZiBuZWNlc3NhcnlcbmlmKCcvJyAhPSB0aGlzLm5zcCl7dGhpcy5wYWNrZXQoe3R5cGU6cGFyc2VyLkNPTk5FQ1R9KTt9fTsgLyoqXG4gICAgICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBgY2xvc2VgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVhc29uXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbihyZWFzb24pe2RlYnVnKCdjbG9zZSAoJXMpJyxyZWFzb24pO3RoaXMuY29ubmVjdGVkID0gZmFsc2U7dGhpcy5kaXNjb25uZWN0ZWQgPSB0cnVlO2RlbGV0ZSB0aGlzLmlkO3RoaXMuZW1pdCgnZGlzY29ubmVjdCcscmVhc29uKTt9OyAvKipcbiAgICAgICAgICogQ2FsbGVkIHdpdGggc29ja2V0IHBhY2tldC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovU29ja2V0LnByb3RvdHlwZS5vbnBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCl7aWYocGFja2V0Lm5zcCAhPSB0aGlzLm5zcClyZXR1cm47c3dpdGNoKHBhY2tldC50eXBlKXtjYXNlIHBhcnNlci5DT05ORUNUOnRoaXMub25jb25uZWN0KCk7YnJlYWs7Y2FzZSBwYXJzZXIuRVZFTlQ6dGhpcy5vbmV2ZW50KHBhY2tldCk7YnJlYWs7Y2FzZSBwYXJzZXIuQklOQVJZX0VWRU5UOnRoaXMub25ldmVudChwYWNrZXQpO2JyZWFrO2Nhc2UgcGFyc2VyLkFDSzp0aGlzLm9uYWNrKHBhY2tldCk7YnJlYWs7Y2FzZSBwYXJzZXIuQklOQVJZX0FDSzp0aGlzLm9uYWNrKHBhY2tldCk7YnJlYWs7Y2FzZSBwYXJzZXIuRElTQ09OTkVDVDp0aGlzLm9uZGlzY29ubmVjdCgpO2JyZWFrO2Nhc2UgcGFyc2VyLkVSUk9SOnRoaXMuZW1pdCgnZXJyb3InLHBhY2tldC5kYXRhKTticmVhazt9fTsgLyoqXG4gICAgICAgICAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGV2ZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLm9uZXZlbnQgPSBmdW5jdGlvbihwYWNrZXQpe3ZhciBhcmdzPXBhY2tldC5kYXRhIHx8IFtdO2RlYnVnKCdlbWl0dGluZyBldmVudCAlaicsYXJncyk7aWYobnVsbCAhPSBwYWNrZXQuaWQpe2RlYnVnKCdhdHRhY2hpbmcgYWNrIGNhbGxiYWNrIHRvIGV2ZW50Jyk7YXJncy5wdXNoKHRoaXMuYWNrKHBhY2tldC5pZCkpO31pZih0aGlzLmNvbm5lY3RlZCl7ZW1pdC5hcHBseSh0aGlzLGFyZ3MpO31lbHNlIHt0aGlzLnJlY2VpdmVCdWZmZXIucHVzaChhcmdzKTt9fTsgLyoqXG4gICAgICAgICAqIFByb2R1Y2VzIGFuIGFjayBjYWxsYmFjayB0byBlbWl0IHdpdGggYW4gZXZlbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLmFjayA9IGZ1bmN0aW9uKGlkKXt2YXIgc2VsZj10aGlzO3ZhciBzZW50PWZhbHNlO3JldHVybiBmdW5jdGlvbigpeyAvLyBwcmV2ZW50IGRvdWJsZSBjYWxsYmFja3NcbmlmKHNlbnQpcmV0dXJuO3NlbnQgPSB0cnVlO3ZhciBhcmdzPXRvQXJyYXkoYXJndW1lbnRzKTtkZWJ1Zygnc2VuZGluZyBhY2sgJWonLGFyZ3MpO3ZhciB0eXBlPWhhc0JpbihhcmdzKT9wYXJzZXIuQklOQVJZX0FDSzpwYXJzZXIuQUNLO3NlbGYucGFja2V0KHt0eXBlOnR5cGUsaWQ6aWQsZGF0YTphcmdzfSk7fTt9OyAvKipcbiAgICAgICAgICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgYWNrbm93bGVnZW1lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAqL1NvY2tldC5wcm90b3R5cGUub25hY2sgPSBmdW5jdGlvbihwYWNrZXQpe2RlYnVnKCdjYWxsaW5nIGFjayAlcyB3aXRoICVqJyxwYWNrZXQuaWQscGFja2V0LmRhdGEpO3ZhciBmbj10aGlzLmFja3NbcGFja2V0LmlkXTtmbi5hcHBseSh0aGlzLHBhY2tldC5kYXRhKTtkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5pZF07fTsgLyoqXG4gICAgICAgICAqIENhbGxlZCB1cG9uIHNlcnZlciBjb25uZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovU29ja2V0LnByb3RvdHlwZS5vbmNvbm5lY3QgPSBmdW5jdGlvbigpe3RoaXMuY29ubmVjdGVkID0gdHJ1ZTt0aGlzLmRpc2Nvbm5lY3RlZCA9IGZhbHNlO3RoaXMuZW1pdCgnY29ubmVjdCcpO3RoaXMuZW1pdEJ1ZmZlcmVkKCk7fTsgLyoqXG4gICAgICAgICAqIEVtaXQgYnVmZmVyZWQgZXZlbnRzIChyZWNlaXZlZCBhbmQgZW1pdHRlZCkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLmVtaXRCdWZmZXJlZCA9IGZ1bmN0aW9uKCl7dmFyIGk7Zm9yKGkgPSAwO2kgPCB0aGlzLnJlY2VpdmVCdWZmZXIubGVuZ3RoO2krKykge2VtaXQuYXBwbHkodGhpcyx0aGlzLnJlY2VpdmVCdWZmZXJbaV0pO310aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtmb3IoaSA9IDA7aSA8IHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGg7aSsrKSB7dGhpcy5wYWNrZXQodGhpcy5zZW5kQnVmZmVyW2ldKTt9dGhpcy5zZW5kQnVmZmVyID0gW107fTsgLyoqXG4gICAgICAgICAqIENhbGxlZCB1cG9uIHNlcnZlciBkaXNjb25uZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovU29ja2V0LnByb3RvdHlwZS5vbmRpc2Nvbm5lY3QgPSBmdW5jdGlvbigpe2RlYnVnKCdzZXJ2ZXIgZGlzY29ubmVjdCAoJXMpJyx0aGlzLm5zcCk7dGhpcy5kZXN0cm95KCk7dGhpcy5vbmNsb3NlKCdpbyBzZXJ2ZXIgZGlzY29ubmVjdCcpO307IC8qKlxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBmb3JjZWQgY2xpZW50L3NlcnZlciBzaWRlIGRpc2Nvbm5lY3Rpb25zLFxuICAgICAgICAgKiB0aGlzIG1ldGhvZCBlbnN1cmVzIHRoZSBtYW5hZ2VyIHN0b3BzIHRyYWNraW5nIHVzIGFuZFxuICAgICAgICAgKiB0aGF0IHJlY29ubmVjdGlvbnMgZG9uJ3QgZ2V0IHRyaWdnZXJlZCBmb3IgdGhpcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwcml2YXRlLlxuICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpe2lmKHRoaXMuc3Vicyl7IC8vIGNsZWFuIHN1YnNjcmlwdGlvbnMgdG8gYXZvaWQgcmVjb25uZWN0aW9uc1xuZm9yKHZhciBpPTA7aSA8IHRoaXMuc3Vicy5sZW5ndGg7aSsrKSB7dGhpcy5zdWJzW2ldLmRlc3Ryb3koKTt9dGhpcy5zdWJzID0gbnVsbDt9dGhpcy5pby5kZXN0cm95KHRoaXMpO307IC8qKlxuICAgICAgICAgKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0IG1hbnVhbGx5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9IFNvY2tldC5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uKCl7aWYodGhpcy5jb25uZWN0ZWQpe2RlYnVnKCdwZXJmb3JtaW5nIGRpc2Nvbm5lY3QgKCVzKScsdGhpcy5uc3ApO3RoaXMucGFja2V0KHt0eXBlOnBhcnNlci5ESVNDT05ORUNUfSk7fSAvLyByZW1vdmUgc29ja2V0IGZyb20gcG9vbFxudGhpcy5kZXN0cm95KCk7aWYodGhpcy5jb25uZWN0ZWQpeyAvLyBmaXJlIGV2ZW50c1xudGhpcy5vbmNsb3NlKCdpbyBjbGllbnQgZGlzY29ubmVjdCcpO31yZXR1cm4gdGhpczt9O30se1wiLi9vblwiOjQsXCJjb21wb25lbnQtYmluZFwiOjgsXCJjb21wb25lbnQtZW1pdHRlclwiOjksXCJkZWJ1Z1wiOjEwLFwiaGFzLWJpbmFyeVwiOjM4LFwic29ja2V0LmlvLXBhcnNlclwiOjQ2LFwidG8tYXJyYXlcIjo1MH1dLDY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKipcbiAgICAgICAgICAgKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICAgICAgICAgICAqL3ZhciBwYXJzZXVyaT1fZGVyZXFfKCdwYXJzZXVyaScpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50OnVybCcpOyAvKipcbiAgICAgICAgICAgKiBNb2R1bGUgZXhwb3J0cy5cbiAgICAgICAgICAgKi9tb2R1bGUuZXhwb3J0cyA9IHVybDsgLyoqXG4gICAgICAgICAgICogVVJMIHBhcnNlci5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gQW4gb2JqZWN0IG1lYW50IHRvIG1pbWljIHdpbmRvdy5sb2NhdGlvbi5cbiAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgRGVmYXVsdHMgdG8gd2luZG93LmxvY2F0aW9uLlxuICAgICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAgICovZnVuY3Rpb24gdXJsKHVyaSxsb2Mpe3ZhciBvYmo9dXJpOyAvLyBkZWZhdWx0IHRvIHdpbmRvdy5sb2NhdGlvblxudmFyIGxvYz1sb2MgfHwgZ2xvYmFsLmxvY2F0aW9uO2lmKG51bGwgPT0gdXJpKXVyaSA9IGxvYy5wcm90b2NvbCArICcvLycgKyBsb2MuaG9zdDsgLy8gcmVsYXRpdmUgcGF0aCBzdXBwb3J0XG5pZignc3RyaW5nJyA9PSB0eXBlb2YgdXJpKXtpZignLycgPT0gdXJpLmNoYXJBdCgwKSl7aWYoJy8nID09IHVyaS5jaGFyQXQoMSkpe3VyaSA9IGxvYy5wcm90b2NvbCArIHVyaTt9ZWxzZSB7dXJpID0gbG9jLmhvc3RuYW1lICsgdXJpO319aWYoIS9eKGh0dHBzP3x3c3M/KTpcXC9cXC8vLnRlc3QodXJpKSl7ZGVidWcoJ3Byb3RvY29sLWxlc3MgdXJsICVzJyx1cmkpO2lmKCd1bmRlZmluZWQnICE9IHR5cGVvZiBsb2Mpe3VyaSA9IGxvYy5wcm90b2NvbCArICcvLycgKyB1cmk7fWVsc2Uge3VyaSA9ICdodHRwczovLycgKyB1cmk7fX0gLy8gcGFyc2VcbmRlYnVnKCdwYXJzZSAlcycsdXJpKTtvYmogPSBwYXJzZXVyaSh1cmkpO30gLy8gbWFrZSBzdXJlIHdlIHRyZWF0IGBsb2NhbGhvc3Q6ODBgIGFuZCBgbG9jYWxob3N0YCBlcXVhbGx5XG5pZighb2JqLnBvcnQpe2lmKC9eKGh0dHB8d3MpJC8udGVzdChvYmoucHJvdG9jb2wpKXtvYmoucG9ydCA9ICc4MCc7fWVsc2UgaWYoL14oaHR0cHx3cylzJC8udGVzdChvYmoucHJvdG9jb2wpKXtvYmoucG9ydCA9ICc0NDMnO319b2JqLnBhdGggPSBvYmoucGF0aCB8fCAnLyc7IC8vIGRlZmluZSB1bmlxdWUgaWRcbm9iai5pZCA9IG9iai5wcm90b2NvbCArICc6Ly8nICsgb2JqLmhvc3QgKyAnOicgKyBvYmoucG9ydDsgLy8gZGVmaW5lIGhyZWZcbm9iai5ocmVmID0gb2JqLnByb3RvY29sICsgJzovLycgKyBvYmouaG9zdCArIChsb2MgJiYgbG9jLnBvcnQgPT0gb2JqLnBvcnQ/Jyc6JzonICsgb2JqLnBvcnQpO3JldHVybiBvYmo7fX0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93Ont9KTt9LHtcImRlYnVnXCI6MTAsXCJwYXJzZXVyaVwiOjQ0fV0sNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICAgICAgICAgKiBFeHBvc2UgYEJhY2tvZmZgLlxuICAgICAgICAgKi9tb2R1bGUuZXhwb3J0cyA9IEJhY2tvZmY7IC8qKlxuICAgICAgICAgKiBJbml0aWFsaXplIGJhY2tvZmYgdGltZXIgd2l0aCBgb3B0c2AuXG4gICAgICAgICAqXG4gICAgICAgICAqIC0gYG1pbmAgaW5pdGlhbCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyBbMTAwXVxuICAgICAgICAgKiAtIGBtYXhgIG1heCB0aW1lb3V0IFsxMDAwMF1cbiAgICAgICAgICogLSBgaml0dGVyYCBbMF1cbiAgICAgICAgICogLSBgZmFjdG9yYCBbMl1cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZnVuY3Rpb24gQmFja29mZihvcHRzKXtvcHRzID0gb3B0cyB8fCB7fTt0aGlzLm1zID0gb3B0cy5taW4gfHwgMTAwO3RoaXMubWF4ID0gb3B0cy5tYXggfHwgMTAwMDA7dGhpcy5mYWN0b3IgPSBvcHRzLmZhY3RvciB8fCAyO3RoaXMuaml0dGVyID0gb3B0cy5qaXR0ZXIgPiAwICYmIG9wdHMuaml0dGVyIDw9IDE/b3B0cy5qaXR0ZXI6MDt0aGlzLmF0dGVtcHRzID0gMDt9IC8qKlxuICAgICAgICAgKiBSZXR1cm4gdGhlIGJhY2tvZmYgZHVyYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovQmFja29mZi5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbigpe3ZhciBtcz10aGlzLm1zICogTWF0aC5wb3codGhpcy5mYWN0b3IsdGhpcy5hdHRlbXB0cysrKTtpZih0aGlzLmppdHRlcil7dmFyIHJhbmQ9TWF0aC5yYW5kb20oKTt2YXIgZGV2aWF0aW9uPU1hdGguZmxvb3IocmFuZCAqIHRoaXMuaml0dGVyICogbXMpO21zID0gKE1hdGguZmxvb3IocmFuZCAqIDEwKSAmIDEpID09IDA/bXMgLSBkZXZpYXRpb246bXMgKyBkZXZpYXRpb247fXJldHVybiBNYXRoLm1pbihtcyx0aGlzLm1heCkgfCAwO307IC8qKlxuICAgICAgICAgKiBSZXNldCB0aGUgbnVtYmVyIG9mIGF0dGVtcHRzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9CYWNrb2ZmLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCl7dGhpcy5hdHRlbXB0cyA9IDA7fTsgLyoqXG4gICAgICAgICAqIFNldCB0aGUgbWluaW11bSBkdXJhdGlvblxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9CYWNrb2ZmLnByb3RvdHlwZS5zZXRNaW4gPSBmdW5jdGlvbihtaW4pe3RoaXMubXMgPSBtaW47fTsgLyoqXG4gICAgICAgICAqIFNldCB0aGUgbWF4aW11bSBkdXJhdGlvblxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9CYWNrb2ZmLnByb3RvdHlwZS5zZXRNYXggPSBmdW5jdGlvbihtYXgpe3RoaXMubWF4ID0gbWF4O307IC8qKlxuICAgICAgICAgKiBTZXQgdGhlIGppdHRlclxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9CYWNrb2ZmLnByb3RvdHlwZS5zZXRKaXR0ZXIgPSBmdW5jdGlvbihqaXR0ZXIpe3RoaXMuaml0dGVyID0gaml0dGVyO307fSx7fV0sODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICAgICAgICAgKiBTbGljZSByZWZlcmVuY2UuXG4gICAgICAgICAqL3ZhciBzbGljZT1bXS5zbGljZTsgLyoqXG4gICAgICAgICAqIEJpbmQgYG9iamAgdG8gYGZuYC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gZm4gb3Igc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaixmbil7aWYoJ3N0cmluZycgPT0gdHlwZW9mIGZuKWZuID0gb2JqW2ZuXTtpZignZnVuY3Rpb24nICE9IHR5cGVvZiBmbil0aHJvdyBuZXcgRXJyb3IoJ2JpbmQoKSByZXF1aXJlcyBhIGZ1bmN0aW9uJyk7dmFyIGFyZ3M9c2xpY2UuY2FsbChhcmd1bWVudHMsMik7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGZuLmFwcGx5KG9iaixhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTt9O307fSx7fV0sOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICAgICAgICAgKiBFeHBvc2UgYEVtaXR0ZXJgLlxuICAgICAgICAgKi9tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7IC8qKlxuICAgICAgICAgKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZnVuY3Rpb24gRW1pdHRlcihvYmope2lmKG9iailyZXR1cm4gbWl4aW4ob2JqKTt9OyAvKipcbiAgICAgICAgICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9mdW5jdGlvbiBtaXhpbihvYmope2Zvcih2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7b2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO31yZXR1cm4gb2JqO30gLyoqXG4gICAgICAgICAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAgICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9FbWl0dGVyLnByb3RvdHlwZS5vbiA9IEVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCxmbil7dGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9Oyh0aGlzLl9jYWxsYmFja3NbZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSkucHVzaChmbik7cmV0dXJuIHRoaXM7fTsgLyoqXG4gICAgICAgICAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICAgICAgICAgKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgICAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LGZuKXt2YXIgc2VsZj10aGlzO3RoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtmdW5jdGlvbiBvbigpe3NlbGYub2ZmKGV2ZW50LG9uKTtmbi5hcHBseSh0aGlzLGFyZ3VtZW50cyk7fW9uLmZuID0gZm47dGhpcy5vbihldmVudCxvbik7cmV0dXJuIHRoaXM7fTsgLyoqXG4gICAgICAgICAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXG4gICAgICAgICAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgICAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovRW1pdHRlci5wcm90b3R5cGUub2ZmID0gRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsZm4pe3RoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTsgLy8gYWxsXG5pZigwID09IGFyZ3VtZW50cy5sZW5ndGgpe3RoaXMuX2NhbGxiYWNrcyA9IHt9O3JldHVybiB0aGlzO30gLy8gc3BlY2lmaWMgZXZlbnRcbnZhciBjYWxsYmFja3M9dGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtpZighY2FsbGJhY2tzKXJldHVybiB0aGlzOyAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG5pZigxID09IGFyZ3VtZW50cy5sZW5ndGgpe2RlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO3JldHVybiB0aGlzO30gLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbnZhciBjYjtmb3IodmFyIGk9MDtpIDwgY2FsbGJhY2tzLmxlbmd0aDtpKyspIHtjYiA9IGNhbGxiYWNrc1tpXTtpZihjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKXtjYWxsYmFja3Muc3BsaWNlKGksMSk7YnJlYWs7fX1yZXR1cm4gdGhpczt9OyAvKipcbiAgICAgICAgICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAgICAgKiBAcGFyYW0ge01peGVkfSAuLi5cbiAgICAgICAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICAgICAgICovRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXt0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307dmFyIGFyZ3M9W10uc2xpY2UuY2FsbChhcmd1bWVudHMsMSksY2FsbGJhY2tzPXRoaXMuX2NhbGxiYWNrc1tldmVudF07aWYoY2FsbGJhY2tzKXtjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7Zm9yKHZhciBpPTAsbGVuPWNhbGxiYWNrcy5sZW5ndGg7aSA8IGxlbjsrK2kpIHtjYWxsYmFja3NbaV0uYXBwbHkodGhpcyxhcmdzKTt9fXJldHVybiB0aGlzO307IC8qKlxuICAgICAgICAgKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL0VtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXt0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307cmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW107fTsgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL0VtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtyZXR1cm4gISF0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO307fSx7fV0sMTA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAgICAgICAgICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICAgICAgICAgKi9tb2R1bGUuZXhwb3J0cyA9IGRlYnVnOyAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAgICAgKiBAcmV0dXJuIHtUeXBlfVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9mdW5jdGlvbiBkZWJ1ZyhuYW1lKXtpZighZGVidWcuZW5hYmxlZChuYW1lKSlyZXR1cm4gZnVuY3Rpb24oKXt9O3JldHVybiBmdW5jdGlvbihmbXQpe2ZtdCA9IGNvZXJjZShmbXQpO3ZhciBjdXJyPW5ldyBEYXRlKCk7dmFyIG1zPWN1cnIgLSAoZGVidWdbbmFtZV0gfHwgY3Vycik7ZGVidWdbbmFtZV0gPSBjdXJyO2ZtdCA9IG5hbWUgKyAnICcgKyBmbXQgKyAnICsnICsgZGVidWcuaHVtYW5pemUobXMpOyAvLyBUaGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOFxuLy8gd2hlcmUgYGNvbnNvbGUubG9nYCBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xud2luZG93LmNvbnNvbGUgJiYgY29uc29sZS5sb2cgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csY29uc29sZSxhcmd1bWVudHMpO307fSAvKipcbiAgICAgICAgICogVGhlIGN1cnJlbnRseSBhY3RpdmUgZGVidWcgbW9kZSBuYW1lcy5cbiAgICAgICAgICovZGVidWcubmFtZXMgPSBbXTtkZWJ1Zy5za2lwcyA9IFtdOyAvKipcbiAgICAgICAgICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZS4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICAgICAgICAgKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9kZWJ1Zy5lbmFibGUgPSBmdW5jdGlvbihuYW1lKXt0cnl7bG9jYWxTdG9yYWdlLmRlYnVnID0gbmFtZTt9Y2F0Y2goZSkge312YXIgc3BsaXQ9KG5hbWUgfHwgJycpLnNwbGl0KC9bXFxzLF0rLyksbGVuPXNwbGl0Lmxlbmd0aDtmb3IodmFyIGk9MDtpIDwgbGVuO2krKykge25hbWUgPSBzcGxpdFtpXS5yZXBsYWNlKCcqJywnLio/Jyk7aWYobmFtZVswXSA9PT0gJy0nKXtkZWJ1Zy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZS5zdWJzdHIoMSkgKyAnJCcpKTt9ZWxzZSB7ZGVidWcubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWUgKyAnJCcpKTt9fX07IC8qKlxuICAgICAgICAgKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZGVidWcuZGlzYWJsZSA9IGZ1bmN0aW9uKCl7ZGVidWcuZW5hYmxlKCcnKTt9OyAvKipcbiAgICAgICAgICogSHVtYW5pemUgdGhlIGdpdmVuIGBtc2AuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAqL2RlYnVnLmh1bWFuaXplID0gZnVuY3Rpb24obXMpe3ZhciBzZWM9MTAwMCxtaW49NjAgKiAxMDAwLGhvdXI9NjAgKiBtaW47aWYobXMgPj0gaG91cilyZXR1cm4gKG1zIC8gaG91cikudG9GaXhlZCgxKSArICdoJztpZihtcyA+PSBtaW4pcmV0dXJuIChtcyAvIG1pbikudG9GaXhlZCgxKSArICdtJztpZihtcyA+PSBzZWMpcmV0dXJuIChtcyAvIHNlYyB8IDApICsgJ3MnO3JldHVybiBtcyArICdtcyc7fTsgLyoqXG4gICAgICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZGVidWcuZW5hYmxlZCA9IGZ1bmN0aW9uKG5hbWUpe2Zvcih2YXIgaT0wLGxlbj1kZWJ1Zy5za2lwcy5sZW5ndGg7aSA8IGxlbjtpKyspIHtpZihkZWJ1Zy5za2lwc1tpXS50ZXN0KG5hbWUpKXtyZXR1cm4gZmFsc2U7fX1mb3IodmFyIGk9MCxsZW49ZGVidWcubmFtZXMubGVuZ3RoO2kgPCBsZW47aSsrKSB7aWYoZGVidWcubmFtZXNbaV0udGVzdChuYW1lKSl7cmV0dXJuIHRydWU7fX1yZXR1cm4gZmFsc2U7fTsgLyoqXG4gICAgICAgICAqIENvZXJjZSBgdmFsYC5cbiAgICAgICAgICovZnVuY3Rpb24gY29lcmNlKHZhbCl7aWYodmFsIGluc3RhbmNlb2YgRXJyb3IpcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtyZXR1cm4gdmFsO30gLy8gcGVyc2lzdFxudHJ5e2lmKHdpbmRvdy5sb2NhbFN0b3JhZ2UpZGVidWcuZW5hYmxlKGxvY2FsU3RvcmFnZS5kZWJ1Zyk7fWNhdGNoKGUpIHt9fSx7fV0sMTE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe21vZHVsZS5leHBvcnRzID0gX2RlcmVxXygnLi9saWIvJyk7fSx7XCIuL2xpYi9cIjoxMn1dLDEyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXttb2R1bGUuZXhwb3J0cyA9IF9kZXJlcV8oJy4vc29ja2V0Jyk7IC8qKlxuICAgICAgICAgKiBFeHBvcnRzIHBhcnNlclxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKlxuICAgICAgICAgKi9tb2R1bGUuZXhwb3J0cy5wYXJzZXIgPSBfZGVyZXFfKCdlbmdpbmUuaW8tcGFyc2VyJyk7fSx7XCIuL3NvY2tldFwiOjEzLFwiZW5naW5lLmlvLXBhcnNlclwiOjI1fV0sMTM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKipcbiAgICAgICAgICAgKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICAgICAgICAgICAqL3ZhciB0cmFuc3BvcnRzPV9kZXJlcV8oJy4vdHJhbnNwb3J0cycpO3ZhciBFbWl0dGVyPV9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7dmFyIGRlYnVnPV9kZXJlcV8oJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6c29ja2V0Jyk7dmFyIGluZGV4PV9kZXJlcV8oJ2luZGV4b2YnKTt2YXIgcGFyc2VyPV9kZXJlcV8oJ2VuZ2luZS5pby1wYXJzZXInKTt2YXIgcGFyc2V1cmk9X2RlcmVxXygncGFyc2V1cmknKTt2YXIgcGFyc2Vqc29uPV9kZXJlcV8oJ3BhcnNlanNvbicpO3ZhciBwYXJzZXFzPV9kZXJlcV8oJ3BhcnNlcXMnKTsgLyoqXG4gICAgICAgICAgICogTW9kdWxlIGV4cG9ydHMuXG4gICAgICAgICAgICovbW9kdWxlLmV4cG9ydHMgPSBTb2NrZXQ7IC8qKlxuICAgICAgICAgICAqIE5vb3AgZnVuY3Rpb24uXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICAgKi9mdW5jdGlvbiBub29wKCl7fSAvKipcbiAgICAgICAgICAgKiBTb2NrZXQgY29uc3RydWN0b3IuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSBvciBvcHRpb25zXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgICAqL2Z1bmN0aW9uIFNvY2tldCh1cmksb3B0cyl7aWYoISh0aGlzIGluc3RhbmNlb2YgU29ja2V0KSlyZXR1cm4gbmV3IFNvY2tldCh1cmksb3B0cyk7b3B0cyA9IG9wdHMgfHwge307aWYodXJpICYmICdvYmplY3QnID09IHR5cGVvZiB1cmkpe29wdHMgPSB1cmk7dXJpID0gbnVsbDt9aWYodXJpKXt1cmkgPSBwYXJzZXVyaSh1cmkpO29wdHMuaG9zdCA9IHVyaS5ob3N0O29wdHMuc2VjdXJlID0gdXJpLnByb3RvY29sID09ICdodHRwcycgfHwgdXJpLnByb3RvY29sID09ICd3c3MnO29wdHMucG9ydCA9IHVyaS5wb3J0O2lmKHVyaS5xdWVyeSlvcHRzLnF1ZXJ5ID0gdXJpLnF1ZXJ5O310aGlzLnNlY3VyZSA9IG51bGwgIT0gb3B0cy5zZWN1cmU/b3B0cy5zZWN1cmU6Z2xvYmFsLmxvY2F0aW9uICYmICdodHRwczonID09IGxvY2F0aW9uLnByb3RvY29sO2lmKG9wdHMuaG9zdCl7dmFyIHBpZWNlcz1vcHRzLmhvc3Quc3BsaXQoJzonKTtvcHRzLmhvc3RuYW1lID0gcGllY2VzLnNoaWZ0KCk7aWYocGllY2VzLmxlbmd0aCl7b3B0cy5wb3J0ID0gcGllY2VzLnBvcCgpO31lbHNlIGlmKCFvcHRzLnBvcnQpeyAvLyBpZiBubyBwb3J0IGlzIHNwZWNpZmllZCBtYW51YWxseSwgdXNlIHRoZSBwcm90b2NvbCBkZWZhdWx0XG5vcHRzLnBvcnQgPSB0aGlzLnNlY3VyZT8nNDQzJzonODAnO319dGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQgfHwgZmFsc2U7dGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWUgfHwgKGdsb2JhbC5sb2NhdGlvbj9sb2NhdGlvbi5ob3N0bmFtZTonbG9jYWxob3N0Jyk7dGhpcy5wb3J0ID0gb3B0cy5wb3J0IHx8IChnbG9iYWwubG9jYXRpb24gJiYgbG9jYXRpb24ucG9ydD9sb2NhdGlvbi5wb3J0OnRoaXMuc2VjdXJlPzQ0Mzo4MCk7dGhpcy5xdWVyeSA9IG9wdHMucXVlcnkgfHwge307aWYoJ3N0cmluZycgPT0gdHlwZW9mIHRoaXMucXVlcnkpdGhpcy5xdWVyeSA9IHBhcnNlcXMuZGVjb2RlKHRoaXMucXVlcnkpO3RoaXMudXBncmFkZSA9IGZhbHNlICE9PSBvcHRzLnVwZ3JhZGU7dGhpcy5wYXRoID0gKG9wdHMucGF0aCB8fCAnL2VuZ2luZS5pbycpLnJlcGxhY2UoL1xcLyQvLCcnKSArICcvJzt0aGlzLmZvcmNlSlNPTlAgPSAhIW9wdHMuZm9yY2VKU09OUDt0aGlzLmpzb25wID0gZmFsc2UgIT09IG9wdHMuanNvbnA7dGhpcy5mb3JjZUJhc2U2NCA9ICEhb3B0cy5mb3JjZUJhc2U2NDt0aGlzLmVuYWJsZXNYRFIgPSAhIW9wdHMuZW5hYmxlc1hEUjt0aGlzLnRpbWVzdGFtcFBhcmFtID0gb3B0cy50aW1lc3RhbXBQYXJhbSB8fCAndCc7dGhpcy50aW1lc3RhbXBSZXF1ZXN0cyA9IG9wdHMudGltZXN0YW1wUmVxdWVzdHM7dGhpcy50cmFuc3BvcnRzID0gb3B0cy50cmFuc3BvcnRzIHx8IFsncG9sbGluZycsJ3dlYnNvY2tldCddO3RoaXMucmVhZHlTdGF0ZSA9ICcnO3RoaXMud3JpdGVCdWZmZXIgPSBbXTt0aGlzLmNhbGxiYWNrQnVmZmVyID0gW107dGhpcy5wb2xpY3lQb3J0ID0gb3B0cy5wb2xpY3lQb3J0IHx8IDg0Mzt0aGlzLnJlbWVtYmVyVXBncmFkZSA9IG9wdHMucmVtZW1iZXJVcGdyYWRlIHx8IGZhbHNlO3RoaXMuYmluYXJ5VHlwZSA9IG51bGw7dGhpcy5vbmx5QmluYXJ5VXBncmFkZXMgPSBvcHRzLm9ubHlCaW5hcnlVcGdyYWRlczsgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG50aGlzLnBmeCA9IG9wdHMucGZ4IHx8IG51bGw7dGhpcy5rZXkgPSBvcHRzLmtleSB8fCBudWxsO3RoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZSB8fCBudWxsO3RoaXMuY2VydCA9IG9wdHMuY2VydCB8fCBudWxsO3RoaXMuY2EgPSBvcHRzLmNhIHx8IG51bGw7dGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzIHx8IG51bGw7dGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCB8fCBudWxsO3RoaXMub3BlbigpO31Tb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7IC8qKlxuICAgICAgICAgICAqIE1peCBpbiBgRW1pdHRlcmAuXG4gICAgICAgICAgICovRW1pdHRlcihTb2NrZXQucHJvdG90eXBlKTsgLyoqXG4gICAgICAgICAgICogUHJvdG9jb2wgdmVyc2lvbi5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAgICovU29ja2V0LnByb3RvY29sID0gcGFyc2VyLnByb3RvY29sOyAvLyB0aGlzIGlzIGFuIGludFxuLyoqXG4gICAgICAgICAgICogRXhwb3NlIGRlcHMgZm9yIGxlZ2FjeSBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICogYW5kIHN0YW5kYWxvbmUgYnJvd3NlciBhY2Nlc3MuXG4gICAgICAgICAgICovU29ja2V0LlNvY2tldCA9IFNvY2tldDtTb2NrZXQuVHJhbnNwb3J0ID0gX2RlcmVxXygnLi90cmFuc3BvcnQnKTtTb2NrZXQudHJhbnNwb3J0cyA9IF9kZXJlcV8oJy4vdHJhbnNwb3J0cycpO1NvY2tldC5wYXJzZXIgPSBfZGVyZXFfKCdlbmdpbmUuaW8tcGFyc2VyJyk7IC8qKlxuICAgICAgICAgICAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gICAgICAgICAgICogQHJldHVybiB7VHJhbnNwb3J0fVxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL1NvY2tldC5wcm90b3R5cGUuY3JlYXRlVHJhbnNwb3J0ID0gZnVuY3Rpb24obmFtZSl7ZGVidWcoJ2NyZWF0aW5nIHRyYW5zcG9ydCBcIiVzXCInLG5hbWUpO3ZhciBxdWVyeT1jbG9uZSh0aGlzLnF1ZXJ5KTsgLy8gYXBwZW5kIGVuZ2luZS5pbyBwcm90b2NvbCBpZGVudGlmaWVyXG5xdWVyeS5FSU8gPSBwYXJzZXIucHJvdG9jb2w7IC8vIHRyYW5zcG9ydCBuYW1lXG5xdWVyeS50cmFuc3BvcnQgPSBuYW1lOyAvLyBzZXNzaW9uIGlkIGlmIHdlIGFscmVhZHkgaGF2ZSBvbmVcbmlmKHRoaXMuaWQpcXVlcnkuc2lkID0gdGhpcy5pZDt2YXIgdHJhbnNwb3J0PW5ldyB0cmFuc3BvcnRzW25hbWVdKHthZ2VudDp0aGlzLmFnZW50LGhvc3RuYW1lOnRoaXMuaG9zdG5hbWUscG9ydDp0aGlzLnBvcnQsc2VjdXJlOnRoaXMuc2VjdXJlLHBhdGg6dGhpcy5wYXRoLHF1ZXJ5OnF1ZXJ5LGZvcmNlSlNPTlA6dGhpcy5mb3JjZUpTT05QLGpzb25wOnRoaXMuanNvbnAsZm9yY2VCYXNlNjQ6dGhpcy5mb3JjZUJhc2U2NCxlbmFibGVzWERSOnRoaXMuZW5hYmxlc1hEUix0aW1lc3RhbXBSZXF1ZXN0czp0aGlzLnRpbWVzdGFtcFJlcXVlc3RzLHRpbWVzdGFtcFBhcmFtOnRoaXMudGltZXN0YW1wUGFyYW0scG9saWN5UG9ydDp0aGlzLnBvbGljeVBvcnQsc29ja2V0OnRoaXMscGZ4OnRoaXMucGZ4LGtleTp0aGlzLmtleSxwYXNzcGhyYXNlOnRoaXMucGFzc3BocmFzZSxjZXJ0OnRoaXMuY2VydCxjYTp0aGlzLmNhLGNpcGhlcnM6dGhpcy5jaXBoZXJzLHJlamVjdFVuYXV0aG9yaXplZDp0aGlzLnJlamVjdFVuYXV0aG9yaXplZH0pO3JldHVybiB0cmFuc3BvcnQ7fTtmdW5jdGlvbiBjbG9uZShvYmope3ZhciBvPXt9O2Zvcih2YXIgaSBpbiBvYmopIHtpZihvYmouaGFzT3duUHJvcGVydHkoaSkpe29baV0gPSBvYmpbaV07fX1yZXR1cm4gbzt9IC8qKlxuICAgICAgICAgICAqIEluaXRpYWxpemVzIHRyYW5zcG9ydCB0byB1c2UgYW5kIHN0YXJ0cyBwcm9iZS5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL1NvY2tldC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCl7dmFyIHRyYW5zcG9ydDtpZih0aGlzLnJlbWVtYmVyVXBncmFkZSAmJiBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzICYmIHRoaXMudHJhbnNwb3J0cy5pbmRleE9mKCd3ZWJzb2NrZXQnKSAhPSAtMSl7dHJhbnNwb3J0ID0gJ3dlYnNvY2tldCc7fWVsc2UgaWYoMCA9PSB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoKXsgLy8gRW1pdCBlcnJvciBvbiBuZXh0IHRpY2sgc28gaXQgY2FuIGJlIGxpc3RlbmVkIHRvXG52YXIgc2VsZj10aGlzO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtzZWxmLmVtaXQoJ2Vycm9yJywnTm8gdHJhbnNwb3J0cyBhdmFpbGFibGUnKTt9LDApO3JldHVybjt9ZWxzZSB7dHJhbnNwb3J0ID0gdGhpcy50cmFuc3BvcnRzWzBdO310aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7IC8vIFJldHJ5IHdpdGggdGhlIG5leHQgdHJhbnNwb3J0IGlmIHRoZSB0cmFuc3BvcnQgaXMgZGlzYWJsZWQgKGpzb25wOiBmYWxzZSlcbnZhciB0cmFuc3BvcnQ7dHJ5e3RyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KHRyYW5zcG9ydCk7fWNhdGNoKGUpIHt0aGlzLnRyYW5zcG9ydHMuc2hpZnQoKTt0aGlzLm9wZW4oKTtyZXR1cm47fXRyYW5zcG9ydC5vcGVuKCk7dGhpcy5zZXRUcmFuc3BvcnQodHJhbnNwb3J0KTt9OyAvKipcbiAgICAgICAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL1NvY2tldC5wcm90b3R5cGUuc2V0VHJhbnNwb3J0ID0gZnVuY3Rpb24odHJhbnNwb3J0KXtkZWJ1Zygnc2V0dGluZyB0cmFuc3BvcnQgJXMnLHRyYW5zcG9ydC5uYW1lKTt2YXIgc2VsZj10aGlzO2lmKHRoaXMudHJhbnNwb3J0KXtkZWJ1ZygnY2xlYXJpbmcgZXhpc3RpbmcgdHJhbnNwb3J0ICVzJyx0aGlzLnRyYW5zcG9ydC5uYW1lKTt0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTt9IC8vIHNldCB1cCB0cmFuc3BvcnRcbnRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0OyAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xudHJhbnNwb3J0Lm9uKCdkcmFpbicsZnVuY3Rpb24oKXtzZWxmLm9uRHJhaW4oKTt9KS5vbigncGFja2V0JyxmdW5jdGlvbihwYWNrZXQpe3NlbGYub25QYWNrZXQocGFja2V0KTt9KS5vbignZXJyb3InLGZ1bmN0aW9uKGUpe3NlbGYub25FcnJvcihlKTt9KS5vbignY2xvc2UnLGZ1bmN0aW9uKCl7c2VsZi5vbkNsb3NlKCd0cmFuc3BvcnQgY2xvc2UnKTt9KTt9OyAvKipcbiAgICAgICAgICAgKiBQcm9iZXMgYSB0cmFuc3BvcnQuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNwb3J0IG5hbWVcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLnByb2JlID0gZnVuY3Rpb24obmFtZSl7ZGVidWcoJ3Byb2JpbmcgdHJhbnNwb3J0IFwiJXNcIicsbmFtZSk7dmFyIHRyYW5zcG9ydD10aGlzLmNyZWF0ZVRyYW5zcG9ydChuYW1lLHtwcm9iZToxfSksZmFpbGVkPWZhbHNlLHNlbGY9dGhpcztTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7ZnVuY3Rpb24gb25UcmFuc3BvcnRPcGVuKCl7aWYoc2VsZi5vbmx5QmluYXJ5VXBncmFkZXMpe3ZhciB1cGdyYWRlTG9zZXNCaW5hcnk9IXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgc2VsZi50cmFuc3BvcnQuc3VwcG9ydHNCaW5hcnk7ZmFpbGVkID0gZmFpbGVkIHx8IHVwZ3JhZGVMb3Nlc0JpbmFyeTt9aWYoZmFpbGVkKXJldHVybjtkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBvcGVuZWQnLG5hbWUpO3RyYW5zcG9ydC5zZW5kKFt7dHlwZToncGluZycsZGF0YToncHJvYmUnfV0pO3RyYW5zcG9ydC5vbmNlKCdwYWNrZXQnLGZ1bmN0aW9uKG1zZyl7aWYoZmFpbGVkKXJldHVybjtpZigncG9uZycgPT0gbXNnLnR5cGUgJiYgJ3Byb2JlJyA9PSBtc2cuZGF0YSl7ZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgcG9uZycsbmFtZSk7c2VsZi51cGdyYWRpbmcgPSB0cnVlO3NlbGYuZW1pdCgndXBncmFkaW5nJyx0cmFuc3BvcnQpO2lmKCF0cmFuc3BvcnQpcmV0dXJuO1NvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSAnd2Vic29ja2V0JyA9PSB0cmFuc3BvcnQubmFtZTtkZWJ1ZygncGF1c2luZyBjdXJyZW50IHRyYW5zcG9ydCBcIiVzXCInLHNlbGYudHJhbnNwb3J0Lm5hbWUpO3NlbGYudHJhbnNwb3J0LnBhdXNlKGZ1bmN0aW9uKCl7aWYoZmFpbGVkKXJldHVybjtpZignY2xvc2VkJyA9PSBzZWxmLnJlYWR5U3RhdGUpcmV0dXJuO2RlYnVnKCdjaGFuZ2luZyB0cmFuc3BvcnQgYW5kIHNlbmRpbmcgdXBncmFkZSBwYWNrZXQnKTtjbGVhbnVwKCk7c2VsZi5zZXRUcmFuc3BvcnQodHJhbnNwb3J0KTt0cmFuc3BvcnQuc2VuZChbe3R5cGU6J3VwZ3JhZGUnfV0pO3NlbGYuZW1pdCgndXBncmFkZScsdHJhbnNwb3J0KTt0cmFuc3BvcnQgPSBudWxsO3NlbGYudXBncmFkaW5nID0gZmFsc2U7c2VsZi5mbHVzaCgpO30pO31lbHNlIHtkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBmYWlsZWQnLG5hbWUpO3ZhciBlcnI9bmV3IEVycm9yKCdwcm9iZSBlcnJvcicpO2Vyci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtzZWxmLmVtaXQoJ3VwZ3JhZGVFcnJvcicsZXJyKTt9fSk7fWZ1bmN0aW9uIGZyZWV6ZVRyYW5zcG9ydCgpe2lmKGZhaWxlZClyZXR1cm47IC8vIEFueSBjYWxsYmFjayBjYWxsZWQgYnkgdHJhbnNwb3J0IHNob3VsZCBiZSBpZ25vcmVkIHNpbmNlIG5vd1xuZmFpbGVkID0gdHJ1ZTtjbGVhbnVwKCk7dHJhbnNwb3J0LmNsb3NlKCk7dHJhbnNwb3J0ID0gbnVsbDt9IC8vSGFuZGxlIGFueSBlcnJvciB0aGF0IGhhcHBlbnMgd2hpbGUgcHJvYmluZ1xuZnVuY3Rpb24gb25lcnJvcihlcnIpe3ZhciBlcnJvcj1uZXcgRXJyb3IoJ3Byb2JlIGVycm9yOiAnICsgZXJyKTtlcnJvci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtmcmVlemVUcmFuc3BvcnQoKTtkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBmYWlsZWQgYmVjYXVzZSBvZiBlcnJvcjogJXMnLG5hbWUsZXJyKTtzZWxmLmVtaXQoJ3VwZ3JhZGVFcnJvcicsZXJyb3IpO31mdW5jdGlvbiBvblRyYW5zcG9ydENsb3NlKCl7b25lcnJvcihcInRyYW5zcG9ydCBjbG9zZWRcIik7fSAvL1doZW4gdGhlIHNvY2tldCBpcyBjbG9zZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuZnVuY3Rpb24gb25jbG9zZSgpe29uZXJyb3IoXCJzb2NrZXQgY2xvc2VkXCIpO30gLy9XaGVuIHRoZSBzb2NrZXQgaXMgdXBncmFkZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuZnVuY3Rpb24gb251cGdyYWRlKHRvKXtpZih0cmFuc3BvcnQgJiYgdG8ubmFtZSAhPSB0cmFuc3BvcnQubmFtZSl7ZGVidWcoJ1wiJXNcIiB3b3JrcyAtIGFib3J0aW5nIFwiJXNcIicsdG8ubmFtZSx0cmFuc3BvcnQubmFtZSk7ZnJlZXplVHJhbnNwb3J0KCk7fX0gLy9SZW1vdmUgYWxsIGxpc3RlbmVycyBvbiB0aGUgdHJhbnNwb3J0IGFuZCBvbiBzZWxmXG5mdW5jdGlvbiBjbGVhbnVwKCl7dHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdvcGVuJyxvblRyYW5zcG9ydE9wZW4pO3RyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLG9uZXJyb3IpO3RyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLG9uVHJhbnNwb3J0Q2xvc2UpO3NlbGYucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJyxvbmNsb3NlKTtzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRpbmcnLG9udXBncmFkZSk7fXRyYW5zcG9ydC5vbmNlKCdvcGVuJyxvblRyYW5zcG9ydE9wZW4pO3RyYW5zcG9ydC5vbmNlKCdlcnJvcicsb25lcnJvcik7dHJhbnNwb3J0Lm9uY2UoJ2Nsb3NlJyxvblRyYW5zcG9ydENsb3NlKTt0aGlzLm9uY2UoJ2Nsb3NlJyxvbmNsb3NlKTt0aGlzLm9uY2UoJ3VwZ3JhZGluZycsb251cGdyYWRlKTt0cmFuc3BvcnQub3BlbigpO307IC8qKlxuICAgICAgICAgICAqIENhbGxlZCB3aGVuIGNvbm5lY3Rpb24gaXMgZGVlbWVkIG9wZW4uXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgICAqL1NvY2tldC5wcm90b3R5cGUub25PcGVuID0gZnVuY3Rpb24oKXtkZWJ1Zygnc29ja2V0IG9wZW4nKTt0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7U29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9ICd3ZWJzb2NrZXQnID09IHRoaXMudHJhbnNwb3J0Lm5hbWU7dGhpcy5lbWl0KCdvcGVuJyk7dGhpcy5mbHVzaCgpOyAvLyB3ZSBjaGVjayBmb3IgYHJlYWR5U3RhdGVgIGluIGNhc2UgYW4gYG9wZW5gXG4vLyBsaXN0ZW5lciBhbHJlYWR5IGNsb3NlZCB0aGUgc29ja2V0XG5pZignb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlICYmIHRoaXMudXBncmFkZSAmJiB0aGlzLnRyYW5zcG9ydC5wYXVzZSl7ZGVidWcoJ3N0YXJ0aW5nIHVwZ3JhZGUgcHJvYmVzJyk7Zm9yKHZhciBpPTAsbD10aGlzLnVwZ3JhZGVzLmxlbmd0aDtpIDwgbDtpKyspIHt0aGlzLnByb2JlKHRoaXMudXBncmFkZXNbaV0pO319fTsgLyoqXG4gICAgICAgICAgICogSGFuZGxlcyBhIHBhY2tldC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL1NvY2tldC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQpe2lmKCdvcGVuaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSl7ZGVidWcoJ3NvY2tldCByZWNlaXZlOiB0eXBlIFwiJXNcIiwgZGF0YSBcIiVzXCInLHBhY2tldC50eXBlLHBhY2tldC5kYXRhKTt0aGlzLmVtaXQoJ3BhY2tldCcscGFja2V0KTsgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xudGhpcy5lbWl0KCdoZWFydGJlYXQnKTtzd2l0Y2gocGFja2V0LnR5cGUpe2Nhc2UgJ29wZW4nOnRoaXMub25IYW5kc2hha2UocGFyc2Vqc29uKHBhY2tldC5kYXRhKSk7YnJlYWs7Y2FzZSAncG9uZyc6dGhpcy5zZXRQaW5nKCk7YnJlYWs7Y2FzZSAnZXJyb3InOnZhciBlcnI9bmV3IEVycm9yKCdzZXJ2ZXIgZXJyb3InKTtlcnIuY29kZSA9IHBhY2tldC5kYXRhO3RoaXMuZW1pdCgnZXJyb3InLGVycik7YnJlYWs7Y2FzZSAnbWVzc2FnZSc6dGhpcy5lbWl0KCdkYXRhJyxwYWNrZXQuZGF0YSk7dGhpcy5lbWl0KCdtZXNzYWdlJyxwYWNrZXQuZGF0YSk7YnJlYWs7fX1lbHNlIHtkZWJ1ZygncGFja2V0IHJlY2VpdmVkIHdpdGggc29ja2V0IHJlYWR5U3RhdGUgXCIlc1wiJyx0aGlzLnJlYWR5U3RhdGUpO319OyAvKipcbiAgICAgICAgICAgKiBDYWxsZWQgdXBvbiBoYW5kc2hha2UgY29tcGxldGlvbi5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBoYW5kc2hha2Ugb2JqXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAgICovU29ja2V0LnByb3RvdHlwZS5vbkhhbmRzaGFrZSA9IGZ1bmN0aW9uKGRhdGEpe3RoaXMuZW1pdCgnaGFuZHNoYWtlJyxkYXRhKTt0aGlzLmlkID0gZGF0YS5zaWQ7dGhpcy50cmFuc3BvcnQucXVlcnkuc2lkID0gZGF0YS5zaWQ7dGhpcy51cGdyYWRlcyA9IHRoaXMuZmlsdGVyVXBncmFkZXMoZGF0YS51cGdyYWRlcyk7dGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDt0aGlzLnBpbmdUaW1lb3V0ID0gZGF0YS5waW5nVGltZW91dDt0aGlzLm9uT3BlbigpOyAvLyBJbiBjYXNlIG9wZW4gaGFuZGxlciBjbG9zZXMgc29ja2V0XG5pZignY2xvc2VkJyA9PSB0aGlzLnJlYWR5U3RhdGUpcmV0dXJuO3RoaXMuc2V0UGluZygpOyAvLyBQcm9sb25nIGxpdmVuZXNzIG9mIHNvY2tldCBvbiBoZWFydGJlYXRcbnRoaXMucmVtb3ZlTGlzdGVuZXIoJ2hlYXJ0YmVhdCcsdGhpcy5vbkhlYXJ0YmVhdCk7dGhpcy5vbignaGVhcnRiZWF0Jyx0aGlzLm9uSGVhcnRiZWF0KTt9OyAvKipcbiAgICAgICAgICAgKiBSZXNldHMgcGluZyB0aW1lb3V0LlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAgICovU29ja2V0LnByb3RvdHlwZS5vbkhlYXJ0YmVhdCA9IGZ1bmN0aW9uKHRpbWVvdXQpe2NsZWFyVGltZW91dCh0aGlzLnBpbmdUaW1lb3V0VGltZXIpO3ZhciBzZWxmPXRoaXM7c2VsZi5waW5nVGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe2lmKCdjbG9zZWQnID09IHNlbGYucmVhZHlTdGF0ZSlyZXR1cm47c2VsZi5vbkNsb3NlKCdwaW5nIHRpbWVvdXQnKTt9LHRpbWVvdXQgfHwgc2VsZi5waW5nSW50ZXJ2YWwgKyBzZWxmLnBpbmdUaW1lb3V0KTt9OyAvKipcbiAgICAgICAgICAgKiBQaW5ncyBzZXJ2ZXIgZXZlcnkgYHRoaXMucGluZ0ludGVydmFsYCBhbmQgZXhwZWN0cyByZXNwb25zZVxuICAgICAgICAgICAqIHdpdGhpbiBgdGhpcy5waW5nVGltZW91dGAgb3IgY2xvc2VzIGNvbm5lY3Rpb24uXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLnNldFBpbmcgPSBmdW5jdGlvbigpe3ZhciBzZWxmPXRoaXM7Y2xlYXJUaW1lb3V0KHNlbGYucGluZ0ludGVydmFsVGltZXIpO3NlbGYucGluZ0ludGVydmFsVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZGVidWcoJ3dyaXRpbmcgcGluZyBwYWNrZXQgLSBleHBlY3RpbmcgcG9uZyB3aXRoaW4gJXNtcycsc2VsZi5waW5nVGltZW91dCk7c2VsZi5waW5nKCk7c2VsZi5vbkhlYXJ0YmVhdChzZWxmLnBpbmdUaW1lb3V0KTt9LHNlbGYucGluZ0ludGVydmFsKTt9OyAvKipcbiAgICAgICAgICAgKiBTZW5kcyBhIHBpbmcgcGFja2V0LlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLnBpbmcgPSBmdW5jdGlvbigpe3RoaXMuc2VuZFBhY2tldCgncGluZycpO307IC8qKlxuICAgICAgICAgICAqIENhbGxlZCBvbiBgZHJhaW5gIGV2ZW50XG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLm9uRHJhaW4gPSBmdW5jdGlvbigpe2Zvcih2YXIgaT0wO2kgPCB0aGlzLnByZXZCdWZmZXJMZW47aSsrKSB7aWYodGhpcy5jYWxsYmFja0J1ZmZlcltpXSl7dGhpcy5jYWxsYmFja0J1ZmZlcltpXSgpO319dGhpcy53cml0ZUJ1ZmZlci5zcGxpY2UoMCx0aGlzLnByZXZCdWZmZXJMZW4pO3RoaXMuY2FsbGJhY2tCdWZmZXIuc3BsaWNlKDAsdGhpcy5wcmV2QnVmZmVyTGVuKTsgLy8gc2V0dGluZyBwcmV2QnVmZmVyTGVuID0gMCBpcyB2ZXJ5IGltcG9ydGFudFxuLy8gZm9yIGV4YW1wbGUsIHdoZW4gdXBncmFkaW5nLCB1cGdyYWRlIHBhY2tldCBpcyBzZW50IG92ZXIsXG4vLyBhbmQgYSBub256ZXJvIHByZXZCdWZmZXJMZW4gY291bGQgY2F1c2UgcHJvYmxlbXMgb24gYGRyYWluYFxudGhpcy5wcmV2QnVmZmVyTGVuID0gMDtpZih0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCA9PSAwKXt0aGlzLmVtaXQoJ2RyYWluJyk7fWVsc2Uge3RoaXMuZmx1c2goKTt9fTsgLyoqXG4gICAgICAgICAgICogRmx1c2ggd3JpdGUgYnVmZmVycy5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL1NvY2tldC5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbigpe2lmKCdjbG9zZWQnICE9IHRoaXMucmVhZHlTdGF0ZSAmJiB0aGlzLnRyYW5zcG9ydC53cml0YWJsZSAmJiAhdGhpcy51cGdyYWRpbmcgJiYgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpe2RlYnVnKCdmbHVzaGluZyAlZCBwYWNrZXRzIGluIHNvY2tldCcsdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpO3RoaXMudHJhbnNwb3J0LnNlbmQodGhpcy53cml0ZUJ1ZmZlcik7IC8vIGtlZXAgdHJhY2sgb2YgY3VycmVudCBsZW5ndGggb2Ygd3JpdGVCdWZmZXJcbi8vIHNwbGljZSB3cml0ZUJ1ZmZlciBhbmQgY2FsbGJhY2tCdWZmZXIgb24gYGRyYWluYFxudGhpcy5wcmV2QnVmZmVyTGVuID0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGg7dGhpcy5lbWl0KCdmbHVzaCcpO319OyAvKipcbiAgICAgICAgICAgKiBTZW5kcyBhIG1lc3NhZ2UuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZS5cbiAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgICAgICAgKiBAcmV0dXJuIHtTb2NrZXR9IGZvciBjaGFpbmluZy5cbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgICAqL1NvY2tldC5wcm90b3R5cGUud3JpdGUgPSBTb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihtc2csZm4pe3RoaXMuc2VuZFBhY2tldCgnbWVzc2FnZScsbXNnLGZuKTtyZXR1cm4gdGhpczt9OyAvKipcbiAgICAgICAgICAgKiBTZW5kcyBhIHBhY2tldC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYWNrZXQgdHlwZS5cbiAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5cbiAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLnNlbmRQYWNrZXQgPSBmdW5jdGlvbih0eXBlLGRhdGEsZm4pe2lmKCdjbG9zaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ2Nsb3NlZCcgPT0gdGhpcy5yZWFkeVN0YXRlKXtyZXR1cm47fXZhciBwYWNrZXQ9e3R5cGU6dHlwZSxkYXRhOmRhdGF9O3RoaXMuZW1pdCgncGFja2V0Q3JlYXRlJyxwYWNrZXQpO3RoaXMud3JpdGVCdWZmZXIucHVzaChwYWNrZXQpO3RoaXMuY2FsbGJhY2tCdWZmZXIucHVzaChmbik7dGhpcy5mbHVzaCgpO307IC8qKlxuICAgICAgICAgICAqIENsb3NlcyB0aGUgY29ubmVjdGlvbi5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL1NvY2tldC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpe3ZhciBfdGhpcz10aGlzO2lmKCdvcGVuaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSl7dmFyIHNlbGY7KGZ1bmN0aW9uKCl7dmFyIGNsb3NlPWZ1bmN0aW9uIGNsb3NlKCl7c2VsZi5vbkNsb3NlKCdmb3JjZWQgY2xvc2UnKTtkZWJ1Zygnc29ja2V0IGNsb3NpbmcgLSB0ZWxsaW5nIHRyYW5zcG9ydCB0byBjbG9zZScpO3NlbGYudHJhbnNwb3J0LmNsb3NlKCk7fTt2YXIgY2xlYW51cEFuZENsb3NlPWZ1bmN0aW9uIGNsZWFudXBBbmRDbG9zZSgpe3NlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGUnLGNsZWFudXBBbmRDbG9zZSk7c2VsZi5yZW1vdmVMaXN0ZW5lcigndXBncmFkZUVycm9yJyxjbGVhbnVwQW5kQ2xvc2UpO2Nsb3NlKCk7fTt2YXIgd2FpdEZvclVwZ3JhZGU9ZnVuY3Rpb24gd2FpdEZvclVwZ3JhZGUoKXsgLy8gd2FpdCBmb3IgdXBncmFkZSB0byBmaW5pc2ggc2luY2Ugd2UgY2FuJ3Qgc2VuZCBwYWNrZXRzIHdoaWxlIHBhdXNpbmcgYSB0cmFuc3BvcnRcbnNlbGYub25jZSgndXBncmFkZScsY2xlYW51cEFuZENsb3NlKTtzZWxmLm9uY2UoJ3VwZ3JhZGVFcnJvcicsY2xlYW51cEFuZENsb3NlKTt9O190aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2luZyc7c2VsZiA9IF90aGlzO2lmKF90aGlzLndyaXRlQnVmZmVyLmxlbmd0aCl7X3RoaXMub25jZSgnZHJhaW4nLGZ1bmN0aW9uKCl7aWYodGhpcy51cGdyYWRpbmcpe3dhaXRGb3JVcGdyYWRlKCk7fWVsc2Uge2Nsb3NlKCk7fX0pO31lbHNlIGlmKF90aGlzLnVwZ3JhZGluZyl7d2FpdEZvclVwZ3JhZGUoKTt9ZWxzZSB7Y2xvc2UoKTt9fSkoKTt9cmV0dXJuIHRoaXM7fTsgLyoqXG4gICAgICAgICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGVycm9yXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICAgKi9Tb2NrZXQucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbihlcnIpe2RlYnVnKCdzb2NrZXQgZXJyb3IgJWonLGVycik7U29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO3RoaXMuZW1pdCgnZXJyb3InLGVycik7dGhpcy5vbkNsb3NlKCd0cmFuc3BvcnQgZXJyb3InLGVycik7fTsgLyoqXG4gICAgICAgICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAgICovU29ja2V0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24ocmVhc29uLGRlc2Mpe2lmKCdvcGVuaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2luZycgPT0gdGhpcy5yZWFkeVN0YXRlKXtkZWJ1Zygnc29ja2V0IGNsb3NlIHdpdGggcmVhc29uOiBcIiVzXCInLHJlYXNvbik7dmFyIHNlbGY9dGhpczsgLy8gY2xlYXIgdGltZXJzXG5jbGVhclRpbWVvdXQodGhpcy5waW5nSW50ZXJ2YWxUaW1lcik7Y2xlYXJUaW1lb3V0KHRoaXMucGluZ1RpbWVvdXRUaW1lcik7IC8vIGNsZWFuIGJ1ZmZlcnMgaW4gbmV4dCB0aWNrLCBzbyBkZXZlbG9wZXJzIGNhbiBzdGlsbFxuLy8gZ3JhYiB0aGUgYnVmZmVycyBvbiBgY2xvc2VgIGV2ZW50XG5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7c2VsZi53cml0ZUJ1ZmZlciA9IFtdO3NlbGYuY2FsbGJhY2tCdWZmZXIgPSBbXTtzZWxmLnByZXZCdWZmZXJMZW4gPSAwO30sMCk7IC8vIHN0b3AgZXZlbnQgZnJvbSBmaXJpbmcgYWdhaW4gZm9yIHRyYW5zcG9ydFxudGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCdjbG9zZScpOyAvLyBlbnN1cmUgdHJhbnNwb3J0IHdvbid0IHN0YXkgb3BlblxudGhpcy50cmFuc3BvcnQuY2xvc2UoKTsgLy8gaWdub3JlIGZ1cnRoZXIgdHJhbnNwb3J0IGNvbW11bmljYXRpb25cbnRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpOyAvLyBzZXQgcmVhZHkgc3RhdGVcbnRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnOyAvLyBjbGVhciBzZXNzaW9uIGlkXG50aGlzLmlkID0gbnVsbDsgLy8gZW1pdCBjbG9zZSBldmVudFxudGhpcy5lbWl0KCdjbG9zZScscmVhc29uLGRlc2MpO319OyAvKipcbiAgICAgICAgICAgKiBGaWx0ZXJzIHVwZ3JhZGVzLCByZXR1cm5pbmcgb25seSB0aG9zZSBtYXRjaGluZyBjbGllbnQgdHJhbnNwb3J0cy5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHNlcnZlciB1cGdyYWRlc1xuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqXG4gICAgICAgICAgICovU29ja2V0LnByb3RvdHlwZS5maWx0ZXJVcGdyYWRlcyA9IGZ1bmN0aW9uKHVwZ3JhZGVzKXt2YXIgZmlsdGVyZWRVcGdyYWRlcz1bXTtmb3IodmFyIGk9MCxqPXVwZ3JhZGVzLmxlbmd0aDtpIDwgajtpKyspIHtpZih+aW5kZXgodGhpcy50cmFuc3BvcnRzLHVwZ3JhZGVzW2ldKSlmaWx0ZXJlZFVwZ3JhZGVzLnB1c2godXBncmFkZXNbaV0pO31yZXR1cm4gZmlsdGVyZWRVcGdyYWRlczt9O30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93Ont9KTt9LHtcIi4vdHJhbnNwb3J0XCI6MTQsXCIuL3RyYW5zcG9ydHNcIjoxNSxcImNvbXBvbmVudC1lbWl0dGVyXCI6OSxcImRlYnVnXCI6MjIsXCJlbmdpbmUuaW8tcGFyc2VyXCI6MjUsXCJpbmRleG9mXCI6NDIsXCJwYXJzZWpzb25cIjozNCxcInBhcnNlcXNcIjozNSxcInBhcnNldXJpXCI6MzZ9XSwxNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICAgICAgICAgKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICAgICAgICAgKi92YXIgcGFyc2VyPV9kZXJlcV8oJ2VuZ2luZS5pby1wYXJzZXInKTt2YXIgRW1pdHRlcj1fZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcicpOyAvKipcbiAgICAgICAgICogTW9kdWxlIGV4cG9ydHMuXG4gICAgICAgICAqL21vZHVsZS5leHBvcnRzID0gVHJhbnNwb3J0OyAvKipcbiAgICAgICAgICogVHJhbnNwb3J0IGFic3RyYWN0IGNvbnN0cnVjdG9yLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAqL2Z1bmN0aW9uIFRyYW5zcG9ydChvcHRzKXt0aGlzLnBhdGggPSBvcHRzLnBhdGg7dGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWU7dGhpcy5wb3J0ID0gb3B0cy5wb3J0O3RoaXMuc2VjdXJlID0gb3B0cy5zZWN1cmU7dGhpcy5xdWVyeSA9IG9wdHMucXVlcnk7dGhpcy50aW1lc3RhbXBQYXJhbSA9IG9wdHMudGltZXN0YW1wUGFyYW07dGhpcy50aW1lc3RhbXBSZXF1ZXN0cyA9IG9wdHMudGltZXN0YW1wUmVxdWVzdHM7dGhpcy5yZWFkeVN0YXRlID0gJyc7dGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQgfHwgZmFsc2U7dGhpcy5zb2NrZXQgPSBvcHRzLnNvY2tldDt0aGlzLmVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7IC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxudGhpcy5wZnggPSBvcHRzLnBmeDt0aGlzLmtleSA9IG9wdHMua2V5O3RoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZTt0aGlzLmNlcnQgPSBvcHRzLmNlcnQ7dGhpcy5jYSA9IG9wdHMuY2E7dGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzO3RoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7fSAvKipcbiAgICAgICAgICogTWl4IGluIGBFbWl0dGVyYC5cbiAgICAgICAgICovRW1pdHRlcihUcmFuc3BvcnQucHJvdG90eXBlKTsgLyoqXG4gICAgICAgICAqIEEgY291bnRlciB1c2VkIHRvIHByZXZlbnQgY29sbGlzaW9ucyBpbiB0aGUgdGltZXN0YW1wcyB1c2VkXG4gICAgICAgICAqIGZvciBjYWNoZSBidXN0aW5nLlxuICAgICAgICAgKi9UcmFuc3BvcnQudGltZXN0YW1wcyA9IDA7IC8qKlxuICAgICAgICAgKiBFbWl0cyBhbiBlcnJvci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgICAgICAgKiBAcmV0dXJuIHtUcmFuc3BvcnR9IGZvciBjaGFpbmluZ1xuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9UcmFuc3BvcnQucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbihtc2csZGVzYyl7dmFyIGVycj1uZXcgRXJyb3IobXNnKTtlcnIudHlwZSA9ICdUcmFuc3BvcnRFcnJvcic7ZXJyLmRlc2NyaXB0aW9uID0gZGVzYzt0aGlzLmVtaXQoJ2Vycm9yJyxlcnIpO3JldHVybiB0aGlzO307IC8qKlxuICAgICAgICAgKiBPcGVucyB0aGUgdHJhbnNwb3J0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9UcmFuc3BvcnQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbigpe2lmKCdjbG9zZWQnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnJyA9PSB0aGlzLnJlYWR5U3RhdGUpe3RoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJzt0aGlzLmRvT3BlbigpO31yZXR1cm4gdGhpczt9OyAvKipcbiAgICAgICAgICogQ2xvc2VzIHRoZSB0cmFuc3BvcnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9UcmFuc3BvcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKXtpZignb3BlbmluZycgPT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUpe3RoaXMuZG9DbG9zZSgpO3RoaXMub25DbG9zZSgpO31yZXR1cm4gdGhpczt9OyAvKipcbiAgICAgICAgICogU2VuZHMgbXVsdGlwbGUgcGFja2V0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovVHJhbnNwb3J0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24ocGFja2V0cyl7aWYoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSl7dGhpcy53cml0ZShwYWNrZXRzKTt9ZWxzZSB7dGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgbm90IG9wZW4nKTt9fTsgLyoqXG4gICAgICAgICAqIENhbGxlZCB1cG9uIG9wZW5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAqL1RyYW5zcG9ydC5wcm90b3R5cGUub25PcGVuID0gZnVuY3Rpb24oKXt0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7dGhpcy53cml0YWJsZSA9IHRydWU7dGhpcy5lbWl0KCdvcGVuJyk7fTsgLyoqXG4gICAgICAgICAqIENhbGxlZCB3aXRoIGRhdGEuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9UcmFuc3BvcnQucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe3ZhciBwYWNrZXQ9cGFyc2VyLmRlY29kZVBhY2tldChkYXRhLHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpO3RoaXMub25QYWNrZXQocGFja2V0KTt9OyAvKipcbiAgICAgICAgICogQ2FsbGVkIHdpdGggYSBkZWNvZGVkIHBhY2tldC5cbiAgICAgICAgICovVHJhbnNwb3J0LnByb3RvdHlwZS5vblBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCl7dGhpcy5lbWl0KCdwYWNrZXQnLHBhY2tldCk7fTsgLyoqXG4gICAgICAgICAqIENhbGxlZCB1cG9uIGNsb3NlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovVHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24oKXt0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJzt0aGlzLmVtaXQoJ2Nsb3NlJyk7fTt9LHtcImNvbXBvbmVudC1lbWl0dGVyXCI6OSxcImVuZ2luZS5pby1wYXJzZXJcIjoyNX1dLDE1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyoqXG4gICAgICAgICAgICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICAgICAgICAgICAqL3ZhciBYTUxIdHRwUmVxdWVzdD1fZGVyZXFfKCd4bWxodHRwcmVxdWVzdCcpO3ZhciBYSFI9X2RlcmVxXygnLi9wb2xsaW5nLXhocicpO3ZhciBKU09OUD1fZGVyZXFfKCcuL3BvbGxpbmctanNvbnAnKTt2YXIgd2Vic29ja2V0PV9kZXJlcV8oJy4vd2Vic29ja2V0Jyk7IC8qKlxuICAgICAgICAgICAqIEV4cG9ydCB0cmFuc3BvcnRzLlxuICAgICAgICAgICAqL2V4cG9ydHMucG9sbGluZyA9IHBvbGxpbmc7ZXhwb3J0cy53ZWJzb2NrZXQgPSB3ZWJzb2NrZXQ7IC8qKlxuICAgICAgICAgICAqIFBvbGxpbmcgdHJhbnNwb3J0IHBvbHltb3JwaGljIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAqIERlY2lkZXMgb24geGhyIHZzIGpzb25wIGJhc2VkIG9uIGZlYXR1cmUgZGV0ZWN0aW9uLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAgICovZnVuY3Rpb24gcG9sbGluZyhvcHRzKXt2YXIgeGhyO3ZhciB4ZD1mYWxzZTt2YXIgeHM9ZmFsc2U7dmFyIGpzb25wPWZhbHNlICE9PSBvcHRzLmpzb25wO2lmKGdsb2JhbC5sb2NhdGlvbil7dmFyIGlzU1NMPSdodHRwczonID09IGxvY2F0aW9uLnByb3RvY29sO3ZhciBwb3J0PWxvY2F0aW9uLnBvcnQ7IC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbmlmKCFwb3J0KXtwb3J0ID0gaXNTU0w/NDQzOjgwO314ZCA9IG9wdHMuaG9zdG5hbWUgIT0gbG9jYXRpb24uaG9zdG5hbWUgfHwgcG9ydCAhPSBvcHRzLnBvcnQ7eHMgPSBvcHRzLnNlY3VyZSAhPSBpc1NTTDt9b3B0cy54ZG9tYWluID0geGQ7b3B0cy54c2NoZW1lID0geHM7eGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpO2lmKCdvcGVuJyBpbiB4aHIgJiYgIW9wdHMuZm9yY2VKU09OUCl7cmV0dXJuIG5ldyBYSFIob3B0cyk7fWVsc2Uge2lmKCFqc29ucCl0aHJvdyBuZXcgRXJyb3IoJ0pTT05QIGRpc2FibGVkJyk7cmV0dXJuIG5ldyBKU09OUChvcHRzKTt9fX0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93Ont9KTt9LHtcIi4vcG9sbGluZy1qc29ucFwiOjE2LFwiLi9wb2xsaW5nLXhoclwiOjE3LFwiLi93ZWJzb2NrZXRcIjoxOSxcInhtbGh0dHByZXF1ZXN0XCI6MjB9XSwxNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qKlxuICAgICAgICAgICAqIE1vZHVsZSByZXF1aXJlbWVudHMuXG4gICAgICAgICAgICovdmFyIFBvbGxpbmc9X2RlcmVxXygnLi9wb2xsaW5nJyk7dmFyIGluaGVyaXQ9X2RlcmVxXygnY29tcG9uZW50LWluaGVyaXQnKTsgLyoqXG4gICAgICAgICAgICogTW9kdWxlIGV4cG9ydHMuXG4gICAgICAgICAgICovbW9kdWxlLmV4cG9ydHMgPSBKU09OUFBvbGxpbmc7IC8qKlxuICAgICAgICAgICAqIENhY2hlZCByZWd1bGFyIGV4cHJlc3Npb25zLlxuICAgICAgICAgICAqL3ZhciByTmV3bGluZT0vXFxuL2c7dmFyIHJFc2NhcGVkTmV3bGluZT0vXFxcXG4vZzsgLyoqXG4gICAgICAgICAgICogR2xvYmFsIEpTT05QIGNhbGxiYWNrcy5cbiAgICAgICAgICAgKi92YXIgY2FsbGJhY2tzOyAvKipcbiAgICAgICAgICAgKiBDYWxsYmFja3MgY291bnQuXG4gICAgICAgICAgICovdmFyIGluZGV4PTA7IC8qKlxuICAgICAgICAgICAqIE5vb3AuXG4gICAgICAgICAgICovZnVuY3Rpb24gZW1wdHkoKXt9IC8qKlxuICAgICAgICAgICAqIEpTT05QIFBvbGxpbmcgY29uc3RydWN0b3IuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cy5cbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgICAqL2Z1bmN0aW9uIEpTT05QUG9sbGluZyhvcHRzKXtQb2xsaW5nLmNhbGwodGhpcyxvcHRzKTt0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTsgLy8gZGVmaW5lIGdsb2JhbCBjYWxsYmFja3MgYXJyYXkgaWYgbm90IHByZXNlbnRcbi8vIHdlIGRvIHRoaXMgaGVyZSAobGF6aWx5KSB0byBhdm9pZCB1bm5lZWRlZCBnbG9iYWwgcG9sbHV0aW9uXG5pZighY2FsbGJhY2tzKXsgLy8gd2UgbmVlZCB0byBjb25zaWRlciBtdWx0aXBsZSBlbmdpbmVzIGluIHRoZSBzYW1lIHBhZ2VcbmlmKCFnbG9iYWwuX19fZWlvKWdsb2JhbC5fX19laW8gPSBbXTtjYWxsYmFja3MgPSBnbG9iYWwuX19fZWlvO30gLy8gY2FsbGJhY2sgaWRlbnRpZmllclxudGhpcy5pbmRleCA9IGNhbGxiYWNrcy5sZW5ndGg7IC8vIGFkZCBjYWxsYmFjayB0byBqc29ucCBnbG9iYWxcbnZhciBzZWxmPXRoaXM7Y2FsbGJhY2tzLnB1c2goZnVuY3Rpb24obXNnKXtzZWxmLm9uRGF0YShtc2cpO30pOyAvLyBhcHBlbmQgdG8gcXVlcnkgc3RyaW5nXG50aGlzLnF1ZXJ5LmogPSB0aGlzLmluZGV4OyAvLyBwcmV2ZW50IHNwdXJpb3VzIGVycm9ycyBmcm9tIGJlaW5nIGVtaXR0ZWQgd2hlbiB0aGUgd2luZG93IGlzIHVubG9hZGVkXG5pZihnbG9iYWwuZG9jdW1lbnQgJiYgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpe2dsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLGZ1bmN0aW9uKCl7aWYoc2VsZi5zY3JpcHQpc2VsZi5zY3JpcHQub25lcnJvciA9IGVtcHR5O30sZmFsc2UpO319IC8qKlxuICAgICAgICAgICAqIEluaGVyaXRzIGZyb20gUG9sbGluZy5cbiAgICAgICAgICAgKi9pbmhlcml0KEpTT05QUG9sbGluZyxQb2xsaW5nKTsgLypcbiAgICAgICAgICAgKiBKU09OUCBvbmx5IHN1cHBvcnRzIGJpbmFyeSBhcyBiYXNlNjQgZW5jb2RlZCBzdHJpbmdzXG4gICAgICAgICAgICovSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlOyAvKipcbiAgICAgICAgICAgKiBDbG9zZXMgdGhlIHNvY2tldC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL0pTT05QUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uKCl7aWYodGhpcy5zY3JpcHQpe3RoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO3RoaXMuc2NyaXB0ID0gbnVsbDt9aWYodGhpcy5mb3JtKXt0aGlzLmZvcm0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmZvcm0pO3RoaXMuZm9ybSA9IG51bGw7dGhpcy5pZnJhbWUgPSBudWxsO31Qb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlLmNhbGwodGhpcyk7fTsgLyoqXG4gICAgICAgICAgICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL0pTT05QUG9sbGluZy5wcm90b3R5cGUuZG9Qb2xsID0gZnVuY3Rpb24oKXt2YXIgc2VsZj10aGlzO3ZhciBzY3JpcHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7aWYodGhpcy5zY3JpcHQpe3RoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO3RoaXMuc2NyaXB0ID0gbnVsbDt9c2NyaXB0LmFzeW5jID0gdHJ1ZTtzY3JpcHQuc3JjID0gdGhpcy51cmkoKTtzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uKGUpe3NlbGYub25FcnJvcignanNvbnAgcG9sbCBlcnJvcicsZSk7fTt2YXIgaW5zZXJ0QXQ9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO2luc2VydEF0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCxpbnNlcnRBdCk7dGhpcy5zY3JpcHQgPSBzY3JpcHQ7dmFyIGlzVUFnZWNrbz0ndW5kZWZpbmVkJyAhPSB0eXBlb2YgbmF2aWdhdG9yICYmIC9nZWNrby9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7aWYoaXNVQWdlY2tvKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dmFyIGlmcmFtZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWUpO30sMTAwKTt9fTsgLyoqXG4gICAgICAgICAgICogV3JpdGVzIHdpdGggYSBoaWRkZW4gaWZyYW1lLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgdG8gc2VuZFxuICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL0pTT05QUG9sbGluZy5wcm90b3R5cGUuZG9Xcml0ZSA9IGZ1bmN0aW9uKGRhdGEsZm4pe3ZhciBzZWxmPXRoaXM7aWYoIXRoaXMuZm9ybSl7dmFyIGZvcm09ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO3ZhciBhcmVhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7dmFyIGlkPXRoaXMuaWZyYW1lSWQgPSAnZWlvX2lmcmFtZV8nICsgdGhpcy5pbmRleDt2YXIgaWZyYW1lO2Zvcm0uY2xhc3NOYW1lID0gJ3NvY2tldGlvJztmb3JtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztmb3JtLnN0eWxlLnRvcCA9ICctMTAwMHB4Jztmb3JtLnN0eWxlLmxlZnQgPSAnLTEwMDBweCc7Zm9ybS50YXJnZXQgPSBpZDtmb3JtLm1ldGhvZCA9ICdQT1NUJztmb3JtLnNldEF0dHJpYnV0ZSgnYWNjZXB0LWNoYXJzZXQnLCd1dGYtOCcpO2FyZWEubmFtZSA9ICdkJztmb3JtLmFwcGVuZENoaWxkKGFyZWEpO2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7dGhpcy5mb3JtID0gZm9ybTt0aGlzLmFyZWEgPSBhcmVhO310aGlzLmZvcm0uYWN0aW9uID0gdGhpcy51cmkoKTtmdW5jdGlvbiBjb21wbGV0ZSgpe2luaXRJZnJhbWUoKTtmbigpO31mdW5jdGlvbiBpbml0SWZyYW1lKCl7aWYoc2VsZi5pZnJhbWUpe3RyeXtzZWxmLmZvcm0ucmVtb3ZlQ2hpbGQoc2VsZi5pZnJhbWUpO31jYXRjaChlKSB7c2VsZi5vbkVycm9yKCdqc29ucCBwb2xsaW5nIGlmcmFtZSByZW1vdmFsIGVycm9yJyxlKTt9fXRyeXsgLy8gaWU2IGR5bmFtaWMgaWZyYW1lcyB3aXRoIHRhcmdldD1cIlwiIHN1cHBvcnQgKHRoYW5rcyBDaHJpcyBMYW1iYWNoZXIpXG52YXIgaHRtbD0nPGlmcmFtZSBzcmM9XCJqYXZhc2NyaXB0OjBcIiBuYW1lPVwiJyArIHNlbGYuaWZyYW1lSWQgKyAnXCI+JztpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGh0bWwpO31jYXRjaChlKSB7aWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7aWZyYW1lLm5hbWUgPSBzZWxmLmlmcmFtZUlkO2lmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDowJzt9aWZyYW1lLmlkID0gc2VsZi5pZnJhbWVJZDtzZWxmLmZvcm0uYXBwZW5kQ2hpbGQoaWZyYW1lKTtzZWxmLmlmcmFtZSA9IGlmcmFtZTt9aW5pdElmcmFtZSgpOyAvLyBlc2NhcGUgXFxuIHRvIHByZXZlbnQgaXQgZnJvbSBiZWluZyBjb252ZXJ0ZWQgaW50byBcXHJcXG4gYnkgc29tZSBVQXNcbi8vIGRvdWJsZSBlc2NhcGluZyBpcyByZXF1aXJlZCBmb3IgZXNjYXBlZCBuZXcgbGluZXMgYmVjYXVzZSB1bmVzY2FwaW5nIG9mIG5ldyBsaW5lcyBjYW4gYmUgZG9uZSBzYWZlbHkgb24gc2VydmVyLXNpZGVcbmRhdGEgPSBkYXRhLnJlcGxhY2UockVzY2FwZWROZXdsaW5lLCdcXFxcXFxuJyk7dGhpcy5hcmVhLnZhbHVlID0gZGF0YS5yZXBsYWNlKHJOZXdsaW5lLCdcXFxcbicpO3RyeXt0aGlzLmZvcm0uc3VibWl0KCk7fWNhdGNoKGUpIHt9aWYodGhpcy5pZnJhbWUuYXR0YWNoRXZlbnQpe3RoaXMuaWZyYW1lLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7aWYoc2VsZi5pZnJhbWUucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKXtjb21wbGV0ZSgpO319O31lbHNlIHt0aGlzLmlmcmFtZS5vbmxvYWQgPSBjb21wbGV0ZTt9fTt9KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp7fSk7fSx7XCIuL3BvbGxpbmdcIjoxOCxcImNvbXBvbmVudC1pbmhlcml0XCI6MjF9XSwxNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qKlxuICAgICAgICAgICAqIE1vZHVsZSByZXF1aXJlbWVudHMuXG4gICAgICAgICAgICovdmFyIFhNTEh0dHBSZXF1ZXN0PV9kZXJlcV8oJ3htbGh0dHByZXF1ZXN0Jyk7dmFyIFBvbGxpbmc9X2RlcmVxXygnLi9wb2xsaW5nJyk7dmFyIEVtaXR0ZXI9X2RlcmVxXygnY29tcG9uZW50LWVtaXR0ZXInKTt2YXIgaW5oZXJpdD1fZGVyZXFfKCdjb21wb25lbnQtaW5oZXJpdCcpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnBvbGxpbmcteGhyJyk7IC8qKlxuICAgICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxuICAgICAgICAgICAqL21vZHVsZS5leHBvcnRzID0gWEhSO21vZHVsZS5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0OyAvKipcbiAgICAgICAgICAgKiBFbXB0eSBmdW5jdGlvblxuICAgICAgICAgICAqL2Z1bmN0aW9uIGVtcHR5KCl7fSAvKipcbiAgICAgICAgICAgKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICAgKi9mdW5jdGlvbiBYSFIob3B0cyl7UG9sbGluZy5jYWxsKHRoaXMsb3B0cyk7aWYoZ2xvYmFsLmxvY2F0aW9uKXt2YXIgaXNTU0w9J2h0dHBzOicgPT0gbG9jYXRpb24ucHJvdG9jb2w7dmFyIHBvcnQ9bG9jYXRpb24ucG9ydDsgLy8gc29tZSB1c2VyIGFnZW50cyBoYXZlIGVtcHR5IGBsb2NhdGlvbi5wb3J0YFxuaWYoIXBvcnQpe3BvcnQgPSBpc1NTTD80NDM6ODA7fXRoaXMueGQgPSBvcHRzLmhvc3RuYW1lICE9IGdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZSB8fCBwb3J0ICE9IG9wdHMucG9ydDt0aGlzLnhzID0gb3B0cy5zZWN1cmUgIT0gaXNTU0w7fX0gLyoqXG4gICAgICAgICAgICogSW5oZXJpdHMgZnJvbSBQb2xsaW5nLlxuICAgICAgICAgICAqL2luaGVyaXQoWEhSLFBvbGxpbmcpOyAvKipcbiAgICAgICAgICAgKiBYSFIgc3VwcG9ydHMgYmluYXJ5XG4gICAgICAgICAgICovWEhSLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IHRydWU7IC8qKlxuICAgICAgICAgICAqIENyZWF0ZXMgYSByZXF1ZXN0LlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL1hIUi5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uKG9wdHMpe29wdHMgPSBvcHRzIHx8IHt9O29wdHMudXJpID0gdGhpcy51cmkoKTtvcHRzLnhkID0gdGhpcy54ZDtvcHRzLnhzID0gdGhpcy54cztvcHRzLmFnZW50ID0gdGhpcy5hZ2VudCB8fCBmYWxzZTtvcHRzLnN1cHBvcnRzQmluYXJ5ID0gdGhpcy5zdXBwb3J0c0JpbmFyeTtvcHRzLmVuYWJsZXNYRFIgPSB0aGlzLmVuYWJsZXNYRFI7IC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxub3B0cy5wZnggPSB0aGlzLnBmeDtvcHRzLmtleSA9IHRoaXMua2V5O29wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7b3B0cy5jYSA9IHRoaXMuY2E7b3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO29wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7cmV0dXJuIG5ldyBSZXF1ZXN0KG9wdHMpO307IC8qKlxuICAgICAgICAgICAqIFNlbmRzIGRhdGEuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kLlxuICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL1hIUi5wcm90b3R5cGUuZG9Xcml0ZSA9IGZ1bmN0aW9uKGRhdGEsZm4pe3ZhciBpc0JpbmFyeT10eXBlb2YgZGF0YSAhPT0gJ3N0cmluZycgJiYgZGF0YSAhPT0gdW5kZWZpbmVkO3ZhciByZXE9dGhpcy5yZXF1ZXN0KHttZXRob2Q6J1BPU1QnLGRhdGE6ZGF0YSxpc0JpbmFyeTppc0JpbmFyeX0pO3ZhciBzZWxmPXRoaXM7cmVxLm9uKCdzdWNjZXNzJyxmbik7cmVxLm9uKCdlcnJvcicsZnVuY3Rpb24oZXJyKXtzZWxmLm9uRXJyb3IoJ3hociBwb3N0IGVycm9yJyxlcnIpO30pO3RoaXMuc2VuZFhociA9IHJlcTt9OyAvKipcbiAgICAgICAgICAgKiBTdGFydHMgYSBwb2xsIGN5Y2xlLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAgICovWEhSLnByb3RvdHlwZS5kb1BvbGwgPSBmdW5jdGlvbigpe2RlYnVnKCd4aHIgcG9sbCcpO3ZhciByZXE9dGhpcy5yZXF1ZXN0KCk7dmFyIHNlbGY9dGhpcztyZXEub24oJ2RhdGEnLGZ1bmN0aW9uKGRhdGEpe3NlbGYub25EYXRhKGRhdGEpO30pO3JlcS5vbignZXJyb3InLGZ1bmN0aW9uKGVycil7c2VsZi5vbkVycm9yKCd4aHIgcG9sbCBlcnJvcicsZXJyKTt9KTt0aGlzLnBvbGxYaHIgPSByZXE7fTsgLyoqXG4gICAgICAgICAgICogUmVxdWVzdCBjb25zdHJ1Y3RvclxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgICAqL2Z1bmN0aW9uIFJlcXVlc3Qob3B0cyl7dGhpcy5tZXRob2QgPSBvcHRzLm1ldGhvZCB8fCAnR0VUJzt0aGlzLnVyaSA9IG9wdHMudXJpO3RoaXMueGQgPSAhIW9wdHMueGQ7dGhpcy54cyA9ICEhb3B0cy54czt0aGlzLmFzeW5jID0gZmFsc2UgIT09IG9wdHMuYXN5bmM7dGhpcy5kYXRhID0gdW5kZWZpbmVkICE9IG9wdHMuZGF0YT9vcHRzLmRhdGE6bnVsbDt0aGlzLmFnZW50ID0gb3B0cy5hZ2VudDt0aGlzLmlzQmluYXJ5ID0gb3B0cy5pc0JpbmFyeTt0aGlzLnN1cHBvcnRzQmluYXJ5ID0gb3B0cy5zdXBwb3J0c0JpbmFyeTt0aGlzLmVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7IC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxudGhpcy5wZnggPSBvcHRzLnBmeDt0aGlzLmtleSA9IG9wdHMua2V5O3RoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZTt0aGlzLmNlcnQgPSBvcHRzLmNlcnQ7dGhpcy5jYSA9IG9wdHMuY2E7dGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzO3RoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7dGhpcy5jcmVhdGUoKTt9IC8qKlxuICAgICAgICAgICAqIE1peCBpbiBgRW1pdHRlcmAuXG4gICAgICAgICAgICovRW1pdHRlcihSZXF1ZXN0LnByb3RvdHlwZSk7IC8qKlxuICAgICAgICAgICAqIENyZWF0ZXMgdGhlIFhIUiBvYmplY3QgYW5kIHNlbmRzIHRoZSByZXF1ZXN0LlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAgICovUmVxdWVzdC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKXt2YXIgb3B0cz17YWdlbnQ6dGhpcy5hZ2VudCx4ZG9tYWluOnRoaXMueGQseHNjaGVtZTp0aGlzLnhzLGVuYWJsZXNYRFI6dGhpcy5lbmFibGVzWERSfTsgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG5vcHRzLnBmeCA9IHRoaXMucGZ4O29wdHMua2V5ID0gdGhpcy5rZXk7b3B0cy5wYXNzcGhyYXNlID0gdGhpcy5wYXNzcGhyYXNlO29wdHMuY2VydCA9IHRoaXMuY2VydDtvcHRzLmNhID0gdGhpcy5jYTtvcHRzLmNpcGhlcnMgPSB0aGlzLmNpcGhlcnM7b3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDt2YXIgeGhyPXRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpO3ZhciBzZWxmPXRoaXM7dHJ5e2RlYnVnKCd4aHIgb3BlbiAlczogJXMnLHRoaXMubWV0aG9kLHRoaXMudXJpKTt4aHIub3Blbih0aGlzLm1ldGhvZCx0aGlzLnVyaSx0aGlzLmFzeW5jKTtpZih0aGlzLnN1cHBvcnRzQmluYXJ5KXsgLy8gVGhpcyBoYXMgdG8gYmUgZG9uZSBhZnRlciBvcGVuIGJlY2F1c2UgRmlyZWZveCBpcyBzdHVwaWRcbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTMyMTY5MDMvZ2V0LWJpbmFyeS1kYXRhLXdpdGgteG1saHR0cHJlcXVlc3QtaW4tYS1maXJlZm94LWV4dGVuc2lvblxueGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7fWlmKCdQT1NUJyA9PSB0aGlzLm1ldGhvZCl7dHJ5e2lmKHRoaXMuaXNCaW5hcnkpe3hoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKTt9ZWxzZSB7eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpO319Y2F0Y2goZSkge319IC8vIGllNiBjaGVja1xuaWYoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKXt4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTt9aWYodGhpcy5oYXNYRFIoKSl7eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCl7c2VsZi5vbkxvYWQoKTt9O3hoci5vbmVycm9yID0gZnVuY3Rpb24oKXtzZWxmLm9uRXJyb3IoeGhyLnJlc3BvbnNlVGV4dCk7fTt9ZWxzZSB7eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7aWYoNCAhPSB4aHIucmVhZHlTdGF0ZSlyZXR1cm47aWYoMjAwID09IHhoci5zdGF0dXMgfHwgMTIyMyA9PSB4aHIuc3RhdHVzKXtzZWxmLm9uTG9hZCgpO31lbHNlIHsgLy8gbWFrZSBzdXJlIHRoZSBgZXJyb3JgIGV2ZW50IGhhbmRsZXIgdGhhdCdzIHVzZXItc2V0XG4vLyBkb2VzIG5vdCB0aHJvdyBpbiB0aGUgc2FtZSB0aWNrIGFuZCBnZXRzIGNhdWdodCBoZXJlXG5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7c2VsZi5vbkVycm9yKHhoci5zdGF0dXMpO30sMCk7fX07fWRlYnVnKCd4aHIgZGF0YSAlcycsdGhpcy5kYXRhKTt4aHIuc2VuZCh0aGlzLmRhdGEpO31jYXRjaChlKSB7IC8vIE5lZWQgdG8gZGVmZXIgc2luY2UgLmNyZWF0ZSgpIGlzIGNhbGxlZCBkaXJlY3RseSBmaHJvbSB0aGUgY29uc3RydWN0b3Jcbi8vIGFuZCB0aHVzIHRoZSAnZXJyb3InIGV2ZW50IGNhbiBvbmx5IGJlIG9ubHkgYm91bmQgKmFmdGVyKiB0aGlzIGV4Y2VwdGlvblxuLy8gb2NjdXJzLiAgVGhlcmVmb3JlLCBhbHNvLCB3ZSBjYW5ub3QgdGhyb3cgaGVyZSBhdCBhbGwuXG5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7c2VsZi5vbkVycm9yKGUpO30sMCk7cmV0dXJuO31pZihnbG9iYWwuZG9jdW1lbnQpe3RoaXMuaW5kZXggPSBSZXF1ZXN0LnJlcXVlc3RzQ291bnQrKztSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdID0gdGhpczt9fTsgLyoqXG4gICAgICAgICAgICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZXNwb25zZS5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL1JlcXVlc3QucHJvdG90eXBlLm9uU3VjY2VzcyA9IGZ1bmN0aW9uKCl7dGhpcy5lbWl0KCdzdWNjZXNzJyk7dGhpcy5jbGVhbnVwKCk7fTsgLyoqXG4gICAgICAgICAgICogQ2FsbGVkIGlmIHdlIGhhdmUgZGF0YS5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL1JlcXVlc3QucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe3RoaXMuZW1pdCgnZGF0YScsZGF0YSk7dGhpcy5vblN1Y2Nlc3MoKTt9OyAvKipcbiAgICAgICAgICAgKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL1JlcXVlc3QucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbihlcnIpe3RoaXMuZW1pdCgnZXJyb3InLGVycik7dGhpcy5jbGVhbnVwKHRydWUpO307IC8qKlxuICAgICAgICAgICAqIENsZWFucyB1cCBob3VzZS5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL1JlcXVlc3QucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbihmcm9tRXJyb3Ipe2lmKCd1bmRlZmluZWQnID09IHR5cGVvZiB0aGlzLnhociB8fCBudWxsID09PSB0aGlzLnhocil7cmV0dXJuO30gLy8geG1saHR0cHJlcXVlc3RcbmlmKHRoaXMuaGFzWERSKCkpe3RoaXMueGhyLm9ubG9hZCA9IHRoaXMueGhyLm9uZXJyb3IgPSBlbXB0eTt9ZWxzZSB7dGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZW1wdHk7fWlmKGZyb21FcnJvcil7dHJ5e3RoaXMueGhyLmFib3J0KCk7fWNhdGNoKGUpIHt9fWlmKGdsb2JhbC5kb2N1bWVudCl7ZGVsZXRlIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF07fXRoaXMueGhyID0gbnVsbDt9OyAvKipcbiAgICAgICAgICAgKiBDYWxsZWQgdXBvbiBsb2FkLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAgICovUmVxdWVzdC5wcm90b3R5cGUub25Mb2FkID0gZnVuY3Rpb24oKXt2YXIgZGF0YTt0cnl7dmFyIGNvbnRlbnRUeXBlO3RyeXtjb250ZW50VHlwZSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKS5zcGxpdCgnOycpWzBdO31jYXRjaChlKSB7fWlmKGNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyl7ZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlO31lbHNlIHtpZighdGhpcy5zdXBwb3J0c0JpbmFyeSl7ZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlVGV4dDt9ZWxzZSB7ZGF0YSA9ICdvayc7fX19Y2F0Y2goZSkge3RoaXMub25FcnJvcihlKTt9aWYobnVsbCAhPSBkYXRhKXt0aGlzLm9uRGF0YShkYXRhKTt9fTsgLyoqXG4gICAgICAgICAgICogQ2hlY2sgaWYgaXQgaGFzIFhEb21haW5SZXF1ZXN0LlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAgICovUmVxdWVzdC5wcm90b3R5cGUuaGFzWERSID0gZnVuY3Rpb24oKXtyZXR1cm4gJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBnbG9iYWwuWERvbWFpblJlcXVlc3QgJiYgIXRoaXMueHMgJiYgdGhpcy5lbmFibGVzWERSO307IC8qKlxuICAgICAgICAgICAqIEFib3J0cyB0aGUgcmVxdWVzdC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAgICovUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpe3RoaXMuY2xlYW51cCgpO307IC8qKlxuICAgICAgICAgICAqIEFib3J0cyBwZW5kaW5nIHJlcXVlc3RzIHdoZW4gdW5sb2FkaW5nIHRoZSB3aW5kb3cuIFRoaXMgaXMgbmVlZGVkIHRvIHByZXZlbnRcbiAgICAgICAgICAgKiBtZW1vcnkgbGVha3MgKGUuZy4gd2hlbiB1c2luZyBJRSkgYW5kIHRvIGVuc3VyZSB0aGF0IG5vIHNwdXJpb3VzIGVycm9yIGlzXG4gICAgICAgICAgICogZW1pdHRlZC5cbiAgICAgICAgICAgKi9pZihnbG9iYWwuZG9jdW1lbnQpe1JlcXVlc3QucmVxdWVzdHNDb3VudCA9IDA7UmVxdWVzdC5yZXF1ZXN0cyA9IHt9O2lmKGdsb2JhbC5hdHRhY2hFdmVudCl7Z2xvYmFsLmF0dGFjaEV2ZW50KCdvbnVubG9hZCcsdW5sb2FkSGFuZGxlcik7fWVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpe2dsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLHVubG9hZEhhbmRsZXIsZmFsc2UpO319ZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpe2Zvcih2YXIgaSBpbiBSZXF1ZXN0LnJlcXVlc3RzKSB7aWYoUmVxdWVzdC5yZXF1ZXN0cy5oYXNPd25Qcm9wZXJ0eShpKSl7UmVxdWVzdC5yZXF1ZXN0c1tpXS5hYm9ydCgpO319fX0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93Ont9KTt9LHtcIi4vcG9sbGluZ1wiOjE4LFwiY29tcG9uZW50LWVtaXR0ZXJcIjo5LFwiY29tcG9uZW50LWluaGVyaXRcIjoyMSxcImRlYnVnXCI6MjIsXCJ4bWxodHRwcmVxdWVzdFwiOjIwfV0sMTg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAgICAgICAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAgICAgICAgICovdmFyIFRyYW5zcG9ydD1fZGVyZXFfKCcuLi90cmFuc3BvcnQnKTt2YXIgcGFyc2Vxcz1fZGVyZXFfKCdwYXJzZXFzJyk7dmFyIHBhcnNlcj1fZGVyZXFfKCdlbmdpbmUuaW8tcGFyc2VyJyk7dmFyIGluaGVyaXQ9X2RlcmVxXygnY29tcG9uZW50LWluaGVyaXQnKTt2YXIgZGVidWc9X2RlcmVxXygnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDpwb2xsaW5nJyk7IC8qKlxuICAgICAgICAgKiBNb2R1bGUgZXhwb3J0cy5cbiAgICAgICAgICovbW9kdWxlLmV4cG9ydHMgPSBQb2xsaW5nOyAvKipcbiAgICAgICAgICogSXMgWEhSMiBzdXBwb3J0ZWQ/XG4gICAgICAgICAqL3ZhciBoYXNYSFIyPShmdW5jdGlvbigpe3ZhciBYTUxIdHRwUmVxdWVzdD1fZGVyZXFfKCd4bWxodHRwcmVxdWVzdCcpO3ZhciB4aHI9bmV3IFhNTEh0dHBSZXF1ZXN0KHt4ZG9tYWluOmZhbHNlfSk7cmV0dXJuIG51bGwgIT0geGhyLnJlc3BvbnNlVHlwZTt9KSgpOyAvKipcbiAgICAgICAgICogUG9sbGluZyBpbnRlcmZhY2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9mdW5jdGlvbiBQb2xsaW5nKG9wdHMpe3ZhciBmb3JjZUJhc2U2ND1vcHRzICYmIG9wdHMuZm9yY2VCYXNlNjQ7aWYoIWhhc1hIUjIgfHwgZm9yY2VCYXNlNjQpe3RoaXMuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTt9VHJhbnNwb3J0LmNhbGwodGhpcyxvcHRzKTt9IC8qKlxuICAgICAgICAgKiBJbmhlcml0cyBmcm9tIFRyYW5zcG9ydC5cbiAgICAgICAgICovaW5oZXJpdChQb2xsaW5nLFRyYW5zcG9ydCk7IC8qKlxuICAgICAgICAgKiBUcmFuc3BvcnQgbmFtZS5cbiAgICAgICAgICovUG9sbGluZy5wcm90b3R5cGUubmFtZSA9ICdwb2xsaW5nJzsgLyoqXG4gICAgICAgICAqIE9wZW5zIHRoZSBzb2NrZXQgKHRyaWdnZXJzIHBvbGxpbmcpLiBXZSB3cml0ZSBhIFBJTkcgbWVzc2FnZSB0byBkZXRlcm1pbmVcbiAgICAgICAgICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9Qb2xsaW5nLnByb3RvdHlwZS5kb09wZW4gPSBmdW5jdGlvbigpe3RoaXMucG9sbCgpO307IC8qKlxuICAgICAgICAgKiBQYXVzZXMgcG9sbGluZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdXBvbiBidWZmZXJzIGFyZSBmbHVzaGVkIGFuZCB0cmFuc3BvcnQgaXMgcGF1c2VkXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9Qb2xsaW5nLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKG9uUGF1c2Upe3ZhciBwZW5kaW5nPTA7dmFyIHNlbGY9dGhpczt0aGlzLnJlYWR5U3RhdGUgPSAncGF1c2luZyc7ZnVuY3Rpb24gcGF1c2UoKXtkZWJ1ZygncGF1c2VkJyk7c2VsZi5yZWFkeVN0YXRlID0gJ3BhdXNlZCc7b25QYXVzZSgpO31pZih0aGlzLnBvbGxpbmcgfHwgIXRoaXMud3JpdGFibGUpe3ZhciB0b3RhbD0wO2lmKHRoaXMucG9sbGluZyl7ZGVidWcoJ3dlIGFyZSBjdXJyZW50bHkgcG9sbGluZyAtIHdhaXRpbmcgdG8gcGF1c2UnKTt0b3RhbCsrO3RoaXMub25jZSgncG9sbENvbXBsZXRlJyxmdW5jdGlvbigpe2RlYnVnKCdwcmUtcGF1c2UgcG9sbGluZyBjb21wbGV0ZScpOy0tdG90YWwgfHwgcGF1c2UoKTt9KTt9aWYoIXRoaXMud3JpdGFibGUpe2RlYnVnKCd3ZSBhcmUgY3VycmVudGx5IHdyaXRpbmcgLSB3YWl0aW5nIHRvIHBhdXNlJyk7dG90YWwrKzt0aGlzLm9uY2UoJ2RyYWluJyxmdW5jdGlvbigpe2RlYnVnKCdwcmUtcGF1c2Ugd3JpdGluZyBjb21wbGV0ZScpOy0tdG90YWwgfHwgcGF1c2UoKTt9KTt9fWVsc2Uge3BhdXNlKCk7fX07IC8qKlxuICAgICAgICAgKiBTdGFydHMgcG9sbGluZyBjeWNsZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovUG9sbGluZy5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uKCl7ZGVidWcoJ3BvbGxpbmcnKTt0aGlzLnBvbGxpbmcgPSB0cnVlO3RoaXMuZG9Qb2xsKCk7dGhpcy5lbWl0KCdwb2xsJyk7fTsgLyoqXG4gICAgICAgICAqIE92ZXJsb2FkcyBvbkRhdGEgdG8gZGV0ZWN0IHBheWxvYWRzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovUG9sbGluZy5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24oZGF0YSl7dmFyIHNlbGY9dGhpcztkZWJ1ZygncG9sbGluZyBnb3QgZGF0YSAlcycsZGF0YSk7dmFyIGNhbGxiYWNrPWZ1bmN0aW9uIGNhbGxiYWNrKHBhY2tldCxpbmRleCx0b3RhbCl7IC8vIGlmIGl0cyB0aGUgZmlyc3QgbWVzc2FnZSB3ZSBjb25zaWRlciB0aGUgdHJhbnNwb3J0IG9wZW5cbmlmKCdvcGVuaW5nJyA9PSBzZWxmLnJlYWR5U3RhdGUpe3NlbGYub25PcGVuKCk7fSAvLyBpZiBpdHMgYSBjbG9zZSBwYWNrZXQsIHdlIGNsb3NlIHRoZSBvbmdvaW5nIHJlcXVlc3RzXG5pZignY2xvc2UnID09IHBhY2tldC50eXBlKXtzZWxmLm9uQ2xvc2UoKTtyZXR1cm4gZmFsc2U7fSAvLyBvdGhlcndpc2UgYnlwYXNzIG9uRGF0YSBhbmQgaGFuZGxlIHRoZSBtZXNzYWdlXG5zZWxmLm9uUGFja2V0KHBhY2tldCk7fTsgLy8gZGVjb2RlIHBheWxvYWRcbnBhcnNlci5kZWNvZGVQYXlsb2FkKGRhdGEsdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSxjYWxsYmFjayk7IC8vIGlmIGFuIGV2ZW50IGRpZCBub3QgdHJpZ2dlciBjbG9zaW5nXG5pZignY2xvc2VkJyAhPSB0aGlzLnJlYWR5U3RhdGUpeyAvLyBpZiB3ZSBnb3QgZGF0YSB3ZSdyZSBub3QgcG9sbGluZ1xudGhpcy5wb2xsaW5nID0gZmFsc2U7dGhpcy5lbWl0KCdwb2xsQ29tcGxldGUnKTtpZignb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKXt0aGlzLnBvbGwoKTt9ZWxzZSB7ZGVidWcoJ2lnbm9yaW5nIHBvbGwgLSB0cmFuc3BvcnQgc3RhdGUgXCIlc1wiJyx0aGlzLnJlYWR5U3RhdGUpO319fTsgLyoqXG4gICAgICAgICAqIEZvciBwb2xsaW5nLCBzZW5kIGEgY2xvc2UgcGFja2V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uKCl7dmFyIHNlbGY9dGhpcztmdW5jdGlvbiBjbG9zZSgpe2RlYnVnKCd3cml0aW5nIGNsb3NlIHBhY2tldCcpO3NlbGYud3JpdGUoW3t0eXBlOidjbG9zZSd9XSk7fWlmKCdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUpe2RlYnVnKCd0cmFuc3BvcnQgb3BlbiAtIGNsb3NpbmcnKTtjbG9zZSgpO31lbHNlIHsgLy8gaW4gY2FzZSB3ZSdyZSB0cnlpbmcgdG8gY2xvc2Ugd2hpbGVcbi8vIGhhbmRzaGFraW5nIGlzIGluIHByb2dyZXNzIChHSC0xNjQpXG5kZWJ1ZygndHJhbnNwb3J0IG5vdCBvcGVuIC0gZGVmZXJyaW5nIGNsb3NlJyk7dGhpcy5vbmNlKCdvcGVuJyxjbG9zZSk7fX07IC8qKlxuICAgICAgICAgKiBXcml0ZXMgYSBwYWNrZXRzIHBheWxvYWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgcGFja2V0c1xuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBkcmFpbiBjYWxsYmFja1xuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovUG9sbGluZy5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihwYWNrZXRzKXt2YXIgc2VsZj10aGlzO3RoaXMud3JpdGFibGUgPSBmYWxzZTt2YXIgY2FsbGJhY2tmbj1mdW5jdGlvbiBjYWxsYmFja2ZuKCl7c2VsZi53cml0YWJsZSA9IHRydWU7c2VsZi5lbWl0KCdkcmFpbicpO307dmFyIHNlbGY9dGhpcztwYXJzZXIuZW5jb2RlUGF5bG9hZChwYWNrZXRzLHRoaXMuc3VwcG9ydHNCaW5hcnksZnVuY3Rpb24oZGF0YSl7c2VsZi5kb1dyaXRlKGRhdGEsY2FsbGJhY2tmbik7fSk7fTsgLyoqXG4gICAgICAgICAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9Qb2xsaW5nLnByb3RvdHlwZS51cmkgPSBmdW5jdGlvbigpe3ZhciBxdWVyeT10aGlzLnF1ZXJ5IHx8IHt9O3ZhciBzY2hlbWE9dGhpcy5zZWN1cmU/J2h0dHBzJzonaHR0cCc7dmFyIHBvcnQ9Jyc7IC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG5pZihmYWxzZSAhPT0gdGhpcy50aW1lc3RhbXBSZXF1ZXN0cyl7cXVlcnlbdGhpcy50aW1lc3RhbXBQYXJhbV0gPSArbmV3IERhdGUoKSArICctJyArIFRyYW5zcG9ydC50aW1lc3RhbXBzKys7fWlmKCF0aGlzLnN1cHBvcnRzQmluYXJ5ICYmICFxdWVyeS5zaWQpe3F1ZXJ5LmI2NCA9IDE7fXF1ZXJ5ID0gcGFyc2Vxcy5lbmNvZGUocXVlcnkpOyAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuaWYodGhpcy5wb3J0ICYmICgnaHR0cHMnID09IHNjaGVtYSAmJiB0aGlzLnBvcnQgIT0gNDQzIHx8ICdodHRwJyA9PSBzY2hlbWEgJiYgdGhpcy5wb3J0ICE9IDgwKSl7cG9ydCA9ICc6JyArIHRoaXMucG9ydDt9IC8vIHByZXBlbmQgPyB0byBxdWVyeVxuaWYocXVlcnkubGVuZ3RoKXtxdWVyeSA9ICc/JyArIHF1ZXJ5O31yZXR1cm4gc2NoZW1hICsgJzovLycgKyB0aGlzLmhvc3RuYW1lICsgcG9ydCArIHRoaXMucGF0aCArIHF1ZXJ5O307fSx7XCIuLi90cmFuc3BvcnRcIjoxNCxcImNvbXBvbmVudC1pbmhlcml0XCI6MjEsXCJkZWJ1Z1wiOjIyLFwiZW5naW5lLmlvLXBhcnNlclwiOjI1LFwicGFyc2Vxc1wiOjM1LFwieG1saHR0cHJlcXVlc3RcIjoyMH1dLDE5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXG4gICAgICAgICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gICAgICAgICAqL3ZhciBUcmFuc3BvcnQ9X2RlcmVxXygnLi4vdHJhbnNwb3J0Jyk7dmFyIHBhcnNlcj1fZGVyZXFfKCdlbmdpbmUuaW8tcGFyc2VyJyk7dmFyIHBhcnNlcXM9X2RlcmVxXygncGFyc2VxcycpO3ZhciBpbmhlcml0PV9kZXJlcV8oJ2NvbXBvbmVudC1pbmhlcml0Jyk7dmFyIGRlYnVnPV9kZXJlcV8oJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6d2Vic29ja2V0Jyk7IC8qKlxuICAgICAgICAgKiBgd3NgIGV4cG9zZXMgYSBXZWJTb2NrZXQtY29tcGF0aWJsZSBpbnRlcmZhY2UgaW5cbiAgICAgICAgICogTm9kZSwgb3IgdGhlIGBXZWJTb2NrZXRgIG9yIGBNb3pXZWJTb2NrZXRgIGdsb2JhbHNcbiAgICAgICAgICogaW4gdGhlIGJyb3dzZXIuXG4gICAgICAgICAqL3ZhciBXZWJTb2NrZXQ9X2RlcmVxXygnd3MnKTsgLyoqXG4gICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxuICAgICAgICAgKi9tb2R1bGUuZXhwb3J0cyA9IFdTOyAvKipcbiAgICAgICAgICogV2ViU29ja2V0IHRyYW5zcG9ydCBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSB7T2JqZWN0fSBjb25uZWN0aW9uIG9wdGlvbnNcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZnVuY3Rpb24gV1Mob3B0cyl7dmFyIGZvcmNlQmFzZTY0PW9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NDtpZihmb3JjZUJhc2U2NCl7dGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO31UcmFuc3BvcnQuY2FsbCh0aGlzLG9wdHMpO30gLyoqXG4gICAgICAgICAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxuICAgICAgICAgKi9pbmhlcml0KFdTLFRyYW5zcG9ydCk7IC8qKlxuICAgICAgICAgKiBUcmFuc3BvcnQgbmFtZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovV1MucHJvdG90eXBlLm5hbWUgPSAnd2Vic29ja2V0JzsgLypcbiAgICAgICAgICogV2ViU29ja2V0cyBzdXBwb3J0IGJpbmFyeVxuICAgICAgICAgKi9XUy5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSB0cnVlOyAvKipcbiAgICAgICAgICogT3BlbnMgc29ja2V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovV1MucHJvdG90eXBlLmRvT3BlbiA9IGZ1bmN0aW9uKCl7aWYoIXRoaXMuY2hlY2soKSl7IC8vIGxldCBwcm9iZSB0aW1lb3V0XG5yZXR1cm47fXZhciBzZWxmPXRoaXM7dmFyIHVyaT10aGlzLnVyaSgpO3ZhciBwcm90b2NvbHM9dm9pZCAwO3ZhciBvcHRzPXthZ2VudDp0aGlzLmFnZW50fTsgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG5vcHRzLnBmeCA9IHRoaXMucGZ4O29wdHMua2V5ID0gdGhpcy5rZXk7b3B0cy5wYXNzcGhyYXNlID0gdGhpcy5wYXNzcGhyYXNlO29wdHMuY2VydCA9IHRoaXMuY2VydDtvcHRzLmNhID0gdGhpcy5jYTtvcHRzLmNpcGhlcnMgPSB0aGlzLmNpcGhlcnM7b3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDt0aGlzLndzID0gbmV3IFdlYlNvY2tldCh1cmkscHJvdG9jb2xzLG9wdHMpO2lmKHRoaXMud3MuYmluYXJ5VHlwZSA9PT0gdW5kZWZpbmVkKXt0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7fXRoaXMud3MuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7dGhpcy5hZGRFdmVudExpc3RlbmVycygpO307IC8qKlxuICAgICAgICAgKiBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgc29ja2V0XG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9XUy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpe3ZhciBzZWxmPXRoaXM7dGhpcy53cy5vbm9wZW4gPSBmdW5jdGlvbigpe3NlbGYub25PcGVuKCk7fTt0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbigpe3NlbGYub25DbG9zZSgpO307dGhpcy53cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldil7c2VsZi5vbkRhdGEoZXYuZGF0YSk7fTt0aGlzLndzLm9uZXJyb3IgPSBmdW5jdGlvbihlKXtzZWxmLm9uRXJyb3IoJ3dlYnNvY2tldCBlcnJvcicsZSk7fTt9OyAvKipcbiAgICAgICAgICogT3ZlcnJpZGUgYG9uRGF0YWAgdG8gdXNlIGEgdGltZXIgb24gaU9TLlxuICAgICAgICAgKiBTZWU6IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL21sb3VnaHJhbi8yMDUyMDA2XG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9pZigndW5kZWZpbmVkJyAhPSB0eXBlb2YgbmF2aWdhdG9yICYmIC9pUGFkfGlQaG9uZXxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSl7V1MucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe3ZhciBzZWxmPXRoaXM7c2V0VGltZW91dChmdW5jdGlvbigpe1RyYW5zcG9ydC5wcm90b3R5cGUub25EYXRhLmNhbGwoc2VsZixkYXRhKTt9LDApO307fSAvKipcbiAgICAgICAgICogV3JpdGVzIGRhdGEgdG8gc29ja2V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBvZiBwYWNrZXRzLlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovV1MucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24ocGFja2V0cyl7dmFyIHNlbGY9dGhpczt0aGlzLndyaXRhYmxlID0gZmFsc2U7IC8vIGVuY29kZVBhY2tldCBlZmZpY2llbnQgYXMgaXQgdXNlcyBXUyBmcmFtaW5nXG4vLyBubyBuZWVkIGZvciBlbmNvZGVQYXlsb2FkXG5mb3IodmFyIGk9MCxsPXBhY2tldHMubGVuZ3RoO2kgPCBsO2krKykge3BhcnNlci5lbmNvZGVQYWNrZXQocGFja2V0c1tpXSx0aGlzLnN1cHBvcnRzQmluYXJ5LGZ1bmN0aW9uKGRhdGEpeyAvL1NvbWV0aW1lcyB0aGUgd2Vic29ja2V0IGhhcyBhbHJlYWR5IGJlZW4gY2xvc2VkIGJ1dCB0aGUgYnJvd3NlciBkaWRuJ3Rcbi8vaGF2ZSBhIGNoYW5jZSBvZiBpbmZvcm1pbmcgdXMgYWJvdXQgaXQgeWV0LCBpbiB0aGF0IGNhc2Ugc2VuZCB3aWxsXG4vL3Rocm93IGFuIGVycm9yXG50cnl7c2VsZi53cy5zZW5kKGRhdGEpO31jYXRjaChlKSB7ZGVidWcoJ3dlYnNvY2tldCBjbG9zZWQgYmVmb3JlIG9uY2xvc2UgZXZlbnQnKTt9fSk7fWZ1bmN0aW9uIG9uZHJhaW4oKXtzZWxmLndyaXRhYmxlID0gdHJ1ZTtzZWxmLmVtaXQoJ2RyYWluJyk7fSAvLyBmYWtlIGRyYWluXG4vLyBkZWZlciB0byBuZXh0IHRpY2sgdG8gYWxsb3cgU29ja2V0IHRvIGNsZWFyIHdyaXRlQnVmZmVyXG5zZXRUaW1lb3V0KG9uZHJhaW4sMCk7fTsgLyoqXG4gICAgICAgICAqIENhbGxlZCB1cG9uIGNsb3NlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9XUy5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uKCl7VHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlLmNhbGwodGhpcyk7fTsgLyoqXG4gICAgICAgICAqIENsb3NlcyBzb2NrZXQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9XUy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uKCl7aWYodHlwZW9mIHRoaXMud3MgIT09ICd1bmRlZmluZWQnKXt0aGlzLndzLmNsb3NlKCk7fX07IC8qKlxuICAgICAgICAgKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovV1MucHJvdG90eXBlLnVyaSA9IGZ1bmN0aW9uKCl7dmFyIHF1ZXJ5PXRoaXMucXVlcnkgfHwge307dmFyIHNjaGVtYT10aGlzLnNlY3VyZT8nd3NzJzond3MnO3ZhciBwb3J0PScnOyAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuaWYodGhpcy5wb3J0ICYmICgnd3NzJyA9PSBzY2hlbWEgJiYgdGhpcy5wb3J0ICE9IDQ0MyB8fCAnd3MnID09IHNjaGVtYSAmJiB0aGlzLnBvcnQgIT0gODApKXtwb3J0ID0gJzonICsgdGhpcy5wb3J0O30gLy8gYXBwZW5kIHRpbWVzdGFtcCB0byBVUklcbmlmKHRoaXMudGltZXN0YW1wUmVxdWVzdHMpe3F1ZXJ5W3RoaXMudGltZXN0YW1wUGFyYW1dID0gK25ldyBEYXRlKCk7fSAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbmlmKCF0aGlzLnN1cHBvcnRzQmluYXJ5KXtxdWVyeS5iNjQgPSAxO31xdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTsgLy8gcHJlcGVuZCA/IHRvIHF1ZXJ5XG5pZihxdWVyeS5sZW5ndGgpe3F1ZXJ5ID0gJz8nICsgcXVlcnk7fXJldHVybiBzY2hlbWEgKyAnOi8vJyArIHRoaXMuaG9zdG5hbWUgKyBwb3J0ICsgdGhpcy5wYXRoICsgcXVlcnk7fTsgLyoqXG4gICAgICAgICAqIEZlYXR1cmUgZGV0ZWN0aW9uIGZvciBXZWJTb2NrZXQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgdGhpcyB0cmFuc3BvcnQgaXMgYXZhaWxhYmxlLlxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9XUy5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbigpe3JldHVybiAhIVdlYlNvY2tldCAmJiAhKCdfX2luaXRpYWxpemUnIGluIFdlYlNvY2tldCAmJiB0aGlzLm5hbWUgPT09IFdTLnByb3RvdHlwZS5uYW1lKTt9O30se1wiLi4vdHJhbnNwb3J0XCI6MTQsXCJjb21wb25lbnQtaW5oZXJpdFwiOjIxLFwiZGVidWdcIjoyMixcImVuZ2luZS5pby1wYXJzZXJcIjoyNSxcInBhcnNlcXNcIjozNSxcIndzXCI6Mzd9XSwyMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8vIGJyb3dzZXIgc2hpbSBmb3IgeG1saHR0cHJlcXVlc3QgbW9kdWxlXG52YXIgaGFzQ09SUz1fZGVyZXFfKCdoYXMtY29ycycpO21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3B0cyl7dmFyIHhkb21haW49b3B0cy54ZG9tYWluOyAvLyBzY2hlbWUgbXVzdCBiZSBzYW1lIHdoZW4gdXNpZ24gWERvbWFpblJlcXVlc3Rcbi8vIGh0dHA6Ly9ibG9ncy5tc2RuLmNvbS9iL2llaW50ZXJuYWxzL2FyY2hpdmUvMjAxMC8wNS8xMy94ZG9tYWlucmVxdWVzdC1yZXN0cmljdGlvbnMtbGltaXRhdGlvbnMtYW5kLXdvcmthcm91bmRzLmFzcHhcbnZhciB4c2NoZW1lPW9wdHMueHNjaGVtZTsgLy8gWERvbWFpblJlcXVlc3QgaGFzIGEgZmxvdyBvZiBub3Qgc2VuZGluZyBjb29raWUsIHRoZXJlZm9yZSBpdCBzaG91bGQgYmUgZGlzYWJsZWQgYXMgYSBkZWZhdWx0LlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvZW5naW5lLmlvLWNsaWVudC9wdWxsLzIxN1xudmFyIGVuYWJsZXNYRFI9b3B0cy5lbmFibGVzWERSOyAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbnRyeXtpZigndW5kZWZpbmVkJyAhPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgJiYgKCF4ZG9tYWluIHx8IGhhc0NPUlMpKXtyZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7fX1jYXRjaChlKSB7fSAvLyBVc2UgWERvbWFpblJlcXVlc3QgZm9yIElFOCBpZiBlbmFibGVzWERSIGlzIHRydWVcbi8vIGJlY2F1c2UgbG9hZGluZyBiYXIga2VlcHMgZmxhc2hpbmcgd2hlbiB1c2luZyBqc29ucC1wb2xsaW5nXG4vLyBodHRwczovL2dpdGh1Yi5jb20veXVqaW9zYWthL3NvY2tlLmlvLWllOC1sb2FkaW5nLWV4YW1wbGVcbnRyeXtpZigndW5kZWZpbmVkJyAhPSB0eXBlb2YgWERvbWFpblJlcXVlc3QgJiYgIXhzY2hlbWUgJiYgZW5hYmxlc1hEUil7cmV0dXJuIG5ldyBYRG9tYWluUmVxdWVzdCgpO319Y2F0Y2goZSkge31pZigheGRvbWFpbil7dHJ5e3JldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTt9Y2F0Y2goZSkge319fTt9LHtcImhhcy1jb3JzXCI6NDB9XSwyMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhLGIpe3ZhciBmbj1mdW5jdGlvbiBmbigpe307Zm4ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7YS5wcm90b3R5cGUgPSBuZXcgZm4oKTthLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGE7fTt9LHt9XSwyMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICAgICAgICAgKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gICAgICAgICAqXG4gICAgICAgICAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAgICAgICAgICovZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gX2RlcmVxXygnLi9kZWJ1ZycpO2V4cG9ydHMubG9nID0gbG9nO2V4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7ZXhwb3J0cy5zYXZlID0gc2F2ZTtleHBvcnRzLmxvYWQgPSBsb2FkO2V4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzOyAvKipcbiAgICAgICAgICogQ29sb3JzLlxuICAgICAgICAgKi9leHBvcnRzLmNvbG9ycyA9IFsnbGlnaHRzZWFncmVlbicsJ2ZvcmVzdGdyZWVuJywnZ29sZGVucm9kJywnZG9kZ2VyYmx1ZScsJ2RhcmtvcmNoaWQnLCdjcmltc29uJ107IC8qKlxuICAgICAgICAgKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICAgICAgICAgKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAgICAgICAgICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICAgICAgICAgKi9mdW5jdGlvbiB1c2VDb2xvcnMoKXsgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbnJldHVybiAnV2Via2l0QXBwZWFyYW5jZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlIHx8ICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG53aW5kb3cuY29uc29sZSAmJiAoY29uc29sZS5maXJlYnVnIHx8IGNvbnNvbGUuZXhjZXB0aW9uICYmIGNvbnNvbGUudGFibGUpIHx8ICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLDEwKSA+PSAzMTt9IC8qKlxuICAgICAgICAgKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gICAgICAgICAqL2V4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odil7cmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO307IC8qKlxuICAgICAgICAgKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL2Z1bmN0aW9uIGZvcm1hdEFyZ3MoKXt2YXIgYXJncz1hcmd1bWVudHM7dmFyIHVzZUNvbG9ycz10aGlzLnVzZUNvbG9yczthcmdzWzBdID0gKHVzZUNvbG9ycz8nJWMnOicnKSArIHRoaXMubmFtZXNwYWNlICsgKHVzZUNvbG9ycz8nICVjJzonICcpICsgYXJnc1swXSArICh1c2VDb2xvcnM/JyVjICc6JyAnKSArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtpZighdXNlQ29sb3JzKXJldHVybiBhcmdzO3ZhciBjPSdjb2xvcjogJyArIHRoaXMuY29sb3I7YXJncyA9IFthcmdzWzBdLGMsJ2NvbG9yOiBpbmhlcml0J10uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MsMSkpOyAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG52YXIgaW5kZXg9MDt2YXIgbGFzdEM9MDthcmdzWzBdLnJlcGxhY2UoLyVbYS16JV0vZyxmdW5jdGlvbihtYXRjaCl7aWYoJyUnID09PSBtYXRjaClyZXR1cm47aW5kZXgrKztpZignJWMnID09PSBtYXRjaCl7IC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbmxhc3RDID0gaW5kZXg7fX0pO2FyZ3Muc3BsaWNlKGxhc3RDLDAsYyk7cmV0dXJuIGFyZ3M7fSAvKipcbiAgICAgICAgICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gICAgICAgICAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL2Z1bmN0aW9uIGxvZygpeyAvLyBUaGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOCxcbi8vIHdoZXJlIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG5yZXR1cm4gJ29iamVjdCcgPT0gdHlwZW9mIGNvbnNvbGUgJiYgJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgY29uc29sZS5sb2cgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csY29uc29sZSxhcmd1bWVudHMpO30gLyoqXG4gICAgICAgICAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKXt0cnl7aWYobnVsbCA9PSBuYW1lc3BhY2VzKXtsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTt9ZWxzZSB7bG9jYWxTdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlczt9fWNhdGNoKGUpIHt9fSAvKipcbiAgICAgICAgICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAqL2Z1bmN0aW9uIGxvYWQoKXt2YXIgcjt0cnl7ciA9IGxvY2FsU3RvcmFnZS5kZWJ1Zzt9Y2F0Y2goZSkge31yZXR1cm4gcjt9IC8qKlxuICAgICAgICAgKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxuICAgICAgICAgKi9leHBvcnRzLmVuYWJsZShsb2FkKCkpO30se1wiLi9kZWJ1Z1wiOjIzfV0sMjM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAgICAgICAgICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICAgICAgICAgKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gICAgICAgICAqL2V4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGRlYnVnO2V4cG9ydHMuY29lcmNlID0gY29lcmNlO2V4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7ZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7ZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtleHBvcnRzLmh1bWFuaXplID0gX2RlcmVxXygnbXMnKTsgLyoqXG4gICAgICAgICAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICAgICAgICAgKi9leHBvcnRzLm5hbWVzID0gW107ZXhwb3J0cy5za2lwcyA9IFtdOyAvKipcbiAgICAgICAgICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBWYWxpZCBrZXkgbmFtZXMgYXJlIGEgc2luZ2xlLCBsb3dlcmNhc2VkIGxldHRlciwgaS5lLiBcIm5cIi5cbiAgICAgICAgICovZXhwb3J0cy5mb3JtYXR0ZXJzID0ge307IC8qKlxuICAgICAgICAgKiBQcmV2aW91c2x5IGFzc2lnbmVkIGNvbG9yLlxuICAgICAgICAgKi92YXIgcHJldkNvbG9yPTA7IC8qKlxuICAgICAgICAgKiBQcmV2aW91cyBsb2cgdGltZXN0YW1wLlxuICAgICAgICAgKi92YXIgcHJldlRpbWU7IC8qKlxuICAgICAgICAgKiBTZWxlY3QgYSBjb2xvci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovZnVuY3Rpb24gc2VsZWN0Q29sb3IoKXtyZXR1cm4gZXhwb3J0cy5jb2xvcnNbcHJldkNvbG9yKysgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO30gLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9mdW5jdGlvbiBkZWJ1ZyhuYW1lc3BhY2UpeyAvLyBkZWZpbmUgdGhlIGBkaXNhYmxlZGAgdmVyc2lvblxuZnVuY3Rpb24gZGlzYWJsZWQoKXt9ZGlzYWJsZWQuZW5hYmxlZCA9IGZhbHNlOyAvLyBkZWZpbmUgdGhlIGBlbmFibGVkYCB2ZXJzaW9uXG5mdW5jdGlvbiBlbmFibGVkKCl7dmFyIHNlbGY9ZW5hYmxlZDsgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbnZhciBjdXJyPStuZXcgRGF0ZSgpO3ZhciBtcz1jdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO3NlbGYuZGlmZiA9IG1zO3NlbGYucHJldiA9IHByZXZUaW1lO3NlbGYuY3VyciA9IGN1cnI7cHJldlRpbWUgPSBjdXJyOyAvLyBhZGQgdGhlIGBjb2xvcmAgaWYgbm90IHNldFxuaWYobnVsbCA9PSBzZWxmLnVzZUNvbG9ycylzZWxmLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7aWYobnVsbCA9PSBzZWxmLmNvbG9yICYmIHNlbGYudXNlQ29sb3JzKXNlbGYuY29sb3IgPSBzZWxlY3RDb2xvcigpO3ZhciBhcmdzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7YXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO2lmKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSl7IC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVvXG5hcmdzID0gWyclbyddLmNvbmNhdChhcmdzKTt9IC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG52YXIgaW5kZXg9MDthcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXolXSkvZyxmdW5jdGlvbihtYXRjaCxmb3JtYXQpeyAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG5pZihtYXRjaCA9PT0gJyUnKXJldHVybiBtYXRjaDtpbmRleCsrO3ZhciBmb3JtYXR0ZXI9ZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07aWYoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcil7dmFyIHZhbD1hcmdzW2luZGV4XTttYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsdmFsKTsgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuYXJncy5zcGxpY2UoaW5kZXgsMSk7aW5kZXgtLTt9cmV0dXJuIG1hdGNoO30pO2lmKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmZvcm1hdEFyZ3Mpe2FyZ3MgPSBleHBvcnRzLmZvcm1hdEFyZ3MuYXBwbHkoc2VsZixhcmdzKTt9dmFyIGxvZ0ZuPWVuYWJsZWQubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7bG9nRm4uYXBwbHkoc2VsZixhcmdzKTt9ZW5hYmxlZC5lbmFibGVkID0gdHJ1ZTt2YXIgZm49ZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSk/ZW5hYmxlZDpkaXNhYmxlZDtmbi5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7cmV0dXJuIGZuO30gLyoqXG4gICAgICAgICAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAgICAgICAgICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpe2V4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTt2YXIgc3BsaXQ9KG5hbWVzcGFjZXMgfHwgJycpLnNwbGl0KC9bXFxzLF0rLyk7dmFyIGxlbj1zcGxpdC5sZW5ndGg7Zm9yKHZhciBpPTA7aSA8IGxlbjtpKyspIHtpZighc3BsaXRbaV0pY29udGludWU7IC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG5uYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csJy4qPycpO2lmKG5hbWVzcGFjZXNbMF0gPT09ICctJyl7ZXhwb3J0cy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTt9ZWxzZSB7ZXhwb3J0cy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO319fSAvKipcbiAgICAgICAgICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL2Z1bmN0aW9uIGRpc2FibGUoKXtleHBvcnRzLmVuYWJsZSgnJyk7fSAvKipcbiAgICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9mdW5jdGlvbiBlbmFibGVkKG5hbWUpe3ZhciBpLGxlbjtmb3IoaSA9IDAsbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7aSA8IGxlbjtpKyspIHtpZihleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpe3JldHVybiBmYWxzZTt9fWZvcihpID0gMCxsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDtpIDwgbGVuO2krKykge2lmKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSl7cmV0dXJuIHRydWU7fX1yZXR1cm4gZmFsc2U7fSAvKipcbiAgICAgICAgICogQ29lcmNlIGB2YWxgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge01peGVkfSB2YWxcbiAgICAgICAgICogQHJldHVybiB7TWl4ZWR9XG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9mdW5jdGlvbiBjb2VyY2UodmFsKXtpZih2YWwgaW5zdGFuY2VvZiBFcnJvcilyZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO3JldHVybiB2YWw7fX0se1wibXNcIjoyNH1dLDI0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXG4gICAgICAgICAqIEhlbHBlcnMuXG4gICAgICAgICAqL3ZhciBzPTEwMDA7dmFyIG09cyAqIDYwO3ZhciBoPW0gKiA2MDt2YXIgZD1oICogMjQ7dmFyIHk9ZCAqIDM2NS4yNTsgLyoqXG4gICAgICAgICAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gICAgICAgICAqXG4gICAgICAgICAqIE9wdGlvbnM6XG4gICAgICAgICAqXG4gICAgICAgICAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCxvcHRpb25zKXtvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtpZignc3RyaW5nJyA9PSB0eXBlb2YgdmFsKXJldHVybiBwYXJzZSh2YWwpO3JldHVybiBvcHRpb25zLmxvbmc/bG9uZyh2YWwpOnNob3J0KHZhbCk7fTsgLyoqXG4gICAgICAgICAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9mdW5jdGlvbiBwYXJzZShzdHIpe3ZhciBtYXRjaD0vXigoPzpcXGQrKT9cXC4/XFxkKykgKihtc3xzZWNvbmRzP3xzfG1pbnV0ZXM/fG18aG91cnM/fGh8ZGF5cz98ZHx5ZWFycz98eSk/JC9pLmV4ZWMoc3RyKTtpZighbWF0Y2gpcmV0dXJuO3ZhciBuPXBhcnNlRmxvYXQobWF0Y2hbMV0pO3ZhciB0eXBlPShtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO3N3aXRjaCh0eXBlKXtjYXNlICd5ZWFycyc6Y2FzZSAneWVhcic6Y2FzZSAneSc6cmV0dXJuIG4gKiB5O2Nhc2UgJ2RheXMnOmNhc2UgJ2RheSc6Y2FzZSAnZCc6cmV0dXJuIG4gKiBkO2Nhc2UgJ2hvdXJzJzpjYXNlICdob3VyJzpjYXNlICdoJzpyZXR1cm4gbiAqIGg7Y2FzZSAnbWludXRlcyc6Y2FzZSAnbWludXRlJzpjYXNlICdtJzpyZXR1cm4gbiAqIG07Y2FzZSAnc2Vjb25kcyc6Y2FzZSAnc2Vjb25kJzpjYXNlICdzJzpyZXR1cm4gbiAqIHM7Y2FzZSAnbXMnOnJldHVybiBuO319IC8qKlxuICAgICAgICAgKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9mdW5jdGlvbiBzaG9ydChtcyl7aWYobXMgPj0gZClyZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO2lmKG1zID49IGgpcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztpZihtcyA+PSBtKXJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7aWYobXMgPj0gcylyZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO3JldHVybiBtcyArICdtcyc7fSAvKipcbiAgICAgICAgICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9mdW5jdGlvbiBsb25nKG1zKXtyZXR1cm4gcGx1cmFsKG1zLGQsJ2RheScpIHx8IHBsdXJhbChtcyxoLCdob3VyJykgfHwgcGx1cmFsKG1zLG0sJ21pbnV0ZScpIHx8IHBsdXJhbChtcyxzLCdzZWNvbmQnKSB8fCBtcyArICcgbXMnO30gLyoqXG4gICAgICAgICAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICAgICAgICAgKi9mdW5jdGlvbiBwbHVyYWwobXMsbixuYW1lKXtpZihtcyA8IG4pcmV0dXJuO2lmKG1zIDwgbiAqIDEuNSlyZXR1cm4gTWF0aC5mbG9vcihtcyAvIG4pICsgJyAnICsgbmFtZTtyZXR1cm4gTWF0aC5jZWlsKG1zIC8gbikgKyAnICcgKyBuYW1lICsgJ3MnO319LHt9XSwyNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qKlxuICAgICAgICAgICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gICAgICAgICAgICovdmFyIGtleXM9X2RlcmVxXygnLi9rZXlzJyk7dmFyIGhhc0JpbmFyeT1fZGVyZXFfKCdoYXMtYmluYXJ5Jyk7dmFyIHNsaWNlQnVmZmVyPV9kZXJlcV8oJ2FycmF5YnVmZmVyLnNsaWNlJyk7dmFyIGJhc2U2NGVuY29kZXI9X2RlcmVxXygnYmFzZTY0LWFycmF5YnVmZmVyJyk7dmFyIGFmdGVyPV9kZXJlcV8oJ2FmdGVyJyk7dmFyIHV0Zjg9X2RlcmVxXygndXRmOCcpOyAvKipcbiAgICAgICAgICAgKiBDaGVjayBpZiB3ZSBhcmUgcnVubmluZyBhbiBhbmRyb2lkIGJyb3dzZXIuIFRoYXQgcmVxdWlyZXMgdXMgdG8gdXNlXG4gICAgICAgICAgICogQXJyYXlCdWZmZXIgd2l0aCBwb2xsaW5nIHRyYW5zcG9ydHMuLi5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIGh0dHA6Ly9naGluZGEubmV0L2pwZWctYmxvYi1hamF4LWFuZHJvaWQvXG4gICAgICAgICAgICovdmFyIGlzQW5kcm9pZD1uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkL2kpOyAvKipcbiAgICAgICAgICAgKiBDaGVjayBpZiB3ZSBhcmUgcnVubmluZyBpbiBQaGFudG9tSlMuXG4gICAgICAgICAgICogVXBsb2FkaW5nIGEgQmxvYiB3aXRoIFBoYW50b21KUyBkb2VzIG5vdCB3b3JrIGNvcnJlY3RseSwgYXMgcmVwb3J0ZWQgaGVyZTpcbiAgICAgICAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vYXJpeWEvcGhhbnRvbWpzL2lzc3Vlcy8xMTM5NVxuICAgICAgICAgICAqIEB0eXBlIGJvb2xlYW5cbiAgICAgICAgICAgKi92YXIgaXNQaGFudG9tSlM9L1BoYW50b21KUy9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7IC8qKlxuICAgICAgICAgICAqIFdoZW4gdHJ1ZSwgYXZvaWRzIHVzaW5nIEJsb2JzIHRvIGVuY29kZSBwYXlsb2Fkcy5cbiAgICAgICAgICAgKiBAdHlwZSBib29sZWFuXG4gICAgICAgICAgICovdmFyIGRvbnRTZW5kQmxvYnM9aXNBbmRyb2lkIHx8IGlzUGhhbnRvbUpTOyAvKipcbiAgICAgICAgICAgKiBDdXJyZW50IHByb3RvY29sIHZlcnNpb24uXG4gICAgICAgICAgICovZXhwb3J0cy5wcm90b2NvbCA9IDM7IC8qKlxuICAgICAgICAgICAqIFBhY2tldCB0eXBlcy5cbiAgICAgICAgICAgKi92YXIgcGFja2V0cz1leHBvcnRzLnBhY2tldHMgPSB7b3BlbjowLCAvLyBub24td3NcbmNsb3NlOjEsIC8vIG5vbi13c1xucGluZzoyLHBvbmc6MyxtZXNzYWdlOjQsdXBncmFkZTo1LG5vb3A6Nn07dmFyIHBhY2tldHNsaXN0PWtleXMocGFja2V0cyk7IC8qKlxuICAgICAgICAgICAqIFByZW1hZGUgZXJyb3IgcGFja2V0LlxuICAgICAgICAgICAqL3ZhciBlcnI9e3R5cGU6J2Vycm9yJyxkYXRhOidwYXJzZXIgZXJyb3InfTsgLyoqXG4gICAgICAgICAgICogQ3JlYXRlIGEgYmxvYiBhcGkgZXZlbiBmb3IgYmxvYiBidWlsZGVyIHdoZW4gdmVuZG9yIHByZWZpeGVzIGV4aXN0XG4gICAgICAgICAgICovdmFyIEJsb2I9X2RlcmVxXygnYmxvYicpOyAvKipcbiAgICAgICAgICAgKiBFbmNvZGVzIGEgcGFja2V0LlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogICAgIDxwYWNrZXQgdHlwZSBpZD4gWyA8ZGF0YT4gXVxuICAgICAgICAgICAqXG4gICAgICAgICAgICogRXhhbXBsZTpcbiAgICAgICAgICAgKlxuICAgICAgICAgICAqICAgICA1aGVsbG8gd29ybGRcbiAgICAgICAgICAgKiAgICAgM1xuICAgICAgICAgICAqICAgICA0XG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBCaW5hcnkgaXMgZW5jb2RlZCBpbiBhbiBpZGVudGljYWwgcHJpbmNpcGxlXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICAgKi9leHBvcnRzLmVuY29kZVBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCxzdXBwb3J0c0JpbmFyeSx1dGY4ZW5jb2RlLGNhbGxiYWNrKXtpZignZnVuY3Rpb24nID09IHR5cGVvZiBzdXBwb3J0c0JpbmFyeSl7Y2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtzdXBwb3J0c0JpbmFyeSA9IGZhbHNlO31pZignZnVuY3Rpb24nID09IHR5cGVvZiB1dGY4ZW5jb2RlKXtjYWxsYmFjayA9IHV0ZjhlbmNvZGU7dXRmOGVuY29kZSA9IG51bGw7fXZhciBkYXRhPXBhY2tldC5kYXRhID09PSB1bmRlZmluZWQ/dW5kZWZpbmVkOnBhY2tldC5kYXRhLmJ1ZmZlciB8fCBwYWNrZXQuZGF0YTtpZihnbG9iYWwuQXJyYXlCdWZmZXIgJiYgZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKXtyZXR1cm4gZW5jb2RlQXJyYXlCdWZmZXIocGFja2V0LHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKTt9ZWxzZSBpZihCbG9iICYmIGRhdGEgaW5zdGFuY2VvZiBnbG9iYWwuQmxvYil7cmV0dXJuIGVuY29kZUJsb2IocGFja2V0LHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKTt9IC8vIG1pZ2h0IGJlIGFuIG9iamVjdCB3aXRoIHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBkYXRhQXNCYXNlNjRTdHJpbmcgfVxuaWYoZGF0YSAmJiBkYXRhLmJhc2U2NCl7cmV0dXJuIGVuY29kZUJhc2U2NE9iamVjdChwYWNrZXQsY2FsbGJhY2spO30gLy8gU2VuZGluZyBkYXRhIGFzIGEgdXRmLTggc3RyaW5nXG52YXIgZW5jb2RlZD1wYWNrZXRzW3BhY2tldC50eXBlXTsgLy8gZGF0YSBmcmFnbWVudCBpcyBvcHRpb25hbFxuaWYodW5kZWZpbmVkICE9PSBwYWNrZXQuZGF0YSl7ZW5jb2RlZCArPSB1dGY4ZW5jb2RlP3V0ZjguZW5jb2RlKFN0cmluZyhwYWNrZXQuZGF0YSkpOlN0cmluZyhwYWNrZXQuZGF0YSk7fXJldHVybiBjYWxsYmFjaygnJyArIGVuY29kZWQpO307ZnVuY3Rpb24gZW5jb2RlQmFzZTY0T2JqZWN0KHBhY2tldCxjYWxsYmFjayl7IC8vIHBhY2tldCBkYXRhIGlzIGFuIG9iamVjdCB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogZGF0YUFzQmFzZTY0U3RyaW5nIH1cbnZhciBtZXNzYWdlPSdiJyArIGV4cG9ydHMucGFja2V0c1twYWNrZXQudHlwZV0gKyBwYWNrZXQuZGF0YS5kYXRhO3JldHVybiBjYWxsYmFjayhtZXNzYWdlKTt9IC8qKlxuICAgICAgICAgICAqIEVuY29kZSBwYWNrZXQgaGVscGVycyBmb3IgYmluYXJ5IHR5cGVzXG4gICAgICAgICAgICovZnVuY3Rpb24gZW5jb2RlQXJyYXlCdWZmZXIocGFja2V0LHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKXtpZighc3VwcG9ydHNCaW5hcnkpe3JldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsY2FsbGJhY2spO312YXIgZGF0YT1wYWNrZXQuZGF0YTt2YXIgY29udGVudEFycmF5PW5ldyBVaW50OEFycmF5KGRhdGEpO3ZhciByZXN1bHRCdWZmZXI9bmV3IFVpbnQ4QXJyYXkoMSArIGRhdGEuYnl0ZUxlbmd0aCk7cmVzdWx0QnVmZmVyWzBdID0gcGFja2V0c1twYWNrZXQudHlwZV07Zm9yKHZhciBpPTA7aSA8IGNvbnRlbnRBcnJheS5sZW5ndGg7aSsrKSB7cmVzdWx0QnVmZmVyW2kgKyAxXSA9IGNvbnRlbnRBcnJheVtpXTt9cmV0dXJuIGNhbGxiYWNrKHJlc3VsdEJ1ZmZlci5idWZmZXIpO31mdW5jdGlvbiBlbmNvZGVCbG9iQXNBcnJheUJ1ZmZlcihwYWNrZXQsc3VwcG9ydHNCaW5hcnksY2FsbGJhY2spe2lmKCFzdXBwb3J0c0JpbmFyeSl7cmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCxjYWxsYmFjayk7fXZhciBmcj1uZXcgRmlsZVJlYWRlcigpO2ZyLm9ubG9hZCA9IGZ1bmN0aW9uKCl7cGFja2V0LmRhdGEgPSBmci5yZXN1bHQ7ZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LHN1cHBvcnRzQmluYXJ5LHRydWUsY2FsbGJhY2spO307cmV0dXJuIGZyLnJlYWRBc0FycmF5QnVmZmVyKHBhY2tldC5kYXRhKTt9ZnVuY3Rpb24gZW5jb2RlQmxvYihwYWNrZXQsc3VwcG9ydHNCaW5hcnksY2FsbGJhY2spe2lmKCFzdXBwb3J0c0JpbmFyeSl7cmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCxjYWxsYmFjayk7fWlmKGRvbnRTZW5kQmxvYnMpe3JldHVybiBlbmNvZGVCbG9iQXNBcnJheUJ1ZmZlcihwYWNrZXQsc3VwcG9ydHNCaW5hcnksY2FsbGJhY2spO312YXIgbGVuZ3RoPW5ldyBVaW50OEFycmF5KDEpO2xlbmd0aFswXSA9IHBhY2tldHNbcGFja2V0LnR5cGVdO3ZhciBibG9iPW5ldyBCbG9iKFtsZW5ndGguYnVmZmVyLHBhY2tldC5kYXRhXSk7cmV0dXJuIGNhbGxiYWNrKGJsb2IpO30gLyoqXG4gICAgICAgICAgICogRW5jb2RlcyBhIHBhY2tldCB3aXRoIGJpbmFyeSBkYXRhIGluIGEgYmFzZTY0IHN0cmluZ1xuICAgICAgICAgICAqXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCwgaGFzIGB0eXBlYCBhbmQgYGRhdGFgXG4gICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSBiYXNlNjQgZW5jb2RlZCBtZXNzYWdlXG4gICAgICAgICAgICovZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQsY2FsbGJhY2spe3ZhciBtZXNzYWdlPSdiJyArIGV4cG9ydHMucGFja2V0c1twYWNrZXQudHlwZV07aWYoQmxvYiAmJiBwYWNrZXQuZGF0YSBpbnN0YW5jZW9mIEJsb2Ipe3ZhciBmcj1uZXcgRmlsZVJlYWRlcigpO2ZyLm9ubG9hZCA9IGZ1bmN0aW9uKCl7dmFyIGI2ND1mci5yZXN1bHQuc3BsaXQoJywnKVsxXTtjYWxsYmFjayhtZXNzYWdlICsgYjY0KTt9O3JldHVybiBmci5yZWFkQXNEYXRhVVJMKHBhY2tldC5kYXRhKTt9dmFyIGI2NGRhdGE7dHJ5e2I2NGRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsbmV3IFVpbnQ4QXJyYXkocGFja2V0LmRhdGEpKTt9Y2F0Y2goZSkgeyAvLyBpUGhvbmUgU2FmYXJpIGRvZXNuJ3QgbGV0IHlvdSBhcHBseSB3aXRoIHR5cGVkIGFycmF5c1xudmFyIHR5cGVkPW5ldyBVaW50OEFycmF5KHBhY2tldC5kYXRhKTt2YXIgYmFzaWM9bmV3IEFycmF5KHR5cGVkLmxlbmd0aCk7Zm9yKHZhciBpPTA7aSA8IHR5cGVkLmxlbmd0aDtpKyspIHtiYXNpY1tpXSA9IHR5cGVkW2ldO31iNjRkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGJhc2ljKTt9bWVzc2FnZSArPSBnbG9iYWwuYnRvYShiNjRkYXRhKTtyZXR1cm4gY2FsbGJhY2sobWVzc2FnZSk7fTsgLyoqXG4gICAgICAgICAgICogRGVjb2RlcyBhIHBhY2tldC4gQ2hhbmdlcyBmb3JtYXQgdG8gQmxvYiBpZiByZXF1ZXN0ZWQuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYHR5cGVgIGFuZCBgZGF0YWAgKGlmIGFueSlcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICAgKi9leHBvcnRzLmRlY29kZVBhY2tldCA9IGZ1bmN0aW9uKGRhdGEsYmluYXJ5VHlwZSx1dGY4ZGVjb2RlKXsgLy8gU3RyaW5nIGRhdGFcbmlmKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnIHx8IGRhdGEgPT09IHVuZGVmaW5lZCl7aWYoZGF0YS5jaGFyQXQoMCkgPT0gJ2InKXtyZXR1cm4gZXhwb3J0cy5kZWNvZGVCYXNlNjRQYWNrZXQoZGF0YS5zdWJzdHIoMSksYmluYXJ5VHlwZSk7fWlmKHV0ZjhkZWNvZGUpe3RyeXtkYXRhID0gdXRmOC5kZWNvZGUoZGF0YSk7fWNhdGNoKGUpIHtyZXR1cm4gZXJyO319dmFyIHR5cGU9ZGF0YS5jaGFyQXQoMCk7aWYoTnVtYmVyKHR5cGUpICE9IHR5cGUgfHwgIXBhY2tldHNsaXN0W3R5cGVdKXtyZXR1cm4gZXJyO31pZihkYXRhLmxlbmd0aCA+IDEpe3JldHVybiB7dHlwZTpwYWNrZXRzbGlzdFt0eXBlXSxkYXRhOmRhdGEuc3Vic3RyaW5nKDEpfTt9ZWxzZSB7cmV0dXJuIHt0eXBlOnBhY2tldHNsaXN0W3R5cGVdfTt9fXZhciBhc0FycmF5PW5ldyBVaW50OEFycmF5KGRhdGEpO3ZhciB0eXBlPWFzQXJyYXlbMF07dmFyIHJlc3Q9c2xpY2VCdWZmZXIoZGF0YSwxKTtpZihCbG9iICYmIGJpbmFyeVR5cGUgPT09ICdibG9iJyl7cmVzdCA9IG5ldyBCbG9iKFtyZXN0XSk7fXJldHVybiB7dHlwZTpwYWNrZXRzbGlzdFt0eXBlXSxkYXRhOnJlc3R9O307IC8qKlxuICAgICAgICAgICAqIERlY29kZXMgYSBwYWNrZXQgZW5jb2RlZCBpbiBhIGJhc2U2NCBzdHJpbmdcbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlNjQgZW5jb2RlZCBtZXNzYWdlXG4gICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGB0eXBlYCBhbmQgYGRhdGFgIChpZiBhbnkpXG4gICAgICAgICAgICovZXhwb3J0cy5kZWNvZGVCYXNlNjRQYWNrZXQgPSBmdW5jdGlvbihtc2csYmluYXJ5VHlwZSl7dmFyIHR5cGU9cGFja2V0c2xpc3RbbXNnLmNoYXJBdCgwKV07aWYoIWdsb2JhbC5BcnJheUJ1ZmZlcil7cmV0dXJuIHt0eXBlOnR5cGUsZGF0YTp7YmFzZTY0OnRydWUsZGF0YTptc2cuc3Vic3RyKDEpfX07fXZhciBkYXRhPWJhc2U2NGVuY29kZXIuZGVjb2RlKG1zZy5zdWJzdHIoMSkpO2lmKGJpbmFyeVR5cGUgPT09ICdibG9iJyAmJiBCbG9iKXtkYXRhID0gbmV3IEJsb2IoW2RhdGFdKTt9cmV0dXJuIHt0eXBlOnR5cGUsZGF0YTpkYXRhfTt9OyAvKipcbiAgICAgICAgICAgKiBFbmNvZGVzIG11bHRpcGxlIG1lc3NhZ2VzIChwYXlsb2FkKS5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqICAgICA8bGVuZ3RoPjpkYXRhXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBFeGFtcGxlOlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogICAgIDExOmhlbGxvIHdvcmxkMjpoaVxuICAgICAgICAgICAqXG4gICAgICAgICAgICogSWYgYW55IGNvbnRlbnRzIGFyZSBiaW5hcnksIHRoZXkgd2lsbCBiZSBlbmNvZGVkIGFzIGJhc2U2NCBzdHJpbmdzLiBCYXNlNjRcbiAgICAgICAgICAgKiBlbmNvZGVkIHN0cmluZ3MgYXJlIG1hcmtlZCB3aXRoIGEgYiBiZWZvcmUgdGhlIGxlbmd0aCBzcGVjaWZpZXJcbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICAgKi9leHBvcnRzLmVuY29kZVBheWxvYWQgPSBmdW5jdGlvbihwYWNrZXRzLHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKXtpZih0eXBlb2Ygc3VwcG9ydHNCaW5hcnkgPT0gJ2Z1bmN0aW9uJyl7Y2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtzdXBwb3J0c0JpbmFyeSA9IG51bGw7fXZhciBpc0JpbmFyeT1oYXNCaW5hcnkocGFja2V0cyk7aWYoc3VwcG9ydHNCaW5hcnkgJiYgaXNCaW5hcnkpe2lmKEJsb2IgJiYgIWRvbnRTZW5kQmxvYnMpe3JldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IocGFja2V0cyxjYWxsYmFjayk7fXJldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyKHBhY2tldHMsY2FsbGJhY2spO31pZighcGFja2V0cy5sZW5ndGgpe3JldHVybiBjYWxsYmFjaygnMDonKTt9ZnVuY3Rpb24gc2V0TGVuZ3RoSGVhZGVyKG1lc3NhZ2Upe3JldHVybiBtZXNzYWdlLmxlbmd0aCArICc6JyArIG1lc3NhZ2U7fWZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsZG9uZUNhbGxiYWNrKXtleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsIWlzQmluYXJ5P2ZhbHNlOnN1cHBvcnRzQmluYXJ5LHRydWUsZnVuY3Rpb24obWVzc2FnZSl7ZG9uZUNhbGxiYWNrKG51bGwsc2V0TGVuZ3RoSGVhZGVyKG1lc3NhZ2UpKTt9KTt9bWFwKHBhY2tldHMsZW5jb2RlT25lLGZ1bmN0aW9uKGVycixyZXN1bHRzKXtyZXR1cm4gY2FsbGJhY2socmVzdWx0cy5qb2luKCcnKSk7fSk7fTsgLyoqXG4gICAgICAgICAgICogQXN5bmMgYXJyYXkgbWFwIHVzaW5nIGFmdGVyXG4gICAgICAgICAgICovZnVuY3Rpb24gbWFwKGFyeSxlYWNoLGRvbmUpe3ZhciByZXN1bHQ9bmV3IEFycmF5KGFyeS5sZW5ndGgpO3ZhciBuZXh0PWFmdGVyKGFyeS5sZW5ndGgsZG9uZSk7dmFyIGVhY2hXaXRoSW5kZXg9ZnVuY3Rpb24gZWFjaFdpdGhJbmRleChpLGVsLGNiKXtlYWNoKGVsLGZ1bmN0aW9uKGVycm9yLG1zZyl7cmVzdWx0W2ldID0gbXNnO2NiKGVycm9yLHJlc3VsdCk7fSk7fTtmb3IodmFyIGk9MDtpIDwgYXJ5Lmxlbmd0aDtpKyspIHtlYWNoV2l0aEluZGV4KGksYXJ5W2ldLG5leHQpO319IC8qXG4gICAgICAgICAgICogRGVjb2RlcyBkYXRhIHdoZW4gYSBwYXlsb2FkIGlzIG1heWJlIGV4cGVjdGVkLiBQb3NzaWJsZSBiaW5hcnkgY29udGVudHMgYXJlXG4gICAgICAgICAgICogZGVjb2RlZCBmcm9tIHRoZWlyIGJhc2U2NCByZXByZXNlbnRhdGlvblxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEsIGNhbGxiYWNrIG1ldGhvZFxuICAgICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAgICovZXhwb3J0cy5kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24oZGF0YSxiaW5hcnlUeXBlLGNhbGxiYWNrKXtpZih0eXBlb2YgZGF0YSAhPSAnc3RyaW5nJyl7cmV0dXJuIGV4cG9ydHMuZGVjb2RlUGF5bG9hZEFzQmluYXJ5KGRhdGEsYmluYXJ5VHlwZSxjYWxsYmFjayk7fWlmKHR5cGVvZiBiaW5hcnlUeXBlID09PSAnZnVuY3Rpb24nKXtjYWxsYmFjayA9IGJpbmFyeVR5cGU7YmluYXJ5VHlwZSA9IG51bGw7fXZhciBwYWNrZXQ7aWYoZGF0YSA9PSAnJyl7IC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbnJldHVybiBjYWxsYmFjayhlcnIsMCwxKTt9dmFyIGxlbmd0aD0nJyxuLG1zZztmb3IodmFyIGk9MCxsPWRhdGEubGVuZ3RoO2kgPCBsO2krKykge3ZhciBjaHI9ZGF0YS5jaGFyQXQoaSk7aWYoJzonICE9IGNocil7bGVuZ3RoICs9IGNocjt9ZWxzZSB7aWYoJycgPT0gbGVuZ3RoIHx8IGxlbmd0aCAhPSAobiA9IE51bWJlcihsZW5ndGgpKSl7IC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbnJldHVybiBjYWxsYmFjayhlcnIsMCwxKTt9bXNnID0gZGF0YS5zdWJzdHIoaSArIDEsbik7aWYobGVuZ3RoICE9IG1zZy5sZW5ndGgpeyAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG5yZXR1cm4gY2FsbGJhY2soZXJyLDAsMSk7fWlmKG1zZy5sZW5ndGgpe3BhY2tldCA9IGV4cG9ydHMuZGVjb2RlUGFja2V0KG1zZyxiaW5hcnlUeXBlLHRydWUpO2lmKGVyci50eXBlID09IHBhY2tldC50eXBlICYmIGVyci5kYXRhID09IHBhY2tldC5kYXRhKXsgLy8gcGFyc2VyIGVycm9yIGluIGluZGl2aWR1YWwgcGFja2V0IC0gaWdub3JpbmcgcGF5bG9hZFxucmV0dXJuIGNhbGxiYWNrKGVyciwwLDEpO312YXIgcmV0PWNhbGxiYWNrKHBhY2tldCxpICsgbixsKTtpZihmYWxzZSA9PT0gcmV0KXJldHVybjt9IC8vIGFkdmFuY2UgY3Vyc29yXG5pICs9IG47bGVuZ3RoID0gJyc7fX1pZihsZW5ndGggIT0gJycpeyAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG5yZXR1cm4gY2FsbGJhY2soZXJyLDAsMSk7fX07IC8qKlxuICAgICAgICAgICAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpIGFzIGJpbmFyeS5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIDwxID0gYmluYXJ5LCAwID0gc3RyaW5nPjxudW1iZXIgZnJvbSAwLTk+PG51bWJlciBmcm9tIDAtOT5bLi4uXTxudW1iZXJcbiAgICAgICAgICAgKiAyNTU+PGRhdGE+XG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBFeGFtcGxlOlxuICAgICAgICAgICAqIDEgMyAyNTUgMSAyIDMsIGlmIHRoZSBiaW5hcnkgY29udGVudHMgYXJlIGludGVycHJldGVkIGFzIDggYml0IGludGVnZXJzXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gICAgICAgICAgICogQHJldHVybiB7QXJyYXlCdWZmZXJ9IGVuY29kZWQgcGF5bG9hZFxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL2V4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQXJyYXlCdWZmZXIgPSBmdW5jdGlvbihwYWNrZXRzLGNhbGxiYWNrKXtpZighcGFja2V0cy5sZW5ndGgpe3JldHVybiBjYWxsYmFjayhuZXcgQXJyYXlCdWZmZXIoMCkpO31mdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LGRvbmVDYWxsYmFjayl7ZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LHRydWUsdHJ1ZSxmdW5jdGlvbihkYXRhKXtyZXR1cm4gZG9uZUNhbGxiYWNrKG51bGwsZGF0YSk7fSk7fW1hcChwYWNrZXRzLGVuY29kZU9uZSxmdW5jdGlvbihlcnIsZW5jb2RlZFBhY2tldHMpe3ZhciB0b3RhbExlbmd0aD1lbmNvZGVkUGFja2V0cy5yZWR1Y2UoZnVuY3Rpb24oYWNjLHApe3ZhciBsZW47aWYodHlwZW9mIHAgPT09ICdzdHJpbmcnKXtsZW4gPSBwLmxlbmd0aDt9ZWxzZSB7bGVuID0gcC5ieXRlTGVuZ3RoO31yZXR1cm4gYWNjICsgbGVuLnRvU3RyaW5nKCkubGVuZ3RoICsgbGVuICsgMjsgLy8gc3RyaW5nL2JpbmFyeSBpZGVudGlmaWVyICsgc2VwYXJhdG9yID0gMlxufSwwKTt2YXIgcmVzdWx0QXJyYXk9bmV3IFVpbnQ4QXJyYXkodG90YWxMZW5ndGgpO3ZhciBidWZmZXJJbmRleD0wO2VuY29kZWRQYWNrZXRzLmZvckVhY2goZnVuY3Rpb24ocCl7dmFyIGlzU3RyaW5nPXR5cGVvZiBwID09PSAnc3RyaW5nJzt2YXIgYWI9cDtpZihpc1N0cmluZyl7dmFyIHZpZXc9bmV3IFVpbnQ4QXJyYXkocC5sZW5ndGgpO2Zvcih2YXIgaT0wO2kgPCBwLmxlbmd0aDtpKyspIHt2aWV3W2ldID0gcC5jaGFyQ29kZUF0KGkpO31hYiA9IHZpZXcuYnVmZmVyO31pZihpc1N0cmluZyl7IC8vIG5vdCB0cnVlIGJpbmFyeVxucmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSAwO31lbHNlIHsgLy8gdHJ1ZSBiaW5hcnlcbnJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMTt9dmFyIGxlblN0cj1hYi5ieXRlTGVuZ3RoLnRvU3RyaW5nKCk7Zm9yKHZhciBpPTA7aSA8IGxlblN0ci5sZW5ndGg7aSsrKSB7cmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSBwYXJzZUludChsZW5TdHJbaV0pO31yZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDI1NTt2YXIgdmlldz1uZXcgVWludDhBcnJheShhYik7Zm9yKHZhciBpPTA7aSA8IHZpZXcubGVuZ3RoO2krKykge3Jlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gdmlld1tpXTt9fSk7cmV0dXJuIGNhbGxiYWNrKHJlc3VsdEFycmF5LmJ1ZmZlcik7fSk7fTsgLyoqXG4gICAgICAgICAgICogRW5jb2RlIGFzIEJsb2JcbiAgICAgICAgICAgKi9leHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IgPSBmdW5jdGlvbihwYWNrZXRzLGNhbGxiYWNrKXtmdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LGRvbmVDYWxsYmFjayl7ZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LHRydWUsdHJ1ZSxmdW5jdGlvbihlbmNvZGVkKXt2YXIgYmluYXJ5SWRlbnRpZmllcj1uZXcgVWludDhBcnJheSgxKTtiaW5hcnlJZGVudGlmaWVyWzBdID0gMTtpZih0eXBlb2YgZW5jb2RlZCA9PT0gJ3N0cmluZycpe3ZhciB2aWV3PW5ldyBVaW50OEFycmF5KGVuY29kZWQubGVuZ3RoKTtmb3IodmFyIGk9MDtpIDwgZW5jb2RlZC5sZW5ndGg7aSsrKSB7dmlld1tpXSA9IGVuY29kZWQuY2hhckNvZGVBdChpKTt9ZW5jb2RlZCA9IHZpZXcuYnVmZmVyO2JpbmFyeUlkZW50aWZpZXJbMF0gPSAwO312YXIgbGVuPWVuY29kZWQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcj9lbmNvZGVkLmJ5dGVMZW5ndGg6ZW5jb2RlZC5zaXplO3ZhciBsZW5TdHI9bGVuLnRvU3RyaW5nKCk7dmFyIGxlbmd0aEFyeT1uZXcgVWludDhBcnJheShsZW5TdHIubGVuZ3RoICsgMSk7Zm9yKHZhciBpPTA7aSA8IGxlblN0ci5sZW5ndGg7aSsrKSB7bGVuZ3RoQXJ5W2ldID0gcGFyc2VJbnQobGVuU3RyW2ldKTt9bGVuZ3RoQXJ5W2xlblN0ci5sZW5ndGhdID0gMjU1O2lmKEJsb2Ipe3ZhciBibG9iPW5ldyBCbG9iKFtiaW5hcnlJZGVudGlmaWVyLmJ1ZmZlcixsZW5ndGhBcnkuYnVmZmVyLGVuY29kZWRdKTtkb25lQ2FsbGJhY2sobnVsbCxibG9iKTt9fSk7fW1hcChwYWNrZXRzLGVuY29kZU9uZSxmdW5jdGlvbihlcnIscmVzdWx0cyl7cmV0dXJuIGNhbGxiYWNrKG5ldyBCbG9iKHJlc3VsdHMpKTt9KTt9OyAvKlxuICAgICAgICAgICAqIERlY29kZXMgZGF0YSB3aGVuIGEgcGF5bG9hZCBpcyBtYXliZSBleHBlY3RlZC4gU3RyaW5ncyBhcmUgZGVjb2RlZCBieVxuICAgICAgICAgICAqIGludGVycHJldGluZyBlYWNoIGJ5dGUgYXMgYSBrZXkgY29kZSBmb3IgZW50cmllcyBtYXJrZWQgdG8gc3RhcnQgd2l0aCAwLiBTZWVcbiAgICAgICAgICAgKiBkZXNjcmlwdGlvbiBvZiBlbmNvZGVQYXlsb2FkQXNCaW5hcnlcbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGRhdGEsIGNhbGxiYWNrIG1ldGhvZFxuICAgICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAgICovZXhwb3J0cy5kZWNvZGVQYXlsb2FkQXNCaW5hcnkgPSBmdW5jdGlvbihkYXRhLGJpbmFyeVR5cGUsY2FsbGJhY2spe2lmKHR5cGVvZiBiaW5hcnlUeXBlID09PSAnZnVuY3Rpb24nKXtjYWxsYmFjayA9IGJpbmFyeVR5cGU7YmluYXJ5VHlwZSA9IG51bGw7fXZhciBidWZmZXJUYWlsPWRhdGE7dmFyIGJ1ZmZlcnM9W107dmFyIG51bWJlclRvb0xvbmc9ZmFsc2U7d2hpbGUoYnVmZmVyVGFpbC5ieXRlTGVuZ3RoID4gMCkge3ZhciB0YWlsQXJyYXk9bmV3IFVpbnQ4QXJyYXkoYnVmZmVyVGFpbCk7dmFyIGlzU3RyaW5nPXRhaWxBcnJheVswXSA9PT0gMDt2YXIgbXNnTGVuZ3RoPScnO2Zvcih2YXIgaT0xOztpKyspIHtpZih0YWlsQXJyYXlbaV0gPT0gMjU1KWJyZWFrO2lmKG1zZ0xlbmd0aC5sZW5ndGggPiAzMTApe251bWJlclRvb0xvbmcgPSB0cnVlO2JyZWFrO31tc2dMZW5ndGggKz0gdGFpbEFycmF5W2ldO31pZihudW1iZXJUb29Mb25nKXJldHVybiBjYWxsYmFjayhlcnIsMCwxKTtidWZmZXJUYWlsID0gc2xpY2VCdWZmZXIoYnVmZmVyVGFpbCwyICsgbXNnTGVuZ3RoLmxlbmd0aCk7bXNnTGVuZ3RoID0gcGFyc2VJbnQobXNnTGVuZ3RoKTt2YXIgbXNnPXNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsMCxtc2dMZW5ndGgpO2lmKGlzU3RyaW5nKXt0cnl7bXNnID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLG5ldyBVaW50OEFycmF5KG1zZykpO31jYXRjaChlKSB7IC8vIGlQaG9uZSBTYWZhcmkgZG9lc24ndCBsZXQgeW91IGFwcGx5IHRvIHR5cGVkIGFycmF5c1xudmFyIHR5cGVkPW5ldyBVaW50OEFycmF5KG1zZyk7bXNnID0gJyc7Zm9yKHZhciBpPTA7aSA8IHR5cGVkLmxlbmd0aDtpKyspIHttc2cgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh0eXBlZFtpXSk7fX19YnVmZmVycy5wdXNoKG1zZyk7YnVmZmVyVGFpbCA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsbXNnTGVuZ3RoKTt9dmFyIHRvdGFsPWJ1ZmZlcnMubGVuZ3RoO2J1ZmZlcnMuZm9yRWFjaChmdW5jdGlvbihidWZmZXIsaSl7Y2FsbGJhY2soZXhwb3J0cy5kZWNvZGVQYWNrZXQoYnVmZmVyLGJpbmFyeVR5cGUsdHJ1ZSksaSx0b3RhbCk7fSk7fTt9KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp7fSk7fSx7XCIuL2tleXNcIjoyNixcImFmdGVyXCI6MjcsXCJhcnJheWJ1ZmZlci5zbGljZVwiOjI4LFwiYmFzZTY0LWFycmF5YnVmZmVyXCI6MjksXCJibG9iXCI6MzAsXCJoYXMtYmluYXJ5XCI6MzEsXCJ1dGY4XCI6MzN9XSwyNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBrZXlzIGZvciBhbiBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fSBrZXlzXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMob2JqKXt2YXIgYXJyPVtdO3ZhciBoYXM9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtmb3IodmFyIGkgaW4gb2JqKSB7aWYoaGFzLmNhbGwob2JqLGkpKXthcnIucHVzaChpKTt9fXJldHVybiBhcnI7fTt9LHt9XSwyNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7bW9kdWxlLmV4cG9ydHMgPSBhZnRlcjtmdW5jdGlvbiBhZnRlcihjb3VudCxjYWxsYmFjayxlcnJfY2Ipe3ZhciBiYWlsPWZhbHNlO2Vycl9jYiA9IGVycl9jYiB8fCBub29wO3Byb3h5LmNvdW50ID0gY291bnQ7cmV0dXJuIGNvdW50ID09PSAwP2NhbGxiYWNrKCk6cHJveHk7ZnVuY3Rpb24gcHJveHkoZXJyLHJlc3VsdCl7aWYocHJveHkuY291bnQgPD0gMCl7dGhyb3cgbmV3IEVycm9yKCdhZnRlciBjYWxsZWQgdG9vIG1hbnkgdGltZXMnKTt9LS1wcm94eS5jb3VudDsgLy8gYWZ0ZXIgZmlyc3QgZXJyb3IsIHJlc3QgYXJlIHBhc3NlZCB0byBlcnJfY2JcbmlmKGVycil7YmFpbCA9IHRydWU7Y2FsbGJhY2soZXJyKTsgLy8gZnV0dXJlIGVycm9yIGNhbGxiYWNrcyB3aWxsIGdvIHRvIGVycm9yIGhhbmRsZXJcbmNhbGxiYWNrID0gZXJyX2NiO31lbHNlIGlmKHByb3h5LmNvdW50ID09PSAwICYmICFiYWlsKXtjYWxsYmFjayhudWxsLHJlc3VsdCk7fX19ZnVuY3Rpb24gbm9vcCgpe319LHt9XSwyODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICAgICAgICAgKiBBbiBhYnN0cmFjdGlvbiBmb3Igc2xpY2luZyBhbiBhcnJheWJ1ZmZlciBldmVuIHdoZW5cbiAgICAgICAgICogQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnJheWJ1ZmZlcixzdGFydCxlbmQpe3ZhciBieXRlcz1hcnJheWJ1ZmZlci5ieXRlTGVuZ3RoO3N0YXJ0ID0gc3RhcnQgfHwgMDtlbmQgPSBlbmQgfHwgYnl0ZXM7aWYoYXJyYXlidWZmZXIuc2xpY2Upe3JldHVybiBhcnJheWJ1ZmZlci5zbGljZShzdGFydCxlbmQpO31pZihzdGFydCA8IDApe3N0YXJ0ICs9IGJ5dGVzO31pZihlbmQgPCAwKXtlbmQgKz0gYnl0ZXM7fWlmKGVuZCA+IGJ5dGVzKXtlbmQgPSBieXRlczt9aWYoc3RhcnQgPj0gYnl0ZXMgfHwgc3RhcnQgPj0gZW5kIHx8IGJ5dGVzID09PSAwKXtyZXR1cm4gbmV3IEFycmF5QnVmZmVyKDApO312YXIgYWJ2PW5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTt2YXIgcmVzdWx0PW5ldyBVaW50OEFycmF5KGVuZCAtIHN0YXJ0KTtmb3IodmFyIGk9c3RhcnQsaWk9MDtpIDwgZW5kO2krKyxpaSsrKSB7cmVzdWx0W2lpXSA9IGFidltpXTt9cmV0dXJuIHJlc3VsdC5idWZmZXI7fTt9LHt9XSwyOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qXG4gICAgICAgICAqIGJhc2U2NC1hcnJheWJ1ZmZlclxuICAgICAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbmlrbGFzdmgvYmFzZTY0LWFycmF5YnVmZmVyXG4gICAgICAgICAqXG4gICAgICAgICAqIENvcHlyaWdodCAoYykgMjAxMiBOaWtsYXMgdm9uIEhlcnR6ZW5cbiAgICAgICAgICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICAgICAgICAgKi8oZnVuY3Rpb24oY2hhcnMpe1widXNlIHN0cmljdFwiO2V4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24oYXJyYXlidWZmZXIpe3ZhciBieXRlcz1uZXcgVWludDhBcnJheShhcnJheWJ1ZmZlciksaSxsZW49Ynl0ZXMubGVuZ3RoLGJhc2U2ND1cIlwiO2ZvcihpID0gMDtpIDwgbGVuO2kgKz0gMykge2Jhc2U2NCArPSBjaGFyc1tieXRlc1tpXSA+PiAyXTtiYXNlNjQgKz0gY2hhcnNbKGJ5dGVzW2ldICYgMykgPDwgNCB8IGJ5dGVzW2kgKyAxXSA+PiA0XTtiYXNlNjQgKz0gY2hhcnNbKGJ5dGVzW2kgKyAxXSAmIDE1KSA8PCAyIHwgYnl0ZXNbaSArIDJdID4+IDZdO2Jhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107fWlmKGxlbiAlIDMgPT09IDIpe2Jhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCxiYXNlNjQubGVuZ3RoIC0gMSkgKyBcIj1cIjt9ZWxzZSBpZihsZW4gJSAzID09PSAxKXtiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsYmFzZTY0Lmxlbmd0aCAtIDIpICsgXCI9PVwiO31yZXR1cm4gYmFzZTY0O307ZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbihiYXNlNjQpe3ZhciBidWZmZXJMZW5ndGg9YmFzZTY0Lmxlbmd0aCAqIDAuNzUsbGVuPWJhc2U2NC5sZW5ndGgsaSxwPTAsZW5jb2RlZDEsZW5jb2RlZDIsZW5jb2RlZDMsZW5jb2RlZDQ7aWYoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAxXSA9PT0gXCI9XCIpe2J1ZmZlckxlbmd0aC0tO2lmKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMl0gPT09IFwiPVwiKXtidWZmZXJMZW5ndGgtLTt9fXZhciBhcnJheWJ1ZmZlcj1uZXcgQXJyYXlCdWZmZXIoYnVmZmVyTGVuZ3RoKSxieXRlcz1uZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7Zm9yKGkgPSAwO2kgPCBsZW47aSArPSA0KSB7ZW5jb2RlZDEgPSBjaGFycy5pbmRleE9mKGJhc2U2NFtpXSk7ZW5jb2RlZDIgPSBjaGFycy5pbmRleE9mKGJhc2U2NFtpICsgMV0pO2VuY29kZWQzID0gY2hhcnMuaW5kZXhPZihiYXNlNjRbaSArIDJdKTtlbmNvZGVkNCA9IGNoYXJzLmluZGV4T2YoYmFzZTY0W2kgKyAzXSk7Ynl0ZXNbcCsrXSA9IGVuY29kZWQxIDw8IDIgfCBlbmNvZGVkMiA+PiA0O2J5dGVzW3ArK10gPSAoZW5jb2RlZDIgJiAxNSkgPDwgNCB8IGVuY29kZWQzID4+IDI7Ynl0ZXNbcCsrXSA9IChlbmNvZGVkMyAmIDMpIDw8IDYgfCBlbmNvZGVkNCAmIDYzO31yZXR1cm4gYXJyYXlidWZmZXI7fTt9KShcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIik7fSx7fV0sMzA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKipcbiAgICAgICAgICAgKiBDcmVhdGUgYSBibG9iIGJ1aWxkZXIgZXZlbiB3aGVuIHZlbmRvciBwcmVmaXhlcyBleGlzdFxuICAgICAgICAgICAqL3ZhciBCbG9iQnVpbGRlcj1nbG9iYWwuQmxvYkJ1aWxkZXIgfHwgZ2xvYmFsLldlYktpdEJsb2JCdWlsZGVyIHx8IGdsb2JhbC5NU0Jsb2JCdWlsZGVyIHx8IGdsb2JhbC5Nb3pCbG9iQnVpbGRlcjsgLyoqXG4gICAgICAgICAgICogQ2hlY2sgaWYgQmxvYiBjb25zdHJ1Y3RvciBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgKi92YXIgYmxvYlN1cHBvcnRlZD0oZnVuY3Rpb24oKXt0cnl7dmFyIGI9bmV3IEJsb2IoWydoaSddKTtyZXR1cm4gYi5zaXplID09IDI7fWNhdGNoKGUpIHtyZXR1cm4gZmFsc2U7fX0pKCk7IC8qKlxuICAgICAgICAgICAqIENoZWNrIGlmIEJsb2JCdWlsZGVyIGlzIHN1cHBvcnRlZFxuICAgICAgICAgICAqL3ZhciBibG9iQnVpbGRlclN1cHBvcnRlZD1CbG9iQnVpbGRlciAmJiBCbG9iQnVpbGRlci5wcm90b3R5cGUuYXBwZW5kICYmIEJsb2JCdWlsZGVyLnByb3RvdHlwZS5nZXRCbG9iO2Z1bmN0aW9uIEJsb2JCdWlsZGVyQ29uc3RydWN0b3IoYXJ5LG9wdGlvbnMpe29wdGlvbnMgPSBvcHRpb25zIHx8IHt9O3ZhciBiYj1uZXcgQmxvYkJ1aWxkZXIoKTtmb3IodmFyIGk9MDtpIDwgYXJ5Lmxlbmd0aDtpKyspIHtiYi5hcHBlbmQoYXJ5W2ldKTt9cmV0dXJuIG9wdGlvbnMudHlwZT9iYi5nZXRCbG9iKG9wdGlvbnMudHlwZSk6YmIuZ2V0QmxvYigpO307bW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKXtpZihibG9iU3VwcG9ydGVkKXtyZXR1cm4gZ2xvYmFsLkJsb2I7fWVsc2UgaWYoYmxvYkJ1aWxkZXJTdXBwb3J0ZWQpe3JldHVybiBCbG9iQnVpbGRlckNvbnN0cnVjdG9yO31lbHNlIHtyZXR1cm4gdW5kZWZpbmVkO319KSgpO30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93Ont9KTt9LHt9XSwzMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qXG4gICAgICAgICAgICogTW9kdWxlIHJlcXVpcmVtZW50cy5cbiAgICAgICAgICAgKi92YXIgaXNBcnJheT1fZGVyZXFfKCdpc2FycmF5Jyk7IC8qKlxuICAgICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxuICAgICAgICAgICAqL21vZHVsZS5leHBvcnRzID0gaGFzQmluYXJ5OyAvKipcbiAgICAgICAgICAgKiBDaGVja3MgZm9yIGJpbmFyeSBkYXRhLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogUmlnaHQgbm93IG9ubHkgQnVmZmVyIGFuZCBBcnJheUJ1ZmZlciBhcmUgc3VwcG9ydGVkLi5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhbnl0aGluZ1xuICAgICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAgICovZnVuY3Rpb24gaGFzQmluYXJ5KGRhdGEpe2Z1bmN0aW9uIF9oYXNCaW5hcnkob2JqKXtpZighb2JqKXJldHVybiBmYWxzZTtpZihnbG9iYWwuQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIob2JqKSB8fCBnbG9iYWwuQXJyYXlCdWZmZXIgJiYgb2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgZ2xvYmFsLkJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYiB8fCBnbG9iYWwuRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKXtyZXR1cm4gdHJ1ZTt9aWYoaXNBcnJheShvYmopKXtmb3IodmFyIGk9MDtpIDwgb2JqLmxlbmd0aDtpKyspIHtpZihfaGFzQmluYXJ5KG9ialtpXSkpe3JldHVybiB0cnVlO319fWVsc2UgaWYob2JqICYmICdvYmplY3QnID09IHR5cGVvZiBvYmope2lmKG9iai50b0pTT04pe29iaiA9IG9iai50b0pTT04oKTt9Zm9yKHZhciBrZXkgaW4gb2JqKSB7aWYob2JqLmhhc093blByb3BlcnR5KGtleSkgJiYgX2hhc0JpbmFyeShvYmpba2V5XSkpe3JldHVybiB0cnVlO319fXJldHVybiBmYWxzZTt9cmV0dXJuIF9oYXNCaW5hcnkoZGF0YSk7fX0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93Ont9KTt9LHtcImlzYXJyYXlcIjozMn1dLDMyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXttb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24oYXJyKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJzt9O30se31dLDMzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyohIGh0dHA6Ly9tdGhzLmJlL3V0ZjhqcyB2Mi4wLjAgYnkgQG1hdGhpYXMgKi87KGZ1bmN0aW9uKHJvb3QpeyAvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgXG52YXIgZnJlZUV4cG9ydHM9dHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0czsgLy8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWBcbnZhciBmcmVlTW9kdWxlPXR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmIG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTsgLy8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSxcbi8vIGFuZCB1c2UgaXQgYXMgYHJvb3RgXG52YXIgZnJlZUdsb2JhbD10eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtpZihmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCl7cm9vdCA9IGZyZWVHbG9iYWw7fSAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi92YXIgc3RyaW5nRnJvbUNoYXJDb2RlPVN0cmluZy5mcm9tQ2hhckNvZGU7IC8vIFRha2VuIGZyb20gaHR0cDovL210aHMuYmUvcHVueWNvZGVcbmZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKXt2YXIgb3V0cHV0PVtdO3ZhciBjb3VudGVyPTA7dmFyIGxlbmd0aD1zdHJpbmcubGVuZ3RoO3ZhciB2YWx1ZTt2YXIgZXh0cmE7d2hpbGUoY291bnRlciA8IGxlbmd0aCkge3ZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtpZih2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpeyAvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcbmV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtpZigoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCl7IC8vIGxvdyBzdXJyb2dhdGVcbm91dHB1dC5wdXNoKCgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7fWVsc2UgeyAvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuLy8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5vdXRwdXQucHVzaCh2YWx1ZSk7Y291bnRlci0tO319ZWxzZSB7b3V0cHV0LnB1c2godmFsdWUpO319cmV0dXJuIG91dHB1dDt9IC8vIFRha2VuIGZyb20gaHR0cDovL210aHMuYmUvcHVueWNvZGVcbmZ1bmN0aW9uIHVjczJlbmNvZGUoYXJyYXkpe3ZhciBsZW5ndGg9YXJyYXkubGVuZ3RoO3ZhciBpbmRleD0tMTt2YXIgdmFsdWU7dmFyIG91dHB1dD0nJzt3aGlsZSgrK2luZGV4IDwgbGVuZ3RoKSB7dmFsdWUgPSBhcnJheVtpbmRleF07aWYodmFsdWUgPiAweEZGRkYpe3ZhbHVlIC09IDB4MTAwMDA7b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO31vdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlKTt9cmV0dXJuIG91dHB1dDt9IC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL2Z1bmN0aW9uIGNyZWF0ZUJ5dGUoY29kZVBvaW50LHNoaWZ0KXtyZXR1cm4gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+PiBzaGlmdCAmIDB4M0YgfCAweDgwKTt9ZnVuY3Rpb24gZW5jb2RlQ29kZVBvaW50KGNvZGVQb2ludCl7aWYoKGNvZGVQb2ludCAmIDB4RkZGRkZGODApID09IDApeyAvLyAxLWJ5dGUgc2VxdWVuY2VcbnJldHVybiBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50KTt9dmFyIHN5bWJvbD0nJztpZigoY29kZVBvaW50ICYgMHhGRkZGRjgwMCkgPT0gMCl7IC8vIDItYnl0ZSBzZXF1ZW5jZVxuc3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+PiA2ICYgMHgxRiB8IDB4QzApO31lbHNlIGlmKChjb2RlUG9pbnQgJiAweEZGRkYwMDAwKSA9PSAwKXsgLy8gMy1ieXRlIHNlcXVlbmNlXG5zeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50ID4+IDEyICYgMHgwRiB8IDB4RTApO3N5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCw2KTt9ZWxzZSBpZigoY29kZVBvaW50ICYgMHhGRkUwMDAwMCkgPT0gMCl7IC8vIDQtYnl0ZSBzZXF1ZW5jZVxuc3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+PiAxOCAmIDB4MDcgfCAweEYwKTtzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsMTIpO3N5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCw2KTt9c3ltYm9sICs9IHN0cmluZ0Zyb21DaGFyQ29kZShjb2RlUG9pbnQgJiAweDNGIHwgMHg4MCk7cmV0dXJuIHN5bWJvbDt9ZnVuY3Rpb24gdXRmOGVuY29kZShzdHJpbmcpe3ZhciBjb2RlUG9pbnRzPXVjczJkZWNvZGUoc3RyaW5nKTsgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY29kZVBvaW50cy5tYXAoZnVuY3Rpb24oeCkge1xuLy8gXHRyZXR1cm4gJ1UrJyArIHgudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4vLyB9KSkpO1xudmFyIGxlbmd0aD1jb2RlUG9pbnRzLmxlbmd0aDt2YXIgaW5kZXg9LTE7dmFyIGNvZGVQb2ludDt2YXIgYnl0ZVN0cmluZz0nJzt3aGlsZSgrK2luZGV4IDwgbGVuZ3RoKSB7Y29kZVBvaW50ID0gY29kZVBvaW50c1tpbmRleF07Ynl0ZVN0cmluZyArPSBlbmNvZGVDb2RlUG9pbnQoY29kZVBvaW50KTt9cmV0dXJuIGJ5dGVTdHJpbmc7fSAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9mdW5jdGlvbiByZWFkQ29udGludWF0aW9uQnl0ZSgpe2lmKGJ5dGVJbmRleCA+PSBieXRlQ291bnQpe3Rocm93IEVycm9yKCdJbnZhbGlkIGJ5dGUgaW5kZXgnKTt9dmFyIGNvbnRpbnVhdGlvbkJ5dGU9Ynl0ZUFycmF5W2J5dGVJbmRleF0gJiAweEZGO2J5dGVJbmRleCsrO2lmKChjb250aW51YXRpb25CeXRlICYgMHhDMCkgPT0gMHg4MCl7cmV0dXJuIGNvbnRpbnVhdGlvbkJ5dGUgJiAweDNGO30gLy8gSWYgd2UgZW5kIHVwIGhlcmUsIGl077+977+9cyBub3QgYSBjb250aW51YXRpb24gYnl0ZVxudGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTt9ZnVuY3Rpb24gZGVjb2RlU3ltYm9sKCl7dmFyIGJ5dGUxO3ZhciBieXRlMjt2YXIgYnl0ZTM7dmFyIGJ5dGU0O3ZhciBjb2RlUG9pbnQ7aWYoYnl0ZUluZGV4ID4gYnl0ZUNvdW50KXt0aHJvdyBFcnJvcignSW52YWxpZCBieXRlIGluZGV4Jyk7fWlmKGJ5dGVJbmRleCA9PSBieXRlQ291bnQpe3JldHVybiBmYWxzZTt9IC8vIFJlYWQgZmlyc3QgYnl0ZVxuYnl0ZTEgPSBieXRlQXJyYXlbYnl0ZUluZGV4XSAmIDB4RkY7Ynl0ZUluZGV4Kys7IC8vIDEtYnl0ZSBzZXF1ZW5jZSAobm8gY29udGludWF0aW9uIGJ5dGVzKVxuaWYoKGJ5dGUxICYgMHg4MCkgPT0gMCl7cmV0dXJuIGJ5dGUxO30gLy8gMi1ieXRlIHNlcXVlbmNlXG5pZigoYnl0ZTEgJiAweEUwKSA9PSAweEMwKXt2YXIgYnl0ZTI9cmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtjb2RlUG9pbnQgPSAoYnl0ZTEgJiAweDFGKSA8PCA2IHwgYnl0ZTI7aWYoY29kZVBvaW50ID49IDB4ODApe3JldHVybiBjb2RlUG9pbnQ7fWVsc2Uge3Rocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7fX0gLy8gMy1ieXRlIHNlcXVlbmNlIChtYXkgaW5jbHVkZSB1bnBhaXJlZCBzdXJyb2dhdGVzKVxuaWYoKGJ5dGUxICYgMHhGMCkgPT0gMHhFMCl7Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO2J5dGUzID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtjb2RlUG9pbnQgPSAoYnl0ZTEgJiAweDBGKSA8PCAxMiB8IGJ5dGUyIDw8IDYgfCBieXRlMztpZihjb2RlUG9pbnQgPj0gMHgwODAwKXtyZXR1cm4gY29kZVBvaW50O31lbHNlIHt0aHJvdyBFcnJvcignSW52YWxpZCBjb250aW51YXRpb24gYnl0ZScpO319IC8vIDQtYnl0ZSBzZXF1ZW5jZVxuaWYoKGJ5dGUxICYgMHhGOCkgPT0gMHhGMCl7Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO2J5dGUzID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtieXRlNCA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7Y29kZVBvaW50ID0gKGJ5dGUxICYgMHgwRikgPDwgMHgxMiB8IGJ5dGUyIDw8IDB4MEMgfCBieXRlMyA8PCAweDA2IHwgYnl0ZTQ7aWYoY29kZVBvaW50ID49IDB4MDEwMDAwICYmIGNvZGVQb2ludCA8PSAweDEwRkZGRil7cmV0dXJuIGNvZGVQb2ludDt9fXRocm93IEVycm9yKCdJbnZhbGlkIFVURi04IGRldGVjdGVkJyk7fXZhciBieXRlQXJyYXk7dmFyIGJ5dGVDb3VudDt2YXIgYnl0ZUluZGV4O2Z1bmN0aW9uIHV0ZjhkZWNvZGUoYnl0ZVN0cmluZyl7Ynl0ZUFycmF5ID0gdWNzMmRlY29kZShieXRlU3RyaW5nKTtieXRlQ291bnQgPSBieXRlQXJyYXkubGVuZ3RoO2J5dGVJbmRleCA9IDA7dmFyIGNvZGVQb2ludHM9W107dmFyIHRtcDt3aGlsZSgodG1wID0gZGVjb2RlU3ltYm9sKCkpICE9PSBmYWxzZSkge2NvZGVQb2ludHMucHVzaCh0bXApO31yZXR1cm4gdWNzMmVuY29kZShjb2RlUG9pbnRzKTt9IC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL3ZhciB1dGY4PXsndmVyc2lvbic6JzIuMC4wJywnZW5jb2RlJzp1dGY4ZW5jb2RlLCdkZWNvZGUnOnV0ZjhkZWNvZGV9OyAvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcbi8vIGxpa2UgdGhlIGZvbGxvd2luZzpcbmlmKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKXtkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gdXRmODt9KTt9ZWxzZSBpZihmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpe2lmKGZyZWVNb2R1bGUpeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuZnJlZU1vZHVsZS5leHBvcnRzID0gdXRmODt9ZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG52YXIgb2JqZWN0PXt9O3ZhciBoYXNPd25Qcm9wZXJ0eT1vYmplY3QuaGFzT3duUHJvcGVydHk7Zm9yKHZhciBrZXkgaW4gdXRmOCkge2hhc093blByb3BlcnR5LmNhbGwodXRmOCxrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gdXRmOFtrZXldKTt9fX1lbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3Nlclxucm9vdC51dGY4ID0gdXRmODt9fSkodGhpcyk7fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6e30pO30se31dLDM0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyoqXG4gICAgICAgICAgICogSlNPTiBwYXJzZS5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBzZWUgQmFzZWQgb24galF1ZXJ5I3BhcnNlSlNPTiAoTUlUKSBhbmQgSlNPTjJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICAgKi92YXIgcnZhbGlkY2hhcnM9L15bXFxdLDp7fVxcc10qJC87dmFyIHJ2YWxpZGVzY2FwZT0vXFxcXCg/OltcIlxcXFxcXC9iZm5ydF18dVswLTlhLWZBLUZdezR9KS9nO3ZhciBydmFsaWR0b2tlbnM9L1wiW15cIlxcXFxcXG5cXHJdKlwifHRydWV8ZmFsc2V8bnVsbHwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPy9nO3ZhciBydmFsaWRicmFjZXM9Lyg/Ol58OnwsKSg/OlxccypcXFspKy9nO3ZhciBydHJpbUxlZnQ9L15cXHMrLzt2YXIgcnRyaW1SaWdodD0vXFxzKyQvO21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2Vqc29uKGRhdGEpe2lmKCdzdHJpbmcnICE9IHR5cGVvZiBkYXRhIHx8ICFkYXRhKXtyZXR1cm4gbnVsbDt9ZGF0YSA9IGRhdGEucmVwbGFjZShydHJpbUxlZnQsJycpLnJlcGxhY2UocnRyaW1SaWdodCwnJyk7IC8vIEF0dGVtcHQgdG8gcGFyc2UgdXNpbmcgdGhlIG5hdGl2ZSBKU09OIHBhcnNlciBmaXJzdFxuaWYoZ2xvYmFsLkpTT04gJiYgSlNPTi5wYXJzZSl7cmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7fWlmKHJ2YWxpZGNoYXJzLnRlc3QoZGF0YS5yZXBsYWNlKHJ2YWxpZGVzY2FwZSwnQCcpLnJlcGxhY2UocnZhbGlkdG9rZW5zLCddJykucmVwbGFjZShydmFsaWRicmFjZXMsJycpKSl7cmV0dXJuIG5ldyBGdW5jdGlvbigncmV0dXJuICcgKyBkYXRhKSgpO319O30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93Ont9KTt9LHt9XSwzNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICAgICAgICAgKiBDb21waWxlcyBhIHF1ZXJ5c3RyaW5nXG4gICAgICAgICAqIFJldHVybnMgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBvYmplY3RcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9XG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKG9iail7dmFyIHN0cj0nJztmb3IodmFyIGkgaW4gb2JqKSB7aWYob2JqLmhhc093blByb3BlcnR5KGkpKXtpZihzdHIubGVuZ3RoKXN0ciArPSAnJic7c3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pO319cmV0dXJuIHN0cjt9OyAvKipcbiAgICAgICAgICogUGFyc2VzIGEgc2ltcGxlIHF1ZXJ5c3RyaW5nIGludG8gYW4gb2JqZWN0XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBxc1xuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbihxcyl7dmFyIHFyeT17fTt2YXIgcGFpcnM9cXMuc3BsaXQoJyYnKTtmb3IodmFyIGk9MCxsPXBhaXJzLmxlbmd0aDtpIDwgbDtpKyspIHt2YXIgcGFpcj1wYWlyc1tpXS5zcGxpdCgnPScpO3FyeVtkZWNvZGVVUklDb21wb25lbnQocGFpclswXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO31yZXR1cm4gcXJ5O307fSx7fV0sMzY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAgICAgICAgICogUGFyc2VzIGFuIFVSSVxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi92YXIgcmU9L14oPzooPyFbXjpAXSs6W146QFxcL10qQCkoaHR0cHxodHRwc3x3c3x3c3MpOlxcL1xcLyk/KCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oKD86W2EtZjAtOV17MCw0fTopezIsN31bYS1mMC05XXswLDR9fFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS87dmFyIHBhcnRzPVsnc291cmNlJywncHJvdG9jb2wnLCdhdXRob3JpdHknLCd1c2VySW5mbycsJ3VzZXInLCdwYXNzd29yZCcsJ2hvc3QnLCdwb3J0JywncmVsYXRpdmUnLCdwYXRoJywnZGlyZWN0b3J5JywnZmlsZScsJ3F1ZXJ5JywnYW5jaG9yJ107bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZXVyaShzdHIpe3ZhciBzcmM9c3RyLGI9c3RyLmluZGV4T2YoJ1snKSxlPXN0ci5pbmRleE9mKCddJyk7aWYoYiAhPSAtMSAmJiBlICE9IC0xKXtzdHIgPSBzdHIuc3Vic3RyaW5nKDAsYikgKyBzdHIuc3Vic3RyaW5nKGIsZSkucmVwbGFjZSgvOi9nLCc7JykgKyBzdHIuc3Vic3RyaW5nKGUsc3RyLmxlbmd0aCk7fXZhciBtPXJlLmV4ZWMoc3RyIHx8ICcnKSx1cmk9e30saT0xNDt3aGlsZShpLS0pIHt1cmlbcGFydHNbaV1dID0gbVtpXSB8fCAnJzt9aWYoYiAhPSAtMSAmJiBlICE9IC0xKXt1cmkuc291cmNlID0gc3JjO3VyaS5ob3N0ID0gdXJpLmhvc3Quc3Vic3RyaW5nKDEsdXJpLmhvc3QubGVuZ3RoIC0gMSkucmVwbGFjZSgvOy9nLCc6Jyk7dXJpLmF1dGhvcml0eSA9IHVyaS5hdXRob3JpdHkucmVwbGFjZSgnWycsJycpLnJlcGxhY2UoJ10nLCcnKS5yZXBsYWNlKC87L2csJzonKTt1cmkuaXB2NnVyaSA9IHRydWU7fXJldHVybiB1cmk7fTt9LHt9XSwzNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICAgICAgICAgKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICAgICAgICAgKi92YXIgZ2xvYmFsPShmdW5jdGlvbigpe3JldHVybiB0aGlzO30pKCk7IC8qKlxuICAgICAgICAgKiBXZWJTb2NrZXQgY29uc3RydWN0b3IuXG4gICAgICAgICAqL3ZhciBXZWJTb2NrZXQ9V2luZG93LldlYlNvY2tldCB8fCBXaW5kb3cuTW96V2ViU29ja2V0OyAvKipcbiAgICAgICAgICogTW9kdWxlIGV4cG9ydHMuXG4gICAgICAgICAqL21vZHVsZS5leHBvcnRzID0gV2ViU29ja2V0P3dzOm51bGw7IC8qKlxuICAgICAgICAgKiBXZWJTb2NrZXQgY29uc3RydWN0b3IuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSB0aGlyZCBgb3B0c2Agb3B0aW9ucyBvYmplY3QgZ2V0cyBpZ25vcmVkIGluIHdlYiBicm93c2Vycywgc2luY2UgaXQnc1xuICAgICAgICAgKiBub24tc3RhbmRhcmQsIGFuZCB0aHJvd3MgYSBUeXBlRXJyb3IgaWYgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZWluYXJvcy93cy9pc3N1ZXMvMjI3XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmlcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gcHJvdG9jb2xzIChvcHRpb25hbClcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3QpIG9wdHMgKG9wdGlvbmFsKVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9mdW5jdGlvbiB3cyh1cmkscHJvdG9jb2xzLG9wdHMpe3ZhciBpbnN0YW5jZTtpZihwcm90b2NvbHMpe2luc3RhbmNlID0gbmV3IFdlYlNvY2tldCh1cmkscHJvdG9jb2xzKTt9ZWxzZSB7aW5zdGFuY2UgPSBuZXcgV2ViU29ja2V0KHVyaSk7fXJldHVybiBpbnN0YW5jZTt9aWYoV2ViU29ja2V0KXdzLnByb3RvdHlwZSA9IFdlYlNvY2tldC5wcm90b3R5cGU7fSx7fV0sMzg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKlxuICAgICAgICAgICAqIE1vZHVsZSByZXF1aXJlbWVudHMuXG4gICAgICAgICAgICovdmFyIGlzQXJyYXk9X2RlcmVxXygnaXNhcnJheScpOyAvKipcbiAgICAgICAgICAgKiBNb2R1bGUgZXhwb3J0cy5cbiAgICAgICAgICAgKi9tb2R1bGUuZXhwb3J0cyA9IGhhc0JpbmFyeTsgLyoqXG4gICAgICAgICAgICogQ2hlY2tzIGZvciBiaW5hcnkgZGF0YS5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFJpZ2h0IG5vdyBvbmx5IEJ1ZmZlciBhbmQgQXJyYXlCdWZmZXIgYXJlIHN1cHBvcnRlZC4uXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYW55dGhpbmdcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgICAqL2Z1bmN0aW9uIGhhc0JpbmFyeShkYXRhKXtmdW5jdGlvbiBfaGFzQmluYXJ5KG9iail7aWYoIW9iailyZXR1cm4gZmFsc2U7aWYoZ2xvYmFsLkJ1ZmZlciAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKG9iaikgfHwgZ2xvYmFsLkFycmF5QnVmZmVyICYmIG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGdsb2JhbC5CbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IgfHwgZ2xvYmFsLkZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSl7cmV0dXJuIHRydWU7fWlmKGlzQXJyYXkob2JqKSl7Zm9yKHZhciBpPTA7aSA8IG9iai5sZW5ndGg7aSsrKSB7aWYoX2hhc0JpbmFyeShvYmpbaV0pKXtyZXR1cm4gdHJ1ZTt9fX1lbHNlIGlmKG9iaiAmJiAnb2JqZWN0JyA9PSB0eXBlb2Ygb2JqKXtpZihvYmoudG9KU09OKXtvYmogPSBvYmoudG9KU09OKCk7fWZvcih2YXIga2V5IGluIG9iaikge2lmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosa2V5KSAmJiBfaGFzQmluYXJ5KG9ialtrZXldKSl7cmV0dXJuIHRydWU7fX19cmV0dXJuIGZhbHNlO31yZXR1cm4gX2hhc0JpbmFyeShkYXRhKTt9fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6e30pO30se1wiaXNhcnJheVwiOjM5fV0sMzk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe21vZHVsZS5leHBvcnRzID0gX2RlcmVxXygzMik7fSx7fV0sNDA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAgICAgICAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAgICAgICAgICovdmFyIGdsb2JhbD1fZGVyZXFfKCdnbG9iYWwnKTsgLyoqXG4gICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBMb2dpYyBib3Jyb3dlZCBmcm9tIE1vZGVybml6cjpcbiAgICAgICAgICpcbiAgICAgICAgICogICAtIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy9jb3JzLmpzXG4gICAgICAgICAqL3RyeXttb2R1bGUuZXhwb3J0cyA9ICdYTUxIdHRwUmVxdWVzdCcgaW4gZ2xvYmFsICYmICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBnbG9iYWwuWE1MSHR0cFJlcXVlc3QoKTt9Y2F0Y2goZXJyKSB7IC8vIGlmIFhNTEh0dHAgc3VwcG9ydCBpcyBkaXNhYmxlZCBpbiBJRSB0aGVuIGl0IHdpbGwgdGhyb3dcbi8vIHdoZW4gdHJ5aW5nIHRvIGNyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmYWxzZTt9fSx7XCJnbG9iYWxcIjo0MX1dLDQxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXG4gICAgICAgICAqIFJldHVybnMgYHRoaXNgLiBFeGVjdXRlIHRoaXMgd2l0aG91dCBhIFwiY29udGV4dFwiIChpLmUuIHdpdGhvdXQgaXQgYmVpbmdcbiAgICAgICAgICogYXR0YWNoZWQgdG8gYW4gb2JqZWN0IG9mIHRoZSBsZWZ0LWhhbmQgc2lkZSksIGFuZCBgdGhpc2AgcG9pbnRzIHRvIHRoZVxuICAgICAgICAgKiBcImdsb2JhbFwiIHNjb3BlIG9mIHRoZSBjdXJyZW50IEpTIGV4ZWN1dGlvbi5cbiAgICAgICAgICovbW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKXtyZXR1cm4gdGhpczt9KSgpO30se31dLDQyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXt2YXIgaW5kZXhPZj1bXS5pbmRleE9mO21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyLG9iail7aWYoaW5kZXhPZilyZXR1cm4gYXJyLmluZGV4T2Yob2JqKTtmb3IodmFyIGk9MDtpIDwgYXJyLmxlbmd0aDsrK2kpIHtpZihhcnJbaV0gPT09IG9iailyZXR1cm4gaTt9cmV0dXJuIC0xO307fSx7fV0sNDM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAgICAgICAgICogSE9QIHJlZi5cbiAgICAgICAgICovdmFyIGhhcz1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5OyAvKipcbiAgICAgICAgICogUmV0dXJuIG93biBrZXlzIGluIGBvYmpgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9leHBvcnRzLmtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbihvYmope3ZhciBrZXlzPVtdO2Zvcih2YXIga2V5IGluIG9iaikge2lmKGhhcy5jYWxsKG9iaixrZXkpKXtrZXlzLnB1c2goa2V5KTt9fXJldHVybiBrZXlzO307IC8qKlxuICAgICAgICAgKiBSZXR1cm4gb3duIHZhbHVlcyBpbiBgb2JqYC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZXhwb3J0cy52YWx1ZXMgPSBmdW5jdGlvbihvYmope3ZhciB2YWxzPVtdO2Zvcih2YXIga2V5IGluIG9iaikge2lmKGhhcy5jYWxsKG9iaixrZXkpKXt2YWxzLnB1c2gob2JqW2tleV0pO319cmV0dXJuIHZhbHM7fTsgLyoqXG4gICAgICAgICAqIE1lcmdlIGBiYCBpbnRvIGBhYC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGFcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBhXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL2V4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbihhLGIpe2Zvcih2YXIga2V5IGluIGIpIHtpZihoYXMuY2FsbChiLGtleSkpe2Fba2V5XSA9IGJba2V5XTt9fXJldHVybiBhO307IC8qKlxuICAgICAgICAgKiBSZXR1cm4gbGVuZ3RoIG9mIGBvYmpgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAgICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZXhwb3J0cy5sZW5ndGggPSBmdW5jdGlvbihvYmope3JldHVybiBleHBvcnRzLmtleXMob2JqKS5sZW5ndGg7fTsgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIGBvYmpgIGlzIGVtcHR5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL2V4cG9ydHMuaXNFbXB0eSA9IGZ1bmN0aW9uKG9iail7cmV0dXJuIDAgPT0gZXhwb3J0cy5sZW5ndGgob2JqKTt9O30se31dLDQ0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXG4gICAgICAgICAqIFBhcnNlcyBhbiBVUklcbiAgICAgICAgICpcbiAgICAgICAgICogQGF1dGhvciBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT4gKE1JVCBsaWNlbnNlKVxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovdmFyIHJlPS9eKD86KD8hW146QF0rOlteOkBcXC9dKkApKGh0dHB8aHR0cHN8d3N8d3NzKTpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KCg/OlthLWYwLTldezAsNH06KXsyLDd9W2EtZjAtOV17MCw0fXxbXjpcXC8/I10qKSg/OjooXFxkKikpPykoKChcXC8oPzpbXj8jXSg/IVtePyNcXC9dKlxcLltePyNcXC8uXSsoPzpbPyNdfCQpKSkqXFwvPyk/KFtePyNcXC9dKikpKD86XFw/KFteI10qKSk/KD86IyguKikpPykvO3ZhciBwYXJ0cz1bJ3NvdXJjZScsJ3Byb3RvY29sJywnYXV0aG9yaXR5JywndXNlckluZm8nLCd1c2VyJywncGFzc3dvcmQnLCdob3N0JywncG9ydCcsJ3JlbGF0aXZlJywncGF0aCcsJ2RpcmVjdG9yeScsJ2ZpbGUnLCdxdWVyeScsJ2FuY2hvciddO21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2V1cmkoc3RyKXt2YXIgbT1yZS5leGVjKHN0ciB8fCAnJyksdXJpPXt9LGk9MTQ7d2hpbGUoaS0tKSB7dXJpW3BhcnRzW2ldXSA9IG1baV0gfHwgJyc7fXJldHVybiB1cmk7fTt9LHt9XSw0NTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qZ2xvYmFsIEJsb2IsRmlsZSovIC8qKlxuICAgICAgICAgICAqIE1vZHVsZSByZXF1aXJlbWVudHNcbiAgICAgICAgICAgKi92YXIgaXNBcnJheT1fZGVyZXFfKCdpc2FycmF5Jyk7dmFyIGlzQnVmPV9kZXJlcV8oJy4vaXMtYnVmZmVyJyk7IC8qKlxuICAgICAgICAgICAqIFJlcGxhY2VzIGV2ZXJ5IEJ1ZmZlciB8IEFycmF5QnVmZmVyIGluIHBhY2tldCB3aXRoIGEgbnVtYmVyZWQgcGxhY2Vob2xkZXIuXG4gICAgICAgICAgICogQW55dGhpbmcgd2l0aCBibG9icyBvciBmaWxlcyBzaG91bGQgYmUgZmVkIHRocm91Z2ggcmVtb3ZlQmxvYnMgYmVmb3JlIGNvbWluZ1xuICAgICAgICAgICAqIGhlcmUuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gc29ja2V0LmlvIGV2ZW50IHBhY2tldFxuICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBkZWNvbnN0cnVjdGVkIHBhY2tldCBhbmQgbGlzdCBvZiBidWZmZXJzXG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICAgKi9leHBvcnRzLmRlY29uc3RydWN0UGFja2V0ID0gZnVuY3Rpb24ocGFja2V0KXt2YXIgYnVmZmVycz1bXTt2YXIgcGFja2V0RGF0YT1wYWNrZXQuZGF0YTtmdW5jdGlvbiBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YSl7aWYoIWRhdGEpcmV0dXJuIGRhdGE7aWYoaXNCdWYoZGF0YSkpe3ZhciBwbGFjZWhvbGRlcj17X3BsYWNlaG9sZGVyOnRydWUsbnVtOmJ1ZmZlcnMubGVuZ3RofTtidWZmZXJzLnB1c2goZGF0YSk7cmV0dXJuIHBsYWNlaG9sZGVyO31lbHNlIGlmKGlzQXJyYXkoZGF0YSkpe3ZhciBuZXdEYXRhPW5ldyBBcnJheShkYXRhLmxlbmd0aCk7Zm9yKHZhciBpPTA7aSA8IGRhdGEubGVuZ3RoO2krKykge25ld0RhdGFbaV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSk7fXJldHVybiBuZXdEYXRhO31lbHNlIGlmKCdvYmplY3QnID09IHR5cGVvZiBkYXRhICYmICEoZGF0YSBpbnN0YW5jZW9mIERhdGUpKXt2YXIgbmV3RGF0YT17fTtmb3IodmFyIGtleSBpbiBkYXRhKSB7bmV3RGF0YVtrZXldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSk7fXJldHVybiBuZXdEYXRhO31yZXR1cm4gZGF0YTt9dmFyIHBhY2s9cGFja2V0O3BhY2suZGF0YSA9IF9kZWNvbnN0cnVjdFBhY2tldChwYWNrZXREYXRhKTtwYWNrLmF0dGFjaG1lbnRzID0gYnVmZmVycy5sZW5ndGg7IC8vIG51bWJlciBvZiBiaW5hcnkgJ2F0dGFjaG1lbnRzJ1xucmV0dXJuIHtwYWNrZXQ6cGFjayxidWZmZXJzOmJ1ZmZlcnN9O307IC8qKlxuICAgICAgICAgICAqIFJlY29uc3RydWN0cyBhIGJpbmFyeSBwYWNrZXQgZnJvbSBpdHMgcGxhY2Vob2xkZXIgcGFja2V0IGFuZCBidWZmZXJzXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gZXZlbnQgcGFja2V0IHdpdGggcGxhY2Vob2xkZXJzXG4gICAgICAgICAgICogQHBhcmFtIHtBcnJheX0gYnVmZmVycyAtIGJpbmFyeSBidWZmZXJzIHRvIHB1dCBpbiBwbGFjZWhvbGRlciBwb3NpdGlvbnNcbiAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHJlY29uc3RydWN0ZWQgcGFja2V0XG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICAgKi9leHBvcnRzLnJlY29uc3RydWN0UGFja2V0ID0gZnVuY3Rpb24ocGFja2V0LGJ1ZmZlcnMpe3ZhciBjdXJQbGFjZUhvbGRlcj0wO2Z1bmN0aW9uIF9yZWNvbnN0cnVjdFBhY2tldChkYXRhKXtpZihkYXRhICYmIGRhdGEuX3BsYWNlaG9sZGVyKXt2YXIgYnVmPWJ1ZmZlcnNbZGF0YS5udW1dOyAvLyBhcHByb3ByaWF0ZSBidWZmZXIgKHNob3VsZCBiZSBuYXR1cmFsIG9yZGVyIGFueXdheSlcbnJldHVybiBidWY7fWVsc2UgaWYoaXNBcnJheShkYXRhKSl7Zm9yKHZhciBpPTA7aSA8IGRhdGEubGVuZ3RoO2krKykge2RhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSk7fXJldHVybiBkYXRhO31lbHNlIGlmKGRhdGEgJiYgJ29iamVjdCcgPT0gdHlwZW9mIGRhdGEpe2Zvcih2YXIga2V5IGluIGRhdGEpIHtkYXRhW2tleV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldKTt9cmV0dXJuIGRhdGE7fXJldHVybiBkYXRhO31wYWNrZXQuZGF0YSA9IF9yZWNvbnN0cnVjdFBhY2tldChwYWNrZXQuZGF0YSk7cGFja2V0LmF0dGFjaG1lbnRzID0gdW5kZWZpbmVkOyAvLyBubyBsb25nZXIgdXNlZnVsXG5yZXR1cm4gcGFja2V0O307IC8qKlxuICAgICAgICAgICAqIEFzeW5jaHJvbm91c2x5IHJlbW92ZXMgQmxvYnMgb3IgRmlsZXMgZnJvbSBkYXRhIHZpYVxuICAgICAgICAgICAqIEZpbGVSZWFkZXIncyByZWFkQXNBcnJheUJ1ZmZlciBtZXRob2QuIFVzZWQgYmVmb3JlIGVuY29kaW5nXG4gICAgICAgICAgICogZGF0YSBhcyBtc2dwYWNrLiBDYWxscyBjYWxsYmFjayB3aXRoIHRoZSBibG9ibGVzcyBkYXRhLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL2V4cG9ydHMucmVtb3ZlQmxvYnMgPSBmdW5jdGlvbihkYXRhLGNhbGxiYWNrKXtmdW5jdGlvbiBfcmVtb3ZlQmxvYnMob2JqLGN1cktleSxjb250YWluaW5nT2JqZWN0KXtpZighb2JqKXJldHVybiBvYmo7IC8vIGNvbnZlcnQgYW55IGJsb2JcbmlmKGdsb2JhbC5CbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IgfHwgZ2xvYmFsLkZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSl7cGVuZGluZ0Jsb2JzKys7IC8vIGFzeW5jIGZpbGVyZWFkZXJcbnZhciBmaWxlUmVhZGVyPW5ldyBGaWxlUmVhZGVyKCk7ZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpeyAvLyB0aGlzLnJlc3VsdCA9PSBhcnJheWJ1ZmZlclxuaWYoY29udGFpbmluZ09iamVjdCl7Y29udGFpbmluZ09iamVjdFtjdXJLZXldID0gdGhpcy5yZXN1bHQ7fWVsc2Uge2Jsb2JsZXNzRGF0YSA9IHRoaXMucmVzdWx0O30gLy8gaWYgbm90aGluZyBwZW5kaW5nIGl0cyBjYWxsYmFjayB0aW1lXG5pZighIC0tcGVuZGluZ0Jsb2JzKXtjYWxsYmFjayhibG9ibGVzc0RhdGEpO319O2ZpbGVSZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIob2JqKTsgLy8gYmxvYiAtPiBhcnJheWJ1ZmZlclxufWVsc2UgaWYoaXNBcnJheShvYmopKXsgLy8gaGFuZGxlIGFycmF5XG5mb3IodmFyIGk9MDtpIDwgb2JqLmxlbmd0aDtpKyspIHtfcmVtb3ZlQmxvYnMob2JqW2ldLGksb2JqKTt9fWVsc2UgaWYob2JqICYmICdvYmplY3QnID09IHR5cGVvZiBvYmogJiYgIWlzQnVmKG9iaikpeyAvLyBhbmQgb2JqZWN0XG5mb3IodmFyIGtleSBpbiBvYmopIHtfcmVtb3ZlQmxvYnMob2JqW2tleV0sa2V5LG9iaik7fX19dmFyIHBlbmRpbmdCbG9icz0wO3ZhciBibG9ibGVzc0RhdGE9ZGF0YTtfcmVtb3ZlQmxvYnMoYmxvYmxlc3NEYXRhKTtpZighcGVuZGluZ0Jsb2JzKXtjYWxsYmFjayhibG9ibGVzc0RhdGEpO319O30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93Ont9KTt9LHtcIi4vaXMtYnVmZmVyXCI6NDcsXCJpc2FycmF5XCI6NDh9XSw0NjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICAgICAgICAgKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICAgICAgICAgKi92YXIgZGVidWc9X2RlcmVxXygnZGVidWcnKSgnc29ja2V0LmlvLXBhcnNlcicpO3ZhciBqc29uPV9kZXJlcV8oJ2pzb24zJyk7dmFyIGlzQXJyYXk9X2RlcmVxXygnaXNhcnJheScpO3ZhciBFbWl0dGVyPV9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7dmFyIGJpbmFyeT1fZGVyZXFfKCcuL2JpbmFyeScpO3ZhciBpc0J1Zj1fZGVyZXFfKCcuL2lzLWJ1ZmZlcicpOyAvKipcbiAgICAgICAgICogUHJvdG9jb2wgdmVyc2lvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZXhwb3J0cy5wcm90b2NvbCA9IDQ7IC8qKlxuICAgICAgICAgKiBQYWNrZXQgdHlwZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL2V4cG9ydHMudHlwZXMgPSBbJ0NPTk5FQ1QnLCdESVNDT05ORUNUJywnRVZFTlQnLCdCSU5BUllfRVZFTlQnLCdBQ0snLCdCSU5BUllfQUNLJywnRVJST1InXTsgLyoqXG4gICAgICAgICAqIFBhY2tldCB0eXBlIGBjb25uZWN0YC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZXhwb3J0cy5DT05ORUNUID0gMDsgLyoqXG4gICAgICAgICAqIFBhY2tldCB0eXBlIGBkaXNjb25uZWN0YC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZXhwb3J0cy5ESVNDT05ORUNUID0gMTsgLyoqXG4gICAgICAgICAqIFBhY2tldCB0eXBlIGBldmVudGAuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL2V4cG9ydHMuRVZFTlQgPSAyOyAvKipcbiAgICAgICAgICogUGFja2V0IHR5cGUgYGFja2AuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL2V4cG9ydHMuQUNLID0gMzsgLyoqXG4gICAgICAgICAqIFBhY2tldCB0eXBlIGBlcnJvcmAuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL2V4cG9ydHMuRVJST1IgPSA0OyAvKipcbiAgICAgICAgICogUGFja2V0IHR5cGUgJ2JpbmFyeSBldmVudCdcbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZXhwb3J0cy5CSU5BUllfRVZFTlQgPSA1OyAvKipcbiAgICAgICAgICogUGFja2V0IHR5cGUgYGJpbmFyeSBhY2tgLiBGb3IgYWNrcyB3aXRoIGJpbmFyeSBhcmd1bWVudHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL2V4cG9ydHMuQklOQVJZX0FDSyA9IDY7IC8qKlxuICAgICAgICAgKiBFbmNvZGVyIGNvbnN0cnVjdG9yLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9leHBvcnRzLkVuY29kZXIgPSBFbmNvZGVyOyAvKipcbiAgICAgICAgICogRGVjb2RlciBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZXhwb3J0cy5EZWNvZGVyID0gRGVjb2RlcjsgLyoqXG4gICAgICAgICAqIEEgc29ja2V0LmlvIEVuY29kZXIgaW5zdGFuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZnVuY3Rpb24gRW5jb2Rlcigpe30gLyoqXG4gICAgICAgICAqIEVuY29kZSBhIHBhY2tldCBhcyBhIHNpbmdsZSBzdHJpbmcgaWYgbm9uLWJpbmFyeSwgb3IgYXMgYVxuICAgICAgICAgKiBidWZmZXIgc2VxdWVuY2UsIGRlcGVuZGluZyBvbiBwYWNrZXQgdHlwZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIHBhY2tldCBvYmplY3RcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBoYW5kbGUgZW5jb2RpbmdzIChsaWtlbHkgZW5naW5lLndyaXRlKVxuICAgICAgICAgKiBAcmV0dXJuIENhbGxzIGNhbGxiYWNrIHdpdGggQXJyYXkgb2YgZW5jb2RpbmdzXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL0VuY29kZXIucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uKG9iaixjYWxsYmFjayl7ZGVidWcoJ2VuY29kaW5nIHBhY2tldCAlaicsb2JqKTtpZihleHBvcnRzLkJJTkFSWV9FVkVOVCA9PSBvYmoudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT0gb2JqLnR5cGUpe2VuY29kZUFzQmluYXJ5KG9iaixjYWxsYmFjayk7fWVsc2Uge3ZhciBlbmNvZGluZz1lbmNvZGVBc1N0cmluZyhvYmopO2NhbGxiYWNrKFtlbmNvZGluZ10pO319OyAvKipcbiAgICAgICAgICogRW5jb2RlIHBhY2tldCBhcyBzdHJpbmcuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSBlbmNvZGVkXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9mdW5jdGlvbiBlbmNvZGVBc1N0cmluZyhvYmope3ZhciBzdHI9Jyc7dmFyIG5zcD1mYWxzZTsgLy8gZmlyc3QgaXMgdHlwZVxuc3RyICs9IG9iai50eXBlOyAvLyBhdHRhY2htZW50cyBpZiB3ZSBoYXZlIHRoZW1cbmlmKGV4cG9ydHMuQklOQVJZX0VWRU5UID09IG9iai50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PSBvYmoudHlwZSl7c3RyICs9IG9iai5hdHRhY2htZW50cztzdHIgKz0gJy0nO30gLy8gaWYgd2UgaGF2ZSBhIG5hbWVzcGFjZSBvdGhlciB0aGFuIGAvYFxuLy8gd2UgYXBwZW5kIGl0IGZvbGxvd2VkIGJ5IGEgY29tbWEgYCxgXG5pZihvYmoubnNwICYmICcvJyAhPSBvYmoubnNwKXtuc3AgPSB0cnVlO3N0ciArPSBvYmoubnNwO30gLy8gaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgdGhlIGlkXG5pZihudWxsICE9IG9iai5pZCl7aWYobnNwKXtzdHIgKz0gJywnO25zcCA9IGZhbHNlO31zdHIgKz0gb2JqLmlkO30gLy8ganNvbiBkYXRhXG5pZihudWxsICE9IG9iai5kYXRhKXtpZihuc3Apc3RyICs9ICcsJztzdHIgKz0ganNvbi5zdHJpbmdpZnkob2JqLmRhdGEpO31kZWJ1ZygnZW5jb2RlZCAlaiBhcyAlcycsb2JqLHN0cik7cmV0dXJuIHN0cjt9IC8qKlxuICAgICAgICAgKiBFbmNvZGUgcGFja2V0IGFzICdidWZmZXIgc2VxdWVuY2UnIGJ5IHJlbW92aW5nIGJsb2JzLCBhbmRcbiAgICAgICAgICogZGVjb25zdHJ1Y3RpbmcgcGFja2V0IGludG8gb2JqZWN0IHdpdGggcGxhY2Vob2xkZXJzIGFuZFxuICAgICAgICAgKiBhIGxpc3Qgb2YgYnVmZmVycy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICAgICAgICAgKiBAcmV0dXJuIHtCdWZmZXJ9IGVuY29kZWRcbiAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAqL2Z1bmN0aW9uIGVuY29kZUFzQmluYXJ5KG9iaixjYWxsYmFjayl7ZnVuY3Rpb24gd3JpdGVFbmNvZGluZyhibG9ibGVzc0RhdGEpe3ZhciBkZWNvbnN0cnVjdGlvbj1iaW5hcnkuZGVjb25zdHJ1Y3RQYWNrZXQoYmxvYmxlc3NEYXRhKTt2YXIgcGFjaz1lbmNvZGVBc1N0cmluZyhkZWNvbnN0cnVjdGlvbi5wYWNrZXQpO3ZhciBidWZmZXJzPWRlY29uc3RydWN0aW9uLmJ1ZmZlcnM7YnVmZmVycy51bnNoaWZ0KHBhY2spOyAvLyBhZGQgcGFja2V0IGluZm8gdG8gYmVnaW5uaW5nIG9mIGRhdGEgbGlzdFxuY2FsbGJhY2soYnVmZmVycyk7IC8vIHdyaXRlIGFsbCB0aGUgYnVmZmVyc1xufWJpbmFyeS5yZW1vdmVCbG9icyhvYmosd3JpdGVFbmNvZGluZyk7fSAvKipcbiAgICAgICAgICogQSBzb2NrZXQuaW8gRGVjb2RlciBpbnN0YW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZXJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovZnVuY3Rpb24gRGVjb2Rlcigpe3RoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7fSAvKipcbiAgICAgICAgICogTWl4IGluIGBFbWl0dGVyYCB3aXRoIERlY29kZXIuXG4gICAgICAgICAqL0VtaXR0ZXIoRGVjb2Rlci5wcm90b3R5cGUpOyAvKipcbiAgICAgICAgICogRGVjb2RlcyBhbiBlY29kZWQgcGFja2V0IHN0cmluZyBpbnRvIHBhY2tldCBKU09OLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2JqIC0gZW5jb2RlZCBwYWNrZXRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovRGVjb2Rlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24ob2JqKXt2YXIgcGFja2V0O2lmKCdzdHJpbmcnID09IHR5cGVvZiBvYmope3BhY2tldCA9IGRlY29kZVN0cmluZyhvYmopO2lmKGV4cG9ydHMuQklOQVJZX0VWRU5UID09IHBhY2tldC50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PSBwYWNrZXQudHlwZSl7IC8vIGJpbmFyeSBwYWNrZXQncyBqc29uXG50aGlzLnJlY29uc3RydWN0b3IgPSBuZXcgQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpOyAvLyBubyBhdHRhY2htZW50cywgbGFiZWxlZCBiaW5hcnkgYnV0IG5vIGJpbmFyeSBkYXRhIHRvIGZvbGxvd1xuaWYodGhpcy5yZWNvbnN0cnVjdG9yLnJlY29uUGFjay5hdHRhY2htZW50cyA9PT0gMCl7dGhpcy5lbWl0KCdkZWNvZGVkJyxwYWNrZXQpO319ZWxzZSB7IC8vIG5vbi1iaW5hcnkgZnVsbCBwYWNrZXRcbnRoaXMuZW1pdCgnZGVjb2RlZCcscGFja2V0KTt9fWVsc2UgaWYoaXNCdWYob2JqKSB8fCBvYmouYmFzZTY0KXsgLy8gcmF3IGJpbmFyeSBkYXRhXG5pZighdGhpcy5yZWNvbnN0cnVjdG9yKXt0aHJvdyBuZXcgRXJyb3IoJ2dvdCBiaW5hcnkgZGF0YSB3aGVuIG5vdCByZWNvbnN0cnVjdGluZyBhIHBhY2tldCcpO31lbHNlIHtwYWNrZXQgPSB0aGlzLnJlY29uc3RydWN0b3IudGFrZUJpbmFyeURhdGEob2JqKTtpZihwYWNrZXQpeyAvLyByZWNlaXZlZCBmaW5hbCBidWZmZXJcbnRoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7dGhpcy5lbWl0KCdkZWNvZGVkJyxwYWNrZXQpO319fWVsc2Uge3Rocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlOiAnICsgb2JqKTt9fTsgLyoqXG4gICAgICAgICAqIERlY29kZSBhIHBhY2tldCBTdHJpbmcgKEpTT04gZGF0YSlcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgICAgICovZnVuY3Rpb24gZGVjb2RlU3RyaW5nKHN0cil7dmFyIHA9e307dmFyIGk9MDsgLy8gbG9vayB1cCB0eXBlXG5wLnR5cGUgPSBOdW1iZXIoc3RyLmNoYXJBdCgwKSk7aWYobnVsbCA9PSBleHBvcnRzLnR5cGVzW3AudHlwZV0pcmV0dXJuIGVycm9yKCk7IC8vIGxvb2sgdXAgYXR0YWNobWVudHMgaWYgdHlwZSBiaW5hcnlcbmlmKGV4cG9ydHMuQklOQVJZX0VWRU5UID09IHAudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT0gcC50eXBlKXt2YXIgYnVmPScnO3doaWxlKHN0ci5jaGFyQXQoKytpKSAhPSAnLScpIHtidWYgKz0gc3RyLmNoYXJBdChpKTtpZihpID09IHN0ci5sZW5ndGgpYnJlYWs7fWlmKGJ1ZiAhPSBOdW1iZXIoYnVmKSB8fCBzdHIuY2hhckF0KGkpICE9ICctJyl7dGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsIGF0dGFjaG1lbnRzJyk7fXAuYXR0YWNobWVudHMgPSBOdW1iZXIoYnVmKTt9IC8vIGxvb2sgdXAgbmFtZXNwYWNlIChpZiBhbnkpXG5pZignLycgPT0gc3RyLmNoYXJBdChpICsgMSkpe3AubnNwID0gJyc7d2hpbGUoKytpKSB7dmFyIGM9c3RyLmNoYXJBdChpKTtpZignLCcgPT0gYylicmVhaztwLm5zcCArPSBjO2lmKGkgPT0gc3RyLmxlbmd0aClicmVhazt9fWVsc2Uge3AubnNwID0gJy8nO30gLy8gbG9vayB1cCBpZFxudmFyIG5leHQ9c3RyLmNoYXJBdChpICsgMSk7aWYoJycgIT09IG5leHQgJiYgTnVtYmVyKG5leHQpID09IG5leHQpe3AuaWQgPSAnJzt3aGlsZSgrK2kpIHt2YXIgYz1zdHIuY2hhckF0KGkpO2lmKG51bGwgPT0gYyB8fCBOdW1iZXIoYykgIT0gYyl7LS1pO2JyZWFrO31wLmlkICs9IHN0ci5jaGFyQXQoaSk7aWYoaSA9PSBzdHIubGVuZ3RoKWJyZWFrO31wLmlkID0gTnVtYmVyKHAuaWQpO30gLy8gbG9vayB1cCBqc29uIGRhdGFcbmlmKHN0ci5jaGFyQXQoKytpKSl7dHJ5e3AuZGF0YSA9IGpzb24ucGFyc2Uoc3RyLnN1YnN0cihpKSk7fWNhdGNoKGUpIHtyZXR1cm4gZXJyb3IoKTt9fWRlYnVnKCdkZWNvZGVkICVzIGFzICVqJyxzdHIscCk7cmV0dXJuIHA7fSAvKipcbiAgICAgICAgICogRGVhbGxvY2F0ZXMgYSBwYXJzZXIncyByZXNvdXJjZXNcbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovRGVjb2Rlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCl7aWYodGhpcy5yZWNvbnN0cnVjdG9yKXt0aGlzLnJlY29uc3RydWN0b3IuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO319OyAvKipcbiAgICAgICAgICogQSBtYW5hZ2VyIG9mIGEgYmluYXJ5IGV2ZW50J3MgJ2J1ZmZlciBzZXF1ZW5jZScuIFNob3VsZFxuICAgICAgICAgKiBiZSBjb25zdHJ1Y3RlZCB3aGVuZXZlciBhIHBhY2tldCBvZiB0eXBlIEJJTkFSWV9FVkVOVCBpc1xuICAgICAgICAgKiBkZWNvZGVkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gICAgICAgICAqIEByZXR1cm4ge0JpbmFyeVJlY29uc3RydWN0b3J9IGluaXRpYWxpemVkIHJlY29uc3RydWN0b3JcbiAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAqL2Z1bmN0aW9uIEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KXt0aGlzLnJlY29uUGFjayA9IHBhY2tldDt0aGlzLmJ1ZmZlcnMgPSBbXTt9IC8qKlxuICAgICAgICAgKiBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gYmluYXJ5IGRhdGEgcmVjZWl2ZWQgZnJvbSBjb25uZWN0aW9uXG4gICAgICAgICAqIGFmdGVyIGEgQklOQVJZX0VWRU5UIHBhY2tldC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtCdWZmZXIgfCBBcnJheUJ1ZmZlcn0gYmluRGF0YSAtIHRoZSByYXcgYmluYXJ5IGRhdGEgcmVjZWl2ZWRcbiAgICAgICAgICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gcmV0dXJucyBudWxsIGlmIG1vcmUgYmluYXJ5IGRhdGEgaXMgZXhwZWN0ZWQgb3JcbiAgICAgICAgICogICBhIHJlY29uc3RydWN0ZWQgcGFja2V0IG9iamVjdCBpZiBhbGwgYnVmZmVycyBoYXZlIGJlZW4gcmVjZWl2ZWQuXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9CaW5hcnlSZWNvbnN0cnVjdG9yLnByb3RvdHlwZS50YWtlQmluYXJ5RGF0YSA9IGZ1bmN0aW9uKGJpbkRhdGEpe3RoaXMuYnVmZmVycy5wdXNoKGJpbkRhdGEpO2lmKHRoaXMuYnVmZmVycy5sZW5ndGggPT0gdGhpcy5yZWNvblBhY2suYXR0YWNobWVudHMpeyAvLyBkb25lIHdpdGggYnVmZmVyIGxpc3RcbnZhciBwYWNrZXQ9YmluYXJ5LnJlY29uc3RydWN0UGFja2V0KHRoaXMucmVjb25QYWNrLHRoaXMuYnVmZmVycyk7dGhpcy5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7cmV0dXJuIHBhY2tldDt9cmV0dXJuIG51bGw7fTsgLyoqXG4gICAgICAgICAqIENsZWFucyB1cCBiaW5hcnkgcGFja2V0IHJlY29uc3RydWN0aW9uIHZhcmlhYmxlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQGFwaSBwcml2YXRlXG4gICAgICAgICAqL0JpbmFyeVJlY29uc3RydWN0b3IucHJvdG90eXBlLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24gPSBmdW5jdGlvbigpe3RoaXMucmVjb25QYWNrID0gbnVsbDt0aGlzLmJ1ZmZlcnMgPSBbXTt9O2Z1bmN0aW9uIGVycm9yKGRhdGEpe3JldHVybiB7dHlwZTpleHBvcnRzLkVSUk9SLGRhdGE6J3BhcnNlciBlcnJvcid9O319LHtcIi4vYmluYXJ5XCI6NDUsXCIuL2lzLWJ1ZmZlclwiOjQ3LFwiY29tcG9uZW50LWVtaXR0ZXJcIjo5LFwiZGVidWdcIjoxMCxcImlzYXJyYXlcIjo0OCxcImpzb24zXCI6NDl9XSw0NzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7bW9kdWxlLmV4cG9ydHMgPSBpc0J1ZjsgLyoqXG4gICAgICAgICAgICogUmV0dXJucyB0cnVlIGlmIG9iaiBpcyBhIGJ1ZmZlciBvciBhbiBhcnJheWJ1ZmZlci5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgICAqL2Z1bmN0aW9uIGlzQnVmKG9iail7cmV0dXJuIGdsb2JhbC5CdWZmZXIgJiYgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlcihvYmopIHx8IGdsb2JhbC5BcnJheUJ1ZmZlciAmJiBvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjt9fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6e30pO30se31dLDQ4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXttb2R1bGUuZXhwb3J0cyA9IF9kZXJlcV8oMzIpO30se31dLDQ5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyohIEpTT04gdjMuMi42IHwgaHR0cDovL2Jlc3RpZWpzLmdpdGh1Yi5pby9qc29uMyB8IENvcHlyaWdodCAyMDEyLTIwMTMsIEtpdCBDYW1icmlkZ2UgfCBodHRwOi8va2l0Lm1pdC1saWNlbnNlLm9yZyAqLzsoZnVuY3Rpb24od2luZG93KXsgLy8gQ29udmVuaWVuY2UgYWxpYXNlcy5cbnZhciBnZXRDbGFzcz0oe30pLnRvU3RyaW5nLGlzUHJvcGVydHksZm9yRWFjaCx1bmRlZjsgLy8gRGV0ZWN0IHRoZSBgZGVmaW5lYCBmdW5jdGlvbiBleHBvc2VkIGJ5IGFzeW5jaHJvbm91cyBtb2R1bGUgbG9hZGVycy4gVGhlXG4vLyBzdHJpY3QgYGRlZmluZWAgY2hlY2sgaXMgbmVjZXNzYXJ5IGZvciBjb21wYXRpYmlsaXR5IHdpdGggYHIuanNgLlxudmFyIGlzTG9hZGVyPXR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kOyAvLyBEZXRlY3QgbmF0aXZlIGltcGxlbWVudGF0aW9ucy5cbnZhciBuYXRpdmVKU09OPXR5cGVvZiBKU09OID09IFwib2JqZWN0XCIgJiYgSlNPTjsgLy8gU2V0IHVwIHRoZSBKU09OIDMgbmFtZXNwYWNlLCBwcmVmZXJyaW5nIHRoZSBDb21tb25KUyBgZXhwb3J0c2Agb2JqZWN0IGlmXG4vLyBhdmFpbGFibGUuXG52YXIgSlNPTjM9dHlwZW9mIGV4cG9ydHMgPT0gXCJvYmplY3RcIiAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7aWYoSlNPTjMgJiYgbmF0aXZlSlNPTil7IC8vIEV4cGxpY2l0bHkgZGVsZWdhdGUgdG8gdGhlIG5hdGl2ZSBgc3RyaW5naWZ5YCBhbmQgYHBhcnNlYFxuLy8gaW1wbGVtZW50YXRpb25zIGluIENvbW1vbkpTIGVudmlyb25tZW50cy5cbkpTT04zLnN0cmluZ2lmeSA9IG5hdGl2ZUpTT04uc3RyaW5naWZ5O0pTT04zLnBhcnNlID0gbmF0aXZlSlNPTi5wYXJzZTt9ZWxzZSB7IC8vIEV4cG9ydCBmb3Igd2ViIGJyb3dzZXJzLCBKYXZhU2NyaXB0IGVuZ2luZXMsIGFuZCBhc3luY2hyb25vdXMgbW9kdWxlXG4vLyBsb2FkZXJzLCB1c2luZyB0aGUgZ2xvYmFsIGBKU09OYCBvYmplY3QgaWYgYXZhaWxhYmxlLlxuSlNPTjMgPSB3aW5kb3cuSlNPTiA9IG5hdGl2ZUpTT04gfHwge307fSAvLyBUZXN0IHRoZSBgRGF0ZSNnZXRVVEMqYCBtZXRob2RzLiBCYXNlZCBvbiB3b3JrIGJ5IEBZYWZmbGUuXG52YXIgaXNFeHRlbmRlZD1uZXcgRGF0ZSgtMzUwOTgyNzMzNDU3MzI5Mik7dHJ5eyAvLyBUaGUgYGdldFVUQ0Z1bGxZZWFyYCwgYE1vbnRoYCwgYW5kIGBEYXRlYCBtZXRob2RzIHJldHVybiBub25zZW5zaWNhbFxuLy8gcmVzdWx0cyBmb3IgY2VydGFpbiBkYXRlcyBpbiBPcGVyYSA+PSAxMC41My5cbmlzRXh0ZW5kZWQgPSBpc0V4dGVuZGVkLmdldFVUQ0Z1bGxZZWFyKCkgPT0gLTEwOTI1MiAmJiBpc0V4dGVuZGVkLmdldFVUQ01vbnRoKCkgPT09IDAgJiYgaXNFeHRlbmRlZC5nZXRVVENEYXRlKCkgPT09IDEgJiYgIC8vIFNhZmFyaSA8IDIuMC4yIHN0b3JlcyB0aGUgaW50ZXJuYWwgbWlsbGlzZWNvbmQgdGltZSB2YWx1ZSBjb3JyZWN0bHksXG4vLyBidXQgY2xpcHMgdGhlIHZhbHVlcyByZXR1cm5lZCBieSB0aGUgZGF0ZSBtZXRob2RzIHRvIHRoZSByYW5nZSBvZlxuLy8gc2lnbmVkIDMyLWJpdCBpbnRlZ2VycyAoWy0yICoqIDMxLCAyICoqIDMxIC0gMV0pLlxuaXNFeHRlbmRlZC5nZXRVVENIb3VycygpID09IDEwICYmIGlzRXh0ZW5kZWQuZ2V0VVRDTWludXRlcygpID09IDM3ICYmIGlzRXh0ZW5kZWQuZ2V0VVRDU2Vjb25kcygpID09IDYgJiYgaXNFeHRlbmRlZC5nZXRVVENNaWxsaXNlY29uZHMoKSA9PSA3MDg7fWNhdGNoKGV4Y2VwdGlvbikge30gLy8gSW50ZXJuYWw6IERldGVybWluZXMgd2hldGhlciB0aGUgbmF0aXZlIGBKU09OLnN0cmluZ2lmeWAgYW5kIGBwYXJzZWBcbi8vIGltcGxlbWVudGF0aW9ucyBhcmUgc3BlYy1jb21wbGlhbnQuIEJhc2VkIG9uIHdvcmsgYnkgS2VuIFNueWRlci5cbmZ1bmN0aW9uIGhhcyhuYW1lKXtpZihoYXNbbmFtZV0gIT09IHVuZGVmKXsgLy8gUmV0dXJuIGNhY2hlZCBmZWF0dXJlIHRlc3QgcmVzdWx0LlxucmV0dXJuIGhhc1tuYW1lXTt9dmFyIGlzU3VwcG9ydGVkO2lmKG5hbWUgPT0gXCJidWctc3RyaW5nLWNoYXItaW5kZXhcIil7IC8vIElFIDw9IDcgZG9lc24ndCBzdXBwb3J0IGFjY2Vzc2luZyBzdHJpbmcgY2hhcmFjdGVycyB1c2luZyBzcXVhcmVcbi8vIGJyYWNrZXQgbm90YXRpb24uIElFIDggb25seSBzdXBwb3J0cyB0aGlzIGZvciBwcmltaXRpdmVzLlxuaXNTdXBwb3J0ZWQgPSBcImFcIlswXSAhPSBcImFcIjt9ZWxzZSBpZihuYW1lID09IFwianNvblwiKXsgLy8gSW5kaWNhdGVzIHdoZXRoZXIgYm90aCBgSlNPTi5zdHJpbmdpZnlgIGFuZCBgSlNPTi5wYXJzZWAgYXJlXG4vLyBzdXBwb3J0ZWQuXG5pc1N1cHBvcnRlZCA9IGhhcyhcImpzb24tc3RyaW5naWZ5XCIpICYmIGhhcyhcImpzb24tcGFyc2VcIik7fWVsc2Uge3ZhciB2YWx1ZSxzZXJpYWxpemVkPVwie1xcXCJhXFxcIjpbMSx0cnVlLGZhbHNlLG51bGwsXFxcIlxcXFx1MDAwMFxcXFxiXFxcXG5cXFxcZlxcXFxyXFxcXHRcXFwiXX1cIjsgLy8gVGVzdCBgSlNPTi5zdHJpbmdpZnlgLlxuaWYobmFtZSA9PSBcImpzb24tc3RyaW5naWZ5XCIpe3ZhciBzdHJpbmdpZnk9SlNPTjMuc3RyaW5naWZ5LHN0cmluZ2lmeVN1cHBvcnRlZD10eXBlb2Ygc3RyaW5naWZ5ID09IFwiZnVuY3Rpb25cIiAmJiBpc0V4dGVuZGVkO2lmKHN0cmluZ2lmeVN1cHBvcnRlZCl7IC8vIEEgdGVzdCBmdW5jdGlvbiBvYmplY3Qgd2l0aCBhIGN1c3RvbSBgdG9KU09OYCBtZXRob2QuXG4odmFsdWUgPSBmdW5jdGlvbigpe3JldHVybiAxO30pLnRvSlNPTiA9IHZhbHVlO3RyeXtzdHJpbmdpZnlTdXBwb3J0ZWQgPSAgLy8gRmlyZWZveCAzLjFiMSBhbmQgYjIgc2VyaWFsaXplIHN0cmluZywgbnVtYmVyLCBhbmQgYm9vbGVhblxuLy8gcHJpbWl0aXZlcyBhcyBvYmplY3QgbGl0ZXJhbHMuXG5zdHJpbmdpZnkoMCkgPT09IFwiMFwiICYmICAvLyBGRiAzLjFiMSwgYjIsIGFuZCBKU09OIDIgc2VyaWFsaXplIHdyYXBwZWQgcHJpbWl0aXZlcyBhcyBvYmplY3Rcbi8vIGxpdGVyYWxzLlxuc3RyaW5naWZ5KG5ldyBOdW1iZXIoKSkgPT09IFwiMFwiICYmIHN0cmluZ2lmeShuZXcgU3RyaW5nKCkpID09ICdcIlwiJyAmJiAgLy8gRkYgMy4xYjEsIDIgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIHZhbHVlIGlzIGBudWxsYCwgYHVuZGVmaW5lZGAsIG9yXG4vLyBkb2VzIG5vdCBkZWZpbmUgYSBjYW5vbmljYWwgSlNPTiByZXByZXNlbnRhdGlvbiAodGhpcyBhcHBsaWVzIHRvXG4vLyBvYmplY3RzIHdpdGggYHRvSlNPTmAgcHJvcGVydGllcyBhcyB3ZWxsLCAqdW5sZXNzKiB0aGV5IGFyZSBuZXN0ZWRcbi8vIHdpdGhpbiBhbiBvYmplY3Qgb3IgYXJyYXkpLlxuc3RyaW5naWZ5KGdldENsYXNzKSA9PT0gdW5kZWYgJiYgIC8vIElFIDggc2VyaWFsaXplcyBgdW5kZWZpbmVkYCBhcyBgXCJ1bmRlZmluZWRcImAuIFNhZmFyaSA8PSA1LjEuNyBhbmRcbi8vIEZGIDMuMWIzIHBhc3MgdGhpcyB0ZXN0Llxuc3RyaW5naWZ5KHVuZGVmKSA9PT0gdW5kZWYgJiYgIC8vIFNhZmFyaSA8PSA1LjEuNyBhbmQgRkYgMy4xYjMgdGhyb3cgYEVycm9yYHMgYW5kIGBUeXBlRXJyb3Jgcyxcbi8vIHJlc3BlY3RpdmVseSwgaWYgdGhlIHZhbHVlIGlzIG9taXR0ZWQgZW50aXJlbHkuXG5zdHJpbmdpZnkoKSA9PT0gdW5kZWYgJiYgIC8vIEZGIDMuMWIxLCAyIHRocm93IGFuIGVycm9yIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBub3QgYSBudW1iZXIsXG4vLyBzdHJpbmcsIGFycmF5LCBvYmplY3QsIEJvb2xlYW4sIG9yIGBudWxsYCBsaXRlcmFsLiBUaGlzIGFwcGxpZXMgdG9cbi8vIG9iamVjdHMgd2l0aCBjdXN0b20gYHRvSlNPTmAgbWV0aG9kcyBhcyB3ZWxsLCB1bmxlc3MgdGhleSBhcmUgbmVzdGVkXG4vLyBpbnNpZGUgb2JqZWN0IG9yIGFycmF5IGxpdGVyYWxzLiBZVUkgMy4wLjBiMSBpZ25vcmVzIGN1c3RvbSBgdG9KU09OYFxuLy8gbWV0aG9kcyBlbnRpcmVseS5cbnN0cmluZ2lmeSh2YWx1ZSkgPT09IFwiMVwiICYmIHN0cmluZ2lmeShbdmFsdWVdKSA9PSBcIlsxXVwiICYmICAvLyBQcm90b3R5cGUgPD0gMS42LjEgc2VyaWFsaXplcyBgW3VuZGVmaW5lZF1gIGFzIGBcIltdXCJgIGluc3RlYWQgb2Zcbi8vIGBcIltudWxsXVwiYC5cbnN0cmluZ2lmeShbdW5kZWZdKSA9PSBcIltudWxsXVwiICYmICAvLyBZVUkgMy4wLjBiMSBmYWlscyB0byBzZXJpYWxpemUgYG51bGxgIGxpdGVyYWxzLlxuc3RyaW5naWZ5KG51bGwpID09IFwibnVsbFwiICYmICAvLyBGRiAzLjFiMSwgMiBoYWx0cyBzZXJpYWxpemF0aW9uIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgZnVuY3Rpb246XG4vLyBgWzEsIHRydWUsIGdldENsYXNzLCAxXWAgc2VyaWFsaXplcyBhcyBcIlsxLHRydWUsXSxcIi4gRkYgMy4xYjNcbi8vIGVsaWRlcyBub24tSlNPTiB2YWx1ZXMgZnJvbSBvYmplY3RzIGFuZCBhcnJheXMsIHVubGVzcyB0aGV5XG4vLyBkZWZpbmUgY3VzdG9tIGB0b0pTT05gIG1ldGhvZHMuXG5zdHJpbmdpZnkoW3VuZGVmLGdldENsYXNzLG51bGxdKSA9PSBcIltudWxsLG51bGwsbnVsbF1cIiAmJiAgLy8gU2ltcGxlIHNlcmlhbGl6YXRpb24gdGVzdC4gRkYgMy4xYjEgdXNlcyBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZXNcbi8vIHdoZXJlIGNoYXJhY3RlciBlc2NhcGUgY29kZXMgYXJlIGV4cGVjdGVkIChlLmcuLCBgXFxiYCA9PiBgXFx1MDAwOGApLlxuc3RyaW5naWZ5KHtcImFcIjpbdmFsdWUsdHJ1ZSxmYWxzZSxudWxsLFwiXFx4MDBcXGJcXG5cXGZcXHJcXHRcIl19KSA9PSBzZXJpYWxpemVkICYmICAvLyBGRiAzLjFiMSBhbmQgYjIgaWdub3JlIHRoZSBgZmlsdGVyYCBhbmQgYHdpZHRoYCBhcmd1bWVudHMuXG5zdHJpbmdpZnkobnVsbCx2YWx1ZSkgPT09IFwiMVwiICYmIHN0cmluZ2lmeShbMSwyXSxudWxsLDEpID09IFwiW1xcbiAxLFxcbiAyXFxuXVwiICYmICAvLyBKU09OIDIsIFByb3RvdHlwZSA8PSAxLjcsIGFuZCBvbGRlciBXZWJLaXQgYnVpbGRzIGluY29ycmVjdGx5XG4vLyBzZXJpYWxpemUgZXh0ZW5kZWQgeWVhcnMuXG5zdHJpbmdpZnkobmV3IERhdGUoLTguNjRlMTUpKSA9PSAnXCItMjcxODIxLTA0LTIwVDAwOjAwOjAwLjAwMFpcIicgJiYgIC8vIFRoZSBtaWxsaXNlY29uZHMgYXJlIG9wdGlvbmFsIGluIEVTIDUsIGJ1dCByZXF1aXJlZCBpbiA1LjEuXG5zdHJpbmdpZnkobmV3IERhdGUoOC42NGUxNSkpID09ICdcIisyNzU3NjAtMDktMTNUMDA6MDA6MDAuMDAwWlwiJyAmJiAgLy8gRmlyZWZveCA8PSAxMS4wIGluY29ycmVjdGx5IHNlcmlhbGl6ZXMgeWVhcnMgcHJpb3IgdG8gMCBhcyBuZWdhdGl2ZVxuLy8gZm91ci1kaWdpdCB5ZWFycyBpbnN0ZWFkIG9mIHNpeC1kaWdpdCB5ZWFycy4gQ3JlZGl0czogQFlhZmZsZS5cbnN0cmluZ2lmeShuZXcgRGF0ZSgtNjIxOTg3NTUyZTUpKSA9PSAnXCItMDAwMDAxLTAxLTAxVDAwOjAwOjAwLjAwMFpcIicgJiYgIC8vIFNhZmFyaSA8PSA1LjEuNSBhbmQgT3BlcmEgPj0gMTAuNTMgaW5jb3JyZWN0bHkgc2VyaWFsaXplIG1pbGxpc2Vjb25kXG4vLyB2YWx1ZXMgbGVzcyB0aGFuIDEwMDAuIENyZWRpdHM6IEBZYWZmbGUuXG5zdHJpbmdpZnkobmV3IERhdGUoLTEpKSA9PSAnXCIxOTY5LTEyLTMxVDIzOjU5OjU5Ljk5OVpcIic7fWNhdGNoKGV4Y2VwdGlvbikge3N0cmluZ2lmeVN1cHBvcnRlZCA9IGZhbHNlO319aXNTdXBwb3J0ZWQgPSBzdHJpbmdpZnlTdXBwb3J0ZWQ7fSAvLyBUZXN0IGBKU09OLnBhcnNlYC5cbmlmKG5hbWUgPT0gXCJqc29uLXBhcnNlXCIpe3ZhciBwYXJzZT1KU09OMy5wYXJzZTtpZih0eXBlb2YgcGFyc2UgPT0gXCJmdW5jdGlvblwiKXt0cnl7IC8vIEZGIDMuMWIxLCBiMiB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhIGJhcmUgbGl0ZXJhbCBpcyBwcm92aWRlZC5cbi8vIENvbmZvcm1pbmcgaW1wbGVtZW50YXRpb25zIHNob3VsZCBhbHNvIGNvZXJjZSB0aGUgaW5pdGlhbCBhcmd1bWVudCB0b1xuLy8gYSBzdHJpbmcgcHJpb3IgdG8gcGFyc2luZy5cbmlmKHBhcnNlKFwiMFwiKSA9PT0gMCAmJiAhcGFyc2UoZmFsc2UpKXsgLy8gU2ltcGxlIHBhcnNpbmcgdGVzdC5cbnZhbHVlID0gcGFyc2Uoc2VyaWFsaXplZCk7dmFyIHBhcnNlU3VwcG9ydGVkPXZhbHVlW1wiYVwiXS5sZW5ndGggPT0gNSAmJiB2YWx1ZVtcImFcIl1bMF0gPT09IDE7aWYocGFyc2VTdXBwb3J0ZWQpe3RyeXsgLy8gU2FmYXJpIDw9IDUuMS4yIGFuZCBGRiAzLjFiMSBhbGxvdyB1bmVzY2FwZWQgdGFicyBpbiBzdHJpbmdzLlxucGFyc2VTdXBwb3J0ZWQgPSAhcGFyc2UoJ1wiXFx0XCInKTt9Y2F0Y2goZXhjZXB0aW9uKSB7fWlmKHBhcnNlU3VwcG9ydGVkKXt0cnl7IC8vIEZGIDQuMCBhbmQgNC4wLjEgYWxsb3cgbGVhZGluZyBgK2Agc2lnbnMgYW5kIGxlYWRpbmdcbi8vIGRlY2ltYWwgcG9pbnRzLiBGRiA0LjAsIDQuMC4xLCBhbmQgSUUgOS0xMCBhbHNvIGFsbG93XG4vLyBjZXJ0YWluIG9jdGFsIGxpdGVyYWxzLlxucGFyc2VTdXBwb3J0ZWQgPSBwYXJzZShcIjAxXCIpICE9PSAxO31jYXRjaChleGNlcHRpb24pIHt9fWlmKHBhcnNlU3VwcG9ydGVkKXt0cnl7IC8vIEZGIDQuMCwgNC4wLjEsIGFuZCBSaGlubyAxLjdSMy1SNCBhbGxvdyB0cmFpbGluZyBkZWNpbWFsXG4vLyBwb2ludHMuIFRoZXNlIGVudmlyb25tZW50cywgYWxvbmcgd2l0aCBGRiAzLjFiMSBhbmQgMixcbi8vIGFsc28gYWxsb3cgdHJhaWxpbmcgY29tbWFzIGluIEpTT04gb2JqZWN0cyBhbmQgYXJyYXlzLlxucGFyc2VTdXBwb3J0ZWQgPSBwYXJzZShcIjEuXCIpICE9PSAxO31jYXRjaChleGNlcHRpb24pIHt9fX19fWNhdGNoKGV4Y2VwdGlvbikge3BhcnNlU3VwcG9ydGVkID0gZmFsc2U7fX1pc1N1cHBvcnRlZCA9IHBhcnNlU3VwcG9ydGVkO319cmV0dXJuIGhhc1tuYW1lXSA9ICEhaXNTdXBwb3J0ZWQ7fWlmKCFoYXMoXCJqc29uXCIpKXsgLy8gQ29tbW9uIGBbW0NsYXNzXV1gIG5hbWUgYWxpYXNlcy5cbnZhciBmdW5jdGlvbkNsYXNzPVwiW29iamVjdCBGdW5jdGlvbl1cIjt2YXIgZGF0ZUNsYXNzPVwiW29iamVjdCBEYXRlXVwiO3ZhciBudW1iZXJDbGFzcz1cIltvYmplY3QgTnVtYmVyXVwiO3ZhciBzdHJpbmdDbGFzcz1cIltvYmplY3QgU3RyaW5nXVwiO3ZhciBhcnJheUNsYXNzPVwiW29iamVjdCBBcnJheV1cIjt2YXIgYm9vbGVhbkNsYXNzPVwiW29iamVjdCBCb29sZWFuXVwiOyAvLyBEZXRlY3QgaW5jb21wbGV0ZSBzdXBwb3J0IGZvciBhY2Nlc3Npbmcgc3RyaW5nIGNoYXJhY3RlcnMgYnkgaW5kZXguXG52YXIgY2hhckluZGV4QnVnZ3k9aGFzKFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpOyAvLyBEZWZpbmUgYWRkaXRpb25hbCB1dGlsaXR5IG1ldGhvZHMgaWYgdGhlIGBEYXRlYCBtZXRob2RzIGFyZSBidWdneS5cbmlmKCFpc0V4dGVuZGVkKXt2YXIgZmxvb3I9TWF0aC5mbG9vcjsgLy8gQSBtYXBwaW5nIGJldHdlZW4gdGhlIG1vbnRocyBvZiB0aGUgeWVhciBhbmQgdGhlIG51bWJlciBvZiBkYXlzIGJldHdlZW5cbi8vIEphbnVhcnkgMXN0IGFuZCB0aGUgZmlyc3Qgb2YgdGhlIHJlc3BlY3RpdmUgbW9udGguXG52YXIgTW9udGhzPVswLDMxLDU5LDkwLDEyMCwxNTEsMTgxLDIxMiwyNDMsMjczLDMwNCwzMzRdOyAvLyBJbnRlcm5hbDogQ2FsY3VsYXRlcyB0aGUgbnVtYmVyIG9mIGRheXMgYmV0d2VlbiB0aGUgVW5peCBlcG9jaCBhbmQgdGhlXG4vLyBmaXJzdCBkYXkgb2YgdGhlIGdpdmVuIG1vbnRoLlxudmFyIGdldERheT1mdW5jdGlvbiBnZXREYXkoeWVhcixtb250aCl7cmV0dXJuIE1vbnRoc1ttb250aF0gKyAzNjUgKiAoeWVhciAtIDE5NzApICsgZmxvb3IoKHllYXIgLSAxOTY5ICsgKG1vbnRoID0gKyhtb250aCA+IDEpKSkgLyA0KSAtIGZsb29yKCh5ZWFyIC0gMTkwMSArIG1vbnRoKSAvIDEwMCkgKyBmbG9vcigoeWVhciAtIDE2MDEgKyBtb250aCkgLyA0MDApO307fSAvLyBJbnRlcm5hbDogRGV0ZXJtaW5lcyBpZiBhIHByb3BlcnR5IGlzIGEgZGlyZWN0IHByb3BlcnR5IG9mIHRoZSBnaXZlblxuLy8gb2JqZWN0LiBEZWxlZ2F0ZXMgdG8gdGhlIG5hdGl2ZSBgT2JqZWN0I2hhc093blByb3BlcnR5YCBtZXRob2QuXG5pZighKGlzUHJvcGVydHkgPSAoe30pLmhhc093blByb3BlcnR5KSl7aXNQcm9wZXJ0eSA9IGZ1bmN0aW9uKHByb3BlcnR5KXt2YXIgbWVtYmVycz17fSxjb25zdHJ1Y3RvcjtpZigobWVtYmVycy5fX3Byb3RvX18gPSBudWxsLG1lbWJlcnMuX19wcm90b19fID0geyAvLyBUaGUgKnByb3RvKiBwcm9wZXJ0eSBjYW5ub3QgYmUgc2V0IG11bHRpcGxlIHRpbWVzIGluIHJlY2VudFxuLy8gdmVyc2lvbnMgb2YgRmlyZWZveCBhbmQgU2VhTW9ua2V5LlxuXCJ0b1N0cmluZ1wiOjF9LG1lbWJlcnMpLnRvU3RyaW5nICE9IGdldENsYXNzKXsgLy8gU2FmYXJpIDw9IDIuMC4zIGRvZXNuJ3QgaW1wbGVtZW50IGBPYmplY3QjaGFzT3duUHJvcGVydHlgLCBidXRcbi8vIHN1cHBvcnRzIHRoZSBtdXRhYmxlICpwcm90byogcHJvcGVydHkuXG5pc1Byb3BlcnR5ID0gZnVuY3Rpb24ocHJvcGVydHkpeyAvLyBDYXB0dXJlIGFuZCBicmVhayB0aGUgb2JqZWN0J3MgcHJvdG90eXBlIGNoYWluIChzZWUgc2VjdGlvbiA4LjYuMlxuLy8gb2YgdGhlIEVTIDUuMSBzcGVjKS4gVGhlIHBhcmVudGhlc2l6ZWQgZXhwcmVzc2lvbiBwcmV2ZW50cyBhblxuLy8gdW5zYWZlIHRyYW5zZm9ybWF0aW9uIGJ5IHRoZSBDbG9zdXJlIENvbXBpbGVyLlxudmFyIG9yaWdpbmFsPXRoaXMuX19wcm90b19fLHJlc3VsdD0ocHJvcGVydHkgaW4gKHRoaXMuX19wcm90b19fID0gbnVsbCx0aGlzKSk7IC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHByb3RvdHlwZSBjaGFpbi5cbnRoaXMuX19wcm90b19fID0gb3JpZ2luYWw7cmV0dXJuIHJlc3VsdDt9O31lbHNlIHsgLy8gQ2FwdHVyZSBhIHJlZmVyZW5jZSB0byB0aGUgdG9wLWxldmVsIGBPYmplY3RgIGNvbnN0cnVjdG9yLlxuY29uc3RydWN0b3IgPSBtZW1iZXJzLmNvbnN0cnVjdG9yOyAvLyBVc2UgdGhlIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHkgdG8gc2ltdWxhdGUgYE9iamVjdCNoYXNPd25Qcm9wZXJ0eWAgaW5cbi8vIG90aGVyIGVudmlyb25tZW50cy5cbmlzUHJvcGVydHkgPSBmdW5jdGlvbihwcm9wZXJ0eSl7dmFyIHBhcmVudD0odGhpcy5jb25zdHJ1Y3RvciB8fCBjb25zdHJ1Y3RvcikucHJvdG90eXBlO3JldHVybiBwcm9wZXJ0eSBpbiB0aGlzICYmICEocHJvcGVydHkgaW4gcGFyZW50ICYmIHRoaXNbcHJvcGVydHldID09PSBwYXJlbnRbcHJvcGVydHldKTt9O31tZW1iZXJzID0gbnVsbDtyZXR1cm4gaXNQcm9wZXJ0eS5jYWxsKHRoaXMscHJvcGVydHkpO307fSAvLyBJbnRlcm5hbDogQSBzZXQgb2YgcHJpbWl0aXZlIHR5cGVzIHVzZWQgYnkgYGlzSG9zdFR5cGVgLlxudmFyIFByaW1pdGl2ZVR5cGVzPXsnYm9vbGVhbic6MSwnbnVtYmVyJzoxLCdzdHJpbmcnOjEsJ3VuZGVmaW5lZCc6MX07IC8vIEludGVybmFsOiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiBvYmplY3QgYHByb3BlcnR5YCB2YWx1ZSBpcyBhXG4vLyBub24tcHJpbWl0aXZlLlxudmFyIGlzSG9zdFR5cGU9ZnVuY3Rpb24gaXNIb3N0VHlwZShvYmplY3QscHJvcGVydHkpe3ZhciB0eXBlPXR5cGVvZiBvYmplY3RbcHJvcGVydHldO3JldHVybiB0eXBlID09ICdvYmplY3QnPyEhb2JqZWN0W3Byb3BlcnR5XTohUHJpbWl0aXZlVHlwZXNbdHlwZV07fTsgLy8gSW50ZXJuYWw6IE5vcm1hbGl6ZXMgdGhlIGBmb3IuLi5pbmAgaXRlcmF0aW9uIGFsZ29yaXRobSBhY3Jvc3Ncbi8vIGVudmlyb25tZW50cy4gRWFjaCBlbnVtZXJhdGVkIGtleSBpcyB5aWVsZGVkIHRvIGEgYGNhbGxiYWNrYCBmdW5jdGlvbi5cbmZvckVhY2ggPSBmdW5jdGlvbihvYmplY3QsY2FsbGJhY2spe3ZhciBzaXplPTAsUHJvcGVydGllcyxtZW1iZXJzLHByb3BlcnR5OyAvLyBUZXN0cyBmb3IgYnVncyBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudCdzIGBmb3IuLi5pbmAgYWxnb3JpdGhtLiBUaGVcbi8vIGB2YWx1ZU9mYCBwcm9wZXJ0eSBpbmhlcml0cyB0aGUgbm9uLWVudW1lcmFibGUgZmxhZyBmcm9tXG4vLyBgT2JqZWN0LnByb3RvdHlwZWAgaW4gb2xkZXIgdmVyc2lvbnMgb2YgSUUsIE5ldHNjYXBlLCBhbmQgTW96aWxsYS5cbihQcm9wZXJ0aWVzID0gZnVuY3Rpb24oKXt0aGlzLnZhbHVlT2YgPSAwO30pLnByb3RvdHlwZS52YWx1ZU9mID0gMDsgLy8gSXRlcmF0ZSBvdmVyIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBgUHJvcGVydGllc2AgY2xhc3MuXG5tZW1iZXJzID0gbmV3IFByb3BlcnRpZXMoKTtmb3IocHJvcGVydHkgaW4gbWVtYmVycykgeyAvLyBJZ25vcmUgYWxsIHByb3BlcnRpZXMgaW5oZXJpdGVkIGZyb20gYE9iamVjdC5wcm90b3R5cGVgLlxuaWYoaXNQcm9wZXJ0eS5jYWxsKG1lbWJlcnMscHJvcGVydHkpKXtzaXplKys7fX1Qcm9wZXJ0aWVzID0gbWVtYmVycyA9IG51bGw7IC8vIE5vcm1hbGl6ZSB0aGUgaXRlcmF0aW9uIGFsZ29yaXRobS5cbmlmKCFzaXplKXsgLy8gQSBsaXN0IG9mIG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXMgaW5oZXJpdGVkIGZyb20gYE9iamVjdC5wcm90b3R5cGVgLlxubWVtYmVycyA9IFtcInZhbHVlT2ZcIixcInRvU3RyaW5nXCIsXCJ0b0xvY2FsZVN0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImlzUHJvdG90eXBlT2ZcIixcImhhc093blByb3BlcnR5XCIsXCJjb25zdHJ1Y3RvclwiXTsgLy8gSUUgPD0gOCwgTW96aWxsYSAxLjAsIGFuZCBOZXRzY2FwZSA2LjIgaWdub3JlIHNoYWRvd2VkIG5vbi1lbnVtZXJhYmxlXG4vLyBwcm9wZXJ0aWVzLlxuZm9yRWFjaCA9IGZ1bmN0aW9uKG9iamVjdCxjYWxsYmFjayl7dmFyIGlzRnVuY3Rpb249Z2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MscHJvcGVydHksbGVuZ3RoO3ZhciBoYXNQcm9wZXJ0eT0haXNGdW5jdGlvbiAmJiB0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yICE9ICdmdW5jdGlvbicgJiYgaXNIb3N0VHlwZShvYmplY3QsJ2hhc093blByb3BlcnR5Jyk/b2JqZWN0Lmhhc093blByb3BlcnR5OmlzUHJvcGVydHk7Zm9yKHByb3BlcnR5IGluIG9iamVjdCkgeyAvLyBHZWNrbyA8PSAxLjAgZW51bWVyYXRlcyB0aGUgYHByb3RvdHlwZWAgcHJvcGVydHkgb2YgZnVuY3Rpb25zIHVuZGVyXG4vLyBjZXJ0YWluIGNvbmRpdGlvbnM7IElFIGRvZXMgbm90LlxuaWYoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LHByb3BlcnR5KSl7Y2FsbGJhY2socHJvcGVydHkpO319IC8vIE1hbnVhbGx5IGludm9rZSB0aGUgY2FsbGJhY2sgZm9yIGVhY2ggbm9uLWVudW1lcmFibGUgcHJvcGVydHkuXG5mb3IobGVuZ3RoID0gbWVtYmVycy5sZW5ndGg7cHJvcGVydHkgPSBtZW1iZXJzWy0tbGVuZ3RoXTtoYXNQcm9wZXJ0eS5jYWxsKG9iamVjdCxwcm9wZXJ0eSkgJiYgY2FsbGJhY2socHJvcGVydHkpKTt9O31lbHNlIGlmKHNpemUgPT0gMil7IC8vIFNhZmFyaSA8PSAyLjAuNCBlbnVtZXJhdGVzIHNoYWRvd2VkIHByb3BlcnRpZXMgdHdpY2UuXG5mb3JFYWNoID0gZnVuY3Rpb24ob2JqZWN0LGNhbGxiYWNrKXsgLy8gQ3JlYXRlIGEgc2V0IG9mIGl0ZXJhdGVkIHByb3BlcnRpZXMuXG52YXIgbWVtYmVycz17fSxpc0Z1bmN0aW9uPWdldENsYXNzLmNhbGwob2JqZWN0KSA9PSBmdW5jdGlvbkNsYXNzLHByb3BlcnR5O2Zvcihwcm9wZXJ0eSBpbiBvYmplY3QpIHsgLy8gU3RvcmUgZWFjaCBwcm9wZXJ0eSBuYW1lIHRvIHByZXZlbnQgZG91YmxlIGVudW1lcmF0aW9uLiBUaGVcbi8vIGBwcm90b3R5cGVgIHByb3BlcnR5IG9mIGZ1bmN0aW9ucyBpcyBub3QgZW51bWVyYXRlZCBkdWUgdG8gY3Jvc3MtXG4vLyBlbnZpcm9ubWVudCBpbmNvbnNpc3RlbmNpZXMuXG5pZighKGlzRnVuY3Rpb24gJiYgcHJvcGVydHkgPT0gXCJwcm90b3R5cGVcIikgJiYgIWlzUHJvcGVydHkuY2FsbChtZW1iZXJzLHByb3BlcnR5KSAmJiAobWVtYmVyc1twcm9wZXJ0eV0gPSAxKSAmJiBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LHByb3BlcnR5KSl7Y2FsbGJhY2socHJvcGVydHkpO319fTt9ZWxzZSB7IC8vIE5vIGJ1Z3MgZGV0ZWN0ZWQ7IHVzZSB0aGUgc3RhbmRhcmQgYGZvci4uLmluYCBhbGdvcml0aG0uXG5mb3JFYWNoID0gZnVuY3Rpb24ob2JqZWN0LGNhbGxiYWNrKXt2YXIgaXNGdW5jdGlvbj1nZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcyxwcm9wZXJ0eSxpc0NvbnN0cnVjdG9yO2Zvcihwcm9wZXJ0eSBpbiBvYmplY3QpIHtpZighKGlzRnVuY3Rpb24gJiYgcHJvcGVydHkgPT0gXCJwcm90b3R5cGVcIikgJiYgaXNQcm9wZXJ0eS5jYWxsKG9iamVjdCxwcm9wZXJ0eSkgJiYgIShpc0NvbnN0cnVjdG9yID0gcHJvcGVydHkgPT09IFwiY29uc3RydWN0b3JcIikpe2NhbGxiYWNrKHByb3BlcnR5KTt9fSAvLyBNYW51YWxseSBpbnZva2UgdGhlIGNhbGxiYWNrIGZvciB0aGUgYGNvbnN0cnVjdG9yYCBwcm9wZXJ0eSBkdWUgdG9cbi8vIGNyb3NzLWVudmlyb25tZW50IGluY29uc2lzdGVuY2llcy5cbmlmKGlzQ29uc3RydWN0b3IgfHwgaXNQcm9wZXJ0eS5jYWxsKG9iamVjdCxwcm9wZXJ0eSA9IFwiY29uc3RydWN0b3JcIikpe2NhbGxiYWNrKHByb3BlcnR5KTt9fTt9cmV0dXJuIGZvckVhY2gob2JqZWN0LGNhbGxiYWNrKTt9OyAvLyBQdWJsaWM6IFNlcmlhbGl6ZXMgYSBKYXZhU2NyaXB0IGB2YWx1ZWAgYXMgYSBKU09OIHN0cmluZy4gVGhlIG9wdGlvbmFsXG4vLyBgZmlsdGVyYCBhcmd1bWVudCBtYXkgc3BlY2lmeSBlaXRoZXIgYSBmdW5jdGlvbiB0aGF0IGFsdGVycyBob3cgb2JqZWN0IGFuZFxuLy8gYXJyYXkgbWVtYmVycyBhcmUgc2VyaWFsaXplZCwgb3IgYW4gYXJyYXkgb2Ygc3RyaW5ncyBhbmQgbnVtYmVycyB0aGF0XG4vLyBpbmRpY2F0ZXMgd2hpY2ggcHJvcGVydGllcyBzaG91bGQgYmUgc2VyaWFsaXplZC4gVGhlIG9wdGlvbmFsIGB3aWR0aGBcbi8vIGFyZ3VtZW50IG1heSBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgbnVtYmVyIHRoYXQgc3BlY2lmaWVzIHRoZSBpbmRlbnRhdGlvblxuLy8gbGV2ZWwgb2YgdGhlIG91dHB1dC5cbmlmKCFoYXMoXCJqc29uLXN0cmluZ2lmeVwiKSl7IC8vIEludGVybmFsOiBBIG1hcCBvZiBjb250cm9sIGNoYXJhY3RlcnMgYW5kIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuXG52YXIgRXNjYXBlcz17OTI6XCJcXFxcXFxcXFwiLDM0OidcXFxcXCInLDg6XCJcXFxcYlwiLDEyOlwiXFxcXGZcIiwxMDpcIlxcXFxuXCIsMTM6XCJcXFxcclwiLDk6XCJcXFxcdFwifTsgLy8gSW50ZXJuYWw6IENvbnZlcnRzIGB2YWx1ZWAgaW50byBhIHplcm8tcGFkZGVkIHN0cmluZyBzdWNoIHRoYXQgaXRzXG4vLyBsZW5ndGggaXMgYXQgbGVhc3QgZXF1YWwgdG8gYHdpZHRoYC4gVGhlIGB3aWR0aGAgbXVzdCBiZSA8PSA2LlxudmFyIGxlYWRpbmdaZXJvZXM9XCIwMDAwMDBcIjt2YXIgdG9QYWRkZWRTdHJpbmc9ZnVuY3Rpb24gdG9QYWRkZWRTdHJpbmcod2lkdGgsdmFsdWUpeyAvLyBUaGUgYHx8IDBgIGV4cHJlc3Npb24gaXMgbmVjZXNzYXJ5IHRvIHdvcmsgYXJvdW5kIGEgYnVnIGluXG4vLyBPcGVyYSA8PSA3LjU0dTIgd2hlcmUgYDAgPT0gLTBgLCBidXQgYFN0cmluZygtMCkgIT09IFwiMFwiYC5cbnJldHVybiAobGVhZGluZ1plcm9lcyArICh2YWx1ZSB8fCAwKSkuc2xpY2UoLXdpZHRoKTt9OyAvLyBJbnRlcm5hbDogRG91YmxlLXF1b3RlcyBhIHN0cmluZyBgdmFsdWVgLCByZXBsYWNpbmcgYWxsIEFTQ0lJIGNvbnRyb2xcbi8vIGNoYXJhY3RlcnMgKGNoYXJhY3RlcnMgd2l0aCBjb2RlIHVuaXQgdmFsdWVzIGJldHdlZW4gMCBhbmQgMzEpIHdpdGhcbi8vIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlXG4vLyBgUXVvdGUodmFsdWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLlxudmFyIHVuaWNvZGVQcmVmaXg9XCJcXFxcdTAwXCI7dmFyIHF1b3RlPWZ1bmN0aW9uIHF1b3RlKHZhbHVlKXt2YXIgcmVzdWx0PSdcIicsaW5kZXg9MCxsZW5ndGg9dmFsdWUubGVuZ3RoLGlzTGFyZ2U9bGVuZ3RoID4gMTAgJiYgY2hhckluZGV4QnVnZ3ksc3ltYm9scztpZihpc0xhcmdlKXtzeW1ib2xzID0gdmFsdWUuc3BsaXQoXCJcIik7fWZvcig7aW5kZXggPCBsZW5ndGg7aW5kZXgrKykge3ZhciBjaGFyQ29kZT12YWx1ZS5jaGFyQ29kZUF0KGluZGV4KTsgLy8gSWYgdGhlIGNoYXJhY3RlciBpcyBhIGNvbnRyb2wgY2hhcmFjdGVyLCBhcHBlbmQgaXRzIFVuaWNvZGUgb3Jcbi8vIHNob3J0aGFuZCBlc2NhcGUgc2VxdWVuY2U7IG90aGVyd2lzZSwgYXBwZW5kIHRoZSBjaGFyYWN0ZXIgYXMtaXMuXG5zd2l0Y2goY2hhckNvZGUpe2Nhc2UgODpjYXNlIDk6Y2FzZSAxMDpjYXNlIDEyOmNhc2UgMTM6Y2FzZSAzNDpjYXNlIDkyOnJlc3VsdCArPSBFc2NhcGVzW2NoYXJDb2RlXTticmVhaztkZWZhdWx0OmlmKGNoYXJDb2RlIDwgMzIpe3Jlc3VsdCArPSB1bmljb2RlUHJlZml4ICsgdG9QYWRkZWRTdHJpbmcoMixjaGFyQ29kZS50b1N0cmluZygxNikpO2JyZWFrO31yZXN1bHQgKz0gaXNMYXJnZT9zeW1ib2xzW2luZGV4XTpjaGFySW5kZXhCdWdneT92YWx1ZS5jaGFyQXQoaW5kZXgpOnZhbHVlW2luZGV4XTt9fXJldHVybiByZXN1bHQgKyAnXCInO307IC8vIEludGVybmFsOiBSZWN1cnNpdmVseSBzZXJpYWxpemVzIGFuIG9iamVjdC4gSW1wbGVtZW50cyB0aGVcbi8vIGBTdHIoa2V5LCBob2xkZXIpYCwgYEpPKHZhbHVlKWAsIGFuZCBgSkEodmFsdWUpYCBvcGVyYXRpb25zLlxudmFyIHNlcmlhbGl6ZT1mdW5jdGlvbiBzZXJpYWxpemUocHJvcGVydHksb2JqZWN0LGNhbGxiYWNrLHByb3BlcnRpZXMsd2hpdGVzcGFjZSxpbmRlbnRhdGlvbixzdGFjayl7dmFyIHZhbHVlLGNsYXNzTmFtZSx5ZWFyLG1vbnRoLGRhdGUsdGltZSxob3VycyxtaW51dGVzLHNlY29uZHMsbWlsbGlzZWNvbmRzLHJlc3VsdHMsZWxlbWVudCxpbmRleCxsZW5ndGgscHJlZml4LHJlc3VsdDt0cnl7IC8vIE5lY2Vzc2FyeSBmb3IgaG9zdCBvYmplY3Qgc3VwcG9ydC5cbnZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTt9Y2F0Y2goZXhjZXB0aW9uKSB7fWlmKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiICYmIHZhbHVlKXtjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKTtpZihjbGFzc05hbWUgPT0gZGF0ZUNsYXNzICYmICFpc1Byb3BlcnR5LmNhbGwodmFsdWUsXCJ0b0pTT05cIikpe2lmKHZhbHVlID4gLTEgLyAwICYmIHZhbHVlIDwgMSAvIDApeyAvLyBEYXRlcyBhcmUgc2VyaWFsaXplZCBhY2NvcmRpbmcgdG8gdGhlIGBEYXRlI3RvSlNPTmAgbWV0aG9kXG4vLyBzcGVjaWZpZWQgaW4gRVMgNS4xIHNlY3Rpb24gMTUuOS41LjQ0LiBTZWUgc2VjdGlvbiAxNS45LjEuMTVcbi8vIGZvciB0aGUgSVNPIDg2MDEgZGF0ZSB0aW1lIHN0cmluZyBmb3JtYXQuXG5pZihnZXREYXkpeyAvLyBNYW51YWxseSBjb21wdXRlIHRoZSB5ZWFyLCBtb250aCwgZGF0ZSwgaG91cnMsIG1pbnV0ZXMsXG4vLyBzZWNvbmRzLCBhbmQgbWlsbGlzZWNvbmRzIGlmIHRoZSBgZ2V0VVRDKmAgbWV0aG9kcyBhcmVcbi8vIGJ1Z2d5LiBBZGFwdGVkIGZyb20gQFlhZmZsZSdzIGBkYXRlLXNoaW1gIHByb2plY3QuXG5kYXRlID0gZmxvb3IodmFsdWUgLyA4NjRlNSk7Zm9yKHllYXIgPSBmbG9vcihkYXRlIC8gMzY1LjI0MjUpICsgMTk3MCAtIDE7Z2V0RGF5KHllYXIgKyAxLDApIDw9IGRhdGU7eWVhcisrKTtmb3IobW9udGggPSBmbG9vcigoZGF0ZSAtIGdldERheSh5ZWFyLDApKSAvIDMwLjQyKTtnZXREYXkoeWVhcixtb250aCArIDEpIDw9IGRhdGU7bW9udGgrKyk7ZGF0ZSA9IDEgKyBkYXRlIC0gZ2V0RGF5KHllYXIsbW9udGgpOyAvLyBUaGUgYHRpbWVgIHZhbHVlIHNwZWNpZmllcyB0aGUgdGltZSB3aXRoaW4gdGhlIGRheSAoc2VlIEVTXG4vLyA1LjEgc2VjdGlvbiAxNS45LjEuMikuIFRoZSBmb3JtdWxhIGAoQSAlIEIgKyBCKSAlIEJgIGlzIHVzZWRcbi8vIHRvIGNvbXB1dGUgYEEgbW9kdWxvIEJgLCBhcyB0aGUgYCVgIG9wZXJhdG9yIGRvZXMgbm90XG4vLyBjb3JyZXNwb25kIHRvIHRoZSBgbW9kdWxvYCBvcGVyYXRpb24gZm9yIG5lZ2F0aXZlIG51bWJlcnMuXG50aW1lID0gKHZhbHVlICUgODY0ZTUgKyA4NjRlNSkgJSA4NjRlNTsgLy8gVGhlIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBhbmQgbWlsbGlzZWNvbmRzIGFyZSBvYnRhaW5lZCBieVxuLy8gZGVjb21wb3NpbmcgdGhlIHRpbWUgd2l0aGluIHRoZSBkYXkuIFNlZSBzZWN0aW9uIDE1LjkuMS4xMC5cbmhvdXJzID0gZmxvb3IodGltZSAvIDM2ZTUpICUgMjQ7bWludXRlcyA9IGZsb29yKHRpbWUgLyA2ZTQpICUgNjA7c2Vjb25kcyA9IGZsb29yKHRpbWUgLyAxZTMpICUgNjA7bWlsbGlzZWNvbmRzID0gdGltZSAlIDFlMzt9ZWxzZSB7eWVhciA9IHZhbHVlLmdldFVUQ0Z1bGxZZWFyKCk7bW9udGggPSB2YWx1ZS5nZXRVVENNb250aCgpO2RhdGUgPSB2YWx1ZS5nZXRVVENEYXRlKCk7aG91cnMgPSB2YWx1ZS5nZXRVVENIb3VycygpO21pbnV0ZXMgPSB2YWx1ZS5nZXRVVENNaW51dGVzKCk7c2Vjb25kcyA9IHZhbHVlLmdldFVUQ1NlY29uZHMoKTttaWxsaXNlY29uZHMgPSB2YWx1ZS5nZXRVVENNaWxsaXNlY29uZHMoKTt9IC8vIFNlcmlhbGl6ZSBleHRlbmRlZCB5ZWFycyBjb3JyZWN0bHkuXG52YWx1ZSA9ICh5ZWFyIDw9IDAgfHwgeWVhciA+PSAxZTQ/KHllYXIgPCAwP1wiLVwiOlwiK1wiKSArIHRvUGFkZGVkU3RyaW5nKDYseWVhciA8IDA/LXllYXI6eWVhcik6dG9QYWRkZWRTdHJpbmcoNCx5ZWFyKSkgKyBcIi1cIiArIHRvUGFkZGVkU3RyaW5nKDIsbW9udGggKyAxKSArIFwiLVwiICsgdG9QYWRkZWRTdHJpbmcoMixkYXRlKSArICAvLyBNb250aHMsIGRhdGVzLCBob3VycywgbWludXRlcywgYW5kIHNlY29uZHMgc2hvdWxkIGhhdmUgdHdvXG4vLyBkaWdpdHM7IG1pbGxpc2Vjb25kcyBzaG91bGQgaGF2ZSB0aHJlZS5cblwiVFwiICsgdG9QYWRkZWRTdHJpbmcoMixob3VycykgKyBcIjpcIiArIHRvUGFkZGVkU3RyaW5nKDIsbWludXRlcykgKyBcIjpcIiArIHRvUGFkZGVkU3RyaW5nKDIsc2Vjb25kcykgKyAgLy8gTWlsbGlzZWNvbmRzIGFyZSBvcHRpb25hbCBpbiBFUyA1LjAsIGJ1dCByZXF1aXJlZCBpbiA1LjEuXG5cIi5cIiArIHRvUGFkZGVkU3RyaW5nKDMsbWlsbGlzZWNvbmRzKSArIFwiWlwiO31lbHNlIHt2YWx1ZSA9IG51bGw7fX1lbHNlIGlmKHR5cGVvZiB2YWx1ZS50b0pTT04gPT0gXCJmdW5jdGlvblwiICYmIChjbGFzc05hbWUgIT0gbnVtYmVyQ2xhc3MgJiYgY2xhc3NOYW1lICE9IHN0cmluZ0NsYXNzICYmIGNsYXNzTmFtZSAhPSBhcnJheUNsYXNzIHx8IGlzUHJvcGVydHkuY2FsbCh2YWx1ZSxcInRvSlNPTlwiKSkpeyAvLyBQcm90b3R5cGUgPD0gMS42LjEgYWRkcyBub24tc3RhbmRhcmQgYHRvSlNPTmAgbWV0aG9kcyB0byB0aGVcbi8vIGBOdW1iZXJgLCBgU3RyaW5nYCwgYERhdGVgLCBhbmQgYEFycmF5YCBwcm90b3R5cGVzLiBKU09OIDNcbi8vIGlnbm9yZXMgYWxsIGB0b0pTT05gIG1ldGhvZHMgb24gdGhlc2Ugb2JqZWN0cyB1bmxlc3MgdGhleSBhcmVcbi8vIGRlZmluZWQgZGlyZWN0bHkgb24gYW4gaW5zdGFuY2UuXG52YWx1ZSA9IHZhbHVlLnRvSlNPTihwcm9wZXJ0eSk7fX1pZihjYWxsYmFjayl7IC8vIElmIGEgcmVwbGFjZW1lbnQgZnVuY3Rpb24gd2FzIHByb3ZpZGVkLCBjYWxsIGl0IHRvIG9idGFpbiB0aGUgdmFsdWVcbi8vIGZvciBzZXJpYWxpemF0aW9uLlxudmFsdWUgPSBjYWxsYmFjay5jYWxsKG9iamVjdCxwcm9wZXJ0eSx2YWx1ZSk7fWlmKHZhbHVlID09PSBudWxsKXtyZXR1cm4gXCJudWxsXCI7fWNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwodmFsdWUpO2lmKGNsYXNzTmFtZSA9PSBib29sZWFuQ2xhc3MpeyAvLyBCb29sZWFucyBhcmUgcmVwcmVzZW50ZWQgbGl0ZXJhbGx5LlxucmV0dXJuIFwiXCIgKyB2YWx1ZTt9ZWxzZSBpZihjbGFzc05hbWUgPT0gbnVtYmVyQ2xhc3MpeyAvLyBKU09OIG51bWJlcnMgbXVzdCBiZSBmaW5pdGUuIGBJbmZpbml0eWAgYW5kIGBOYU5gIGFyZSBzZXJpYWxpemVkIGFzXG4vLyBgXCJudWxsXCJgLlxucmV0dXJuIHZhbHVlID4gLTEgLyAwICYmIHZhbHVlIDwgMSAvIDA/XCJcIiArIHZhbHVlOlwibnVsbFwiO31lbHNlIGlmKGNsYXNzTmFtZSA9PSBzdHJpbmdDbGFzcyl7IC8vIFN0cmluZ3MgYXJlIGRvdWJsZS1xdW90ZWQgYW5kIGVzY2FwZWQuXG5yZXR1cm4gcXVvdGUoXCJcIiArIHZhbHVlKTt9IC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBvYmplY3RzIGFuZCBhcnJheXMuXG5pZih0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIil7IC8vIENoZWNrIGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhpcyBpcyBhIGxpbmVhciBzZWFyY2g7IHBlcmZvcm1hbmNlXG4vLyBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2YgdW5pcXVlIG5lc3RlZCBvYmplY3RzLlxuZm9yKGxlbmd0aCA9IHN0YWNrLmxlbmd0aDtsZW5ndGgtLTspIHtpZihzdGFja1tsZW5ndGhdID09PSB2YWx1ZSl7IC8vIEN5Y2xpYyBzdHJ1Y3R1cmVzIGNhbm5vdCBiZSBzZXJpYWxpemVkIGJ5IGBKU09OLnN0cmluZ2lmeWAuXG50aHJvdyBUeXBlRXJyb3IoKTt9fSAvLyBBZGQgdGhlIG9iamVjdCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG5zdGFjay5wdXNoKHZhbHVlKTtyZXN1bHRzID0gW107IC8vIFNhdmUgdGhlIGN1cnJlbnQgaW5kZW50YXRpb24gbGV2ZWwgYW5kIGluZGVudCBvbmUgYWRkaXRpb25hbCBsZXZlbC5cbnByZWZpeCA9IGluZGVudGF0aW9uO2luZGVudGF0aW9uICs9IHdoaXRlc3BhY2U7aWYoY2xhc3NOYW1lID09IGFycmF5Q2xhc3MpeyAvLyBSZWN1cnNpdmVseSBzZXJpYWxpemUgYXJyYXkgZWxlbWVudHMuXG5mb3IoaW5kZXggPSAwLGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtpbmRleCA8IGxlbmd0aDtpbmRleCsrKSB7ZWxlbWVudCA9IHNlcmlhbGl6ZShpbmRleCx2YWx1ZSxjYWxsYmFjayxwcm9wZXJ0aWVzLHdoaXRlc3BhY2UsaW5kZW50YXRpb24sc3RhY2spO3Jlc3VsdHMucHVzaChlbGVtZW50ID09PSB1bmRlZj9cIm51bGxcIjplbGVtZW50KTt9cmVzdWx0ID0gcmVzdWx0cy5sZW5ndGg/d2hpdGVzcGFjZT9cIltcXG5cIiArIGluZGVudGF0aW9uICsgcmVzdWx0cy5qb2luKFwiLFxcblwiICsgaW5kZW50YXRpb24pICsgXCJcXG5cIiArIHByZWZpeCArIFwiXVwiOlwiW1wiICsgcmVzdWx0cy5qb2luKFwiLFwiKSArIFwiXVwiOlwiW11cIjt9ZWxzZSB7IC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBvYmplY3QgbWVtYmVycy4gTWVtYmVycyBhcmUgc2VsZWN0ZWQgZnJvbVxuLy8gZWl0aGVyIGEgdXNlci1zcGVjaWZpZWQgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lcywgb3IgdGhlIG9iamVjdFxuLy8gaXRzZWxmLlxuZm9yRWFjaChwcm9wZXJ0aWVzIHx8IHZhbHVlLGZ1bmN0aW9uKHByb3BlcnR5KXt2YXIgZWxlbWVudD1zZXJpYWxpemUocHJvcGVydHksdmFsdWUsY2FsbGJhY2sscHJvcGVydGllcyx3aGl0ZXNwYWNlLGluZGVudGF0aW9uLHN0YWNrKTtpZihlbGVtZW50ICE9PSB1bmRlZil7IC8vIEFjY29yZGluZyB0byBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zOiBcIklmIGBnYXBgIHt3aGl0ZXNwYWNlfVxuLy8gaXMgbm90IHRoZSBlbXB0eSBzdHJpbmcsIGxldCBgbWVtYmVyYCB7cXVvdGUocHJvcGVydHkpICsgXCI6XCJ9XG4vLyBiZSB0aGUgY29uY2F0ZW5hdGlvbiBvZiBgbWVtYmVyYCBhbmQgdGhlIGBzcGFjZWAgY2hhcmFjdGVyLlwiXG4vLyBUaGUgXCJgc3BhY2VgIGNoYXJhY3RlclwiIHJlZmVycyB0byB0aGUgbGl0ZXJhbCBzcGFjZVxuLy8gY2hhcmFjdGVyLCBub3QgdGhlIGBzcGFjZWAge3dpZHRofSBhcmd1bWVudCBwcm92aWRlZCB0b1xuLy8gYEpTT04uc3RyaW5naWZ5YC5cbnJlc3VsdHMucHVzaChxdW90ZShwcm9wZXJ0eSkgKyBcIjpcIiArICh3aGl0ZXNwYWNlP1wiIFwiOlwiXCIpICsgZWxlbWVudCk7fX0pO3Jlc3VsdCA9IHJlc3VsdHMubGVuZ3RoP3doaXRlc3BhY2U/XCJ7XFxuXCIgKyBpbmRlbnRhdGlvbiArIHJlc3VsdHMuam9pbihcIixcXG5cIiArIGluZGVudGF0aW9uKSArIFwiXFxuXCIgKyBwcmVmaXggKyBcIn1cIjpcIntcIiArIHJlc3VsdHMuam9pbihcIixcIikgKyBcIn1cIjpcInt9XCI7fSAvLyBSZW1vdmUgdGhlIG9iamVjdCBmcm9tIHRoZSB0cmF2ZXJzZWQgb2JqZWN0IHN0YWNrLlxuc3RhY2sucG9wKCk7cmV0dXJuIHJlc3VsdDt9fTsgLy8gUHVibGljOiBgSlNPTi5zdHJpbmdpZnlgLiBTZWUgRVMgNS4xIHNlY3Rpb24gMTUuMTIuMy5cbkpTT04zLnN0cmluZ2lmeSA9IGZ1bmN0aW9uKHNvdXJjZSxmaWx0ZXIsd2lkdGgpe3ZhciB3aGl0ZXNwYWNlLGNhbGxiYWNrLHByb3BlcnRpZXMsY2xhc3NOYW1lO2lmKHR5cGVvZiBmaWx0ZXIgPT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBmaWx0ZXIgPT0gXCJvYmplY3RcIiAmJiBmaWx0ZXIpe2lmKChjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKGZpbHRlcikpID09IGZ1bmN0aW9uQ2xhc3Mpe2NhbGxiYWNrID0gZmlsdGVyO31lbHNlIGlmKGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzKXsgLy8gQ29udmVydCB0aGUgcHJvcGVydHkgbmFtZXMgYXJyYXkgaW50byBhIG1ha2VzaGlmdCBzZXQuXG5wcm9wZXJ0aWVzID0ge307Zm9yKHZhciBpbmRleD0wLGxlbmd0aD1maWx0ZXIubGVuZ3RoLHZhbHVlO2luZGV4IDwgbGVuZ3RoO3ZhbHVlID0gZmlsdGVyW2luZGV4KytdLChjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKSxjbGFzc05hbWUgPT0gc3RyaW5nQ2xhc3MgfHwgY2xhc3NOYW1lID09IG51bWJlckNsYXNzKSAmJiAocHJvcGVydGllc1t2YWx1ZV0gPSAxKSk7fX1pZih3aWR0aCl7aWYoKGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwod2lkdGgpKSA9PSBudW1iZXJDbGFzcyl7IC8vIENvbnZlcnQgdGhlIGB3aWR0aGAgdG8gYW4gaW50ZWdlciBhbmQgY3JlYXRlIGEgc3RyaW5nIGNvbnRhaW5pbmdcbi8vIGB3aWR0aGAgbnVtYmVyIG9mIHNwYWNlIGNoYXJhY3RlcnMuXG5pZigod2lkdGggLT0gd2lkdGggJSAxKSA+IDApe2Zvcih3aGl0ZXNwYWNlID0gXCJcIix3aWR0aCA+IDEwICYmICh3aWR0aCA9IDEwKTt3aGl0ZXNwYWNlLmxlbmd0aCA8IHdpZHRoO3doaXRlc3BhY2UgKz0gXCIgXCIpO319ZWxzZSBpZihjbGFzc05hbWUgPT0gc3RyaW5nQ2xhc3Mpe3doaXRlc3BhY2UgPSB3aWR0aC5sZW5ndGggPD0gMTA/d2lkdGg6d2lkdGguc2xpY2UoMCwxMCk7fX0gLy8gT3BlcmEgPD0gNy41NHUyIGRpc2NhcmRzIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGVtcHR5IHN0cmluZyBrZXlzXG4vLyAoYFwiXCJgKSBvbmx5IGlmIHRoZXkgYXJlIHVzZWQgZGlyZWN0bHkgd2l0aGluIGFuIG9iamVjdCBtZW1iZXIgbGlzdFxuLy8gKGUuZy4sIGAhKFwiXCIgaW4geyBcIlwiOiAxfSlgKS5cbnJldHVybiBzZXJpYWxpemUoXCJcIiwodmFsdWUgPSB7fSx2YWx1ZVtcIlwiXSA9IHNvdXJjZSx2YWx1ZSksY2FsbGJhY2sscHJvcGVydGllcyx3aGl0ZXNwYWNlLFwiXCIsW10pO307fSAvLyBQdWJsaWM6IFBhcnNlcyBhIEpTT04gc291cmNlIHN0cmluZy5cbmlmKCFoYXMoXCJqc29uLXBhcnNlXCIpKXt2YXIgZnJvbUNoYXJDb2RlPVN0cmluZy5mcm9tQ2hhckNvZGU7IC8vIEludGVybmFsOiBBIG1hcCBvZiBlc2NhcGVkIGNvbnRyb2wgY2hhcmFjdGVycyBhbmQgdGhlaXIgdW5lc2NhcGVkXG4vLyBlcXVpdmFsZW50cy5cbnZhciBVbmVzY2FwZXM9ezkyOlwiXFxcXFwiLDM0OidcIicsNDc6XCIvXCIsOTg6XCJcXGJcIiwxMTY6XCJcXHRcIiwxMTA6XCJcXG5cIiwxMDI6XCJcXGZcIiwxMTQ6XCJcXHJcIn07IC8vIEludGVybmFsOiBTdG9yZXMgdGhlIHBhcnNlciBzdGF0ZS5cbnZhciBJbmRleCxTb3VyY2U7IC8vIEludGVybmFsOiBSZXNldHMgdGhlIHBhcnNlciBzdGF0ZSBhbmQgdGhyb3dzIGEgYFN5bnRheEVycm9yYC5cbnZhciBhYm9ydD1mdW5jdGlvbiBhYm9ydCgpe0luZGV4ID0gU291cmNlID0gbnVsbDt0aHJvdyBTeW50YXhFcnJvcigpO307IC8vIEludGVybmFsOiBSZXR1cm5zIHRoZSBuZXh0IHRva2VuLCBvciBgXCIkXCJgIGlmIHRoZSBwYXJzZXIgaGFzIHJlYWNoZWRcbi8vIHRoZSBlbmQgb2YgdGhlIHNvdXJjZSBzdHJpbmcuIEEgdG9rZW4gbWF5IGJlIGEgc3RyaW5nLCBudW1iZXIsIGBudWxsYFxuLy8gbGl0ZXJhbCwgb3IgQm9vbGVhbiBsaXRlcmFsLlxudmFyIGxleD1mdW5jdGlvbiBsZXgoKXt2YXIgc291cmNlPVNvdXJjZSxsZW5ndGg9c291cmNlLmxlbmd0aCx2YWx1ZSxiZWdpbixwb3NpdGlvbixpc1NpZ25lZCxjaGFyQ29kZTt3aGlsZShJbmRleCA8IGxlbmd0aCkge2NoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO3N3aXRjaChjaGFyQ29kZSl7Y2FzZSA5OmNhc2UgMTA6Y2FzZSAxMzpjYXNlIDMyOiAvLyBTa2lwIHdoaXRlc3BhY2UgdG9rZW5zLCBpbmNsdWRpbmcgdGFicywgY2FycmlhZ2UgcmV0dXJucywgbGluZVxuLy8gZmVlZHMsIGFuZCBzcGFjZSBjaGFyYWN0ZXJzLlxuSW5kZXgrKzticmVhaztjYXNlIDEyMzpjYXNlIDEyNTpjYXNlIDkxOmNhc2UgOTM6Y2FzZSA1ODpjYXNlIDQ0OiAvLyBQYXJzZSBhIHB1bmN0dWF0b3IgdG9rZW4gKGB7YCwgYH1gLCBgW2AsIGBdYCwgYDpgLCBvciBgLGApIGF0XG4vLyB0aGUgY3VycmVudCBwb3NpdGlvbi5cbnZhbHVlID0gY2hhckluZGV4QnVnZ3k/c291cmNlLmNoYXJBdChJbmRleCk6c291cmNlW0luZGV4XTtJbmRleCsrO3JldHVybiB2YWx1ZTtjYXNlIDM0OiAvLyBgXCJgIGRlbGltaXRzIGEgSlNPTiBzdHJpbmc7IGFkdmFuY2UgdG8gdGhlIG5leHQgY2hhcmFjdGVyIGFuZFxuLy8gYmVnaW4gcGFyc2luZyB0aGUgc3RyaW5nLiBTdHJpbmcgdG9rZW5zIGFyZSBwcmVmaXhlZCB3aXRoIHRoZVxuLy8gc2VudGluZWwgYEBgIGNoYXJhY3RlciB0byBkaXN0aW5ndWlzaCB0aGVtIGZyb20gcHVuY3R1YXRvcnMgYW5kXG4vLyBlbmQtb2Ytc3RyaW5nIHRva2Vucy5cbmZvcih2YWx1ZSA9IFwiQFwiLEluZGV4Kys7SW5kZXggPCBsZW5ndGg7KSB7Y2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7aWYoY2hhckNvZGUgPCAzMil7IC8vIFVuZXNjYXBlZCBBU0NJSSBjb250cm9sIGNoYXJhY3RlcnMgKHRob3NlIHdpdGggYSBjb2RlIHVuaXRcbi8vIGxlc3MgdGhhbiB0aGUgc3BhY2UgY2hhcmFjdGVyKSBhcmUgbm90IHBlcm1pdHRlZC5cbmFib3J0KCk7fWVsc2UgaWYoY2hhckNvZGUgPT0gOTIpeyAvLyBBIHJldmVyc2Ugc29saWR1cyAoYFxcYCkgbWFya3MgdGhlIGJlZ2lubmluZyBvZiBhbiBlc2NhcGVkXG4vLyBjb250cm9sIGNoYXJhY3RlciAoaW5jbHVkaW5nIGBcImAsIGBcXGAsIGFuZCBgL2ApIG9yIFVuaWNvZGVcbi8vIGVzY2FwZSBzZXF1ZW5jZS5cbmNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoKytJbmRleCk7c3dpdGNoKGNoYXJDb2RlKXtjYXNlIDkyOmNhc2UgMzQ6Y2FzZSA0NzpjYXNlIDk4OmNhc2UgMTE2OmNhc2UgMTEwOmNhc2UgMTAyOmNhc2UgMTE0OiAvLyBSZXZpdmUgZXNjYXBlZCBjb250cm9sIGNoYXJhY3RlcnMuXG52YWx1ZSArPSBVbmVzY2FwZXNbY2hhckNvZGVdO0luZGV4Kys7YnJlYWs7Y2FzZSAxMTc6IC8vIGBcXHVgIG1hcmtzIHRoZSBiZWdpbm5pbmcgb2YgYSBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZS5cbi8vIEFkdmFuY2UgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBhbmQgdmFsaWRhdGUgdGhlXG4vLyBmb3VyLWRpZ2l0IGNvZGUgcG9pbnQuXG5iZWdpbiA9ICsrSW5kZXg7Zm9yKHBvc2l0aW9uID0gSW5kZXggKyA0O0luZGV4IDwgcG9zaXRpb247SW5kZXgrKykge2NoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpOyAvLyBBIHZhbGlkIHNlcXVlbmNlIGNvbXByaXNlcyBmb3VyIGhleGRpZ2l0cyAoY2FzZS1cbi8vIGluc2Vuc2l0aXZlKSB0aGF0IGZvcm0gYSBzaW5nbGUgaGV4YWRlY2ltYWwgdmFsdWUuXG5pZighKGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3IHx8IGNoYXJDb2RlID49IDk3ICYmIGNoYXJDb2RlIDw9IDEwMiB8fCBjaGFyQ29kZSA+PSA2NSAmJiBjaGFyQ29kZSA8PSA3MCkpeyAvLyBJbnZhbGlkIFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlLlxuYWJvcnQoKTt9fSAvLyBSZXZpdmUgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxudmFsdWUgKz0gZnJvbUNoYXJDb2RlKFwiMHhcIiArIHNvdXJjZS5zbGljZShiZWdpbixJbmRleCkpO2JyZWFrO2RlZmF1bHQ6IC8vIEludmFsaWQgZXNjYXBlIHNlcXVlbmNlLlxuYWJvcnQoKTt9fWVsc2Uge2lmKGNoYXJDb2RlID09IDM0KXsgLy8gQW4gdW5lc2NhcGVkIGRvdWJsZS1xdW90ZSBjaGFyYWN0ZXIgbWFya3MgdGhlIGVuZCBvZiB0aGVcbi8vIHN0cmluZy5cbmJyZWFrO31jaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtiZWdpbiA9IEluZGV4OyAvLyBPcHRpbWl6ZSBmb3IgdGhlIGNvbW1vbiBjYXNlIHdoZXJlIGEgc3RyaW5nIGlzIHZhbGlkLlxud2hpbGUoY2hhckNvZGUgPj0gMzIgJiYgY2hhckNvZGUgIT0gOTIgJiYgY2hhckNvZGUgIT0gMzQpIHtjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO30gLy8gQXBwZW5kIHRoZSBzdHJpbmcgYXMtaXMuXG52YWx1ZSArPSBzb3VyY2Uuc2xpY2UoYmVnaW4sSW5kZXgpO319aWYoc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpID09IDM0KXsgLy8gQWR2YW5jZSB0byB0aGUgbmV4dCBjaGFyYWN0ZXIgYW5kIHJldHVybiB0aGUgcmV2aXZlZCBzdHJpbmcuXG5JbmRleCsrO3JldHVybiB2YWx1ZTt9IC8vIFVudGVybWluYXRlZCBzdHJpbmcuXG5hYm9ydCgpO2RlZmF1bHQ6IC8vIFBhcnNlIG51bWJlcnMgYW5kIGxpdGVyYWxzLlxuYmVnaW4gPSBJbmRleDsgLy8gQWR2YW5jZSBwYXN0IHRoZSBuZWdhdGl2ZSBzaWduLCBpZiBvbmUgaXMgc3BlY2lmaWVkLlxuaWYoY2hhckNvZGUgPT0gNDUpe2lzU2lnbmVkID0gdHJ1ZTtjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO30gLy8gUGFyc2UgYW4gaW50ZWdlciBvciBmbG9hdGluZy1wb2ludCB2YWx1ZS5cbmlmKGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KXsgLy8gTGVhZGluZyB6ZXJvZXMgYXJlIGludGVycHJldGVkIGFzIG9jdGFsIGxpdGVyYWxzLlxuaWYoY2hhckNvZGUgPT0gNDggJiYgKGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXggKyAxKSxjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1NykpeyAvLyBJbGxlZ2FsIG9jdGFsIGxpdGVyYWwuXG5hYm9ydCgpO31pc1NpZ25lZCA9IGZhbHNlOyAvLyBQYXJzZSB0aGUgaW50ZWdlciBjb21wb25lbnQuXG5mb3IoO0luZGV4IDwgbGVuZ3RoICYmIChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSxjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7SW5kZXgrKyk7IC8vIEZsb2F0cyBjYW5ub3QgY29udGFpbiBhIGxlYWRpbmcgZGVjaW1hbCBwb2ludDsgaG93ZXZlciwgdGhpc1xuLy8gY2FzZSBpcyBhbHJlYWR5IGFjY291bnRlZCBmb3IgYnkgdGhlIHBhcnNlci5cbmlmKHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSA9PSA0Nil7cG9zaXRpb24gPSArK0luZGV4OyAvLyBQYXJzZSB0aGUgZGVjaW1hbCBjb21wb25lbnQuXG5mb3IoO3Bvc2l0aW9uIDwgbGVuZ3RoICYmIChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KHBvc2l0aW9uKSxjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7cG9zaXRpb24rKyk7aWYocG9zaXRpb24gPT0gSW5kZXgpeyAvLyBJbGxlZ2FsIHRyYWlsaW5nIGRlY2ltYWwuXG5hYm9ydCgpO31JbmRleCA9IHBvc2l0aW9uO30gLy8gUGFyc2UgZXhwb25lbnRzLiBUaGUgYGVgIGRlbm90aW5nIHRoZSBleHBvbmVudCBpc1xuLy8gY2FzZS1pbnNlbnNpdGl2ZS5cbmNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO2lmKGNoYXJDb2RlID09IDEwMSB8fCBjaGFyQ29kZSA9PSA2OSl7Y2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTsgLy8gU2tpcCBwYXN0IHRoZSBzaWduIGZvbGxvd2luZyB0aGUgZXhwb25lbnQsIGlmIG9uZSBpc1xuLy8gc3BlY2lmaWVkLlxuaWYoY2hhckNvZGUgPT0gNDMgfHwgY2hhckNvZGUgPT0gNDUpe0luZGV4Kys7fSAvLyBQYXJzZSB0aGUgZXhwb25lbnRpYWwgY29tcG9uZW50LlxuZm9yKHBvc2l0aW9uID0gSW5kZXg7cG9zaXRpb24gPCBsZW5ndGggJiYgKGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQocG9zaXRpb24pLGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTtwb3NpdGlvbisrKTtpZihwb3NpdGlvbiA9PSBJbmRleCl7IC8vIElsbGVnYWwgZW1wdHkgZXhwb25lbnQuXG5hYm9ydCgpO31JbmRleCA9IHBvc2l0aW9uO30gLy8gQ29lcmNlIHRoZSBwYXJzZWQgdmFsdWUgdG8gYSBKYXZhU2NyaXB0IG51bWJlci5cbnJldHVybiArc291cmNlLnNsaWNlKGJlZ2luLEluZGV4KTt9IC8vIEEgbmVnYXRpdmUgc2lnbiBtYXkgb25seSBwcmVjZWRlIG51bWJlcnMuXG5pZihpc1NpZ25lZCl7YWJvcnQoKTt9IC8vIGB0cnVlYCwgYGZhbHNlYCwgYW5kIGBudWxsYCBsaXRlcmFscy5cbmlmKHNvdXJjZS5zbGljZShJbmRleCxJbmRleCArIDQpID09IFwidHJ1ZVwiKXtJbmRleCArPSA0O3JldHVybiB0cnVlO31lbHNlIGlmKHNvdXJjZS5zbGljZShJbmRleCxJbmRleCArIDUpID09IFwiZmFsc2VcIil7SW5kZXggKz0gNTtyZXR1cm4gZmFsc2U7fWVsc2UgaWYoc291cmNlLnNsaWNlKEluZGV4LEluZGV4ICsgNCkgPT0gXCJudWxsXCIpe0luZGV4ICs9IDQ7cmV0dXJuIG51bGw7fSAvLyBVbnJlY29nbml6ZWQgdG9rZW4uXG5hYm9ydCgpO319IC8vIFJldHVybiB0aGUgc2VudGluZWwgYCRgIGNoYXJhY3RlciBpZiB0aGUgcGFyc2VyIGhhcyByZWFjaGVkIHRoZSBlbmRcbi8vIG9mIHRoZSBzb3VyY2Ugc3RyaW5nLlxucmV0dXJuIFwiJFwiO307IC8vIEludGVybmFsOiBQYXJzZXMgYSBKU09OIGB2YWx1ZWAgdG9rZW4uXG52YXIgZ2V0PWZ1bmN0aW9uIGdldCh2YWx1ZSl7dmFyIHJlc3VsdHMsaGFzTWVtYmVycztpZih2YWx1ZSA9PSBcIiRcIil7IC8vIFVuZXhwZWN0ZWQgZW5kIG9mIGlucHV0LlxuYWJvcnQoKTt9aWYodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIpe2lmKChjaGFySW5kZXhCdWdneT92YWx1ZS5jaGFyQXQoMCk6dmFsdWVbMF0pID09IFwiQFwiKXsgLy8gUmVtb3ZlIHRoZSBzZW50aW5lbCBgQGAgY2hhcmFjdGVyLlxucmV0dXJuIHZhbHVlLnNsaWNlKDEpO30gLy8gUGFyc2Ugb2JqZWN0IGFuZCBhcnJheSBsaXRlcmFscy5cbmlmKHZhbHVlID09IFwiW1wiKXsgLy8gUGFyc2VzIGEgSlNPTiBhcnJheSwgcmV0dXJuaW5nIGEgbmV3IEphdmFTY3JpcHQgYXJyYXkuXG5yZXN1bHRzID0gW107Zm9yKDs7aGFzTWVtYmVycyB8fCAoaGFzTWVtYmVycyA9IHRydWUpKSB7dmFsdWUgPSBsZXgoKTsgLy8gQSBjbG9zaW5nIHNxdWFyZSBicmFja2V0IG1hcmtzIHRoZSBlbmQgb2YgdGhlIGFycmF5IGxpdGVyYWwuXG5pZih2YWx1ZSA9PSBcIl1cIil7YnJlYWs7fSAvLyBJZiB0aGUgYXJyYXkgbGl0ZXJhbCBjb250YWlucyBlbGVtZW50cywgdGhlIGN1cnJlbnQgdG9rZW5cbi8vIHNob3VsZCBiZSBhIGNvbW1hIHNlcGFyYXRpbmcgdGhlIHByZXZpb3VzIGVsZW1lbnQgZnJvbSB0aGVcbi8vIG5leHQuXG5pZihoYXNNZW1iZXJzKXtpZih2YWx1ZSA9PSBcIixcIil7dmFsdWUgPSBsZXgoKTtpZih2YWx1ZSA9PSBcIl1cIil7IC8vIFVuZXhwZWN0ZWQgdHJhaWxpbmcgYCxgIGluIGFycmF5IGxpdGVyYWwuXG5hYm9ydCgpO319ZWxzZSB7IC8vIEEgYCxgIG11c3Qgc2VwYXJhdGUgZWFjaCBhcnJheSBlbGVtZW50LlxuYWJvcnQoKTt9fSAvLyBFbGlzaW9ucyBhbmQgbGVhZGluZyBjb21tYXMgYXJlIG5vdCBwZXJtaXR0ZWQuXG5pZih2YWx1ZSA9PSBcIixcIil7YWJvcnQoKTt9cmVzdWx0cy5wdXNoKGdldCh2YWx1ZSkpO31yZXR1cm4gcmVzdWx0czt9ZWxzZSBpZih2YWx1ZSA9PSBcIntcIil7IC8vIFBhcnNlcyBhIEpTT04gb2JqZWN0LCByZXR1cm5pbmcgYSBuZXcgSmF2YVNjcmlwdCBvYmplY3QuXG5yZXN1bHRzID0ge307Zm9yKDs7aGFzTWVtYmVycyB8fCAoaGFzTWVtYmVycyA9IHRydWUpKSB7dmFsdWUgPSBsZXgoKTsgLy8gQSBjbG9zaW5nIGN1cmx5IGJyYWNlIG1hcmtzIHRoZSBlbmQgb2YgdGhlIG9iamVjdCBsaXRlcmFsLlxuaWYodmFsdWUgPT0gXCJ9XCIpe2JyZWFrO30gLy8gSWYgdGhlIG9iamVjdCBsaXRlcmFsIGNvbnRhaW5zIG1lbWJlcnMsIHRoZSBjdXJyZW50IHRva2VuXG4vLyBzaG91bGQgYmUgYSBjb21tYSBzZXBhcmF0b3IuXG5pZihoYXNNZW1iZXJzKXtpZih2YWx1ZSA9PSBcIixcIil7dmFsdWUgPSBsZXgoKTtpZih2YWx1ZSA9PSBcIn1cIil7IC8vIFVuZXhwZWN0ZWQgdHJhaWxpbmcgYCxgIGluIG9iamVjdCBsaXRlcmFsLlxuYWJvcnQoKTt9fWVsc2UgeyAvLyBBIGAsYCBtdXN0IHNlcGFyYXRlIGVhY2ggb2JqZWN0IG1lbWJlci5cbmFib3J0KCk7fX0gLy8gTGVhZGluZyBjb21tYXMgYXJlIG5vdCBwZXJtaXR0ZWQsIG9iamVjdCBwcm9wZXJ0eSBuYW1lcyBtdXN0IGJlXG4vLyBkb3VibGUtcXVvdGVkIHN0cmluZ3MsIGFuZCBhIGA6YCBtdXN0IHNlcGFyYXRlIGVhY2ggcHJvcGVydHlcbi8vIG5hbWUgYW5kIHZhbHVlLlxuaWYodmFsdWUgPT0gXCIsXCIgfHwgdHlwZW9mIHZhbHVlICE9IFwic3RyaW5nXCIgfHwgKGNoYXJJbmRleEJ1Z2d5P3ZhbHVlLmNoYXJBdCgwKTp2YWx1ZVswXSkgIT0gXCJAXCIgfHwgbGV4KCkgIT0gXCI6XCIpe2Fib3J0KCk7fXJlc3VsdHNbdmFsdWUuc2xpY2UoMSldID0gZ2V0KGxleCgpKTt9cmV0dXJuIHJlc3VsdHM7fSAvLyBVbmV4cGVjdGVkIHRva2VuIGVuY291bnRlcmVkLlxuYWJvcnQoKTt9cmV0dXJuIHZhbHVlO307IC8vIEludGVybmFsOiBVcGRhdGVzIGEgdHJhdmVyc2VkIG9iamVjdCBtZW1iZXIuXG52YXIgdXBkYXRlPWZ1bmN0aW9uIHVwZGF0ZShzb3VyY2UscHJvcGVydHksY2FsbGJhY2spe3ZhciBlbGVtZW50PXdhbGsoc291cmNlLHByb3BlcnR5LGNhbGxiYWNrKTtpZihlbGVtZW50ID09PSB1bmRlZil7ZGVsZXRlIHNvdXJjZVtwcm9wZXJ0eV07fWVsc2Uge3NvdXJjZVtwcm9wZXJ0eV0gPSBlbGVtZW50O319OyAvLyBJbnRlcm5hbDogUmVjdXJzaXZlbHkgdHJhdmVyc2VzIGEgcGFyc2VkIEpTT04gb2JqZWN0LCBpbnZva2luZyB0aGVcbi8vIGBjYWxsYmFja2AgZnVuY3Rpb24gZm9yIGVhY2ggdmFsdWUuIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlXG4vLyBgV2Fsayhob2xkZXIsIG5hbWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4yLlxudmFyIHdhbGs9ZnVuY3Rpb24gd2Fsayhzb3VyY2UscHJvcGVydHksY2FsbGJhY2spe3ZhciB2YWx1ZT1zb3VyY2VbcHJvcGVydHldLGxlbmd0aDtpZih0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIiAmJiB2YWx1ZSl7IC8vIGBmb3JFYWNoYCBjYW4ndCBiZSB1c2VkIHRvIHRyYXZlcnNlIGFuIGFycmF5IGluIE9wZXJhIDw9IDguNTRcbi8vIGJlY2F1c2UgaXRzIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIGltcGxlbWVudGF0aW9uIHJldHVybnMgYGZhbHNlYFxuLy8gZm9yIGFycmF5IGluZGljZXMgKGUuZy4sIGAhWzEsIDIsIDNdLmhhc093blByb3BlcnR5KFwiMFwiKWApLlxuaWYoZ2V0Q2xhc3MuY2FsbCh2YWx1ZSkgPT0gYXJyYXlDbGFzcyl7Zm9yKGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtsZW5ndGgtLTspIHt1cGRhdGUodmFsdWUsbGVuZ3RoLGNhbGxiYWNrKTt9fWVsc2Uge2ZvckVhY2godmFsdWUsZnVuY3Rpb24ocHJvcGVydHkpe3VwZGF0ZSh2YWx1ZSxwcm9wZXJ0eSxjYWxsYmFjayk7fSk7fX1yZXR1cm4gY2FsbGJhY2suY2FsbChzb3VyY2UscHJvcGVydHksdmFsdWUpO307IC8vIFB1YmxpYzogYEpTT04ucGFyc2VgLiBTZWUgRVMgNS4xIHNlY3Rpb24gMTUuMTIuMi5cbkpTT04zLnBhcnNlID0gZnVuY3Rpb24oc291cmNlLGNhbGxiYWNrKXt2YXIgcmVzdWx0LHZhbHVlO0luZGV4ID0gMDtTb3VyY2UgPSBcIlwiICsgc291cmNlO3Jlc3VsdCA9IGdldChsZXgoKSk7IC8vIElmIGEgSlNPTiBzdHJpbmcgY29udGFpbnMgbXVsdGlwbGUgdG9rZW5zLCBpdCBpcyBpbnZhbGlkLlxuaWYobGV4KCkgIT0gXCIkXCIpe2Fib3J0KCk7fSAvLyBSZXNldCB0aGUgcGFyc2VyIHN0YXRlLlxuSW5kZXggPSBTb3VyY2UgPSBudWxsO3JldHVybiBjYWxsYmFjayAmJiBnZXRDbGFzcy5jYWxsKGNhbGxiYWNrKSA9PSBmdW5jdGlvbkNsYXNzP3dhbGsoKHZhbHVlID0ge30sdmFsdWVbXCJcIl0gPSByZXN1bHQsdmFsdWUpLFwiXCIsY2FsbGJhY2spOnJlc3VsdDt9O319IC8vIEV4cG9ydCBmb3IgYXN5bmNocm9ub3VzIG1vZHVsZSBsb2FkZXJzLlxuaWYoaXNMb2FkZXIpe2RlZmluZShmdW5jdGlvbigpe3JldHVybiBKU09OMzt9KTt9fSkodGhpcyk7fSx7fV0sNTA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe21vZHVsZS5leHBvcnRzID0gdG9BcnJheTtmdW5jdGlvbiB0b0FycmF5KGxpc3QsaW5kZXgpe3ZhciBhcnJheT1bXTtpbmRleCA9IGluZGV4IHx8IDA7Zm9yKHZhciBpPWluZGV4IHx8IDA7aSA8IGxpc3QubGVuZ3RoO2krKykge2FycmF5W2kgLSBpbmRleF0gPSBsaXN0W2ldO31yZXR1cm4gYXJyYXk7fX0se31dfSx7fSxbMV0pKDEpO30pO31cblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzEwMGI1VXR5TkpMTmFpaDQyZWRuRWdOJywgJ3ZpZGVvcGxheWVyJyk7XG4vLyBjYXNlc1xcMDJfdWlcXDA5X3ZpZGVvcGxheWVyXFx2aWRlb3BsYXllci5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdmlkZW9QbGF5ZXI6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuVmlkZW9QbGF5ZXJcbiAgICAgICAgfSxcbiAgICAgICAgc3RhdHVzTGFiZWw6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgcGxheTogZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgdGhpcy52aWRlb1BsYXllci5wbGF5KCk7XG4gICAgfSxcblxuICAgIHBhdXNlOiBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgICAgdGhpcy52aWRlb1BsYXllci5wYXVzZSgpO1xuICAgIH0sXG5cbiAgICB0b2dnbGVGdWxsc2NyZWVuOiBmdW5jdGlvbiB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgICAgICB0aGlzLnZpZGVvUGxheWVyLmlzRnVsbHNjcmVlbiA9IHRydWU7XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIHRoaXMudmlkZW9QbGF5ZXIuc3RvcCgpO1xuICAgIH0sXG5cbiAgICBrZWVwUmF0aW9Td2l0Y2g6IGZ1bmN0aW9uIGtlZXBSYXRpb1N3aXRjaCgpIHtcbiAgICAgICAgdGhpcy52aWRlb1BsYXllci5rZWVwQXNwZWN0UmF0aW8gPSAhdGhpcy52aWRlb1BsYXllci5rZWVwQXNwZWN0UmF0aW87XG4gICAgfSxcblxuICAgIG9uVmlkZW9QbGF5ZXJFdmVudDogZnVuY3Rpb24gb25WaWRlb1BsYXllckV2ZW50KHNlbmRlciwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zdGF0dXNMYWJlbC5zdHJpbmcgPSBldmVudDtcbiAgICB9LFxuXG4gICAgdG9nZ2xlVmlzaWJpbGl0eTogZnVuY3Rpb24gdG9nZ2xlVmlzaWJpbGl0eSgpIHtcbiAgICAgICAgdGhpcy52aWRlb1BsYXllci5lbmFibGVkID0gIXRoaXMudmlkZW9QbGF5ZXIuZW5hYmxlZDtcbiAgICB9LFxuXG4gICAgcGxheU9ubGluZVZpZGVvOiBmdW5jdGlvbiBwbGF5T25saW5lVmlkZW8oKSB7XG4gICAgICAgIHRoaXMudmlkZW9QbGF5ZXIucmVzb3VyY2VUeXBlID0gMDtcbiAgICAgICAgdGhpcy52aWRlb1BsYXllci51cmwgPSBcImh0dHA6Ly9iZW5jaG1hcmsuY29jb3MyZC14Lm9yZy9jb2Nvc3ZpZGVvLm1wNFwiO1xuICAgICAgICB0aGlzLnZpZGVvUGxheWVyLnBsYXkoKTtcbiAgICB9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnODdmMWZzMGdvaEhESWZOZzRhZVBYYnQnLCAnemgnKTtcbi8vIGkxOG5cXGRhdGFcXHpoLmpzXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBcIlRlc3RMaXN0LmZpcmUuMzBcIjogXCLov5Tlm57liJfooahcIixcbiAgXCJUZXN0TGlzdC5maXJlLjM3XCI6IFwi5p+l55yL6K+05piOXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDFfc3ByaXRlL0F0bGFzU3ByaXRlLmZpcmUuN1wiOiBcIui/meS4queyvueBteadpeiHquWNleW8oOWbvueJh1wiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9BdGxhc1Nwcml0ZS5maXJlLjExXCI6IFwi6L+Z5Liq57K+54G15p2l6Ieq5Zu+6ZuGXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDFfc3ByaXRlL0ZpbGxlZFNwcml0ZS5maXJlLjlcIjogXCLloavlhYXnsbvlnovvvJrmsLTlubNcIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMV9zcHJpdGUvRmlsbGVkU3ByaXRlLmZpcmUuMTVcIjogXCLloavlhYXnsbvlnovvvJrlnoLnm7RcIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMV9zcHJpdGUvRmlsbGVkU3ByaXRlLmZpcmUuMjNcIjogXCLloavlhYXnsbvlnovvvJrlnIblvaJcIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMV9zcHJpdGUvU2ltcGxlU3ByaXRlLmZpcmUuN1wiOiBcIui/meaYr+aZrumAmueyvueBtVwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9TbGljZWRTcHJpdGUuZmlyZS43XCI6IFwi6L+Z5piv5Lmd5a6r5qC857K+54G1XCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDFfc3ByaXRlL1RpbGVkU3ByaXRlLmZpcmUuNlwiOiBcIui/meaYr+W5s+mTuueyvueBtVwiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAxX3Nwcml0ZS9UcmltbWVkU3ByaXRlLmZpcmUuN1wiOiBcIuiHquWKqOWJquijgSBcIixcbiAgXCJjYXNlcy8wMV9ncmFwaGljcy8wMV9zcHJpdGUvVHJpbW1lZFNwcml0ZS5maXJlLjEyXCI6IFwi5pyq6Ieq5Yqo5Ymq6KOBXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDJfcGFydGljbGUvQXV0b1JlbW92ZVBhcnRpY2xlLmZpcmUuOVwiOiBcIueykuWtkCAxXFxuXFxcIuWujOaIkOaXtuiHquWKqOenu+mZpFxcXCIg56aB5q2iXCIsXG4gIFwiY2FzZXMvMDFfZ3JhcGhpY3MvMDJfcGFydGljbGUvQXV0b1JlbW92ZVBhcnRpY2xlLmZpcmUuMTNcIjogXCLnspLlrZAgMlxcblxcXCLlrozmiJDml7boh6rliqjnp7vpmaRcXFwiIOW8gOWQr1wiLFxuICBcImNhc2VzLzAxX2dyYXBoaWNzLzAyX3BhcnRpY2xlL1RvZ2dsZVBhcnRpY2xlLmZpcmUuNlwiOiBcIuaMiSBcXFwi56m65qC86ZSuXFxcIiDlvIDlhbPnspLlrZDmkq3mlL5cIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS43XCI6IFwi5bem5LiKXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuOVwiOiBcInRvcDogMTAlIGxlZnQ6IDYlXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuMTRcIjogXCLkuIpcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4xNlwiOiBcInRvcDogLTM0cHhcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4yMVwiOiBcIuWPs+S4ilwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjIzXCI6IFwidG9wOiAxMCUgcmlnaHQ6IDYlXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuMjhcIjogXCLlt6ZcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4zMFwiOiBcImxlZnQ6IC01MHB4XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuMzVcIjogXCLlj7NcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS4zN1wiOiBcInJpZ2h0OiAtNTBweFwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjQyXCI6IFwi5bem5LiLXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuNDRcIjogXCJib3R0b206IDEwJSBsZWZ0OiA2JVwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BZHZhbmNlZFdpZGdldC5maXJlLjQ5XCI6IFwi5LiLXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuNTFcIjogXCJib3R0b206IC0zNHB4XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L0FkdmFuY2VkV2lkZ2V0LmZpcmUuNTZcIjogXCLlj7PkuItcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS41OFwiOiBcImJvdHRvbToxMCUgcmlnaHQ6NiVcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQWR2YW5jZWRXaWRnZXQuZmlyZS42M1wiOiBcIumrmOe6p+aMguS7tlwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BbGlnbk9uY2VXaWRnZXQuZmlyZS4xM1wiOiBcIuWvuem9kOS4gOasoTogdHJ1ZVwiLFxuICBcImNhc2VzLzAyX3VpLzAxX3dpZGdldC9BbGlnbk9uY2VXaWRnZXQuZmlyZS4xOVwiOiBcIuWvuem9kOS4gOasoTogZmFsc2VcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQW5pbWF0ZWRXaWRnZXQuZmlyZS45XCI6IFwi5Yqo55S75oyC5Lu244CCXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDFfd2lkZ2V0L1dpZGdldEFsaWduLmZpcmUuMThcIjogXCLmjILku7blr7npvZDmlrnlvI/jgIJcIixcbiAgXCJjYXNlcy8wMl91aS8wMV93aWRnZXQvQXV0b1Jlc2l6ZS5maXJlLjEzXCI6IFwi5oyC5Lu26Ieq5Yqo6LCD5pW05aSn5bCP44CCXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvR29sZEJlYXRpbmdBbmltZS5qcy4xXCI6IFwiMFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuNlwiOiBcIuaWh+acrOWvuem9kFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuOVwiOiBcIuawtOW5s+Wvuem9kFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMTRcIjogXCLlk4jllbDvvIFcXG7mrKLov47kvb/nlKggXFxuQ29jb3MgQ3JlYXRvclwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMTZcIjogXCLlr7npvZA6IOmdoOW3plwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMjFcIjogXCLlk4jllbDvvIFcXG7mrKLov47kvb/nlKggXFxuQ29jb3MgQ3JlYXRvclwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMjNcIjogXCLlr7npvZA6IOWxheS4rVwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMjhcIjogXCLlk4jllbDvvIFcXG7mrKLov47kvb/nlKggXFxuQ29jb3MgQ3JlYXRvclwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMzBcIjogXCLlr7npvZA6IOmdoOWPs1wiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL0FsaWduRm9udExhYmVsLmZpcmUuMzNcIjogXCLlnoLnm7Tlr7npvZBcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjM4XCI6IFwi5qyi6L+O5L2/55SoIFxcbkNvY29zIENyZWF0b3JcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjQwXCI6IFwi5a+56b2QOiDpobbpg6hcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjQ1XCI6IFwi5qyi6L+O5L2/55SoIFxcbkNvY29zIENyZWF0b3JcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjQ3XCI6IFwi5a+56b2QOiDlsYXkuK1cIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjUyXCI6IFwi5qyi6L+O5L2/55SoIFxcbkNvY29zIENyZWF0b3JcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9BbGlnbkZvbnRMYWJlbC5maXJlLjU0XCI6IFwi5a+56b2QOiDlupXpg6hcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS42XCI6IFwi57O757uf5a2X5L2TXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuOVwiOiBcIuaNouihjFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjE0XCI6IFwi6L+Z5piv57O757uf6buY6K6k5a2X5L2TXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuMTZcIjogXCJPdmVyZmxvdzogQ0xBTVBcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS4yMVwiOiBcIui/meaYr+ezu+e7n+m7mOiupOWtl+S9k1wiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjIzXCI6IFwiT3ZlcmZsb3c6IFNIUklOS1wiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjI2XCI6IFwi5LiN5o2i6KGMXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuMzFcIjogXCLov5nmmK/ns7vnu5/pu5jorqTlrZfkvZNcIixcbiAgXCJjYXNlcy8wMl91aS8wMl9sYWJlbC9TeXN0ZW1Gb250TGFiZWwuZmlyZS4zM1wiOiBcIk92ZXJmbG93OiBDTEFNUFwiLFxuICBcImNhc2VzLzAyX3VpLzAyX2xhYmVsL1N5c3RlbUZvbnRMYWJlbC5maXJlLjM4XCI6IFwi6L+Z5piv57O757uf6buY6K6k5a2X5L2TXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuNDBcIjogXCJPdmVyZmxvdzogU0hSSU5LXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuNDVcIjogXCLlk4jllr0hIOasoui/juS9v+eUqCBDb2NvcyBDcmVhdG9yXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDJfbGFiZWwvU3lzdGVtRm9udExhYmVsLmZpcmUuNDdcIjogXCJPdmVyZmxvdzogUkVTWklFX0hFSUdIVFwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25Db250cm9sMS5qcy4xXCI6IFwi5bem6L6555qE5oyJ6ZKu6KKr54K55Ye777yBXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkNvbnRyb2wxLmpzLjJcIjogXCLlj7PovrnnmoTmjInpkq7ooqvngrnlh7vvvIFcIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW5TY3JvbGwuZmlyZS4yMVwiOiBcIuWTquS4quaMiemSruiiq+eCueWHu++8n1wiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JblNjcm9sbC5maXJlLjI3XCI6IFwi5ouW5Yqo5pi+56S65pu05aSa5oyJ6ZKuXFxuXFxuXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkludGVyYWN0YWJsZS5maXJlLjdcIjogXCLmkq3mlL5cIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW50ZXJhY3RhYmxlLmZpcmUuMTZcIjogXCLlgZzmraJcIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW50ZXJhY3RhYmxlLmZpcmUuMjFcIjogXCLkuqTkupIoaW50ZXJhY3RhYmxlKTogdHJ1ZVwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JbnRlcmFjdGFibGUuZmlyZS4yM1wiOiBcIuS6pOS6kihpbnRlcmFjdGFibGUpOiBmYWxzZVwiLFxuICBcImNhc2VzLzAyX3VpLzAzX2J1dHRvbi9CdXR0b25JbnRlcmFjdGFibGUuanMuMVwiOiBcIuS6pOS6kihpbnRlcmFjdGFibGUpOiBcIixcbiAgXCJjYXNlcy8wMl91aS8wM19idXR0b24vQnV0dG9uSW50ZXJhY3RhYmxlLmpzLjJcIjogXCLkuqTkupIoaW50ZXJhY3RhYmxlKTogXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDNfYnV0dG9uL1NpbXBsZUJ1dHRvbi5maXJlLjZcIjogXCLlk6rkuKrmjInpkq7ooqvngrnlh7vvvJ9cIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L0l0ZW0uanMuMVwiOiBcIlRtcGwjXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDRfcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIuZmlyZS43XCI6IFwi5rC05bmz6L+b5bqm5p2h77yM6L+b5bqmIDAuM1wiLFxuICBcImNhc2VzLzAyX3VpLzA0X3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmZpcmUuMTFcIjogXCLlj43lkJHmsLTlubPov5vluqbmnaHvvIzov5vluqYgMS4wXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDRfcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIuZmlyZS4xNVwiOiBcIuWeguebtOi/m+W6puadoSBcXG7ku47kuIvlkJHkuIpcIixcbiAgXCJjYXNlcy8wMl91aS8wNF9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5maXJlLjE5XCI6IFwi5Z6C55u06L+b5bqm5p2hIFxcbuS7juS4iuWQkeS4i1wiLFxuICBcImNhc2VzLzAyX3VpLzA0X3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmZpcmUuMjNcIjogXCLorr7nva7kuobnsr7ngbXnmoTov5vluqbmnaFcIixcbiAgXCJjYXNlcy8wMl91aS8wNF9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5maXJlLjI4XCI6IFwi6K6+572u5LqG57K+54G177yI5a2Q5o6n5Lu277yJ55qE6L+b5bqm5p2hXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDVfc2Nyb2xsVmlldy9MaXN0Vmlldy5maXJlLjIzXCI6IFwiSXRlbSAjMDBcIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L1Njcm9sbFZpZXcuZmlyZS43XCI6IFwiU2Nyb2xsdmlldyDlrozmlbTlip/og71cIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L1Njcm9sbFZpZXcuZmlyZS4zMFwiOiBcIlNjcm9sbHZpZXcg5rKh5pyJ5oOv5oCnXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDVfc2Nyb2xsVmlldy9TY3JvbGxWaWV3LmZpcmUuNTNcIjogXCJTY3JvbGx2aWV3IOayoeacieW8ueaAp1wiLFxuICBcImNhc2VzLzAyX3VpLzA1X3Njcm9sbFZpZXcvU2Nyb2xsVmlldy5maXJlLjc2XCI6IFwiU2Nyb2xsdmlldyDlj6rog73msLTlubPmu5rliqhcIixcbiAgXCJjYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L1Njcm9sbFZpZXcuZmlyZS45M1wiOiBcIlNjcm9sbHZpZXcg5Y+q6IO95Z6C55u05rua5YqoXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDVfc2Nyb2xsVmlldy9TY3JvbGxWaWV3LmZpcmUuMTEwXCI6IFwiU2Nyb2xsdmlldyDmsqHmnInmu5rliqjmnaFcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0SW5TY3JvbGxWaWV3LmZpcmUuNlwiOiBcIlNjcm9sbFZpZXcg5ZKM5Z6C55u05biD5bGA5a655ZmoXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dEluU2Nyb2xsVmlldy5maXJlLjQwXCI6IFwiU2Nyb2xsVmlldyDlkozmsLTlubPluIPlsYDlrrnlmahcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0SW5TY3JvbGxWaWV3LmZpcmUuNzRcIjogXCJTY3JvbGxWaWV3IOWSjOaoquWQkee9keagvOW4g+WxgOWuueWZqCBcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0SW5TY3JvbGxWaWV3LmZpcmUuMTQ0XCI6IFwiU2Nyb2xsVmlldyDlkoznurXlkJHnvZHmoLzluIPlsYDlrrnlmaggXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNoaWxkcmVuLmZpcmUuNlwiOiBcIuawtOW5s+W4g+WxgOWuueWZqFwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXRSZXNpemVDaGlsZHJlbi5maXJlLjMxXCI6IFwi5Z6C55u05biD5bGA5a655ZmoXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNoaWxkcmVuLmZpcmUuNDhcIjogXCLmqKrlkJHnvZHmoLzluIPlsYDlrrnlmahcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0UmVzaXplQ2hpbGRyZW4uZmlyZS44NVwiOiBcIue6teWQkee9keagvOW4g+WxgOWuueWZqFwiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXRSZXNpemVDb250YWluZXIuZmlyZS42XCI6IFwi5Z+65pysXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNvbnRhaW5lci5maXJlLjMxXCI6IFwi5rC05bmzXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNvbnRhaW5lci5maXJlLjM2XCI6IFwi5Z6C55u0XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNvbnRhaW5lci5maXJlLjQxXCI6IFwi5qiq5ZCR572R5qC85biD5bGA5a655ZmoXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDZfbGF5b3V0L0xheW91dFJlc2l6ZUNvbnRhaW5lci5maXJlLjQ2XCI6IFwi57q15ZCR572R5qC85biD5bGA5a655ZmoXCIsXG4gIFwiY2FzZXMvMDJfdWkvMDdfY2hhbmdlX2NhbnZhc19hbmNob3IvQm90dG9tTGVmdEFuY2hvci5maXJlLjhcIjogXCJ4OjAsIHk6MFwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2NoYW5nZV9jYW52YXNfYW5jaG9yL0JvdHRvbUxlZnRBbmNob3IuZmlyZS4xMlwiOiBcIng6NDgwLCB5OjMyMFwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2NoYW5nZV9jYW52YXNfYW5jaG9yL0JvdHRvbUxlZnRBbmNob3IuZmlyZS4xNlwiOiBcIng6OTYwLCB5OjY0MFwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2VkaXRCb3gvZWRpdGJveC5qcy4xXCI6IFwi6L6T5YWl5paH5pysOiBcIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0Tm9uZS5maXJlLjZcIjogXCLln7rmnKzluIPlsYDlrrnlmagsIOexu+Weizogbm9uZVxcbuiHquWKqOiwg+aVtOWkp+Wwj1wiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXROb25lLmZpcmUuMzVcIjogXCLmsLTlubPluIPlsYDlrrnlmahcXG7kuI3oh6rliqjosIPmlbTlpKflsI9cIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0Tm9uZS5maXJlLjYwXCI6IFwi5Z6C55u05biD5bGA5a655ZmoLCDnsbvlnos6IG5vbmVcXG7kuI3oh6rliqjosIPmlbTlpKflsI9cIixcbiAgXCJjYXNlcy8wMl91aS8wNl9sYXlvdXQvTGF5b3V0Tm9uZS5maXJlLjc3XCI6IFwi5qiq5ZCR572R5qC85biD5bGA5a655ZmoIFxcbuS4jeiHquWKqOiwg+aVtOWkp+Wwj1wiLFxuICBcImNhc2VzLzAyX3VpLzA2X2xheW91dC9MYXlvdXROb25lLmZpcmUuMTQyXCI6IFwi57q15ZCR572R5qC85biD5bGA5a655ZmoIFxcbuS4jeiHquWKqOiwg+aVtOWkp+Wwj1wiLFxuICBcImNhc2VzLzAyX3VpLzA3X2VkaXRCb3gvRWRpdEJveC5maXJlLjI1XCI6IFwi5Y2V6KGM5a+G56CB5qGGOlwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2VkaXRCb3gvRWRpdEJveC5maXJlLjI3XCI6IFwi5Y2V6KGM5paH5pys5qGGOlwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2VkaXRCb3gvRWRpdEJveC5maXJlLjI5XCI6IFwi5aSa6KGM5paH5pys5qGGOlwiLFxuICBcImNhc2VzLzAyX3VpLzA3X2VkaXRCb3gvRWRpdEJveC5maXJlLjMyXCI6IFwi54K55Ye7XCIsXG4gIFwiY2FzZXMvMDJfdWkvMDdfZWRpdEJveC9FZGl0Qm94LmZpcmUuMzhcIjogXCLmjInpkq7lv4XpobvlnKggRWRpdEJveCDnmoTkuIrpnaIsIFxcbuW5tuS4lOWug+W6lOivpeWFgeiuuOeCueWHuy5cIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wMV9wbGF5ZXJfY29udHJvbC9LZXlib2FyZElucHV0LmZpcmUuNlwiOiBcIuaMiSAnQScg5oiWICdEJyDplK7mjqfliLblsI/nu7XnvopcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wMV9wbGF5ZXJfY29udHJvbC9TcHJpdGVGb2xsb3dUb3VjaC5qcy4xXCI6IFwidG91Y2ggKFwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAxX3BsYXllcl9jb250cm9sL1RvdWNoSW5wdXQuZmlyZS4xMFwiOiBcIuivt+inpuaRuOS7u+aEj+S9jee9ruivleivlVwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAyX2FjdGlvbnMvU2ltcGxlQWN0aW9uLmZpcmUuMTNcIjogXCLnroDljZXnmoTliqjkvZxcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vQW5pbWF0ZUN1c3RvbVByb3BlcnR5LmZpcmUuMTRcIjogXCJMYWJlbFwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9BbmltYXRlQ3VzdG9tUHJvcGVydHkuZmlyZS4xOFwiOiBcIuiHquWumuS5ieWKqOeUu+WxnuaAp1wiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9BbmltYXRpb25FdmVudC5qcy4xXCI6IFwi5byA5aeL56ysXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL0FuaW1hdGlvbkV2ZW50LmZpcmUuNlwiOiBcIuW8gOWni+esrDHkuKrliqjnlLtcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vQW5pbWF0aW9uRXZlbnQuZmlyZS4xNFwiOiBcIuWKqOeUu+S6i+S7tlwiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9Nb3ZlQW5pbWF0aW9uLmZpcmUuMTFcIjogXCJMaW5lYXJcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vTW92ZUFuaW1hdGlvbi5maXJlLjE3XCI6IFwiQ2FzZSBJbiBFeHBvXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL01vdmVBbmltYXRpb24uZmlyZS4yM1wiOiBcIkNhc2UgT3V0IEV4cG9cIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vTW92ZUFuaW1hdGlvbi5maXJlLjI5XCI6IFwiQ2FzZSBPdXQgSW4gRXhwb1wiLFxuICBcImNhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9Nb3ZlQW5pbWF0aW9uLmZpcmUuMzVcIjogXCJCYWNrIEZvcndhcmRcIixcbiAgXCJjYXNlcy8wM19nYW1lcGxheS8wM19hbmltYXRpb24vTW92ZUFuaW1hdGlvbi5maXJlLjQxXCI6IFwi6L+Z5piv5LiA5Liq56e75Yqo5Yqo55S744CCXCIsXG4gIFwiY2FzZXMvMDNfZ2FtZXBsYXkvMDNfYW5pbWF0aW9uL1Nwcml0ZUFuaW1hdGlvbi5maXJlLjlcIjogXCLov5nmmK/nsr7ngbXluKfliqjnlLtcIixcbiAgXCJjYXNlcy8wNF9hdWRpby9TaW1wbGVBdWRpby5maXJlLjZcIjogXCLkuqvlj5fpn7PkuZAhXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvTm9kZUFycmF5LmZpcmUuMTRcIjogXCLov5nmmK/oioLngrnmlbDnu4RcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDFfcHJvcGVydGllcy9Ob25TZXJpYWxpemVkLmZpcmUuNlwiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvTm9uU2VyaWFsaXplZC5maXJlLjhcIjogXCJMYWJlbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wMV9wcm9wZXJ0aWVzL05vblNlcmlhbGl6ZWQuZmlyZS4xMFwiOiBcIui/meaYr+mdnuW6j+WIl+WMllwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wMV9wcm9wZXJ0aWVzL1JlZmVyZW5jZVR5cGUuZmlyZS44XCI6IFwiTGFiZWxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDFfcHJvcGVydGllcy9SZWZlcmVuY2VUeXBlLmZpcmUuMTFcIjogXCLov5nkuKrkvovlrZDkuI3ljIXmi6zov5DooYzml7bmvJTnpLpcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDFfcHJvcGVydGllcy9WYWx1ZVR5cGUuZmlyZS42XCI6IFwi6L+Z5Liq5L6L5a2Q5LiN5YyF5ous6L+Q6KGM5pe25ryU56S6XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzAyX3ByZWZhYi9JbnN0YW50aWF0ZVByZWZhYi5maXJlLjdcIjogXCLlrp7kvovljJbpooTliLbotYTmupBcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL0V2ZW50SW5NYXNrLmZpcmUuMjNcIjogXCLmm7TmlLnoioLngrnmjpLluo9cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL1NpbXBsZUV2ZW50LmZpcmUuMTlcIjogXCLop6bmkbjkuovku7blj6/ku6XmlK/mjIHngrnlh7tcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL1NpbXBsZUV2ZW50LmZpcmUuMjFcIjogXCLpvKDmoIfkuovku7blj6/ku6XmlK/mjIHljZXlh7vjgIHmgqzlgZzjgIHmu5rova5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL1NpbXBsZUV2ZW50LmZpcmUuMjNcIjogXCLoh6rlrprkuYnkuovku7blj6/ku6XmiYvliqjop6blj5FcXG4o54K55Ye75LiK6Z2i55qE5oyJ6ZKuKVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wM19ldmVudHMvU2ltcGxlRXZlbnQuZmlyZS4yNVwiOiBcIuWfuuacrOS6i+S7tlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wM19ldmVudHMvVG91Y2hQcm9wYWdhdGlvbi5maXJlLjE1XCI6IFwi6Kem5pG45LqL5Lu25YaS5rOhXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA0X3NjaGVkdWxlci9zY2hlZHVsZUNhbGxiYWNrcy5qcy4xXCI6IFwiNS4wMCBzXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA0X3NjaGVkdWxlci9zY2hlZHVsZXIuZmlyZS45XCI6IFwiNS4wMCBzXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA0X3NjaGVkdWxlci9zY2hlZHVsZXIuZmlyZS4xMlwiOiBcIumHjeWkjeWumuaXtuWZqFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNF9zY2hlZHVsZXIvc2NoZWR1bGVyLmZpcmUuMThcIjogXCLlj5bmtojlrprml7blmahcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDRfc2NoZWR1bGVyL3NjaGVkdWxlci5maXJlLjI0XCI6IFwi5a6a5pe25omn6KGMMeasoVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNF9zY2hlZHVsZXIvc2NoZWR1bGVyLmZpcmUuMjlcIjogXCLkvb/nlKggdXBkYXRlIOWHveaVsOavj+W4p+abtOaWsOiuoeaVsFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wNF9zY2hlZHVsZXIvc2NoZWR1bGVyLmZpcmUuMzFcIjogXCLlrprml7blmahcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDVfY3Jvc3NfcmVmZXJlbmNlL0Nyb3NzUmVmZXJlbmNlLmZpcmUuN1wiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA1X2Nyb3NzX3JlZmVyZW5jZS9Dcm9zc1JlZmVyZW5jZS5maXJlLjEyXCI6IFwiTGFiZWxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDVfY3Jvc3NfcmVmZXJlbmNlL0Nyb3NzUmVmZXJlbmNlLmZpcmUuMTRcIjogXCLkuqTlj4nlvJXnlKhcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDZfbGlmZV9jeWNsZS9saWZlX2N5Y2xlLmZpcmUuNlwiOiBcIueUn+WRveWRqOacn1wiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjVcIjogXCLotYTmupDliqDovb1cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuZmlyZS45XCI6IFwi5Yqg6L29IFNwcml0ZUZyYW1lXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuMTVcIjogXCLliqDovb0gVGV4dHVyZVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjIxXCI6IFwi5Yqg6L29IEF1ZGlvXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuMjdcIjogXCLliqDovb0gVHh0XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuMzNcIjogXCLliqDovb0gRm9udFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjM5XCI6IFwi5Yqg6L29IFBsaXN0XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuNDVcIjogXCLliqDovb0gUHJlZmFiXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmZpcmUuNTFcIjogXCLliqDovb0gU2NlbmVcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuZmlyZS41N1wiOiBcIuWKoOi9vSBBbmltYXRpb25cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuZmlyZS41OVwiOiBcIuWKoOi9vSBTcGluZVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0Fzc2V0TG9hZGluZy5maXJlLjY1XCI6IFwi5b2T5YmN5bCa5peg5Yqg6L2944CCXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmpzLjFcIjogXCLlt7LliqDovb0gXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmpzLjJcIjogXCLmkq3mlL4gXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmpzLjNcIjogXCLliJvlu7ogXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvQXNzZXRMb2FkaW5nLmpzLjRcIjogXCLmkq3mlL7pn7PkuZDjgIJcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Bc3NldExvYWRpbmcuanMuNVwiOiBcIui/meaYr+Wtl+S9k++8gVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0xvYWRSZXMuZmlyZS43XCI6IFwi5oyJ57G75Z6LXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvTG9hZFJlcy5maXJlLjEwXCI6IFwi5Yqg6L29IFNwcml0ZUZyYW1lXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvTG9hZFJlcy5maXJlLjE3XCI6IFwi5oyJIFVybFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0xvYWRSZXMuZmlyZS4yMFwiOiBcIuWKoOi9vemihOWItui1hOa6kFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0xvYWRSZXNBbGwuZmlyZS42XCI6IFwi6L+Z5Liq5L6L5a2Q5LiN5YyF5ous6L+Q6KGM5pe25ryU56S6XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA3X2Fzc2V0X2xvYWRpbmcvTG9hZFJlc0FsbC5maXJlLjI0XCI6IFwiTG9hZCBBbGxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMDdfYXNzZXRfbG9hZGluZy9Mb2FkUmVzQWxsLmZpcmUuMzBcIjogXCJMb2FkIFNwcml0ZUZyYW1lIEFsbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wN19hc3NldF9sb2FkaW5nL0xvYWRSZXNBbGwuZmlyZS4zNlwiOiBcIkNsZWFyIEFsbFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8wOF9tb2R1bGUvbG9hZF9tb2R1bGUuZmlyZS42XCI6IFwi5Yqg6L295qih5Z2XXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA4X21vZHVsZS9sb2FkX21vZHVsZS5maXJlLjEwXCI6IFwi5Yib5bu65oCq54mpXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzA5X3NpbmdsZXRvbi9TaW5nbGV0b24uZmlyZS42XCI6IFwi6L+Z5L6L5a2Q5LiN5YyF5ZCr6L+Q6KGM5pe25ryU56S6XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzEwX2xvYWRpbmdCYXIvTG9hZGluZ0JhckN0cmwuanMuMVwiOiBcIuS4i+i9veWujOaIkCEhXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzEwX2xvYWRpbmdCYXIvTG9hZGluZ0JhckN0cmwuanMuMlwiOiBcIuato+WcqOS4i+i9vTogXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzEwX2xvYWRpbmdCYXIvbG9hZGluZ0Jhci5maXJlLjdcIjogXCLliqDovb3lrozmiJBcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTBfbG9hZGluZ0Jhci9sb2FkaW5nQmFyLmZpcmUuMThcIjogXCLmraPlnKjkuIvovb1cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4xXCI6IFwi6K+356iN562JLi4uXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuMlwiOiBcIuivt+eojeetiS4uLlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjNcIjogXCLor7fnqI3nrYkuLi5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy40XCI6IFwi6K+356iN562JLi4uXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuNVwiOiBcIldlYlNvY2tldFxcbuWPkemAgeS6jOi/m+WItldT5bey5omT5byALlwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjZcIjogXCJXZWJTb2NrZXRcXG7mlLbliLDlk43lupQuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuN1wiOiBcIldlYlNvY2tldFxcbuWPkemAgeS6jOi/m+WItumBh+WIsOmUmeivry5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy44XCI6IFwiV2ViU29ja2V0XFxud2Vic29ja2V0IOWunuS+i+W3suWFs+mXrS5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy45XCI6IFwiV2ViU29ja2V0XFxu5Y+R6YCB5LqM6L+b5Yi2V1PnrYnlvoXkuK0uLi5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4xMFwiOiBcIldlYlNvY2tldFxcblwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjExXCI6IFwiU29ja2V0SU9cXG5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9OZXR3b3JrQ3RybC5qcy4xMlwiOiBcIlNvY2tldElPXFxuXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvTmV0d29ya0N0cmwuanMuMTNcIjogXCJTb2NrZXRJT1xcblwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL05ldHdvcmtDdHJsLmpzLjE0XCI6IFwiU29ja2V0SU9cXG5cIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9uZXR3b3JrLmZpcmUuN1wiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvbmV0d29yay5maXJlLjZcIjogXCJYTUxIdHRwUmVxdWVzdFwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL25ldHdvcmsuZmlyZS4xMVwiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvbmV0d29yay5maXJlLjEwXCI6IFwiWE1MSHR0cFJlcXVlc3QgKEFycmF5QnVmZmVyKVwiLFxuICBcImNhc2VzLzA1X3NjcmlwdGluZy8xMV9uZXR3b3JrL25ldHdvcmsuZmlyZS4xNVwiOiBcIkxhYmVsXCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvbmV0d29yay5maXJlLjE0XCI6IFwiV2ViU29ja2V0XCIsXG4gIFwiY2FzZXMvMDVfc2NyaXB0aW5nLzExX25ldHdvcmsvbmV0d29yay5maXJlLjE5XCI6IFwiTGFiZWxcIixcbiAgXCJjYXNlcy8wNV9zY3JpcHRpbmcvMTFfbmV0d29yay9uZXR3b3JrLmZpcmUuMThcIjogXCJTb2NrZXRJT1wiLFxuICBcImNhc2VzL2NvbGxpZGVyL0NhdGVnb3J5LmZpcmUuM1wiOiBcIue7hDog56Kw5pKeXCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvQ2F0ZWdvcnkuZmlyZS41XCI6IFwi57uEOiDnorDmkp5cIixcbiAgXCJjYXNlcy9jb2xsaWRlci9DYXRlZ29yeS5maXJlLjdcIjogXCLnu4Q6IOeisOaSnlwiLFxuICBcImNhc2VzL2NvbGxpZGVyL0NhdGVnb3J5LmZpcmUuOVwiOiBcIue7hDog6buY6K6kXCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvU2hhcGUuZmlyZS4yMFwiOiBcIuaYvuekuuWkmui+ueW9olwiLFxuICBcImNhc2VzL2NvbGxpZGVyL1NoYXBlLmZpcmUuMjdcIjogXCLmmL7npLrlnIZcIixcbiAgXCJjYXNlcy9jb2xsaWRlci9TaGFwZS5maXJlLjM0XCI6IFwi5pi+56S655uS5a2QXCIsXG4gIFwiY2FzZXMvY29sbGlkZXIvU2hhcGUuZmlyZS40M1wiOiBcIuaYvuekuuWkmui+ueW9olwiLFxuICBcImNhc2VzL2NvbGxpZGVyL1NoYXBlLmZpcmUuNTBcIjogXCLmmL7npLrlnIZcIixcbiAgXCJjYXNlcy9jb2xsaWRlci9TaGFwZS5maXJlLjU3XCI6IFwi5pi+56S655uS5a2QXCIsXG4gIFwiY2FzZXMvbW90aW9uU3RyZWFrL21vdmVNb3Rpb25TdHJlYWsuZmlyZS4xMVwiOiBcIuaUueWPmOaLluWwvlwiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuMTFcIjogXCLosIPor5Xmj5Lmp71cIixcbiAgXCJjYXNlcy9zcGluZS9TcGluZUJveS5maXJlLjE4XCI6IFwi6LCD6K+V5YWz6IqCXCIsXG4gIFwiY2FzZXMvc3BpbmUvU3BpbmVCb3kuZmlyZS4yNVwiOiBcIuaXtumXtOe8qeaUvlwiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuMzZcIjogXCLlgZzmraJcIixcbiAgXCJjYXNlcy9zcGluZS9TcGluZUJveS5maXJlLjQzXCI6IFwi6LWwXCIsXG4gIFwiY2FzZXMvc3BpbmUvU3BpbmVCb3kuZmlyZS41MFwiOiBcIui3kVwiLFxuICBcImNhc2VzL3NwaW5lL1NwaW5lQm95LmZpcmUuNThcIjogXCLot7NcIixcbiAgXCJjYXNlcy9zcGluZS9TcGluZUJveS5maXJlLjY1XCI6IFwi5bCE5Ye7XCIsXG4gIFwiY2FzZXMvdGlsZWRtYXAvUHV6emxlLmZpcmUuMThcIjogXCLkvaDotaLkuoZcIixcbiAgXCJjYXNlcy90aWxlZG1hcC9QdXp6bGUuZmlyZS4yMVwiOiBcIumHjeaWsOW8gOWni1wiLFxuICBcInJlcy9wcmVmYWJzL0xpc3RJdGVtLnByZWZhYi4yXCI6IFwiTGFiZWwgc3Nzc1wiLFxuICBcInJlcy9wcmVmYWJzL01vbnN0ZXIucHJlZmFiLjNcIjogXCLlkI3lrZc6XCIsXG4gIFwicmVzL3ByZWZhYnMvTW9uc3Rlci5wcmVmYWIuMTFcIjogXCLnrYnnuqcgOlwiLFxuICBcInJlcy9wcmVmYWJzL01vbnN0ZXIucHJlZmFiLjE5XCI6IFwi6KGA6YePIDpcIixcbiAgXCJyZXMvcHJlZmFicy9Nb25zdGVyLnByZWZhYi4yN1wiOiBcIuaUu+WHuyA6XCIsXG4gIFwicmVzL3ByZWZhYnMvTW9uc3Rlci5wcmVmYWIuMzVcIjogXCLpmLLlvqEgOlwiLFxuICBcInJlcy9wcmVmYWJzL2xvYWRJdGVtLnByZWZhYi4xXCI6IFwiTGFiZWxcIixcbiAgXCJyZXNvdXJjZXMvdGVzdCBhc3NldHMvcHJlZmFiLnByZWZhYi4yXCI6IFwi6L+Z5piv5LiA5Liq6aKE5Yi2XCIsXG4gIFwicmVzb3VyY2VzL3Rlc3QgYXNzZXRzL3NjZW5lLmZpcmUuM1wiOiBcIui/lOWbnui1hOa6kOWKoOi9veWcuuaZr1wiLFxuICBcInJlc291cmNlcy90ZXN0IGFzc2V0cy9zY2VuZS5maXJlLjZcIjogXCLov5Tlm55cIixcbiAgXCJzY3JpcHRzL0dsb2JhbC9NZW51LmpzLjFcIjogXCLor7TmmI7mmoLnvLpcIlxufTtcblxuY2MuX1JGcG9wKCk7Il19
