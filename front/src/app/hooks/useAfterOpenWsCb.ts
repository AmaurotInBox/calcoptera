export const useAfterOpenWsCb = () => {
  const onAfterOpentWs = async () => {
    /**
     * здесь вся логика
     * которая вызявается сразу после открытия сокета
     * (вызов запроса на получение профиля, событий, подписки и т.д.)
     */
  }

  return {
    onAfterOpentWs,
  }
}
