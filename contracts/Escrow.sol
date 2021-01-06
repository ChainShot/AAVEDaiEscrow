//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.5;

import "./interfaces/IERC20.sol";
import "./interfaces/ILendingPool.sol";

contract Escrow {
    address arbiter;
    address depositor;
    address beneficiary;
    uint initialDeposit;
    ILendingPool pool;
    IERC20 aDai;
    IERC20 dai;

    constructor(ILendingPool _pool, IERC20 _aDai, IERC20 _dai, address _arbiter, address _beneficiary, uint _amount) {
				pool = _pool;
				aDai = _aDai;
				dai = _dai;

        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;

        initialDeposit = _amount;

        dai.transferFrom(msg.sender, address(this), _amount);
        dai.approve(address(pool), _amount);

        pool.deposit(address(dai), _amount, address(this), 0);
   	}

	 	event Approved();

  	function approve() external {
        require(msg.sender == arbiter, "Approve must be called by the arbiter!");

        uint balance = aDai.balanceOf(address(this));

        aDai.approve(address(pool), balance);

        pool.withdraw(address(dai), initialDeposit, beneficiary);

        pool.withdraw(address(dai), type(uint).max, depositor);

				emit Approved();
    }
}
