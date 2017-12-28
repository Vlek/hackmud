loc_array := []

^+e::
; Ctrl + Shift + e -> Used to automate the hardline code. Presses all numbers nine times.
; the code is twelve long, but I have not run into a time where I have not been able to
; get it in nine loops.
Loop, 9 {
Send, 0123456789
}
return

!e::
; Alt + e -> Copies and retains all of the selected loc addresses into an array.
Send, ^c
Sleep, 200
loc_array := StrSplit(clipboard, "`r`n")
return

^e::
; Ctrl + e -> Pastes a location script in a way to be used with a cracker script.
; mine is key and the args value I'm checking is for target.
; This is also able to press enter to run the script roughly half the time. I will
; have to play with it to make it more stable.
if (loc_array.Length()) {
	clipboard := "key {target: #s." . loc_array.Pop() . "}"
	Sleep, 50
	Send, ^v{Enter}
}
return
