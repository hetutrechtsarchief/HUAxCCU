
void deselectAll() {
  for (Word w : p.words) {
    w.selected = false;
  }
}

void selectAll() {
  for (Word w : p.words) {
    w.selected = true;
  }
}

void previousWord() {
  Word w = p.getPreviousWord(focussedWord);
  if (w!=null) {
    focussedWord = w;
  }
}

void nextWord() {
  Word w = p.getNextWord(focussedWord);
  if (w!=null) {
    focussedWord = w;
  }
}
