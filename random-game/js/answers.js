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

export const answersLabyrinth = [
  [
    "Какой из команд нельзя создать ветку main",
    "swith -c main",
    "checkout -b main",
    "switch -b main",
    "switch -b main",
  ],
  [
    "Команда для удаление ветки main",
    "switch -d main",
    "checkout -d main",
    "branch -d main",
    "branch -d main",
  ],
  [
    "Какая команда произведет слияние ветки new-branch в ветку main",
    "merge new-branch",
    "rebase new-branch",
    "cherry-pick new-branch",
    "merge new-branch",
  ],
  [
    "Какая команда произведет перебазирование ветки new-branch в ветку main",
    "merge main",
    "rebase main",
    "cherry-pick main",
    "rebase main",
  ],
  [
    "Как создать новую ветку из коммита (хеш:d617836) ветки main",
    "checkout -b main хеш",
    "switch -b хеш main",
    "checkout -b хеш main",
    "checkout -b main хеш",
  ],
  [
    "Мы хотим получить изменения из старого коммита (после него были еще коммиты), в ветку new-branch из ветки main,без слияния с последними коммитами",
    "rebase -с хеш",
    "cherry-pick хеш",
    "merge -b хеш",
    "cherry-pick хеш",
  ],
  [
    "нам нужно удалить ветку new-branch, которая не была полностью синхронизированна с удаленным репозиторием, и в которой были изменения",
    "branch -d new-branch",
    "branch -D new-branch",
    "checkout -d new-branch",
    "branch -D new-branch",
  ],
  [
    "Команда для переименовании ветки в ветку main",
    "branch -m main",
    "switch -m main",
    "checkout -m main",
    "branch -m main",
  ],
];

export const answerShadow = {
  "Создать легковесный тег": "git tag имя_тега",
  "Создать аннонтированный тег": "git tag -a имя_тега -m'комментарий'",
  "Для просмотра всех тегов": "git tag",
  "Для просмотра тега": "git show имя_тега",
  "Для перехода на тег": "git checkout имя_тега",
  "Для удаления тега": "git tag -d имя_тега",
  "Команда, предназначенная для временного сохранения незакоммиченных изменений":
    "git stash",
  "Поместить изменения в рабочей области в  специальное хранилище, оставив при этом сообщение к нему":
    "git stash push -m 'сообщение'",
  "Восстановить последние сохранённые изменения из stash": "git stash apply",
  "Применяет последние сохранённые изменения из stash и одновременно удаляет их из списка stash":
    "git stash pop",
  "Восстановить конкретный stash": "git stash apply stash@{1}",
  "Удалить определенный stash": "git stash drop stash@{1}",
  "Удалить все stash": "git stash clear",
  "Посмотреть все сохраненные stash": "git stash list",
};
