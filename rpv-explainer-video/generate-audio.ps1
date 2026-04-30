Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SetOutputToWaveFile("c:\Users\DELL\RPV Project\rpv-explainer-video\public\voiceover.wav")

$text = "You bring your best, most expensive specimens to an expo. A collector walks up, falls in love with the plant... but hesitates. Is the lineage real? Is this vendor trustworthy? That hesitation is the sound of a lost sale. 
Enter Cultivar ID by Rare Plant Vendors. The definitive digital passport that turns your physical booth into a high-trust, frictionless showroom. 
Instead of just a price tag, your premium plants get a physical QR code. The collector scans it, and instantly sees the plants complete lineage, care history, and your verified nursery certifications right on their phone. 
You eliminate the uncertainty gap. You build instant authority. And most importantly, you close high-ticket sales right on the expo floor. 
Do not be the booth without a digital pulse. We are opening 17 lifetime Founding Seats ahead of the Miami Festival. Secure your legacy today at Real Plant Vendors dot com."

$synth.Speak($text)
$synth.Dispose()
