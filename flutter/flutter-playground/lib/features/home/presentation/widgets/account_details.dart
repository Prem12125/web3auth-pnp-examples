import 'package:flutter/material.dart';
import 'package:flutter_playground/core/extensions.dart';
import 'package:flutter_playground/features/home/domain/entities/account.dart';
import 'package:web3auth_flutter/output.dart';

class AccountDetails extends StatelessWidget {
  final TorusUserInfo userInfo;
  final Account account;

  const AccountDetails({
    super.key,
    required this.userInfo,
    required this.account,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: Image.network(userInfo.profileImage!),
        ),
        const SizedBox(height: 8),
        Text(
          userInfo.name!,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(fontSize: 16),
        ),
        Row(
          children: [
            Text(
              account.publicAddress.addressAbbreviation,
            ),
            const SizedBox(width: 16),
            IconButton(
              onPressed: () {},
              icon: const Icon(
                Icons.copy,
                size: 14,
              ),
            )
          ],
        ),
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          child: TextButton(
            onPressed: () {},
            style: ButtonStyle(
              backgroundColor: MaterialStatePropertyAll(
                Theme.of(context).hoverColor,
              ),
              shape: MaterialStatePropertyAll(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
              ),
            ),
            child: const Text("View user info"),
          ),
        )
      ],
    );
  }
}
