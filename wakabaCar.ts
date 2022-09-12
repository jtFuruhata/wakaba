/**
* Custom Blocks for SwitchEducation SEDU-058414 line tracer kit
*   wakabaCar.ts    ver.2022.03.07a
* by TANAHASHI, Jiro (aka jtFuruhata)
* Copyright (C) 2022 jtLab, Hokkaido Information University
*/

let rightSensor = 0
let leftSensor = 0
let psdSensor = 0
let closeness = 0
let rightMotorPower = 0
let leftMotorPower = 0
let stopByButtonIsPressed = true
let blackness = 500

enum Tristate {
    //% block="両方の"
    both = 0,
    //% block="右の"
    right = 1,
    //% block="左の"
    left = 2
}

enum Rotate {
    //% block="前"
    forward = 0,
    //% block="逆"
    backward = 1
}
let rightMotorDirection = Rotate.forward
let leftMotorDirection = Rotate.forward

/**
 * Custom blocks
 */
//% weight=100 color=#80A030 icon="\uf1b9"
//% block="わかばカー"
namespace wakabaCar {
    //% weight=90 block="$tristate モーターパワーを $power ％にする"
    //% power.min=0 power.max=100 power.defl=50
    export function setMotorPower(tristate:Tristate, power:number): void {
        if (tristate == 0 || tristate == 1) {
            rightMotorPower = power*10
        }
        if (tristate == 0 || tristate == 2) {
            leftMotorPower = power*10
        }
    }

    //% weight=50 block="$select を2桁で表示する"
    //% select.min=0 select.max=21 power.defl=1
    export function showNunber2(select: number): void {
        if (select < 10) {
            basic.showNumber(select)
        } else {
            if (select == 10) {
                basic.showLeds(`
                    # . . # .
                    # . # . #
                    # . # . #
                    # . # . #
                    # . . # .
                    `)
            }
            if (select == 11) {
                basic.showLeds(`
                    # . . # .
                    # . . # .
                    # . . # .
                    # . . # .
                    # . . # .
                    `)
            }
        }
        if (select == 12) {
            basic.showLeds(`
                # . . # .
                # . # . #
                # . . . #
                # . . # .
                # . # # #
                `)
        }
        if (select == 13) {
            basic.showLeds(`
                # . # # .
                # . . . #
                # . # # #
                # . . . #
                # . # # .
                `)
        }
        if (select == 14) {
            basic.showLeds(`
                # . # . #
                # . # . #
                # . # # #
                # . . . #
                # . . . #
                `)
        }
        if (select == 15) {
            basic.showLeds(`
                # . # # #
                # . # . .
                # . # # .
                # . . . #
                # . # # .
                `)
        }
        if (select == 16) {
            basic.showLeds(`
                # . . # #
                # . # . .
                # . # # .
                # . # . #
                # . . # .
                `)
        }
        if (select == 17) {
            basic.showLeds(`
                # . # # #
                # . . . #
                # . . # .
                # . . # .
                # . . # .
                `)
        }
        if (select == 18) {
            basic.showLeds(`
                # . . # .
                # . # . #
                # . . # .
                # . # . #
                # . . # .
                `)
        }
        if (select == 19) {
            basic.showLeds(`
                # . . # .
                # . # . #
                # . . # #
                # . . . #
                # . # # .
                `)
        }
        if (select == 20) {
            basic.showLeds(`
                # # . # .
                . # # . #
                . # # . #
                # . # . #
                # # . # .
                `)
        }
        if (select == 21) {
            basic.showLeds(`
                # # . # .
                . # . # .
                . # . # .
                # . . # .
                # # . # .
                `)
        }
    }

    //% weight=85 block="$tristate モーターを止める"
    export function stopMotor(tristate: Tristate): void {
        setMotorPower(tristate, 0)
        runCar()
    }

    //% weight=80 block="走らせる"
    export function runCar(): void {
        if (stopByButtonIsPressed && (input.buttonIsPressed(Button.A) || (input.buttonIsPressed(Button.B)))) {
            rightMotorPower = 0
            leftMotorPower = 0
        }
        pins.digitalWritePin(DigitalPin.P14, rightMotorDirection)
        pins.digitalWritePin(DigitalPin.P16, leftMotorDirection)
        pins.analogWritePin(AnalogPin.P13, rightMotorPower)
        pins.analogWritePin(AnalogPin.P15, leftMotorPower)
    }

    //% weight=100 block="センサーバーを表示する"
    export function showStatus(): void {
        rightSensor = pins.analogReadPin(AnalogPin.P0)
        leftSensor = pins.analogReadPin(AnalogPin.P1)
        psdSensor = pins.analogReadPin(AnalogPin.P2)
        basic.clearScreen()
        if (rightSensor > 100) {
            led.plot(0, 4)
        }
        if (rightSensor > 200) {
            led.plot(1, 4)
        }
        if (rightSensor > 300) {
            led.plot(0, 3)
        }
        if (rightSensor > 400) {
            led.plot(1, 3)
        }
        if (rightSensor > 500) {
            led.plot(0, 2)
        }
        if (rightSensor > 600) {
            led.plot(1, 2)
        }
        if (rightSensor > 700) {
            led.plot(0, 1)
        }
        if (rightSensor > 800) {
            led.plot(1, 1)
        }
        if (rightSensor > 900) {
            led.plot(0, 0)
        }
        if (rightSensor > 1000) {
            led.plot(1, 0)
        }
        if (leftSensor > 100) {
            led.plot(4, 4)
        }
        if (leftSensor > 200) {
            led.plot(3, 4)
        }
        if (leftSensor > 300) {
            led.plot(4, 3)
        }
        if (leftSensor > 400) {
            led.plot(3, 3)
        }
        if (leftSensor > 500) {
            led.plot(4, 2)
        }
        if (leftSensor > 600) {
            led.plot(3, 2)
        }
        if (leftSensor > 700) {
            led.plot(4, 1)
        }
        if (leftSensor > 800) {
            led.plot(3, 1)
        }
        if (leftSensor > 900) {
            led.plot(4, 0)
        }
        if (leftSensor > 1000) {
            led.plot(3, 0)
        }
        closeness = 0
        if (psdSensor > 233) { // 0.75V/approx.40cm
            closeness = 1
            led.plot(2, 4)
        }
        if (psdSensor > 310) { // 1.00V/approx.28cm
            closeness = 2
            led.plot(2, 3)
        }
        if (psdSensor > 465) { // 1.50V/approx.17cm
            closeness = 3
            led.plot(2, 2)
        }
        if (psdSensor > 543) { // 1.75V/approx.15cm
            closeness = 4
            led.plot(2, 1)
        }
        if (psdSensor > 620) { // 2.00V/approx.12cm
            closeness = 5
            led.plot(2, 0)
        }
    }

    //% block="ぶつかりそう"
    export function isDanger(): boolean {
        return closeness > 2 ? true : false;
    }
    //% block="$tristate センサーが黒っぽい"
    export function isBlack(tristate:Tristate): boolean {
        let resultRight = false
        let resultLeft = false
        let result = false
        if (pins.analogReadPin(AnalogPin.P0) > blackness) {
            resultRight = true
        }
        if (pins.analogReadPin(AnalogPin.P1) > blackness) {
            resultLeft = true
        }
        if (tristate == Tristate.right) {
            result = resultRight
        } else if (tristate == Tristate.left) {
            result = resultLeft
        } else {
            result = resultRight && resultLeft
        }
        return result
    }
    //% weight=14 block="近さ"
    export function getCloseness(): number {
        return closeness
    }
    //% weight=13 block="右センサー"
    export function getRightSensor(): number {
        return rightSensor
    }
    //% weight=12 block="左センサー"
    export function getLeftSensor(): number {
        return leftSensor
    }
    //% weight=11 block="障害物センサー"
    export function getPsdSensor(): number {
        return psdSensor
    }
    //% weight=5 block="$tristate モーターを $rotate 回りにする"
    export function setRotateDirection(tristate:Tristate, rotate:Rotate): void {
        if (tristate == Tristate.both || tristate == Tristate.right) {
            rightMotorDirection = rotate
        }
        if (tristate == Tristate.both || tristate == Tristate.left) {
            leftMotorDirection = rotate
        }
    }
    //% weight=1 block="黒っぽさを $value にする"
    //% value.min=0 value.max=1023 value.defl=500
    export function setBlackness(value:number): void {
        blackness = value;
    }
}
