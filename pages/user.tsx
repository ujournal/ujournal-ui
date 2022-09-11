import { SitePage } from "types";
import {useRouterQuery} from "../baza/hooks/useRouterQuery";
import {userPersonViewSafe} from "../features/user/hooks/userPersonViewSafe";
import {DateFormatted} from "../baza/components/DeteFormatted";
const UserPage: SitePage = () => {
  const {userId: _userId} = useRouterQuery<{ userId: number }>({
    userId: -1,
  });

  const personViewSafe = userPersonViewSafe({
    creatorId: _userId
  })

  return <>
    <h1>{personViewSafe.data?.person.name}</h1>
    <h4>Зареєстрований</h4>
    <DateFormatted date={new Date(personViewSafe.data?.person?.published ?? new Date() + "Z")}/>
    <p>Загальний рейтинг: {personViewSafe.data?.totalScore}</p>
    <p>Рейтинг постів: {personViewSafe.data?.postScore}</p>
    <p>Рейтинг коментарів: {personViewSafe.data?.commentScore}</p>
    <p>Кількість постів: {personViewSafe.data?.postCount}</p>
    <p>Кількість коментарів: {personViewSafe.data?.commentCount}</p>
  </>;
};

export default UserPage;
