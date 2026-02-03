package ai.cml-hive-assist.android.ui

import androidx.compose.runtime.Composable
import ai.cml-hive-assist.android.MainViewModel
import ai.cml-hive-assist.android.ui.chat.ChatSheetContent

@Composable
fun ChatSheet(viewModel: MainViewModel) {
  ChatSheetContent(viewModel = viewModel)
}
