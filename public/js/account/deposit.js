$(function () {
    // 読み込んだときの処理
    $('.submit').on('click', depositProcess);
    $('.conversion').click(function (event) {
        event.preventDefault();
        var point = $('.nowpoint').val();
        var newMemberPoint = Number(point) / 250;
        newMemberPoint = Math.floor(newMemberPoint);
        $('.grantPoint').text(newMemberPoint);
    });
    $('.reflect').click(function(){
        var reflectionPoint = $('.grantPoint').text();
        $('.additionPoints').val(reflectionPoint);
        $('.nowpoint').val('');
        $('.grantPoint').text('0');
    });
    $('.closeUp').click(function(){
        $('.nowpoint').val('');
        $('.grantPoint').text('0');
    });
});

/**
 * 入金処理
 * @param {Event} event
 */
function depositProcess(event) {
    // 押したときにデフォルトで実行される処理のキャンセル
    event.preventDefault();
    // エラー文言を消す
    $('.errors').text('');
    $('.errors').css('display', 'none');
    // 入力チェック
    var validation = false;
    if ($('input[name=recipientId]').val() === '') {
        $('.errors').append('受取人idが未入力です' + '<br>');
        validation = true;
    }
    if ($('input[name=recipientFamilyName]').val() === '') {
        $('.errors').append('セイが未入力です' + '<br>');
        validation = true;
    }
    if ($('input[name=recipientGivenName]').val() === '') {
        $('.errors').append('メイが未入力です' + '<br>');
        validation = true;
    }
    if ($('input[name=toAccountNumber]').val() === '') {
        $('.errors').append('会員コードが未入力です' + '<br>');
        validation = true;
    }
    if ($('input[name=amount]').val() === '') {
        $('.errors').append('加算ポイントが未入力です' + '<br>');
        validation = true;
    }
    
    if (validation) {
        // 入力チェックに当てはまったときの処理
        $('.errors').css('display', 'block');
        return;
    }
    // ボタンを押せなくする処理
    $('.submit').prop('disabled', true);
    // 認証情報取得
    getCredentials(function (auth) {
        // 認証情報取得後の処理
        console.log(auth);
        if (auth === null) {
            // エラー
            location.reload();
            return;
        }
        // 送信データ生成
        var data = {
            recipient: {
                id: $('input[name=toAccountNumber]').val(),
                name: $('input[name=recipientFamilyName]').val() + ' ' + $('input[name=recipientGivenName]').val(),
                url: $('input[name=recipientUrl]').val()
            },
            toAccountNumber: $('input[name=toAccountNumber]').val(),
            amount: Number($('input[name=amount]').val()),
            notes: $('input[name=notes]').val()
        };
        // 接続先を取得
        var endpoint = $('input[name=endpoint]').val();
        var depositDone = function (res) {
            // 通信成功の処理
            console.log('通信成功の処理', res);
            // ボタンを押せるようにする処理
            $('.submit').prop('disabled', false);
            // ポイント付与完了 モーダルを出す
            $('#grantingPointsDone').modal('toggle');
            // 入力リセット
            $('.form-control').val('');
        };
        var depositFail = function (res) {
            // 通信失敗の処理
            console.log('通信失敗の処理', res);
            if (res.code === 404) {
                $('.errors').text('会員コードが見つかりません');
            } else {
                $('.errors').html('エラーが発生しました<br>[' + res.message + ']');
            }
            $('.errors').css('display', 'block');
            // ボタンを押せるようにする処理
            $('.submit').prop('disabled', false);
        };
        // 通信開始
        new sasaki.service.Account({
            endpoint: endpoint,
            auth: auth
        }).deposit(data).then(depositDone).catch(depositFail);
    });
}

