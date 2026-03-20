import PotBody from "../features/pots/PotBody";
import PotHeader from "../features/pots/PotHeader";
import Modal from "../ui/Modal";

function Pots() {
  return (
    <Modal>
      <PotHeader />
      <PotBody />
    </Modal>
  );
}

export default Pots;
