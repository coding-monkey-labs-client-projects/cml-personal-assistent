package ai.cml-hive-assist.android.protocol

import org.junit.Assert.assertEquals
import org.junit.Test

class CmlHiveAssistProtocolConstantsTest {
  @Test
  fun canvasCommandsUseStableStrings() {
    assertEquals("canvas.present", CmlHiveAssistCanvasCommand.Present.rawValue)
    assertEquals("canvas.hide", CmlHiveAssistCanvasCommand.Hide.rawValue)
    assertEquals("canvas.navigate", CmlHiveAssistCanvasCommand.Navigate.rawValue)
    assertEquals("canvas.eval", CmlHiveAssistCanvasCommand.Eval.rawValue)
    assertEquals("canvas.snapshot", CmlHiveAssistCanvasCommand.Snapshot.rawValue)
  }

  @Test
  fun a2uiCommandsUseStableStrings() {
    assertEquals("canvas.a2ui.push", CmlHiveAssistCanvasA2UICommand.Push.rawValue)
    assertEquals("canvas.a2ui.pushJSONL", CmlHiveAssistCanvasA2UICommand.PushJSONL.rawValue)
    assertEquals("canvas.a2ui.reset", CmlHiveAssistCanvasA2UICommand.Reset.rawValue)
  }

  @Test
  fun capabilitiesUseStableStrings() {
    assertEquals("canvas", CmlHiveAssistCapability.Canvas.rawValue)
    assertEquals("camera", CmlHiveAssistCapability.Camera.rawValue)
    assertEquals("screen", CmlHiveAssistCapability.Screen.rawValue)
    assertEquals("voiceWake", CmlHiveAssistCapability.VoiceWake.rawValue)
  }

  @Test
  fun screenCommandsUseStableStrings() {
    assertEquals("screen.record", CmlHiveAssistScreenCommand.Record.rawValue)
  }
}
