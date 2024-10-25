zpackage com.ERP.FinalProject.domain.elasticsearch.service;

import com.ERP.FinalProject.domain.elasticsearch.entity.ElasticsearchProduct;
import com.ERP.FinalProject.domain.elasticsearch.repository.ElasticsearchProductRepository;
import com.ERP.FinalProject.domain.inventory.entity.Product;
import com.ERP.FinalProject.domain.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ElasticsearchProductService {

    @Autowired
    private ProductRepository productRepository; // MySQL 제품 리포지토리

    @Autowired
    private ElasticsearchProductRepository elasticsearchProductRepository; // Elasticsearch 제품 리포지토리

    public void syncDatabaseWithElasticsearch() {
        try {
            List<Product> products = productRepository.findAll();
            for (Product product : products) {
                ElasticsearchProduct elasticsearchProduct = new ElasticsearchProduct();
                elasticsearchProduct.setId(product.getProductID().toString());
                elasticsearchProduct.setProductName(product.getProductName());
                elasticsearchProduct.setProductCategory(product.getProductCategory());
                elasticsearchProduct.setUnitPrice(product.getUnitPrice());
                elasticsearchProduct.setSalePrice(product.getSalePrice());
                elasticsearchProduct.setProductionDate(product.getProductionDate().toString());
                elasticsearchProduct.setProductImage(product.getProductImage());
                elasticsearchProduct.setRecommend(product.getRecommend());
                elasticsearchProduct.setDetailDescription(product.getDetailDescription());
                elasticsearchProductRepository.save(elasticsearchProduct);
            }
            System.out.println("Products synchronized successfully with Elasticsearch.");
        } catch (Exception e) {
            System.err.println("Error occurred during synchronization: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
