//
// ==================== Class ==================== //
//

//
// ----- ダイアログ
//
var DialogManager = function () {

    var _window;
    var _imageCheckboxExport;
    var _imageEdittextDirectory;
    var _imageRadiobuttonPng;
    var _imageRadiobuttonJpg;
    var _imageRadiobuttonGif;
    var _imageDropdownlistJpgCompress;
    var _htmlCheckboxExport;
    var _htmlEdittextDirectory;
    var _htmlEdittextName;
    var _htmlDropdownlistDoctype;
    var _cssCheckboxExport;
    var _cssEdittextDirectory;
    var _cssEdittextName;
    var _cssCheckboxLayout;
    var _otherEdittextColor;
    var _otherDropdownlistCharaset;
    var _okBtn;
    var _cancelBtn;
    var _isExportImages = true;
    var _isExportHtml = true;
    var _isExportCss = true;
    var _imageFolderPath = null;
    var _htmlFolderPath = null;
    var _cssFolderPath = null;
    var _htmlFileName = null;
    var _cssFileName = null;
    var _encodeInfo = null;
    var _jpegCompressRate = null;
    var _htmlDoctype = null;
    var _htmlTitle = null;
    var _defaultFileType = null;
    var _isAbsolute = true;
    var _rootPathFromHtml = "";
    var _rootPathFromCss = "";
    var _isRelativePath = true;

    // 初期化
    this.init = function () {
        var totalY = 0;
        // ウィンドウ作成
        _window = new Window("dialog", "HTML初期構築自動化 ver2.1", _getPosition({x:200, y:200, w:390, h:850}));
        // 画像ファイル設定
        totalY = 20;
        _imageCheckboxExport = _window.add("checkbox", _getPosition({x:20, y:totalY, w:320, h:40}), "画像ファイルを書き出す");
        _imageCheckboxExport.value = true;
        imagePanel = _window.add("panel", _getPosition({x:20, y:totalY + 40, w:350, h:130}), "画像ファイル設定");
        imagePanel.add("statictext", _getPosition({x:20, y:20, w:100, h:20}), "ディレクトリ :").justify = "right";
        _imageEdittextDirectory = imagePanel.add("edittext", _getPosition({x:130, y:20, w:200, h:20}), "images");
        imagePanel.add("statictext", _getPosition({x:20, y:50, w:100, h:20}), "ファイル形式 :").justify = "right";
        _imageRadiobuttonPng = imagePanel.add("radiobutton", _getPosition({x:130, y:50, w:50, h:20}), "PNG");
        _imageRadiobuttonPng.value = true;
        _imageRadiobuttonJpg = imagePanel.add("radiobutton", _getPosition({x:190, y:50, w:50, h:20}), "JPEG");
        _imageRadiobuttonJpg.value = false;
        _imageRadiobuttonGif = imagePanel.add("radiobutton", _getPosition({x:250, y:50, w:50, h:20}), "GIF");
        _imageRadiobuttonGif.value = false;
        imagePanel.add("statictext", _getPosition({x:20, y:80, w:100, h:20}), "JPEG画質 :").justify = "right";
        _imageDropdownlistJpgCompress = imagePanel.add("dropdownlist", _getPosition({x:130, y:80, w:200, h:20}), ["100 （最高画質）", "90", "80 （高画質）", "70", "60 （やや高画質）", "50", "40", "30 （中画質）", "20", "10 （低画質）"]);
        _imageDropdownlistJpgCompress.selection = 2;
        // HTMLファイル設定
        totalY = 200;
        _htmlCheckboxExport = _window.add("checkbox", _getPosition({x:20, y:totalY, w:350, h:40}), "HTMLファイルを書き出す");
        _htmlCheckboxExport.value = true;
        htmlPanel = _window.add("panel", _getPosition({x:20, y:totalY + 40, w:350, h:160}), "HTMLファイル設定");
        htmlPanel.add("statictext", _getPosition({x:20, y:20, w:100, h:20}), "ディレクトリ :").justify = "right";
        _htmlEdittextDirectory = htmlPanel.add("edittext", _getPosition({x:130, y:20, w:200, h:20}), "");
        htmlPanel.add("statictext", _getPosition({x:20, y:50, w:100, h:20}), "ファイル名 :").justify = "right";
        _htmlEdittextName = htmlPanel.add("edittext", _getPosition({x:130, y:50, w:200, h:20}), "index.html");
        htmlPanel.add("statictext", _getPosition({x:20, y:80, w:100, h:20}), "ドキュメント形式 :").justify = "right";
        _htmlDropdownlistDoctype = htmlPanel.add("dropdownlist", _getPosition({x:130, y:80, w:200, h:20}), ["HTML5", "Jade", "XHTML 1.0 Transitional", "HTML 4.01 Transitional"]);
        _htmlDropdownlistDoctype.selection = 0;
        htmlPanel.add("statictext", _getPosition({x:20, y:110, w:100, h:20}), "ページタイトル :").justify = "right";
        _htmlEdittextTitle = htmlPanel.add("edittext", _getPosition({x:130, y:110, w:200, h:20}), "無題ドキュメント");
        // CSSファイル設定
        totalY = 410;
        _cssCheckboxExport = _window.add("checkbox", _getPosition({x:20, y:totalY, w:350, h:40}), "CSSファイルを書き出す");
        _cssCheckboxExport.value = true;
        _cssPanel = _window.add("panel", _getPosition({x:20, y:totalY + 40, w:350, h:130}), "CSSファイル設定");
        _cssPanel.add("statictext", _getPosition({x:20, y:20, w:100, h:20}), "ディレクトリ :").justify = "right";
        _cssEdittextDirectory = _cssPanel.add("edittext", _getPosition({x:130, y:20, w:200, h:20}), "css");
        _cssPanel.add("statictext", _getPosition({x:20, y:50, w:100, h:20}), "ファイル名 :").justify = "right";
        _cssEdittextName = _cssPanel.add("edittext", _getPosition({x:130, y:50, w:200, h:20}), "index.css");
        _cssPanel.add("statictext", _getPosition({x:20, y:80, w:100, h:20}), "レイアウト :").justify = "right";
        _cssCheckboxLayout = _cssPanel.add("checkbox", _getPosition({x:130, y:80, w:200, h:20}), "absoluteで配置情報を書き込む");
        _cssCheckboxLayout.value = true;
        // その他オプション
        totalY = 600;
        _window.add("statictext", _getPosition({x:20, y:totalY, w:90, h:20}), "背景色 :").justify = "right";
        _otherEdittextColor = _window.add("edittext", _getPosition({x:120, y:totalY, w:200, h:20}), "#ffffff");
        _window.add("statictext", _getPosition({x:20, y:totalY + 30, w:90, h:20}), "パス記述方式 :").justify = "right";
        _otherRadiobuttonRelative = _window.add("radiobutton", _getPosition({x:120, y:totalY + 30, w:80, h:20}), "相対パス");
        _otherRadiobuttonRelative.value = true;
        _otherRadiobuttonAbsolute = _window.add("radiobutton", _getPosition({x:200, y:totalY + 30, w:80, h:20}), "絶対パス");
        _otherRadiobuttonAbsolute.value = false;
        _window.add("statictext", _getPosition({x:20, y:totalY + 60, w:90, h:20}), "文字コード :").justify = "right";
        _otherDropdownlistCharaset = _window.add("dropdownlist", _getPosition({x:120, y:totalY + 60, w:200, h:20}), ["UTF-8", "Shift_JIS"]);
        _otherDropdownlistCharaset.selection = 0;
        // OKボタン
        totalY = 720;
        _okBtn = _window.add("button", _getPosition({x:90, y:totalY, w:100, h:30}), "OK", { name:"ok" });
        _okBtn.onClick = function () {
            _close({flg:true});
        };
        // CANCELボタン
        _cancelBtn = _window.add("button", _getPosition({x:200, y:totalY, w:100, h:30}), "Cancel", { name:"cancel" });
        _cancelBtn.onClick = function () {
            _close({flg:false});
        };
        // コピーライト
        _window.add("statictext", _getPosition({x:20, y:totalY + 50, w:350, h:20}), "Developed : @knockknockjp").justify = "right";
        _window.add("statictext", _getPosition({x:20, y:totalY + 70, w:350, h:20}), "URL : http://www.knockknock.jp").justify = "right";
        _window.add("statictext", _getPosition({x:20, y:totalY + 90, w:350, h:20}), "e-Mail : nishida@knockknock.jp").justify = "right";
    };

    // 開く
    this.open = function () {
        _window.show();
    };

    // 画像ファイルを書き出すか否か
    this.getIsExportImages = function () {
        return _isExportImages;
    };

    // HTMLファイルを書き出すか否か
    this.getIsExportHtml = function () {
        return _isExportHtml;
    };

    // HTMLファイルを書き出すか否か
    this.getIsExportCss = function () {
        return _isExportCss;
    };

    // 画像ファイル格納場所
    this.getImageFolderPath = function () {
        return _imageFolderPath;
    };

    // HTMLファイル格納場所
    this.getHtmlFolderPath = function () {
        return _htmlFolderPath;
    };

    // CSSファイル格納場所
    this.getCssFolderPath = function () {
        return _cssFolderPath;
    };

    // HTMLファイル名
    this.getHtmlFileName = function () {
        return _htmlFileName;
    };

    // CSSファイル名
    this.getCssFileName = function () {
        return _cssFileName;
    };

    // エンコード
    this.getEncodeInfo = function () {
        return _encodeInfo;
    };

    // JPEG圧縮率
    this.getJpegCompressRate = function () {
        return _jpegCompressRate;
    };

    // HTMLドキュメント形式
    this.getHtmlDoctype = function () {
        return _htmlDoctype;
    };

    // HTMLタイトル
    this.getHtmlTitle = function () {
        return _htmlTitle;
    };

    // デフォルト画像形式
    this.getDefaultFileType = function () {
        return _defaultFileType;
    };

    // 背景カラー
    this.getOtherBgColor = function () {
        return _otherBgColor;
    };

    // 絶対配置
    this.getIsAbsolute = function () {
        return _isAbsolute;
    };

    // HTMLファイルから見たルートパス
    this.getRootPathFromHtml = function () {
        return _rootPathFromHtml;
    };

    // CSSファイルから見たルートパス
    this.getRootPathFromCss = function () {
        return _rootPathFromCss;
    };

    // 絶対パスか否か
    this.getIsRelativePath = function () {
        return _isRelativePath;
    };

    // 閉じる
    function _close(e) {
        if (e.flg) {
            var str = "";
            var selection = "";
            // 画像ファイルを書き出すか否か
            _isExportImages = _imageCheckboxExport.value;
            // HTMLファイルを書き出すか否か
            _isExportHtml = _htmlCheckboxExport.value;
            // HTMLファイルを書き出すか否か
            _isExportCss = _cssCheckboxExport.value;
            // 画像ファイル格納場所
            _imageFolderPath = _setDirectoryText({str:_imageEdittextDirectory.text});
            // HTMLファイル格納場所
            _htmlFolderPath = _setDirectoryText({str:_htmlEdittextDirectory.text});
            // CSSファイル格納場所
            _cssFolderPath = _setDirectoryText({str:_cssEdittextDirectory.text});
            // HTMLファイル名
            _htmlFileName = _setFileNameText({str:_htmlEdittextName.text});
            // CSSファイル名
            _cssFileName = _setFileNameText({str:_cssEdittextName.text});
            // 背景カラー
            _otherBgColor = getHexColorTextUtil(_otherEdittextColor.text);
            // エンコード
            _encodeInfo = {
                system:"UTF8",
                charset:"utf-8"
            };
            selection = String(_otherDropdownlistCharaset.selection);
            switch (selection) {
                case "UTF-8":
                    _encodeInfo = {
                        system:"UTF8",
                        charset:"utf-8"
                    };
                    break;
                case "Shift_JIS":
                    _encodeInfo = {
                        system:"SJIS",
                        charset:"shift-jis"
                    };
                    break;
            }
            // JPEG圧縮率
            _jpegCompressRate = 80;
            selection = String(_imageDropdownlistJpgCompress.selection);
            switch (selection) {
                case "100 （最高画質）":
                    _jpegCompressRate = 100;
                    break;
                case "90":
                    _jpegCompressRate = 90;
                    break;
                case "80 （高画質）":
                    _jpegCompressRate = 80;
                    break;
                case "70":
                    _jpegCompressRate = 70;
                    break;
                case "60 （やや高画質）":
                    _jpegCompressRate = 60;
                    break;
                case "50":
                    _jpegCompressRate = 50;
                    break;
                case "40":
                    _jpegCompressRate = 40;
                    break;
                case "30 （中画質）":
                    _jpegCompressRate = 30;
                    break;
                case "20":
                    _jpegCompressRate = 20;
                    break;
                case "10 （低画質）":
                    _jpegCompressRate = 10;
                    break;
            }
            // HTMLドキュメント形式
            _htmlDoctype = HTML_KEY_HTML5;
            selection = String(_htmlDropdownlistDoctype.selection);
            switch (selection) {
                case "HTML5":
                    _htmlDoctype = HTML_KEY_HTML5;
                    break;
                case "Jade":
                    _htmlDoctype = HTML_KEY_JADE;
                    break;
                case "XHTML 1.0 Transitional":
                    _htmlDoctype = HTML_KEY_XHTML;
                    break;
                case "HTML 4.01 Transitional":
                    _htmlDoctype = HTML_KEY_HTML4;
                    break;
            }
            // HTMLタイトル
            _htmlTitle = _htmlEdittextTitle.text;
            // デフォルト画像形式
            _defaultFileType = FILE_KEY_PNG;
            if (_imageRadiobuttonPng.value) {
                _defaultFileType = FILE_KEY_PNG;
            } else if (_imageRadiobuttonJpg.value) {
                _defaultFileType = FILE_KEY_JPG;
            } else if (_imageRadiobuttonGif.value) {
                _defaultFileType = FILE_KEY_GIF;
            }
            // 絶対配置
            _isAbsolute = _cssCheckboxLayout.value;
            // 絶対パス相対パス
            _isRelativePath = true;
            if (_otherRadiobuttonAbsolute.value == true) {
                _isRelativePath = false;
            }
            // HTMLから見たルートディレクトリパス
            _rootPathFromHtml = _getRootPath({path:_htmlFolderPath});
            // CSSから見たルートディレクトリパス
            _rootPathFromCss = _getRootPath({path:_cssFolderPath});
            _window.close();
            // エラーチェックイベント
            checkErrorEvent();
        } else {
            _window.close();
            alert("取り消しました");
        }
    }

    // アイテム位置情報取得
    function _getPosition(e) {
        return [ e.x, e.y, e.w + e.x, e.h + e.y ];
    }

    // ディレクトリテキスト作成
    function _setDirectoryText(e) {
        var str = String(e.str);
        var str2 = "";
        var flg = false;
        var flg2 = false;
        var length = str.length;
        for (var i = 0; i < length; i++) {
            if (!flg && String(str[i]).match(/[^0-9A-Za-z_-]+/) == null) {
                flg = true;
            }
            if (flg && String(str[i]).match(/[^0-9A-Za-z_.\/-]+/) == null) {
                if (String(str[i]).match(/[^\/]+/) == null) {
                    if (flg2) {
                        return str2.substr(0, str2.length - 1);
                    } else {
                        str2 += str[i];
                    }
                    flg2 = true;
                } else {
                    str2 += str[i];
                    flg2 = false;
                }
            }
        }
        if (str2.charAt(str2.length - 1) == "/") {
            str2 = str2.substr(0, str2.length - 1);
        }
        return str2;
    }

    // ファイル名テキスト作成
    function _setFileNameText(e) {
        var str = String(e.str);
        var str2 = "";
        var flg = false;
        var length = str.length;
        for (var i = 0; i < length; i++) {
            if (!flg && String(str[i]).match(/[^0-9A-Za-z_-]+/) == null) {
                flg = true;
            }
            if (flg && String(str[i]).match(/[^0-9A-Za-z_.-]+/) == null) {
                str2 += str[i];
            }
        }
        if (str2.charAt(0) == ".") {
            str2 = str2.slice(1);
        }
        str2 = str2.split(".")[0];
        return str2;
    }

    // ルートへのパス取得
    function _getRootPath(e) {
        if (dialogManager.getIsRelativePath()) {
            var path = e.path;
            var depth = 0;
            if (path != "") {
                depth = String(path).split("/").length;
            }
            var str = "";
            var length = depth;
            for (var i = 0; i < length; i++) {
                str += "../";
            }
        } else {
            str = "/";
        }
        return str;
    }

};

//
// ----- エラー管理
//
var ErrorChecker = function () {

    var _errorMsgSave;
    var _errorMsgDuplicate;
    var _errorMsgName;
    var _errorMsgExist;

    var _layerName;

    // 初期化
    this.init = function () {
        _errorMsgSave = "";
        _errorMsgDuplicate = "";
        _errorMsgName = "";
        _errorMsgExist = "";
        _layerName = "";
    };

    // チェック
    this.check = function (e) {
        _checkSave();
        _checkDuplicate({
            item:activeDocument,
            name:""
        });
        _checkName({
            item:activeDocument,
            name:""
        });
        _checkExist({
            item:activeDocument,
            name:""
        });
        var msg = "";
        if (_errorMsgSave != "" || _errorMsgDuplicate != "" || _errorMsgName != "" || _errorMsgExist != "") {
            msg = "以下のエラーがあります。\n\n";
            if (_errorMsgSave != "") msg += _errorMsgSave;
            if (_errorMsgDuplicate != "") msg += "■レイヤー及びレイヤーセットの名称でIDに重複しているものがあります。\n\n" + _errorMsgDuplicate;
            if (_errorMsgName != "") msg += "■レイヤー及びレイヤーセットの名称でIDに使用出来ない文字列が存在します。\n\n" + _errorMsgName;
            if (_errorMsgExist != "") msg += "■表示範囲に要素がないレイヤー及びレイヤーセットが存在します。\n\n" + _errorMsgExist;
        }
        if (msg != "") {
            alert(msg);
        } else {
            // 書き出し開始イベント
            startExportEvent();
        }
    };

    // 保存チェック
    function _checkSave() {
        if (!activeDocument || !activeDocument.path) {
            _errorMsgSave += "■実行するには、PSDドキュメントを保存する必要があります。\n\n";
        }
        var fileName = String(activeDocument.fullName);
        fileName = fileName.substring(fileName.lastIndexOf("/") + 1, fileName.length);
        if (fileName.match(/[^0-9A-Za-z_.:-]+/) != null) {
            _errorMsgSave += "■PSDドキュメントを半角英数で保存する必要があります。\n\n";
        }
    }

    // 重複チェック
    function _checkDuplicate(e) {
        var item = e.item;
        var name = e.name;
        // レイヤー
        var length = item.artLayers.length;
        for (var i = 0; i < length; i++) {
            var artLayer = item.artLayers[ i ];
            var layerName = getLayerNameUtil({name:artLayer.name});
            if (_layerName == layerName) {
                _errorMsgDuplicate += "	レイヤー :  " + name + "/" + artLayer.name + "\n\n";
            }
            _layerName += layerName + "@";
        }
        // レイヤーセット
        var length = item.layerSets.length;
        for (var i = 0; i < length; i++) {
            var layerSet = item.layerSets[ i ];
            var layerName = getLayerNameUtil({name:layerSet.name});
            if (_layerName == layerName) {
                _errorMsgDuplicate += "	レイヤーセット : " + name + "/" + layerSet.name + "\n\n";
            }
            _layerName += layerName + "@";
            // 再帰
            _checkDuplicate({
                item:layerSet,
                name:name + "/" + layerSet.name
            });
        }
    }

    // IDチェック
    function _checkName(e) {
        var item = e.item;
        var name = e.name;
        // レイヤー
        var length = item.artLayers.length;
        for (var i = 0; i < length; i++) {
            var artLayer = item.artLayers[ i ];
            var layerName = getLayerNameUtil({name:artLayer.name});
            if (layerName.match(/[^0-9A-Za-z_.:-]+/) != null) {
                _errorMsgName += "	レイヤー :  " + name + "/" + artLayer.name + "\n\n";
            }
        }
        // レイヤーセット
        var length = item.layerSets.length;
        for (var i = 0; i < length; i++) {
            var layerSet = item.layerSets[ i ];
            var layerName = getLayerNameUtil({name:layerSet.name});
            if (layerName.match(/[^0-9A-Za-z_.:-]+/) != null) {
                _errorMsgName += "	レイヤーセット : " + name + "/" + layerSet.name + "\n\n";
            }
            // 再帰
            _checkName({
                item:layerSet,
                name:name + "/" + layerSet.name
            });
        }
    }

    // 表示要素チェック
    function _checkExist(e) {
        var item = e.item;
        var name = e.name;
        var documentHeight = activeDocument.height.value;
        var documentWidth = activeDocument.width.value;
        // レイヤー
        var length = item.artLayers.length;
        for (var i = 0; i < length; i++) {
            var artLayer = item.artLayers[ i ];
            var x1 = parseInt(artLayer.bounds[0]);
            var y1 = parseInt(artLayer.bounds[1]);
            var x2 = parseInt(artLayer.bounds[2]);
            var y2 = parseInt(artLayer.bounds[3]);
            if (( x2 - x1 ) <= 0 || ( y2 - y1 ) <= 0 || x2 <= 0 || y2 <= 0 || documentWidth <= x1 || documentHeight <= y1) {
                _errorMsgExist += "	レイヤー :  " + name + "/" + artLayer.name + "\n\n";
            }
        }
        // レイヤーセット
        var length = item.layerSets.length;
        for (var i = 0; i < length; i++) {
            var layerSet = item.layerSets[ i ];
            // 表示要素チェック
            if (layerSet.artLayers.length <= 0 && layerSet.layerSets.length <= 0) {
                _errorMsgExist += "	レイヤーセット : " + name + "/" + layerSet.name + "\n\n";
            }
            // 再帰
            _checkExist({
                item:layerSet,
                name:name + "/" + layerSet.name
            });
        }
    }

};

//
// ----- 画像出力
//
var ImageExporter = function () {

    // 初期化
    this.init = function () {
    };

    // 出力
    this.export = function (e) {
        // 画像フォルダ作成
        createDirectoryUtil({path:dialogManager.getImageFolderPath()});
        _hideLayers({
            item:activeDocument
        });
        _export({
            item:activeDocument
        });
        _showLayers({
            item:activeDocument
        });
    };

    // レイヤー非表示
    function _hideLayers(e) {
        var item = e.item;
        // レイヤー
        var length = item.artLayers.length;
        for (var i = 0; i < length; i++) {
            var artLayer = item.artLayers[ i ];
            artLayer.visible = false;
        }
        // レイヤーセット
        var length = item.layerSets.length;
        for (var i = 0; i < length; i++) {
            var layerSet = item.layerSets[ i ];
            // 再帰
            _hideLayers({
                item:layerSet
            });
        }
    }

    // レイヤー表示
    function _showLayers(e) {
        var item = e.item;
        // レイヤー
        var length = item.artLayers.length;
        for (var i = 0; i < length; i++) {
            var artLayer = item.artLayers[ i ];
            artLayer.visible = true;
        }
        // レイヤーセット
        var length = item.layerSets.length;
        for (var i = 0; i < length; i++) {
            var layerSet = item.layerSets[ i ];
            // 再帰
            _showLayers({
                item:layerSet
            });
        }
    }

    // 出力
    function _export(e) {
        var item = e.item;
        // レイヤー
        var length = item.artLayers.length;
        for (var i = 0; i < length; i++) {
            var artLayer = item.artLayers[ i ];
            if (artLayer.kind == LayerKind.NORMAL) {
                // 表示
                artLayer.visible = true;
                // マスクが存在するか
                var hasMask = false;
                if (hasChannelMaskByName(artLayer.name) || hasVectorMaskByName(artLayer.name)) {
                    hasMask = true;
                }
                if (hasMask) {
                    // レイヤーをアクティブにする
                    activeDocument.activeLayer = artLayer;
                    // マスクを選択
                    var idslct = charIDToTypeID( "slct" );
                    var desc78 = new ActionDescriptor();
                    var idnull = charIDToTypeID( "null" );
                    var ref49 = new ActionReference();
                    var idChnl = charIDToTypeID( "Chnl" );
                    var idChnl = charIDToTypeID( "Chnl" );
                    var idMsk = charIDToTypeID( "Msk " );
                    ref49.putEnumerated( idChnl, idChnl, idMsk );
                    desc78.putReference( idnull, ref49 );
                    var idMkVs = charIDToTypeID( "MkVs" );
                    desc78.putBoolean( idMkVs, false );
                    executeAction( idslct, desc78, DialogModes.NO );
                    // マスクの範囲を選択
                    var idsetd = charIDToTypeID( "setd" );
                    var desc79 = new ActionDescriptor();
                    var idnull = charIDToTypeID( "null" );
                    var ref50 = new ActionReference();
                    var idChnl = charIDToTypeID( "Chnl" );
                    var idfsel = charIDToTypeID( "fsel" );
                    ref50.putProperty( idChnl, idfsel );
                    desc79.putReference( idnull, ref50 );
                    var idT = charIDToTypeID( "T   " );
                    var ref51 = new ActionReference();
                    var idChnl = charIDToTypeID( "Chnl" );
                    var idOrdn = charIDToTypeID( "Ordn" );
                    var idTrgt = charIDToTypeID( "Trgt" );
                    ref51.putEnumerated( idChnl, idOrdn, idTrgt );
                    desc79.putReference( idT, ref51 );
                    executeAction( idsetd, desc79, DialogModes.NO );
                    // 選択範囲を抽出
                    var arr = activeDocument.selection.bounds;
                    var x1 = arr[0];
                    var y1 = arr[1];
                    var x2 = arr[2];
                    var y2 = arr[3];
                    // 新規保存
                    var imageFilePath = getPathInfoImagesUtil().folderPathFull + "/" + "_" + getLayerNameUtil({name:artLayer.name}) + ".png";
                    var fileObj = new File(imageFilePath);
                    var optionObj = new PNGSaveOptions();
                    optionObj.interlaced = false;
                    activeDocument.saveAs(fileObj, optionObj, true, Extension.LOWERCASE);
                    // 開く
                    open(new File(imageFilePath));
                    // 座標を指定して選択する
                    selReg = [[x1, y1], [x1, y2], [x2, y2], [x2, y1]];
                    activeDocument.selection.select(selReg);
                    // 切り抜き
                    var idCrop = charIDToTypeID( "Crop" );
                    var desc12 = new ActionDescriptor();
                    var idDlt = charIDToTypeID( "Dlt " );
                    desc12.putBoolean( idDlt, true );
                    executeAction( idCrop, desc12, DialogModes.NO );
                } else {
                    // 新規保存
                    var imageFilePath = getPathInfoImagesUtil().folderPathFull + "/" + "_" + getLayerNameUtil({name:artLayer.name}) + ".png";
                    var fileObj = new File(imageFilePath);
                    var optionObj = new PNGSaveOptions();
                    optionObj.interlaced = false;
                    activeDocument.saveAs(fileObj, optionObj, true, Extension.LOWERCASE);
                    // 開いてトリミング
                    open(new File(imageFilePath));
                    activeDocument.trim(TrimType.TRANSPARENT, true, true, true, true);
                    preferences.rulerUnits = Units.PIXELS;
                    activeDocument.resizeCanvas(Math.floor(activeDocument.width.value), Math.floor(activeDocument.height.value), AnchorPosition.MIDDLECENTER);
                    activeDocument.resizeCanvas(activeDocument.width.value, activeDocument.height.value, AnchorPosition.TOPLEFT);
                }
                // Web用保存して閉じる
                var optionObj = new ExportOptionsSaveForWeb();
                var color = getLayerColorUtil({name:artLayer.name});
                if (!color) {
                    color = dialogManager.getOtherBgColor();
                }
                // マットカラー
                optionObj.matteColor = new RGBColor();
                optionObj.matteColor.hexValue = color;
                switch (getFileInfoFromFileNameUtil({name:artLayer.name}).type) {
                    // PNG保存
                    case FILE_KEY_PNG:
                        optionObj.format = SaveDocumentType.PNG;
                        optionObj.PNG8 = false;
                        optionObj.transparency = true;
                        optionObj.interlaced = false;
                        optionObj.optimized = true;
                        break;
                    // JPEG保存
                    case FILE_KEY_JPG:
                        optionObj.format = SaveDocumentType.JPEG;
                        optionObj.interlaced = false;
                        optionObj.optimized = true;
                        optionObj.quality = dialogManager.getJpegCompressRate();
                        break;
                    // GIF保存
                    case FILE_KEY_GIF:
                        optionObj.format = SaveDocumentType.COMPUSERVEGIF;
                        optionObj.transparency = true;
                        optionObj.colorReduction = ColorReductionType.ADAPTIVE;
                        optionObj.colors = 256;
                        optionObj.dither = Dither.DIFFUSION; // ディザーの種類
                        optionObj.ditherAmount = 100; // ディザーの割合
                        break;
                }
                var imageFilePath = getPathInfoImagesUtil().folderPathFull + "/" + getLayerNameUtil({name:artLayer.name}) + getFileInfoFromFileNameUtil({name:artLayer.name}).ext;
                var fileObj = new File(imageFilePath);
                activeDocument.exportDocument(fileObj, ExportType.SAVEFORWEB, optionObj);
                activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                // 不要ファイルを削除
                var imageFilePath = getPathInfoImagesUtil().folderPathFull + "/" + "_" + getLayerNameUtil({name:artLayer.name}) + ".png";
                var fileObj = new File(imageFilePath);
                fileObj.remove();
                // 非表示
                artLayer.visible = false;
            }
        }
        // レイヤーセット
        var length = item.layerSets.length;
        for (var i = 0; i < length; i++) {
            var layerSet = item.layerSets[ i ];
            // 再帰
            _export({
                item:layerSet
            });
        }
    }

};

//
// ----- 情報抽出
//
var InfoManager = function () {

    var _layerInfoArr;

    // 初期化
    this.init = function () {
        _layerInfoArr = [];
    };

    // 抽出
    this.extract = function (e) {
        _extract({
            item:activeDocument,
            infoArr:_layerInfoArr,
            top:0,
            left:0
        });
    };

    // レイヤー情報取得
    this.getLayerInfo = function () {
        return _layerInfoArr;
    };

    // 抽出
    function _extract(e) {
        var item = e.item;
        var infoArr = e.infoArr;
        var left = e.left;
        var top = e.top;
        var length = item.layers.length;
        for (var i = 0; i < length; i++) {
            var layer = item.layers[ i ];
            var layoutInfoObj = null;
            var totalInfoObj = null;
            var layerName = getLayerNameUtil({name:layer.name});
            if (layer.kind == LayerKind.NORMAL) {
                if (String(layer.name).charAt(0) == OPTION_KEY_BGIMAGE) {
                    // 背景レイヤー
                    layoutInfoObj = _getLayoutInfo({item:layer});
                    totalInfoObj = {
                        type:TYPE_KEY_BG,
                        name:layerName,
                        top:layoutInfoObj.top - top,
                        left:layoutInfoObj.left - left,
                        width:layoutInfoObj.width,
                        height:layoutInfoObj.height,
                        file:getFileInfoFromFileNameUtil({name:layer.name}).type,
                        text:null,
                        alt: "",
                        color: getLayerColorUtil({name:layer.name})
                    };
                    infoArr.push(totalInfoObj);
                } else {
                    // 通常レイヤー
                    layoutInfoObj = _getLayoutInfo({item:layer});
                    totalInfoObj = {
                        type:TYPE_KEY_NORMAL,
                        name:layerName,
                        top:layoutInfoObj.top - top,
                        left:layoutInfoObj.left - left,
                        width:layoutInfoObj.width,
                        height:layoutInfoObj.height,
                        file:getFileInfoFromFileNameUtil({name:layer.name}).type,
                        text:null,
                        alt: getLayerAltUtil({name:layer.name}),
                        color: getLayerColorUtil({name:layer.name})
                    };
                    infoArr.push(totalInfoObj);
                }
            } else if (layer.kind == LayerKind.TEXT) {
                // テキストレイヤー
                layoutInfoObj = _getLayoutInfo({item:layer});
                var size = null;
                var align = null;
                var color = null;
                var bold = false;
                var italic = false;
                try {
                    if (layer.textItem.size) {
                        size = String(layer.textItem.size).replace(" pt", "px");
                    }
                } catch(e) {
                }
                try {
                    if (layer.textItem.justification) {
                        align = layer.textItem.justification;
                    }
                } catch(e) {
                }
                try {
                    if (layer.textItem.color.rgb.hexValue) {
                        color = "#" + layer.textItem.color.rgb.hexValue;
                    }
                } catch(e) {
                }
                try {
                    if (layer.textItem.fauxBold) {
                        bold = layer.textItem.fauxBold;
                    }
                } catch(e) {
                }
                try {
                    if (layer.textItem.fauxItalic) {
                        italic = layer.textItem.fauxItalic;
                    }
                } catch(e) {
                }
                totalInfoObj = {
                    type:TYPE_KEY_TEXT,
                    name:layerName,
                    top:layoutInfoObj.top - top,
                    left:layoutInfoObj.left - left,
                    width:layoutInfoObj.width,
                    height:layoutInfoObj.height,
                    file:null,
                    text:{
                        contents:layer.textItem.contents,
                        size:size,
                        align:align,
                        color:color,
                        bold:bold,
                        italic:italic
                    },
                    alt: "",
                    color: getLayerColorUtil({name:layer.name})
                };
                infoArr.push(totalInfoObj);
            } else if (layer.kind == undefined) {
                // レイヤーセット
                layoutInfoObj = _getLayoutInfo({item:layer});
                totalInfoObj = {
                    type:TYPE_KEY_GROUP,
                    name:layerName,
                    top:layoutInfoObj.top - top,
                    left:layoutInfoObj.left - left,
                    width:layoutInfoObj.width,
                    height:layoutInfoObj.height,
                    file:null,
                    text:null,
                    alt: "",
                    color: getLayerColorUtil({name:layer.name})
                };
                infoArr.push(totalInfoObj);
                infoArr[layerName] = [];
                // 再帰
                _extract({
                    item:layer,
                    infoArr:infoArr[layerName],
                    top:layoutInfoObj.top,
                    left:layoutInfoObj.left
                });
            }
        }
    }

    // レイアウト情報を取得
    function _getLayoutInfo(e) {
        var item = e.item;
        // マスクが存在するかどうか
        if (hasChannelMaskByName(item.name) || hasVectorMaskByName(item.name)) {
            // レイヤーをアクティブにする
            activeDocument.activeLayer = item;
            // マスクを選択
            var idslct = charIDToTypeID( "slct" );
            var desc78 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
            var ref49 = new ActionReference();
            var idChnl = charIDToTypeID( "Chnl" );
            var idChnl = charIDToTypeID( "Chnl" );
            var idMsk = charIDToTypeID( "Msk " );
            ref49.putEnumerated( idChnl, idChnl, idMsk );
            desc78.putReference( idnull, ref49 );
            var idMkVs = charIDToTypeID( "MkVs" );
            desc78.putBoolean( idMkVs, false );
            executeAction( idslct, desc78, DialogModes.NO );
            // マスクの範囲を選択
            var idsetd = charIDToTypeID( "setd" );
            var desc79 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
            var ref50 = new ActionReference();
            var idChnl = charIDToTypeID( "Chnl" );
            var idfsel = charIDToTypeID( "fsel" );
            ref50.putProperty( idChnl, idfsel );
            desc79.putReference( idnull, ref50 );
            var idT = charIDToTypeID( "T   " );
            var ref51 = new ActionReference();
            var idChnl = charIDToTypeID( "Chnl" );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref51.putEnumerated( idChnl, idOrdn, idTrgt );
            desc79.putReference( idT, ref51 );
            executeAction( idsetd, desc79, DialogModes.NO );
            // 選択範囲を抽出
            var arr = activeDocument.selection.bounds;
            var x1 = parseInt(arr[0]);
            var y1 = parseInt(arr[1]);
            var x2 = parseInt(arr[2]);
            var y2 = parseInt(arr[3]);
        } else {
            var bounds = item.bounds;
            var x1 = parseInt(bounds[0]);
            var y1 = parseInt(bounds[1]);
            var x2 = parseInt(bounds[2]);
            var y2 = parseInt(bounds[3]);
        }
        var top = y1;
        if (top < 0) top = 0;
        var left = x1;
        if (left < 0) left = 0;
        var width = x2 - x1;
        if (width < 0) width = 0;
        var height = y2 - y1;
        if (height < 0) height = 0;
        return {
            top:top,
            left:left,
            width:width,
            height:height
        };
    }

    function _traceInfoArr(e) {
        var arr = e.arr;
        var length = arr.length;
        for (var i = 0; i < length; i++) {
            alert(arr[i].name);
            if (arr[i].type == TYPE_KEY_GROUP) {
                // 再帰処理
                _traceInfoArr({arr:arr[arr[i].name]});
            }
        }
    }

};

//
// ----- HTML出力
//
var HtmlExporter = function () {

    var _htmlTxt;

    // 初期化
    this.init = function () {
        _htmlTxt = "";
    };

    // 出力
    this.export = function (e) {
        // フォルダ作成
        createDirectoryUtil({path:dialogManager.getHtmlFolderPath()});
        // ファイル開く
        var fileObj = new File(getPathInfoHtmlUtil().fullPath);
        fileObj.open("w");
        switch (dialogManager.getHtmlDoctype()) {
            case HTML_KEY_HTML4:
                _htmlTxt += "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n";
                _htmlTxt += "<html>\n";
                break;
            case HTML_KEY_XHTML:
                _htmlTxt += "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n";
                _htmlTxt += "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n";
                break;
            case HTML_KEY_HTML5:
                _htmlTxt += "<!DOCTYPE HTML>\n";
                _htmlTxt += "<html>\n";
                break;
            case HTML_KEY_JADE:
                _htmlTxt += "doctype html\n";
                _htmlTxt += "html(lang=\"ja\")\n";
                break;
        }
        fileObj.encoding = dialogManager.getEncodeInfo().system;
        // HTMLテキスト作成（固定部分）
        switch (dialogManager.getHtmlDoctype()) {
            case HTML_KEY_HTML4:
                _htmlTxt += INDENT_VALUE + "<head>\n";
                _htmlTxt += INDENT_VALUE + INDENT_VALUE + "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=" + dialogManager.getEncodeInfo().charset + "\">\n";
                break;
            case HTML_KEY_XHTML:
                _htmlTxt += INDENT_VALUE + "<head>\n";
                _htmlTxt += INDENT_VALUE + INDENT_VALUE + "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=" + dialogManager.getEncodeInfo().charset + "\" />\n";
                break;
            case HTML_KEY_HTML5:
                _htmlTxt += INDENT_VALUE + "<head>\n";
                _htmlTxt += INDENT_VALUE + INDENT_VALUE + "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=" + dialogManager.getEncodeInfo().charset + "\">\n";
                break;
            case HTML_KEY_JADE:
                _htmlTxt += INDENT_VALUE + "head\n";
                _htmlTxt += INDENT_VALUE + INDENT_VALUE + "meta(http-equiv=\"Content-Type\", content=\"text/html; charset=" + dialogManager.getEncodeInfo().charset + "\")\n";
                break;
        }
        if (dialogManager.getHtmlDoctype() != HTML_KEY_JADE) {
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + "<title>" + dialogManager.getHtmlTitle() + "</title>\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + "<style type=\"text/css\">\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "body,td,th {\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "color: #000;\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "}\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "body {\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "background-color: #" + dialogManager.getOtherBgColor() + ";\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "margin-left: 0;\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "margin-top: 0;\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "margin-right: 0;\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "margin-bottom: 0;\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "}\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + "</style>\n";
        } else {
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + "title " + dialogManager.getHtmlTitle() + "\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + "style.\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "body,td,th {\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "color: #000;\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "}\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "body {\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "background-color: #" + dialogManager.getOtherBgColor() + ";\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "margin-left: 0;\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "margin-top: 0;\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "margin-right: 0;\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "margin-bottom: 0;\n";
            _htmlTxt += INDENT_VALUE + INDENT_VALUE + INDENT_VALUE + "}\n";

        }
        if (dialogManager.getIsExportCss()) {
            switch (dialogManager.getHtmlDoctype()) {
                case HTML_KEY_HTML4:
                    _htmlTxt += INDENT_VALUE + INDENT_VALUE + "<link href=\"" + getPathInfoCssUtil().srcPath + "\" rel=\"stylesheet\" type=\"text/css\">\n";
                    break;
                case HTML_KEY_XHTML:
                    _htmlTxt += INDENT_VALUE + INDENT_VALUE + "<link href=\"" + getPathInfoCssUtil().srcPath + "\" rel=\"stylesheet\" type=\"text/css\" />\n";
                    break;
                case HTML_KEY_HTML5:
                    _htmlTxt += INDENT_VALUE + INDENT_VALUE + "<link href=\"" + getPathInfoCssUtil().srcPath + "\" rel=\"stylesheet\" type=\"text/css\">\n";
                    break;
                case HTML_KEY_JADE:
                    _htmlTxt += INDENT_VALUE + INDENT_VALUE + "link(href=\"" + getPathInfoCssUtil().srcPath + "\", rel=\"stylesheet\", type=\"text/css\")\n";
                    break;
            }
        }
        if (dialogManager.getHtmlDoctype() != HTML_KEY_JADE) {
            _htmlTxt += INDENT_VALUE + "</head>\n";
            _htmlTxt += INDENT_VALUE + "<body>\n";
        } else {
            _htmlTxt += INDENT_VALUE + "body\n";
        }
        // HTMLテキスト作成（可変部分）
        var infoArr = infoManager.getLayerInfo();
        _htmlTxt += _export({
            arr:infoArr,
            text:"",
            depth:0
        });
        // HTMLテキスト作成（固定部分）
        if (dialogManager.getHtmlDoctype() != HTML_KEY_JADE) {
            _htmlTxt += INDENT_VALUE + "</body>\n";
            _htmlTxt += "</html>\n";
        }
        // ファイル書き込み
        fileObj.write(_htmlTxt);
        fileObj.close();
    };

    function _export(e) {
        var arr = e.arr;
        var text = e.text;
        var depth = e.depth;
        var boxText = "";
        var tab = INDENT_VALUE + INDENT_VALUE;
        for (var i = 0; i < depth; i++) {
            tab += INDENT_VALUE;
        }
        var length = arr.length;
        for (var i = 0; i < length; i++) {
            // HTMLテキスト作成（可変部分）
            switch (arr[i].type) {
                // 通常レイヤー
                case TYPE_KEY_NORMAL:
                    switch (dialogManager.getHtmlDoctype()) {
                        case HTML_KEY_HTML4:
                            text += tab + "<img id=\"" + arr[i].name + "\" alt=\"" + arr[i].alt + "\" src=\"" + getPathInfoImagesUtil().folderPathHtml + arr[i].name + getExtFromFileTypeUtil({file:arr[i].file}) + "\" width=\"" + arr[i].width + "\" height=\"" + arr[i].height + "\">\n";
                            break;
                        case HTML_KEY_XHTML:
                            text += tab + "<img id=\"" + arr[i].name + "\" alt=\"" + arr[i].alt + "\" src=\"" + getPathInfoImagesUtil().folderPathHtml + arr[i].name + getExtFromFileTypeUtil({file:arr[i].file}) + "\" width=\"" + arr[i].width + "\" height=\"" + arr[i].height + "\" />\n";
                            break;
                        case HTML_KEY_HTML5:
                            text += tab + "<img id=\"" + arr[i].name + "\" alt=\"" + arr[i].alt + "\" src=\"" + getPathInfoImagesUtil().folderPathHtml + arr[i].name + getExtFromFileTypeUtil({file:arr[i].file}) + "\" width=\"" + arr[i].width + "\" height=\"" + arr[i].height + "\">\n";
                            break;
                        case HTML_KEY_JADE:
                            text += tab + "img#" + arr[i].name + "(alt=\"" + arr[i].alt + "\", src=\"" + getPathInfoImagesUtil().folderPathHtml + arr[i].name + getExtFromFileTypeUtil({file:arr[i].file}) + "\", width=\"" + arr[i].width + "\", height=\"" + arr[i].height + "\")\n";
                            break;
                    }
                    break;
                // テキストレイヤー
                case TYPE_KEY_TEXT:
                    switch (dialogManager.getHtmlDoctype()) {
                        case HTML_KEY_HTML4:
                            text += tab + "<p id=\"" + arr[i].name + "\">" + arr[i].text.contents.replace(/\r/g, "<br>\n" + tab + "\t") + "</p>\n";
                            break;
                        case HTML_KEY_XHTML:
                            text += tab + "<p id=\"" + arr[i].name + "\">" + arr[i].text.contents.replace(/\r/g, "<br />\n" + tab + "\t") + "</p>\n";
                            break;
                        case HTML_KEY_HTML5:
                            text += tab + "<p id=\"" + arr[i].name + "\">" + arr[i].text.contents.replace(/\r/g, "<br>\n" + tab + "\t") + "</p>\n";
                            break;
                        case HTML_KEY_JADE:
                            text += tab + "p#" + arr[i].name + " " + arr[i].text.contents.replace(/\r/g, "\n" + tab + INDENT_VALUE + "br\n" + tab + INDENT_VALUE + "|") + "\n";
                            break;
                    }
                    break;
                // レイヤーセット
                case TYPE_KEY_GROUP:
                    if (dialogManager.getHtmlDoctype() != HTML_KEY_JADE) {
                        boxText = tab + "<div id=\"" + arr[i].name + "\">\n";
                        // 再帰処理
                        text += _export({
                            arr:arr[arr[i].name],
                            text:boxText,
                            depth:depth + 1
                        });
                        //
                        text += tab + "</div>\n";
                    } else {
                        boxText = tab + "div#" + arr[i].name + "\n";
                        // 再帰処理
                        text += _export({
                            arr:arr[arr[i].name],
                            text:boxText,
                            depth:depth + 1
                        });
                    }
                    break;
            }
        }
        return text;
    }

};

//
// ----- CSS出力
//
var CssExporter = function () {

    var _cssTxt;
    var _depth;

    // 初期化
    this.init = function () {
        _cssTxt = "";
        _depth = 0;
    };

    // 出力
    this.export = function (e) {
        // フォルダ作成
        createDirectoryUtil({path:dialogManager.getCssFolderPath()});
        // ファイル開く
        var fileObj = new File(getPathInfoCssUtil().fullPath);
        fileObj.open("w");
        fileObj.encoding = dialogManager.getEncodeInfo().system;
        // CSSテキスト作成（固定部分）
        _cssTxt += "@charset \"" + dialogManager.getEncodeInfo().charset + "\";\n";
        _cssTxt += "\n";
        _cssTxt += "body {\n";
        _cssTxt += "\tbackground-color: #" + dialogManager.getOtherBgColor() + ";\n";
        var infoArr = infoManager.getLayerInfo();
        var length = infoArr.length;
        for (var i = 0; i < length; i++) {
            var info = infoArr[i];
            if (info.type == TYPE_KEY_BG) {
                _cssTxt += "\tbackground-repeat: no-repeat;\n";
                _cssTxt += "\tbackground-image: url(\"" + getPathInfoImagesUtil().folderPathCss + info.name + getExtFromFileTypeUtil({file:info.file}) + "\");\n";
                var left = (info.left == 0) ? 0 : info.left + "px";
                var top = (info.top == 0) ? 0 : info.top + "px";
                _cssTxt += "\tbackground-position: " + left + " " + top + ";" + "\n";
                break;
            }
        }
        _cssTxt += "}\n";
        _cssTxt += "\n";
        if (dialogManager.getIsAbsolute()) {
            _cssTxt += "p {\n";
            _cssTxt += "\tpadding: 0;\n";
            _cssTxt += "\tmargin: 0;\n";
            _cssTxt += "}\n";
            _cssTxt += "\n";
        }
        // CSSテキスト作成（可変部分）
        _export({arr:infoArr});
        // CSSテキスト作成（固定部分）
        _cssTxt += "\n";
        // ファイル書き込み
        fileObj.write(_cssTxt);
        fileObj.close();
    };

    function _export(e) {
        var arr = e.arr;
        // レイヤーCSS
        var length = arr.length;
        for (var i = 0; i < length; i++) {
            var item = arr[i];
            // CSSテキスト作成（可変部分）
            if (item.type == TYPE_KEY_NORMAL || item.type == TYPE_KEY_TEXT || item.type == TYPE_KEY_GROUP) {
                _cssTxt += "#" + item.name + " {\n";
                if (dialogManager.getIsAbsolute()) {
                    _cssTxt += "\tposition: absolute;\n";
                    _depth = _depth + 1;
                    var left = (item.left == 0) ? 0 : item.left + "px";
                    var top = (item.top == 0) ? 0 : item.top + "px";
                    _cssTxt += "\ttop: " + top + ";\n";
                    _cssTxt += "\tleft: " + left + ";\n";
                }
                // ボックス
                if (item.type == TYPE_KEY_GROUP) {
                    // サイズ
                    _cssTxt += "\twidth: " + item.width + "px;\n";
                    _cssTxt += "\theight: " + item.height + "px;\n";
                    // 背景情報取得
                    var _bgTxt = "";
                    var arr2 = arr[item.name];
                    var length2 = arr2.length;
                    for (var j = 0; j < length2; j++) {
                        var item2 = arr2[j];
                        if (item2.type == TYPE_KEY_BG) {
                            _bgTxt += "\tbackground-repeat: no-repeat;\n";
                            _bgTxt += "\tbackground-image: url(\"" + getPathInfoImagesUtil().folderPathCss + item2.name + getExtFromFileTypeUtil({file:item2.file}) + "\");\n";
                            if (dialogManager.getIsAbsolute()) {
                                var left = (item2.left == 0) ? 0 : item2.left + "px";
                                var top = (item2.top == 0) ? 0 : item2.top + "px";
                                _bgTxt += "\tbackground-position: " + left + " " + top + ";" + "\n";
                            }
                        }
                    }
                    _cssTxt += _bgTxt;
                }
                // テキスト
                if (item.type == TYPE_KEY_TEXT) {
                    // サイズ
                    _cssTxt += "\twidth: " + item.width + "px;\n";
                    _cssTxt += "\theight: " + item.height + "px;\n";
                    // フォント情報
                    var fontSize = item.text.size;
                    _cssTxt += "\tfont-size: " + fontSize.replace(/ /, "") + ";\n";
                    var align = null;
                    switch (item.text.align) {
                        case Justification.CENTER:
                            align = "center";
                            break;
                        case Justification.RIGHT:
                            align = "right";
                            break;
                    }
                    if (align) _cssTxt += "\ttext-align: " + align + ";\n";
                    if (item.text.bold)_cssTxt += "\tfont-weight: bold;\n";
                    if (item.text.italic)_cssTxt += "\tfont-style: italic;\n";
                    _cssTxt += "\tcolor: " + item.text.color + ";\n";
                }
                // 背景色
                if (item.color) {
                    _cssTxt += "\tbackground-color: #" + item.color + ";\n";
                }
                _cssTxt += "}\n";
                _cssTxt += "\n";
            }
            if (item.type == TYPE_KEY_GROUP) {
                // 再帰処理
                _export({arr:arr[item.name]});
            }
        }
    }

};

//
// ==================== Action ==================== //
//

// 定数
var OPTION_KEY_BGIMAGE = "*"; // オプションキー（背景レイヤー）
var OPTION_KEY_ALT = "@"; // オプションキー（ALTタグ）
var OPTION_KEY_COLOR = "#"; // オプションキー（背景色）
var INDENT_VALUE = "    "; // Jadeのインデント使用文字
var TYPE_KEY_BG = "bg"; // タイプキー（背景レイヤー）
var TYPE_KEY_NORMAL = "normal"; // タイプキー（通常レイヤー）
var TYPE_KEY_TEXT = "text"; // タイプキー（テキストレイヤー）
var TYPE_KEY_GROUP = "group"; // タイプキー（レイヤーセット）
var FILE_KEY_PNG = "png"; // ファイルキー（PNG）
var FILE_KEY_JPG = "jpg"; // ファイルキー（JPEG）
var FILE_KEY_GIF = "gif"; // ファイルキー（GIF）
var HTML_KEY_HTML5 = "html5"; // HTMLキー（html5）
var HTML_KEY_XHTML = "xhtml"; // HTMLキー（xhtml）
var HTML_KEY_HTML4 = "html4"; // HTMLキー（html4.01）
var HTML_KEY_JADE = "jade"; // HTMLキー（jade）
// インスタンス
var dialogManager = new DialogManager();
var errorChecker = new ErrorChecker();
var imageExporter = new ImageExporter();
var infoManager = new InfoManager();
var htmlExporter = new HtmlExporter();
var cssExporter = new CssExporter();
// プロパティ
var exportRoot; // 出力先ルートディレクトリ

// 初期化
initEvent();
// ダイアログ開く
openDialogEvent();

//
// ==================== Event ==================== //
//

//
// ----- 初期化
//
function initEvent(e) {
    // プロパティ初期化
    exportRoot = activeDocument.path + "/" + String(activeDocument.name).substring(0, String(activeDocument.name).length - 4);
    // インスタンス初期化
    dialogManager.init();
    errorChecker.init();
    imageExporter.init();
    infoManager.init();
    htmlExporter.init();
    cssExporter.init();
}

//
// ----- ダイアログ開く
//
function openDialogEvent(e) {
    // ダイアログ開く
    dialogManager.open();
}

//
// ----- エラーチェック
//
function checkErrorEvent(e) {
    // エラーチェック
    errorChecker.check();
}

//
// ----- 書き出し開始
//
function startExportEvent(e) {
    // ルートフォルダ作成
    var folderObj = new Folder(exportRoot);
    folderObj.create();
    if (dialogManager.getIsExportImages()) {
        // 画像出力
        imageExporter.export();
    }
    if (dialogManager.getIsExportHtml() || dialogManager.getIsExportCss()) {
        // 情報抽出
        infoManager.extract();
        if (dialogManager.getIsExportHtml()) {
            // HTML出力
            htmlExporter.export();
        }
        if (dialogManager.getIsExportCss()) {
            // CSS出力
            cssExporter.export();
        }
    }
    // 書き出し終了イベント
    completeExportEvent();
}

//
// ----- 書き出し終了
//
function completeExportEvent(e) {
    alert("終了しました。");
}

//
// ==================== Util ==================== //
//

//
// ----- 画像パス情報取得
//
function getPathInfoImagesUtil(e) {
    var folderPathFull = "";
    var folderPathHtml = "";
    var folderPathCss = "";
    if (dialogManager.getImageFolderPath() == "") {
        folderPathFull = exportRoot;
        folderPathHtml = dialogManager.getRootPathFromHtml();
        folderPathCss = dialogManager.getRootPathFromCss();
    } else {
        folderPathFull = exportRoot + "/" + dialogManager.getImageFolderPath();
        folderPathHtml = dialogManager.getRootPathFromHtml() + dialogManager.getImageFolderPath() + "/";
        folderPathCss = dialogManager.getRootPathFromCss() + dialogManager.getImageFolderPath() + "/";
    }
    return {
        folderPathFull:folderPathFull,
        folderPathHtml:folderPathHtml,
        folderPathCss:folderPathCss
    };
}

//
// ----- HTMLパス情報取得
//
function getPathInfoHtmlUtil(e) {
    var fullPath = "";
    var folderPath = "";
    var fileName = "";
    var srcPath = "";
    var ext = "";
    if (dialogManager.getHtmlDoctype() != HTML_KEY_JADE) {
        ext = ".html";
    } else {
        ext = ".jade";
    }
    if (dialogManager.getHtmlFolderPath() == "") {
        fullPath = exportRoot + "/" + dialogManager.getHtmlFileName() + ext;
        folderPath = exportRoot;
        fileName = dialogManager.getHtmlFileName() + ext;
        srcPath = dialogManager.getRootPathFromHtml() + dialogManager.getHtmlFileName() + ext;
    } else {
        fullPath = exportRoot + "/" + dialogManager.getHtmlFolderPath() + "/" + dialogManager.getHtmlFileName() + ext;
        folderPath = exportRoot + "/" + dialogManager.getHtmlFolderPath();
        fileName = dialogManager.getHtmlFileName() + ext;
        srcPath = dialogManager.getRootPathFromHtml() + dialogManager.getHtmlFolderPath() + "/" + dialogManager.getHtmlFileName() + ext;
    }
    return {
        fullPath:fullPath,
        folderPath:folderPath,
        fileName:fileName,
        srcPath:srcPath
    };
}

//
// ----- CSSパス情報取得
//
function getPathInfoCssUtil(e) {
    var fullPath = "";
    var folderPath = "";
    var fileName = "";
    var srcPath = "";
    if (dialogManager.getCssFolderPath() == "") {
        fullPath = exportRoot + "/" + dialogManager.getCssFileName() + ".css";
        folderPath = exportRoot;
        fileName = dialogManager.getCssFileName() + ".css";
        srcPath = dialogManager.getRootPathFromHtml() + dialogManager.getCssFileName() + ".css";
    } else {
        fullPath = exportRoot + "/" + dialogManager.getCssFolderPath() + "/" + dialogManager.getCssFileName() + ".css";
        folderPath = exportRoot + "/" + dialogManager.getCssFolderPath();
        fileName = dialogManager.getCssFileName() + ".css";
        srcPath = dialogManager.getRootPathFromHtml() + dialogManager.getCssFolderPath() + "/" + dialogManager.getCssFileName() + ".css";
    }
    return {
        fullPath:fullPath,
        folderPath:folderPath,
        fileName:fileName,
        srcPath:srcPath
    };
}

//
// ----- レイヤー名取得
//
function getLayerNameUtil(e) {
    var str = (e) ? e.name : "";
    if (String(str).charAt(0) == OPTION_KEY_BGIMAGE) {
        str = String(str).slice(1);
    }
    var index = String(str).indexOf(OPTION_KEY_ALT);
    if (1 <= index) {
        str = String(str).substr(0, index);
    }
    index = String(str).indexOf(OPTION_KEY_COLOR);
    if (1 <= index) {
        str = String(str).substr(0, index);
    }
    str = str.replace(".png", "");
    str = str.replace(".jpg", "");
    str = str.replace(".gif", "");
    return str;
}

//
// ----- ALT値取得
//
function getLayerAltUtil(e) {
    var str = (e) ? e.name : "";
    var index = String(str).indexOf(OPTION_KEY_ALT);
    if (1 <= index) {
        str = String(str).substr(index + 1, String(str).length - 1);
        index = String(str).indexOf(OPTION_KEY_COLOR);
        if (1 <= index) {
            return String(str).substr(0, index);
        } else {
            return str;
        }
    } else {
        return "";
    }
}

//
// ----- 背景色取得
//
function getLayerColorUtil(e) {
    var str = (e) ? e.name : "";
    var index = String(str).indexOf(OPTION_KEY_COLOR);
    if (1 <= index) {
        str = String(str).substr(index + 1, String(str).length - 1);
        index = String(str).indexOf(OPTION_KEY_ALT);
        if (1 <= index) {
            str = String(str).substr(0, index);
        }
        return getHexColorTextUtil(str);
    } else {
        return null;
    }
}

//
// ----- ファイルタイプから拡張子取得
//
function getExtFromFileTypeUtil(e) {
    var str = (e || e.file) ? e.file : dialogManager.getDefaultFileType();
    switch (str) {
        case FILE_KEY_PNG:
            return ".png";
            break;
        case FILE_KEY_JPG:
            return ".jpg";
            break;
        case FILE_KEY_GIF:
            return ".gif";
            break;
    }
}

//
// ----- ファイル名から拡張子取得
//
function getFileInfoFromFileNameUtil(e) {
    var str = String(e.name);
    if (0 < str.lastIndexOf(".png")) {
        return {
            type:FILE_KEY_PNG,
            ext:".png"
        };
    } else if (0 < str.lastIndexOf(".jpg")) {
        return {
            type:FILE_KEY_JPG,
            ext:".jpg"
        };
    } else if (0 < str.lastIndexOf(".gif")) {
        return {
            type:FILE_KEY_GIF,
            ext:".gif"
        };
    } else {
        return {
            type:dialogManager.getDefaultFileType(),
            ext:getExtFromFileTypeUtil({file:dialogManager.getDefaultFileType()})
        };
    }
}

//
// ----- ディレクトリ作成
//
function createDirectoryUtil(e) {
    // 画像フォルダ作成
    var path = e.path;
    var depth = 0;
    var directory = exportRoot;
    var arr = null;
    if (path != "") {
        arr = String(path).split("/");
        depth = arr.length;
    }
    if (0 < depth) {
        for (var i = 0; i < depth; i++) {
            directory += "/" + arr[i];
            var folderObj = new Folder(directory);
            folderObj.create();
        }
    }
    return folderObj;
}

//
// ----- レイヤーにチャンネルマスクが存在するかどうか
//
function hasChannelMaskByName(name){
    var ref = new ActionReference();
    ref.putName(charIDToTypeID("Lyr "), name);
    return executeActionGet(ref).getBoolean(stringIDToTypeID("hasUserMask"));
}

//
// ----- レイヤーにベクターマスクが存在するかどうか
//
function hasVectorMaskByName(name){
    var ref = new ActionReference();
    ref.putName(charIDToTypeID("Lyr "), name);
    return executeActionGet(ref).getBoolean(stringIDToTypeID("hasVectorMask"));
}

//
// ----- HexColorを取り出す
//
function getHexColorTextUtil(value) {
    var str = String(value).replace("#", "");
    str = String(/[0-9A-Fa-f]{6}/g.exec(str));
    if (!str) {
        str = "ffffff";
    }
    return str;
}
