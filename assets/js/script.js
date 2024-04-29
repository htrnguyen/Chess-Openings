$(window).resize(function () {
    updateBoardSize()
})

function updateBoardSize() {
    var boardWidth = Math.min(
        $('#board-container').width(),
        $(window).height() - $('#game-options').height() - 30
    )
    board.resize(boardWidth)
}

$(document).ready(function () {
    updateBoardSize()
})
// Đính kèm sự kiện 'touchstart' vào bàn cờ
$('#board').on('touchstart mousedown', function (e) {
    e.preventDefault() // Ngăn chặn hành vi cuộn mặc định
})

// Nếu bạn sử dụng sự kiện kéo thả của HTML5:
$('#board .square-55d63').on('dragstart', function (e) {
    e.preventDefault() // Ngăn chặn hành vi cuộn mặc định
})

// ----------------- Chess Game -----------------
var board = null
var game = new Chess()
var botColor = 'white'
var playerColor = 'white'
var openingMoves = []
var boardEl = $('#board')

//  Lấy dữ liệu từ file json
var openings = {}
$(document).ready(function () {
    $.getJSON('data/openings.json', function (data) {
        openings = data
        updateOpeningsDropdown()
    })
})

function updateOpeningsDropdown() {
    var openingSelect = $('#opening-select')
    openingSelect.empty()
    openingSelect.append($('<option>', {value: 'none', text: 'None'}))
    $.each(openings, function (key, value) {
        if (key !== 'none') {
            openingSelect.append(
                $('<option>', {value: key, text: key.replace(/_/g, ' ')})
            )
        }
    })
}

// Cấu hình bàn cờ
var config = {
    draggable: true,
    position: 'start',
    onDrop: handleMove,
    onSnapEnd: updateBoard,
    pieceTheme: 'assets/img/chesspieces/wikipedia/{piece}.png',
}

// Xử lý nước đi của người chơi
function handleMove(source, target) {
    if (playerColor === 'black' && game.history().length === 0) {
        window.setTimeout(makeBotMove, 250)
    }

    var move = game.move({
        from: source,
        to: target,
        promotion: 'q',
    })

    if (move === null) return 'snapback'

    var moveSound = document.getElementById('moveSound')
    moveSound.play()

    if (openingMoves.length > 0) {
        var moveIndex = game.history().length - 1
        if (moveIndex < openingMoves.length) {
            if (move.san !== openingMoves[moveIndex]) {
                game.undo()
                updateStatus(
                    'Move does not match the opening. Please try again.'
                )
                return 'snapback'
            }
        } else {
            updateStatus('The opening has ended. You can play your own moves.')
            openingMoves = []
        }
    }

    window.setTimeout(makeBotMove, 250)
}

// Xử lý nước đi của bot
function makeBotMove() {
    if (
        (botColor === 'white' && game.history().length === 0) ||
        game.history().length < openingMoves.length
    ) {
        var move = openingMoves[game.history().length]
        var moveSound = document.getElementById('moveSound')
        moveSound.play()
        game.move(move)
        updateBoard()
    }
}

// Cập nhật bàn cờ
function updateBoard() {
    board.position(game.fen())
    checkGameStatus()
}

// Kiểm tra trạng thái trò chơi
function checkGameStatus() {
    if (game.in_checkmate()) {
        updateStatus(
            'Checkmate! ' + (game.turn() === 'b' ? 'White' : 'Black') + ' wins!'
        )
    } else if (game.in_stalemate()) {
        updateStatus('Stalemate!')
    }
}

// Cập nhật thông báo trạng thái
function updateStatus(message, timeout = 5000) {
    var statusEl = document.getElementById('status')
    statusEl.textContent = message
    statusEl.style.display = 'block'
    setTimeout(function () {
        statusEl.textContent = ''
    }, timeout)
}

// Khởi tạo trò chơi
function initGame() {
    playerColor = document.getElementById('color-select').value
    botColor = playerColor === 'white' ? 'black' : 'white'
    var selectedOpening = document.getElementById('opening-select').value

    config.orientation = playerColor
    game.reset()

    openingMoves = openings[selectedOpening] || []
    board = Chessboard('board', config)
    updateStatus(
        'The game begins. You chose ' +
            playerColor +
            ' and ' +
            selectedOpening +
            ' opening.'
    )

    if (playerColor === 'black' && openingMoves.length > 0) {
        makeBotMove()
    }
    updateBoardSize()
}

// Reset bàn cờ
function resetBoard() {
    game.reset()
    board.start()
    updateStatus('The game has been reset.')
}

// Xóa bàn cờ
function clearBoard() {
    board.clear()
    updateStatus('The board has been cleared.')
}

window.addEventListener('load', initGame)

document.getElementById('startBtn').addEventListener('click', initGame)
document.getElementById('resetBtn').addEventListener('click', resetBoard)
document.getElementById('clearBtn').addEventListener('click', clearBoard)
