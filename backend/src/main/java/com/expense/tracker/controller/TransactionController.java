package com.expense.tracker.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.expense.tracker.model.Transaction;
import com.expense.tracker.model.User;
import com.expense.tracker.payload.request.TransactionRequest;
import com.expense.tracker.payload.response.MessageResponse;
import com.expense.tracker.payload.response.TransactionResponse;
import com.expense.tracker.repository.TransactionRepository;
import com.expense.tracker.repository.UserRepository;
import com.expense.tracker.security.services.UserDetailsImpl;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public List<TransactionResponse> getAllUserTransactions(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId()).get();
        List<Transaction> transactions = transactionRepository.findByUserOrderByDateDesc(user);
        return transactions.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<?> createTransaction(@Valid @RequestBody TransactionRequest request, 
                                             @AuthenticationPrincipal UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getId()).get();
        Transaction transaction = new Transaction();
        updateTransactionFromRequest(transaction, request);
        transaction.setUser(user);
        transactionRepository.save(transaction);
        return ResponseEntity.ok(new MessageResponse("Transaction added successfully!"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTransaction(@PathVariable Long id, @Valid @RequestBody TransactionRequest request,
                                             @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!transaction.getUser().getId().equals(userDetails.getId())) {
            return ResponseEntity.status(403).body(new MessageResponse("Unauthorized access"));
        }

        updateTransactionFromRequest(transaction, request);
        transactionRepository.save(transaction);
        return ResponseEntity.ok(new MessageResponse("Transaction updated successfully!"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!transaction.getUser().getId().equals(userDetails.getId())) {
            return ResponseEntity.status(403).body(new MessageResponse("Unauthorized access"));
        }

        transactionRepository.delete(transaction);
        return ResponseEntity.ok(new MessageResponse("Transaction deleted successfully!"));
    }

    private void updateTransactionFromRequest(Transaction transaction, TransactionRequest request) {
        transaction.setDescription(request.getDescription());
        transaction.setAmount(request.getAmount());
        transaction.setCategory(request.getCategory());
        transaction.setType(request.getType());
        transaction.setDate(request.getDate());
    }

    private TransactionResponse mapToResponse(Transaction transaction) {
        TransactionResponse response = new TransactionResponse();
        response.setId(transaction.getId());
        response.setDescription(transaction.getDescription());
        response.setAmount(transaction.getAmount());
        response.setCategory(transaction.getCategory());
        response.setType(transaction.getType());
        response.setDate(transaction.getDate());
        return response;
    }
}
