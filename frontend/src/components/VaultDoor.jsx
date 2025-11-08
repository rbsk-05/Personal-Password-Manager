import React from "react";
import vaultImg from "../assets/vault.jpg"; // use any good metallic vault image

const VaultDoor = ({ onClick }) => {
  return (
    <div className="vault-center" onClick={onClick}>
      <img src={vaultImg} alt="Vault Door" className="vault-img" />
    </div>
  );
};

export default VaultDoor;
