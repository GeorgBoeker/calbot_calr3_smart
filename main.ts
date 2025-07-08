function aktualisiereMR () {
    rueckwaerts = 0
    if (Math.abs(MR) < 5) {
        calliBot2.motorStop(C2Motor.rechts, C2Stop.Frei)
    } else {
        if (MR < 0) {
            rueckwaerts = 1
            calliBot2.motor(C2Motor.rechts, C2Dir.rueckwaerts, MR * -1)
        } else {
            calliBot2.motor(C2Motor.rechts, C2Dir.vorwaerts, MR)
        }
    }
}
bluetooth.onBluetoothConnected(function () {
    basic.showLeds(`
        . . # # .
        # . # . #
        . # # # .
        # . # . #
        . . # # .
        `)
})
function aktualisiereML () {
    rueckwaerts = 0
    if (Math.abs(ML) < 5) {
        calliBot2.motorStop(C2Motor.links, C2Stop.Frei)
    } else {
        if (ML < 0) {
            rueckwaerts = 1
            calliBot2.motor(C2Motor.links, C2Dir.rueckwaerts, ML * -1)
        } else {
            calliBot2.motor(C2Motor.links, C2Dir.vorwaerts, ML)
        }
    }
}
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    calliBot2.motorStop(C2Motor.rechts, C2Stop.Frei)
    calliBot2.motorStop(C2Motor.links, C2Stop.Frei)
})
let MRalt = 0
let MLalt = 0
let ntx = 0
let nachrichtTxt = ""
let ML = 0
let MR = 0
let rueckwaerts = 0
bluetooth.startUartService()
rueckwaerts = 0
MR = 0
ML = 0
basic.forever(function () {
    nachrichtTxt = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Pipe))
    ntx = parseFloat(nachrichtTxt)
    if (ntx >= 1000 && ntx <= 202202) {
        ML = Math.round(ntx / 1000) - 101
        MR = Math.round(ntx % 1000) - 101
        if (ML != MLalt) {
            aktualisiereML()
            MLalt = ML
        }
        if (MR != MRalt) {
            aktualisiereMR()
            MRalt = MR
        }
    }
})
