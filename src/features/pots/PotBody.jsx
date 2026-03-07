import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import SpinnerContainer from "../../ui/SpinnerContainer";
import PotCard from "./PotCard";
import { usePots } from "./usePots";

function PotBody() {
  const { data: pots, isLoading } = usePots();

  if (isLoading) return <SpinnerContainer />;

  return (
    <Menus>
      <Modal>
        <div className="flex flex-col gap-6">
          {pots.map((pot) => (
            <PotCard key={pot.id} pot={pot} />
          ))}
        </div>
      </Modal>
    </Menus>
  );
}

export default PotBody;
