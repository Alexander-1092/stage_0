export const answers = [
  ["Создать репозиторий", "init"],
  ["Проиндексировать все файлы", "add -A"],
  ["Зафиксировать коммит с коментарием", "commit -m"],
  ["отменить предыдущий коммит, не удаляя его из истории", "revert HEAD"],
  ["Измененить текст последнего коммита", "commit --amend -m"],
  [
    "удалить последний коммит со всеми добавленными данными",
    "reset --hard HEAD~1",
  ],

  ["Отмена индексации", "restore --staged"],

  [
    "Измененить описание старого коммита (3 с конца), не удаляя его из истории",
    "rebase -i HEAD~3",
  ],
  ["Посмотреть историю коммитов (в одну строку)", "log --oneline"],
  ["Посмотреть коммит", "show"],
  ["Посмотреть статус файла", "status"],
  [
    "Откатить ваше текущее состояние ветки на n коммитов назад и удалить все изменения",
    "reset --hard HEAD~n",
  ],
];
